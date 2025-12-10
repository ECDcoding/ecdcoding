import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYFAST_MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID');
const PAYFAST_PASSPHRASE = Deno.env.get('PAYFAST_PASSPHRASE');

// PayFast valid IP ranges (as of 2024)
// https://developers.payfast.co.za/docs#step_4_confirm_payment
const PAYFAST_IP_RANGES = [
  '197.97.145.144/28',  // 197.97.145.144 - 197.97.145.159
  '41.74.179.192/27',   // 41.74.179.192 - 41.74.179.223
  '102.216.36.0/24',    // 102.216.36.0 - 102.216.36.255
  '102.216.37.0/24',    // 102.216.37.0 - 102.216.37.255
];

// Helper function to check if IP is in CIDR range
function isIpInRange(ip: string, cidr: string): boolean {
  const [range, bits] = cidr.split('/');
  const mask = ~(2 ** (32 - parseInt(bits)) - 1);
  
  const ipToInt = (ip: string): number => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
  };
  
  const ipInt = ipToInt(ip);
  const rangeInt = ipToInt(range);
  
  return (ipInt & mask) === (rangeInt & mask);
}

// Check if IP is from PayFast
function isPayFastIp(ip: string): boolean {
  // In development/sandbox, allow all IPs for testing
  const isDevelopment = Deno.env.get('PAYFAST_SANDBOX') === 'true';
  if (isDevelopment) {
    console.log('Sandbox mode: skipping IP validation');
    return true;
  }
  
  // Clean the IP (remove IPv6 prefix if present)
  const cleanIp = ip.replace('::ffff:', '');
  
  for (const range of PAYFAST_IP_RANGES) {
    if (isIpInRange(cleanIp, range)) {
      return true;
    }
  }
  return false;
}

