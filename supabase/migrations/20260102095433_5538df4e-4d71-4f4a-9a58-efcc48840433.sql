-- Create a security definer function for admin access to sensitive data with logging
CREATE OR REPLACE FUNCTION public.admin_get_sensitive_profile_data(target_user_id uuid)
RETURNS TABLE(
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
  number_of_kids text,
  learner_progress_report text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Check if the caller is an admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  -- Log the admin access attempt with detailed information
  INSERT INTO public.sensitive_data_access_log (user_id, access_type)
  VALUES (auth.uid(), 'admin_read_sensitive_profile:' || target_user_id::text);
  
  -- Return the sensitive data for the specified user
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
    psd.number_of_kids,
    psd.learner_progress_report
  FROM public.profile_sensitive_data psd
  WHERE psd.user_id = target_user_id;
END;
$$;

-- Add admin SELECT policy for profile_sensitive_data (controlled access with logging via function)
CREATE POLICY "Admins can view all sensitive data" 
ON public.profile_sensitive_data 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));