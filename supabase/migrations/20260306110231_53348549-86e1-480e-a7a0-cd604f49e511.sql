
-- Security definer function to create a profile during signup (before email confirmation)
CREATE OR REPLACE FUNCTION public.create_user_profile(
  _user_id uuid,
  _first_name text,
  _last_name text,
  _username text,
  _state text,
  _country text,
  _registration_type text,
  _institution text DEFAULT NULL,
  _registration_status text DEFAULT NULL,
  _hear_about text DEFAULT NULL,
  _aspiration text DEFAULT NULL,
  _relationship text DEFAULT NULL,
  _current_programs text DEFAULT NULL,
  _tech_goals text DEFAULT NULL,
  _qualifications text DEFAULT NULL,
  _experience text DEFAULT NULL,
  _tech_skills text DEFAULT NULL,
  _programming_languages text DEFAULT NULL,
  _teaching_philosophy text DEFAULT NULL,
  _available_hours text DEFAULT NULL,
  _salary text DEFAULT NULL,
  _start_date text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id, first_name, last_name, username, state, country, registration_type,
    institution, registration_status, hear_about, aspiration, relationship,
    current_programs, tech_goals, qualifications, experience, tech_skills,
    programming_languages, teaching_philosophy, available_hours, salary, start_date
  ) VALUES (
    _user_id, _first_name, _last_name, _username, _state, _country, _registration_type,
    _institution, _registration_status, _hear_about, _aspiration, _relationship,
    _current_programs, _tech_goals, _qualifications, _experience, _tech_skills,
    _programming_languages, _teaching_philosophy, _available_hours, _salary, _start_date
  );
END;
$$;

-- Security definer function to create sensitive profile data during signup
CREATE OR REPLACE FUNCTION public.create_user_sensitive_data(
  _user_id uuid,
  _phone text DEFAULT NULL,
  _number_of_kids text DEFAULT NULL,
  _learner_first_name text DEFAULT NULL,
  _learner_last_name text DEFAULT NULL,
  _learner_gender text DEFAULT NULL,
  _ecd_phone text DEFAULT NULL,
  _ecd_email text DEFAULT NULL,
  _facility_name text DEFAULT NULL,
  _facility_type text DEFAULT NULL,
  _number_of_learners text DEFAULT NULL,
  _age_groups text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profile_sensitive_data (
    user_id, phone, number_of_kids, learner_first_name, learner_last_name,
    learner_gender, ecd_phone, ecd_email, facility_name, facility_type,
    number_of_learners, age_groups
  ) VALUES (
    _user_id, _phone, _number_of_kids, _learner_first_name, _learner_last_name,
    _learner_gender, _ecd_phone, _ecd_email, _facility_name, _facility_type,
    _number_of_learners, _age_groups
  );
END;
$$;