// Generate MD5 signature for validation
async function generateSignature(data: Record<string, string>, passphrase?: string): Promise<string> {
  // Sort keys and build parameter string (excluding signature)
  const sortedKeys = Object.keys(data).filter(key => key !== 'signature').sort();
  const params: string[] = [];
  
  for (const key of sortedKeys) {
    if (data[key] !== undefined && data[key] !== '') {
      params.push(`${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, '+')}`);
    }
  }
  
  let paramString = params.join('&');
  
  // Append passphrase if provided
  if (passphrase) {
    paramString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
  }
  
  // Generate MD5 hash
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(paramString);
  const hashBuffer = await crypto.subtle.digest('MD5', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

// Verify the signature from PayFast
async function verifySignature(itnData: Record<string, string>): Promise<boolean> {
  const receivedSignature = itnData.signature;
  if (!receivedSignature) {
    console.error('No signature in ITN data');
    return false;
  }
  
  const calculatedSignature = await generateSignature(itnData, PAYFAST_PASSPHRASE || undefined);
  
  console.log('Signature validation - Received:', receivedSignature, 'Calculated:', calculatedSignature);
  
  return receivedSignature.toLowerCase() === calculatedSignature.toLowerCase();
}

// Check if payment has already been processed (replay attack protection)
async function isPaymentAlreadyProcessed(supabase: any, paymentId: string): Promise<boolean> {
  const { data: existingPayment } = await supabase
    .from('credit_purchases')
    .select('id')
    .eq('payment_id', paymentId)
    .maybeSingle();

  if (existingPayment) {
    return true;
  }

  // Also check subscription payments
  const { data: existingSubscription } = await supabase
    .from('subscription_payments')
    .select('id')
    .eq('notes', `pf_payment_id:${paymentId}`)
    .maybeSingle();

  return !!existingSubscription;
}

// Validate payment with PayFast server (optional additional security)
async function validateWithPayFast(itnData: Record<string, string>): Promise<boolean> {
  try {
    const validationUrl = 'https://www.payfast.co.za/eng/query/validate';
    
    // Build form data for validation request
    const formBody = Object.entries(itnData)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    const response = await fetch(validationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });
    
    const result = await response.text();
    console.log('PayFast validation response:', result);
    
    return result.trim() === 'VALID';
  } catch (error) {
    console.error('Error validating with PayFast:', error);
    // In case of network error, we'll rely on other validations
    return true; // Fail open for server validation only
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Step 1: IP Validation
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
                  || req.headers.get('cf-connecting-ip') 
                  || req.headers.get('x-real-ip')
                  || 'unknown';
    
    console.log('ITN request from IP:', clientIp);
    
    if (!isPayFastIp(clientIp)) {
      console.error('Request from non-PayFast IP:', clientIp);
      return new Response('Unauthorized IP', { status: 403 });
    }

    // PayFast sends ITN data as form-urlencoded
    const formData = await req.formData();
    const itnData: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      itnData[key] = value.toString();
    });

    console.log('PayFast ITN received:', JSON.stringify(itnData, null, 2));

    // Step 2: Merchant ID Validation
    if (itnData.merchant_id !== PAYFAST_MERCHANT_ID) {
      console.error('Invalid merchant ID in ITN. Expected:', PAYFAST_MERCHANT_ID, 'Got:', itnData.merchant_id);
      return new Response('Invalid merchant ID', { status: 400 });
    }

    // Step 3: Signature Validation
    const signatureValid = await verifySignature(itnData);
    if (!signatureValid) {
      console.error('Invalid signature in ITN');
      return new Response('Invalid signature', { status: 400 });
    }
    console.log('Signature validation passed');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const userId = itnData.custom_str1;
    const paymentType = itnData.custom_str2;
    const paymentStatus = itnData.payment_status;
    const amount = parseFloat(itnData.amount_gross);
    const paymentId = itnData.pf_payment_id;

    // Step 4: Replay Attack Protection - Check if payment already processed
    const alreadyProcessed = await isPaymentAlreadyProcessed(supabase, paymentId);
    if (alreadyProcessed) {
      console.log('Payment already processed, ignoring duplicate ITN:', paymentId);
      return new Response('OK', { status: 200 }); // Return OK to stop PayFast retrying
    }

    // Step 5: Optional - Validate with PayFast server
    const serverValid = await validateWithPayFast(itnData);
    if (!serverValid) {
      console.error('PayFast server validation failed');
      return new Response('Server validation failed', { status: 400 });
    }
    console.log('PayFast server validation passed');

    console.log('Processing ITN for user:', userId, 'Payment type:', paymentType, 'Status:', paymentStatus);

    if (paymentStatus === 'COMPLETE') {
      // Payment successful - update database
      if (paymentType === 'credits') {
        // Credit purchase
        const creditsAmount = amount === 100 ? 100 : amount === 200 ? 200 : amount === 600 ? 300 : 100;
        
        // Record the purchase
        const { error: purchaseError } = await supabase
          .from('credit_purchases')
          .insert({
            user_id: userId,
            credits_amount: creditsAmount,
            price_zar: amount,
            payment_id: paymentId,
            payment_status: 'completed'
          });

        if (purchaseError) {
          console.error('Error recording credit purchase:', purchaseError);
        }

        // Update user credits
        const { data: currentCredits } = await supabase
          .from('user_credits')
          .select('credits')
          .eq('user_id', userId)
          .maybeSingle();

        const newCredits = (currentCredits?.credits || 0) + creditsAmount;

        const { error: updateError } = await supabase
          .from('user_credits')
          .upsert({
            user_id: userId,
            credits: newCredits,
            updated_at: new Date().toISOString()
          });

        if (updateError) {
          console.error('Error updating credits:', updateError);
        }

        console.log('Credits updated for user:', userId, 'New balance:', newCredits);

      } else {
        // Subscription payment
        const subscriptionType = amount === 100 ? 'monthly' : amount === 1200 ? 'annual' : 'monthly';
        const nextPaymentDue = new Date();
        nextPaymentDue.setMonth(nextPaymentDue.getMonth() + (subscriptionType === 'annual' ? 12 : 1));

        const { error: subError } = await supabase
          .from('subscription_payments')
          .upsert({
            user_id: userId,
            subscription_type: subscriptionType,
            amount: amount,
            payment_status: 'paid',
            last_payment_date: new Date().toISOString(),
            next_payment_due: nextPaymentDue.toISOString(),
            payment_method: 'payfast',
            is_active: true,
            notes: `pf_payment_id:${paymentId}` // Store payment ID for replay protection
          });

        if (subError) {
          console.error('Error recording subscription:', subError);
        }

        console.log('Subscription recorded for user:', userId, 'Type:', subscriptionType);
      }
    } else {
      console.log('Payment not complete, status:', paymentStatus);
    }

    // PayFast expects a 200 OK response
    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Error in payfast-itn function:', error);
    return new Response('Error processing ITN', { status: 500 });
  }
});
