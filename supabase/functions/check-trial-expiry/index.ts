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
    console.log('Starting trial expiry notification check...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Calculate the date 3 days from now
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    // Calculate the date 2 days from now (to create a window)
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

    // Find trials expiring in 3 days that haven't been notified yet
    const { data: expiringTrials, error: fetchError } = await supabase
      .from('phone_trials')
      .select('*')
      .eq('is_verified', true)
      .eq('notification_sent', false)
      .gte('trial_end_date', twoDaysFromNow.toISOString())
      .lte('trial_end_date', threeDaysFromNow.toISOString());

    if (fetchError) {
      console.error('Error fetching expiring trials:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${expiringTrials?.length || 0} trials expiring in ~3 days`);

    if (!expiringTrials || expiringTrials.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No trials to notify', count: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Twilio credentials
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')!;
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')!;
    const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER')!;
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    let notifiedCount = 0;
    const errors: string[] = [];

    for (const trial of expiringTrials) {
      try {
        const trialEndDate = new Date(trial.trial_end_date);
        const formattedDate = trialEndDate.toLocaleDateString('en-ZA', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const message = `Reminder: Your ECDcoding free trial expires on ${formattedDate}. Don't miss out on continued learning! Register at ecdcoding.co.za to keep access to all lessons.`;

        const twilioResponse = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: trial.phone_number,
            From: twilioPhone,
            Body: message,
          }),
        });

        if (!twilioResponse.ok) {
          const twilioError = await twilioResponse.text();
          console.error(`Failed to send SMS to ${trial.phone_number}:`, twilioError);
          errors.push(`${trial.phone_number}: ${twilioError}`);
          continue;
        }

        // Mark as notified
        const { error: updateError } = await supabase
          .from('phone_trials')
          .update({ 
            notification_sent: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', trial.id);

        if (updateError) {
          console.error(`Failed to update notification status for ${trial.phone_number}:`, updateError);
          errors.push(`${trial.phone_number}: Failed to update status`);
          continue;
        }

        console.log(`Notification sent to ${trial.phone_number}`);
        notifiedCount++;

      } catch (err) {
        console.error(`Error processing trial ${trial.id}:`, err);
        errors.push(`${trial.phone_number}: ${err.message}`);
      }
    }

    console.log(`Completed: ${notifiedCount}/${expiringTrials.length} notifications sent`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Sent ${notifiedCount} notifications`,
        count: notifiedCount,
        total: expiringTrials.length,
        errors: errors.length > 0 ? errors : undefined
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in check-trial-expiry:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to check trial expiry' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
