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

// Rate limiter for brute-force protection
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 300_000; // 5 minutes
const RATE_LIMIT_MAX = 5; // max 5 attempts per phone per 5 minutes

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

const FREE_TRIAL_DAYS = 14;

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, otpCode } = await req.json();

    if (!phoneNumber || !otpCode) {
      return new Response(
        JSON.stringify({ error: 'Phone number and OTP code are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const normalizedPhone = phoneNumber.replace(/\s+/g, '').replace(/^0/, '+27');

    // Rate limit by phone number
    if (isRateLimited(`verify:${normalizedPhone}`)) {
      return new Response(
        JSON.stringify({ error: 'Too many verification attempts. Please wait 5 minutes.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Verifying OTP for ${normalizedPhone}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: trial, error: fetchError } = await supabase
      .from('phone_trials')
      .select('*')
      .eq('phone_number', normalizedPhone)
      .single();

    if (fetchError || !trial) {
      console.error('Trial not found:', fetchError);
      return new Response(
        JSON.stringify({ error: 'No verification request found for this phone number' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (new Date(trial.otp_expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'OTP has expired. Please request a new code.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (trial.otp_code !== otpCode) {
      return new Response(
        JSON.stringify({ error: 'Invalid OTP code' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const trialStartDate = new Date();
    const trialEndDate = new Date(trialStartDate);
    trialEndDate.setDate(trialEndDate.getDate() + FREE_TRIAL_DAYS);

    const { error: updateError } = await supabase
      .from('phone_trials')
      .update({
        is_verified: true,
        trial_start_date: trialStartDate.toISOString(),
        trial_end_date: trialEndDate.toISOString(),
        otp_code: null,
        otp_expires_at: null,
        notification_sent: false,
        updated_at: new Date().toISOString()
      })
      .eq('phone_number', normalizedPhone);

    if (updateError) {
      console.error('Error updating trial:', updateError);
      throw updateError;
    }

    console.log(`Phone ${normalizedPhone} verified successfully. Trial ends: ${trialEndDate.toISOString()}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Phone verified successfully!',
        trialStartDate: trialStartDate.toISOString(),
        trialEndDate: trialEndDate.toISOString(),
        daysRemaining: FREE_TRIAL_DAYS
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const corsHeaders = getCorsHeaders(req);
    console.error('Error in verify-otp:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Failed to verify OTP' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
