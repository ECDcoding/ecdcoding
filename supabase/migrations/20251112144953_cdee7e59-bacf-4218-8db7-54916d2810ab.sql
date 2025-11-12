-- Add admin access policies for profiles table
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Add admin access policies for subscription_payments table
CREATE POLICY "Admins can view all payments"
ON public.subscription_payments
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all payments"
ON public.subscription_payments
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Add admin access policies for user_roles table (for role management)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));