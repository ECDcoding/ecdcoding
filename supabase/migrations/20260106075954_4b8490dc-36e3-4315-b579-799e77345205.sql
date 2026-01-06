-- Add column to track last daily credit award
ALTER TABLE public.user_credits 
ADD COLUMN last_daily_credit_at timestamp with time zone DEFAULT NULL;