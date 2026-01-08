import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FREE_TRIAL_DAYS = 14;

Deno.serve(async (req) => {
  // Handle CORS preflight requests
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

    // Normalize phone number
    const normalizedPhone = phoneNumber.replace(/\s+/g, '').replace(/^0/, '+27');

    console.log(`Verifying OTP for ${normalizedPhone}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the phone trial record
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

    // Check if OTP has expired
    if (new Date(trial.otp_expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'OTP has expired. Please request a new code.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify OTP
    if (trial.otp_code !== otpCode) {
      return new Response(
        JSON.stringify({ error: 'Invalid OTP code' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate trial dates
    const trialStartDate = new Date();
    const trialEndDate = new Date(trialStartDate);
    trialEndDate.setDate(trialEndDate.getDate() + FREE_TRIAL_DAYS);

    // Update the trial record
    const { error: updateError } = await supabase
      .from('phone_trials')
      .update({
        is_verified: true,
        trial_start_date: trialStartDate.toISOString(),
        trial_end_date: trialEndDate.toISOString(),
        otp_code: null, // Clear OTP after verification
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
    console.error('Error in verify-otp:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to verify OTP' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
