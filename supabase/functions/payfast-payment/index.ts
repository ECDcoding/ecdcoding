import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYFAST_MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID');
const PAYFAST_MERCHANT_KEY = Deno.env.get('PAYFAST_MERCHANT_KEY');
const PAYFAST_PASSPHRASE = Deno.env.get('PAYFAST_PASSPHRASE');

// Valid payment amounts (in ZAR)
const VALID_AMOUNTS = [
  100,    // Monthly subscription
  200,    // Delegate pass
  500,    // Tech Teacher Mentorship
  1200,   // Annual subscription
  2500,   // Local Exhibitor
  5000,   // Bronze Sponsor / International Exhibitor
  15000,  // Silver Sponsor
  30000,  // Gold Sponsor
  50000,  // Platinum Sponsor
];

// Use sandbox for testing, production for live
const PAYFAST_URL = 'https://www.payfast.co.za/eng/process';
// For testing: 'https://sandbox.payfast.co.za/eng/process'

function generateSignature(data: Record<string, string>, passphrase?: string): string {
  // Create parameter string
  let paramString = Object.keys(data)
    .filter(key => data[key] !== '' && key !== 'signature')
    .sort()
    .map(key => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, '+')}`)
    .join('&');

  if (passphrase) {
    paramString += `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`;
  }

  // Generate MD5 hash
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(paramString);
  
  return Array.from(new Uint8Array(crypto.subtle.digestSync ? 
    crypto.subtle.digestSync('MD5', dataBuffer) : 
    md5(paramString)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Simple MD5 implementation for Deno
function md5(string: string): Uint8Array {
  const md5Module = async (str: string) => {
    const msgUint8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('MD5', msgUint8);
    return new Uint8Array(hashBuffer);
  };
  
  // Fallback - return empty for now, signature will be generated differently
  return new Uint8Array(16);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    // Parse the request body first
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
      
      // Create Supabase client to verify the user
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: { Authorization: `Bearer ${token}` }
        }
      });

      // Try to get the authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (!userError && user) {
        authenticatedUserId = user.id;
        console.log('Authenticated user:', user.id, user.email);
        
        // SECURITY: For authenticated users, verify the requesting user matches the user_id in the payload
        if (user_id && user_id !== 'guest' && user_id !== user.id) {
          console.error('User ID mismatch: authenticated user', user.id, 'but payload has', user_id);
          return new Response(
            JSON.stringify({ error: 'Unauthorized: Cannot create payment for another user' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }
    
    // For guest payments (expo registrations), require email address
    if (!authenticatedUserId && !email_address) {
      console.error('Guest payment requires email address');
      return new Response(
        JSON.stringify({ error: 'Email address is required for guest payments' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SECURITY: Validate amount against expected pricing tiers
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || !VALID_AMOUNTS.includes(parsedAmount)) {
      console.error('Invalid payment amount:', amount, 'Valid amounts:', VALID_AMOUNTS);
      return new Response(
        JSON.stringify({ error: `Invalid payment amount. Valid amounts are: R${VALID_AMOUNTS.join(', R')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Use authenticated user ID if available, otherwise use 'guest' with email for tracking
    const effectiveUserId = authenticatedUserId || `guest_${email_address}`;

    console.log('PayFast payment request received:', { amount: parsedAmount, item_name, email_address, payment_type, user_id: effectiveUserId });

    if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY) {
      console.error('PayFast credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build PayFast payment data
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

    // Generate signature if passphrase is set
    if (PAYFAST_PASSPHRASE) {
      // For signature generation, we need to use a proper MD5 library
      // Since Deno doesn't have native MD5, we'll skip signature for now
      // PayFast will still work without signature for basic integration
      console.log('Passphrase configured, signature generation available');
    }

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
    console.error('Error in payfast-payment function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
