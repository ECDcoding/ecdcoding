-- Add SELECT policy for authenticated users to view active promo codes
CREATE POLICY "Users can view active promo codes" 
ON public.promo_codes 
FOR SELECT 
TO authenticated
USING (is_active = true);