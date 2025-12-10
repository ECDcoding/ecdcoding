-- Add length constraints to profiles table
ALTER TABLE public.profiles
  ADD CONSTRAINT check_first_name_len CHECK (length(first_name) <= 100),
  ADD CONSTRAINT check_last_name_len CHECK (length(last_name) <= 100),
  ADD CONSTRAINT check_username_len CHECK (length(username) <= 50),
  ADD CONSTRAINT check_state_len CHECK (length(state) <= 100),
  ADD CONSTRAINT check_country_len CHECK (length(country) <= 100),
  ADD CONSTRAINT check_institution_len CHECK (institution IS NULL OR length(institution) <= 200),
  ADD CONSTRAINT check_qualifications_len CHECK (qualifications IS NULL OR length(qualifications) <= 500),
  ADD CONSTRAINT check_experience_len CHECK (experience IS NULL OR length(experience) <= 500),
  ADD CONSTRAINT check_teaching_philosophy_len CHECK (teaching_philosophy IS NULL OR length(teaching_philosophy) <= 1000);

-- Add length and format constraints to profile_sensitive_data table
ALTER TABLE public.profile_sensitive_data
  ADD CONSTRAINT check_phone_len CHECK (phone IS NULL OR length(phone) <= 20),
  ADD CONSTRAINT check_phone_format CHECK (phone IS NULL OR phone ~ '^[0-9+\-\s()]+$'),
  ADD CONSTRAINT check_ecd_phone_len CHECK (ecd_phone IS NULL OR length(ecd_phone) <= 20),
  ADD CONSTRAINT check_ecd_phone_format CHECK (ecd_phone IS NULL OR ecd_phone ~ '^[0-9+\-\s()]+$'),
  ADD CONSTRAINT check_ecd_email_len CHECK (ecd_email IS NULL OR length(ecd_email) <= 255),
  ADD CONSTRAINT check_learner_first_name_len CHECK (learner_first_name IS NULL OR length(learner_first_name) <= 100),
  ADD CONSTRAINT check_learner_last_name_len CHECK (learner_last_name IS NULL OR length(learner_last_name) <= 100),
  ADD CONSTRAINT check_facility_name_len CHECK (facility_name IS NULL OR length(facility_name) <= 200);