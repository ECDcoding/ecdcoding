-- Create a separate table for highly sensitive profile data
CREATE TABLE IF NOT EXISTS public.profile_sensitive_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  phone text,
  ecd_phone text,
  ecd_email text,
  learner_first_name text,
  learner_last_name text,
  learner_gender text,
  facility_name text,
  facility_type text,
  number_of_learners text,
  age_groups text,
  number_of_kids text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on the sensitive data table
ALTER TABLE public.profile_sensitive_data ENABLE ROW LEVEL SECURITY;

-- Create stricter RLS policies for sensitive data
-- Users can only view their own sensitive data
CREATE POLICY "Users can view their own sensitive data"
ON public.profile_sensitive_data
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own sensitive data
CREATE POLICY "Users can insert their own sensitive data"
ON public.profile_sensitive_data
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own sensitive data
CREATE POLICY "Users can update their own sensitive data"
ON public.profile_sensitive_data
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own sensitive data
CREATE POLICY "Users can delete their own sensitive data"
ON public.profile_sensitive_data
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create an audit log table for tracking access to sensitive data
CREATE TABLE IF NOT EXISTS public.sensitive_data_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  accessed_at timestamp with time zone NOT NULL DEFAULT now(),
  access_type text NOT NULL,
  ip_address text,
  user_agent text
);

-- Enable RLS on audit log
ALTER TABLE public.sensitive_data_access_log ENABLE ROW LEVEL SECURITY;

-- Only allow inserts to audit log (no reads by regular users)
CREATE POLICY "System can log sensitive data access"
ON public.sensitive_data_access_log
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create a secure function to retrieve sensitive data with audit logging
CREATE OR REPLACE FUNCTION public.get_sensitive_profile_data()
RETURNS TABLE (
  user_id uuid,
  phone text,
  ecd_phone text,
  ecd_email text,
  learner_first_name text,
  learner_last_name text,
  learner_gender text,
  facility_name text,
  facility_type text,
  number_of_learners text,
  age_groups text,
  number_of_kids text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log the access attempt
  INSERT INTO public.sensitive_data_access_log (user_id, access_type)
  VALUES (auth.uid(), 'read_sensitive_profile');
  
  -- Return the sensitive data only for the authenticated user
  RETURN QUERY
  SELECT 
    psd.user_id,
    psd.phone,
    psd.ecd_phone,
    psd.ecd_email,
    psd.learner_first_name,
    psd.learner_last_name,
    psd.learner_gender,
    psd.facility_name,
    psd.facility_type,
    psd.number_of_learners,
    psd.age_groups,
    psd.number_of_kids
  FROM public.profile_sensitive_data psd
  WHERE psd.user_id = auth.uid();
END;
$$;

-- Create trigger for updated_at on sensitive data
CREATE TRIGGER update_profile_sensitive_data_updated_at
BEFORE UPDATE ON public.profile_sensitive_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing sensitive data from profiles to the new table
INSERT INTO public.profile_sensitive_data (
  user_id,
  phone,
  ecd_phone,
  ecd_email,
  learner_first_name,
  learner_last_name,
  learner_gender,
  facility_name,
  facility_type,
  number_of_learners,
  age_groups,
  number_of_kids
)
SELECT 
  user_id,
  phone,
  ecd_phone,
  ecd_email,
  learner_first_name,
  learner_last_name,
  learner_gender,
  facility_name,
  facility_type,
  number_of_learners,
  age_groups,
  number_of_kids
FROM public.profiles
WHERE user_id IS NOT NULL
ON CONFLICT (user_id) DO NOTHING;

-- Remove sensitive columns from profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS phone;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS ecd_phone;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS ecd_email;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS learner_first_name;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS learner_last_name;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS learner_gender;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS facility_name;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS facility_type;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS number_of_learners;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS age_groups;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS number_of_kids;