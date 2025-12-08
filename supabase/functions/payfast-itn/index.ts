import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYFAST_MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // PayFast sends ITN data as form-urlencoded
    const formData = await req.formData();
    const itnData: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      itnData[key] = value.toString();
    });

    console.log('PayFast ITN received:', itnData);

    // Verify merchant ID
    if (itnData.merchant_id !== PAYFAST_MERCHANT_ID) {
      console.error('Invalid merchant ID in ITN');
      return new Response('Invalid merchant ID', { status: 400 });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const userId = itnData.custom_str1;
    const paymentType = itnData.custom_str2;
    const paymentStatus = itnData.payment_status;
    const amount = parseFloat(itnData.amount_gross);
    const paymentId = itnData.pf_payment_id;

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
          .single();

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
            is_active: true
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
