-- Enable RLS on promo_codes if not already enabled
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Add explicit SELECT policy for admins only
CREATE POLICY "Admins can view promo codes" 
ON public.promo_codes 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));