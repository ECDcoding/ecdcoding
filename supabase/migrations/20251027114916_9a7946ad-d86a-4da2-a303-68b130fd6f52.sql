-- Fix the function search path for check_progress_report_length
-- First drop the trigger
DROP TRIGGER IF EXISTS validate_progress_report_length ON profile_sensitive_data;

-- Then drop the function
DROP FUNCTION IF EXISTS check_progress_report_length();

-- Recreate the function with proper search_path
CREATE OR REPLACE FUNCTION check_progress_report_length()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.learner_progress_report IS NOT NULL AND LENGTH(NEW.learner_progress_report) > 200 THEN
    RAISE EXCEPTION 'Learner progress report must not exceed 200 characters';
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER validate_progress_report_length
BEFORE INSERT OR UPDATE ON profile_sensitive_data
FOR EACH ROW
EXECUTE FUNCTION check_progress_report_length();