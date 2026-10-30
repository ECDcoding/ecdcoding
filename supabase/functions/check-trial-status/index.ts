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

// Rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

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

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

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

    const normalizedPhone = phoneNumber.replace(/\s+/g, '').replace(/^0/, '+27');

    // Rate limit by phone number
    if (isRateLimited(`trial:${normalizedPhone}`)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Checking trial status for ${normalizedPhone}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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
    const corsHeaders = getCorsHeaders(req);
    console.error('Error in check-trial-status:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Failed to check trial status' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
