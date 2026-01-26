-- Add 'sponsor' to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'sponsor';

-- Create a table to store business email verification requests for expo access
CREATE TABLE IF NOT EXISTS public.expo_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  company_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  requested_at timestamp with time zone NOT NULL DEFAULT now(),
  reviewed_at timestamp with time zone,
  reviewed_by uuid REFERENCES auth.users(id),
  notes text
);

-- Enable RLS
ALTER TABLE public.expo_access_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for expo_access_requests
CREATE POLICY "Anyone can create access requests"
ON public.expo_access_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own requests"
ON public.expo_access_requests
FOR SELECT
USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Admins can view all requests"
ON public.expo_access_requests
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update requests"
ON public.expo_access_requests
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));