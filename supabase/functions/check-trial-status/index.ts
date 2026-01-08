import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
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

    // Normalize phone number
    const normalizedPhone = phoneNumber.replace(/\s+/g, '').replace(/^0/, '+27');

    console.log(`Checking trial status for ${normalizedPhone}`);

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

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching trial:', fetchError);
      throw fetchError;
    }

    if (!trial) {
      return new Response(
        JSON.stringify({ 
          hasActiveTrial: false,
          isVerified: false,
          message: 'No trial found for this phone number'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if verified and trial is still active
    if (trial.is_verified && trial.trial_end_date) {
      const trialEndDate = new Date(trial.trial_end_date);
      const now = new Date();
      
      if (trialEndDate > now) {
        const daysRemaining = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        return new Response(
          JSON.stringify({ 
            hasActiveTrial: true,
            isVerified: true,
            daysRemaining,
            trialEndDate: trial.trial_end_date,
            trialStartDate: trial.trial_start_date
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ 
            hasActiveTrial: false,
            isVerified: true,
            isExpired: true,
            trialEndDate: trial.trial_end_date,
            message: 'Trial has expired'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        hasActiveTrial: false,
        isVerified: false,
        message: 'Phone number not yet verified'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in check-trial-status:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to check trial status' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
