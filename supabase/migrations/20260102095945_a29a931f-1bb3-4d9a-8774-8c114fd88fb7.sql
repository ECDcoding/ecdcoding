-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view active promo codes" ON public.promo_codes;

-- Create a new policy that only allows users to see promo codes they've redeemed
CREATE POLICY "Users can view their redeemed promo codes" 
ON public.promo_codes 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_promo_codes upc
    WHERE upc.promo_code_id = promo_codes.id
    AND upc.user_id = auth.uid()
  )
);

-- Create a security definer function to validate a promo code without exposing all codes
CREATE OR REPLACE FUNCTION public.validate_promo_code(code_text text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_promo_code promo_codes%ROWTYPE;
BEGIN
  -- Find the promo code without exposing other codes
  SELECT * INTO v_promo_code
  FROM promo_codes
  WHERE code = code_text AND is_active = true;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false, 'message', 'Invalid or inactive promo code');
  END IF;
  
  -- Check if max uses reached
  IF v_promo_code.max_uses IS NOT NULL AND v_promo_code.current_uses >= v_promo_code.max_uses THEN
    RETURN jsonb_build_object('valid', false, 'message', 'This promo code has reached its maximum uses');
  END IF;
  
  RETURN jsonb_build_object(
    'valid', true, 
    'message', 'Promo code is valid',
    'description', v_promo_code.description
  );
END;
$$;