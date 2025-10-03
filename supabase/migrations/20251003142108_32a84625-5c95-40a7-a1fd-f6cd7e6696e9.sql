-- Create promo codes table
CREATE TABLE public.promo_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  description text,
  features_unlocked text[] NOT NULL DEFAULT '{}',
  max_uses integer DEFAULT NULL,
  current_uses integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user promo codes table to track redemptions
CREATE TABLE public.user_promo_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  promo_code_id uuid NOT NULL REFERENCES public.promo_codes(id) ON DELETE CASCADE,
  redeemed_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  UNIQUE(user_id, promo_code_id)
);

-- Enable RLS
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_promo_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for promo_codes (public can read active codes)
CREATE POLICY "Anyone can view active promo codes"
  ON public.promo_codes
  FOR SELECT
  USING (is_active = true);

-- RLS Policies for user_promo_codes
CREATE POLICY "Users can view their own promo code redemptions"
  ON public.user_promo_codes
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can redeem promo codes"
  ON public.user_promo_codes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own promo codes"
  ON public.user_promo_codes
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add updated_at trigger for promo_codes
CREATE TRIGGER update_promo_codes_updated_at
  BEFORE UPDATE ON public.promo_codes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default ECD promo code with 14-day access
INSERT INTO public.promo_codes (code, description, features_unlocked, is_active)
VALUES ('ECDCODING', 'ECDcoding promotional code - 14 days free access', ARRAY['numeracy', 'basic_logic'], true);

-- Function to validate and redeem promo code
CREATE OR REPLACE FUNCTION public.redeem_promo_code(promo_code_text text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_promo_code promo_codes%ROWTYPE;
  v_user_id uuid;
  v_expires_at timestamp with time zone;
  v_existing_redemption user_promo_codes%ROWTYPE;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'User not authenticated');
  END IF;
  
  -- Find promo code
  SELECT * INTO v_promo_code
  FROM promo_codes
  WHERE code = promo_code_text AND is_active = true;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Invalid or inactive promo code');
  END IF;
  
  -- Check if user already redeemed this code
  SELECT * INTO v_existing_redemption
  FROM user_promo_codes
  WHERE user_id = v_user_id AND promo_code_id = v_promo_code.id;
  
  IF FOUND THEN
    -- Check if existing redemption is still active
    IF v_existing_redemption.is_active AND v_existing_redemption.expires_at > now() THEN
      RETURN jsonb_build_object(
        'success', false, 
        'message', 'You have already redeemed this code',
        'expires_at', v_existing_redemption.expires_at
      );
    END IF;
  END IF;
  
  -- Check max uses
  IF v_promo_code.max_uses IS NOT NULL AND v_promo_code.current_uses >= v_promo_code.max_uses THEN
    RETURN jsonb_build_object('success', false, 'message', 'This promo code has reached its maximum number of uses');
  END IF;
  
  -- Set expiration to 14 days from now
  v_expires_at := now() + interval '14 days';
  
  -- Create or update redemption record
  INSERT INTO user_promo_codes (user_id, promo_code_id, expires_at, is_active)
  VALUES (v_user_id, v_promo_code.id, v_expires_at, true)
  ON CONFLICT (user_id, promo_code_id)
  DO UPDATE SET 
    redeemed_at = now(),
    expires_at = v_expires_at,
    is_active = true;
  
  -- Increment usage count
  UPDATE promo_codes
  SET current_uses = current_uses + 1
  WHERE id = v_promo_code.id;
  
  RETURN jsonb_build_object(
    'success', true, 
    'message', 'Promo code redeemed successfully!',
    'features', v_promo_code.features_unlocked,
    'expires_at', v_expires_at
  );
END;
$$;