import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

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

// Simple in-memory rate limiter (per instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 OTP requests per phone per minute

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

// Generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ error: 'Phone number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize phone number (remove spaces, ensure + prefix)
    const normalizedPhone = phoneNumber.replace(/\s+/g, '').replace(/^0/, '+27');

    // Rate limit by phone number
    if (isRateLimited(`otp:${normalizedPhone}`)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait before requesting another code.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Sending OTP to ${normalizedPhone}`);

    // Generate OTP and set expiry (10 minutes)
    const otpCode = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if phone number already has an active verified trial
    const { data: existingTrial, error: fetchError } = await supabase
      .from('phone_trials')
      .select('*')
      .eq('phone_number', normalizedPhone)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching existing trial:', fetchError);
      throw fetchError;
    }

    // If already verified with active trial, return that info
    if (existingTrial?.is_verified && existingTrial?.trial_end_date) {
      const trialEndDate = new Date(existingTrial.trial_end_date);
      if (trialEndDate > new Date()) {
        const daysRemaining = Math.ceil((trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Already verified',
            alreadyVerified: true,
            daysRemaining,
            trialEndDate: existingTrial.trial_end_date
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Upsert phone trial record with new OTP
    const { error: upsertError } = await supabase
      .from('phone_trials')
      .upsert({
        phone_number: normalizedPhone,
        otp_code: otpCode,
        otp_expires_at: otpExpiresAt,
        is_verified: false,
        updated_at: new Date().toISOString()
      }, { onConflict: 'phone_number' });

    if (upsertError) {
      console.error('Error upserting phone trial:', upsertError);
      throw upsertError;
    }

    // Send SMS via Twilio
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')!;
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')!;
    const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER')!;

    console.log(
      `Twilio send attempt: accountSid=****${accountSid.slice(-4)}, from=${twilioPhone}, to=${normalizedPhone}`
    );

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const message = `Your ECDcoding free trial verification code is: ${otpCode}. This code expires in 10 minutes.`;

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: normalizedPhone,
        From: twilioPhone,
        Body: message,
      }),
    });

    if (!twilioResponse.ok) {
      const twilioErrorText = await twilioResponse.text();
      console.error('Twilio error:', twilioErrorText);

      if (twilioErrorText.includes('"code":21608')) {
        return new Response(
          JSON.stringify({
            error:
              'SMS cannot be delivered from the current Twilio account (trial restriction: recipient must be verified on this same account). Please confirm the verified number is on the same Twilio Account SID configured in the backend, or upgrade the Twilio account.',
            code: 21608,
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      throw new Error(`Failed to send SMS: ${twilioErrorText}`);
    }

    console.log(`OTP sent successfully to ${normalizedPhone}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP sent successfully',
        alreadyVerified: false
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const corsHeaders = getCorsHeaders(req);
    console.error('Error in send-otp:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send OTP' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
