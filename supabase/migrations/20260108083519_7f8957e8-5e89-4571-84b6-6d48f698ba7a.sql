-- Create table to store phone-based free trials
CREATE TABLE public.phone_trials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL UNIQUE,
  otp_code TEXT,
  otp_expires_at TIMESTAMP WITH TIME ZONE,
  is_verified BOOLEAN DEFAULT false,
  trial_start_date TIMESTAMP WITH TIME ZONE,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  notification_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.phone_trials ENABLE ROW LEVEL SECURITY;

-- Allow public insert for OTP verification (before trial starts)
CREATE POLICY "Anyone can create phone trial entry"
ON public.phone_trials
FOR INSERT
WITH CHECK (true);

-- Allow public select for OTP verification
CREATE POLICY "Anyone can read their phone trial by phone number"
ON public.phone_trials
FOR SELECT
USING (true);

-- Allow public update for OTP verification
CREATE POLICY "Anyone can update phone trial for verification"
ON public.phone_trials
FOR UPDATE
USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_phone_trials_updated_at
BEFORE UPDATE ON public.phone_trials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_phone_trials_phone_number ON public.phone_trials(phone_number);
CREATE INDEX idx_phone_trials_trial_end_date ON public.phone_trials(trial_end_date);
CREATE INDEX idx_phone_trials_notification ON public.phone_trials(notification_sent, trial_end_date);