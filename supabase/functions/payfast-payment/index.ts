import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const allowedOrigins = [
  'https://ecdcoding.lovable.app',
  'https://id-preview--9ad76001-6b51-460f-a9da-27a8c4599f5e.lovable.app',
  'http://localhost:5173',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

// Rate limiter: max 5 payment initiations per user per 5 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 300_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const PAYFAST_MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID');
const PAYFAST_MERCHANT_KEY = Deno.env.get('PAYFAST_MERCHANT_KEY');
const PAYFAST_PASSPHRASE = Deno.env.get('PAYFAST_PASSPHRASE');

// Valid payment amounts (in ZAR)
const VALID_AMOUNTS = [
  100,    // Monthly subscription
  200,    // Delegate pass
  500,    // Tech Teacher Mentorship
  600,    // ECDcoding Annual Usage
  1200,   // Annual subscription
  2500,   // Local Exhibitor
  5000,   // Bronze Sponsor / International Exhibitor
  15000,  // Silver Sponsor
  30000,  // Gold Sponsor
  50000,  // Platinum Sponsor
  75000,  // Tech Franchise (package only)
  100000, // Tech Franchise (package + installation)
];

const PAYFAST_URL = 'https://www.payfast.co.za/eng/process';

async function generateSignature(data: Record<string, string>, passphrase?: string): Promise<string> {
  let pfOutput = '';
  for (const key of Object.keys(data)) {
    if (data[key] !== '' && key !== 'signature') {
      pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, '+')}&`;
    }
  }
  let getString = pfOutput.slice(0, -1);

  if (passphrase) {
    getString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
  }

  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('MD5', encoder.encode(getString));
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const { 
      amount, 
      item_name, 
      email_address, 
      name_first, 
      name_last,
      user_id,
      payment_type,
      return_url,
      cancel_url,
      notify_url
    } = await req.json();

    // Check for authorization header - but allow guest payments for expo registrations
    const authHeader = req.headers.get('Authorization');
    let authenticatedUserId: string | null = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: { Authorization: `Bearer ${token}` }
        }
      });

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (!userError && user) {
        authenticatedUserId = user.id;
        console.log('Authenticated user:', user.id, user.email);
        
        if (user_id && user_id !== 'guest' && user_id !== user.id) {
          console.error('User ID mismatch: authenticated user', user.id, 'but payload has', user_id);
          return new Response(
            JSON.stringify({ error: 'Unauthorized: Cannot create payment for another user' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }
    
    if (!authenticatedUserId && !email_address) {
      console.error('Guest payment requires email address');
      return new Response(
        JSON.stringify({ error: 'Email address is required for guest payments' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limit by user or email
    const rateLimitKey = authenticatedUserId || email_address || 'unknown';
    if (isRateLimited(`pay:${rateLimitKey}`)) {
      return new Response(
        JSON.stringify({ error: 'Too many payment requests. Please wait before trying again.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || !VALID_AMOUNTS.includes(parsedAmount)) {
      console.error('Invalid payment amount:', amount, 'Valid amounts:', VALID_AMOUNTS);
      return new Response(
        JSON.stringify({ error: `Invalid payment amount. Valid amounts are: R${VALID_AMOUNTS.join(', R')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const effectiveUserId = authenticatedUserId || `guest_${email_address}`;

    console.log('PayFast payment request received:', { amount: parsedAmount, item_name, email_address, payment_type, user_id: effectiveUserId });

    if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY) {
      console.error('PayFast credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paymentData: Record<string, string> = {
      merchant_id: PAYFAST_MERCHANT_ID,
      merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: return_url || `${req.headers.get('origin')}/payment-success`,
      cancel_url: cancel_url || `${req.headers.get('origin')}/payment-cancelled`,
      notify_url: notify_url || `${supabaseUrl}/functions/v1/payfast-itn`,
      name_first: name_first || '',
      name_last: name_last || '',
      email_address: email_address || '',
      m_payment_id: `${effectiveUserId}_${Date.now()}`,
      amount: parsedAmount.toFixed(2),
      item_name: item_name || 'ECDcoding Subscription',
      custom_str1: effectiveUserId,
      custom_str2: payment_type || 'subscription',
    };

    const signature = await generateSignature(paymentData, PAYFAST_PASSPHRASE || undefined);
    paymentData.signature = signature;
    console.log('Signature generated successfully');

    console.log('PayFast payment data prepared for user:', effectiveUserId, { ...paymentData, merchant_key: '[REDACTED]' });

    return new Response(
      JSON.stringify({ 
        success: true,
        payfast_url: PAYFAST_URL,
        payment_data: paymentData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const corsHeaders = getCorsHeaders(req);
    console.error('Error in payfast-payment function:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
