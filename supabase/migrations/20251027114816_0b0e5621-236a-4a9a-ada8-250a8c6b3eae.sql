-- Add learner_progress_report field to profile_sensitive_data table
ALTER TABLE profile_sensitive_data 
ADD COLUMN learner_progress_report text;

-- Add a check constraint to ensure the report is not longer than 200 characters
-- Using a trigger instead of CHECK constraint for better compatibility
CREATE OR REPLACE FUNCTION check_progress_report_length()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.learner_progress_report IS NOT NULL AND LENGTH(NEW.learner_progress_report) > 200 THEN
    RAISE EXCEPTION 'Learner progress report must not exceed 200 characters';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_progress_report_length
BEFORE INSERT OR UPDATE ON profile_sensitive_data
FOR EACH ROW
EXECUTE FUNCTION check_progress_report_length();