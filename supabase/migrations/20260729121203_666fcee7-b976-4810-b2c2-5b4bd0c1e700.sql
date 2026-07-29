-- 1. Harden profile creation RPCs against spoofing another user's id
CREATE OR REPLACE FUNCTION public.assert_can_write_profile_for(_user_id uuid)
RETURNS void
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'A user id is required';
  END IF;

  -- When a session exists it must match the target user
  IF auth.uid() IS NOT NULL AND auth.uid() <> _user_id THEN
    RAISE EXCEPTION 'Access denied: cannot write profile data for another user';
  END IF;

  -- The target must be a real, freshly created account
  IF NOT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = _user_id
      AND (auth.uid() IS NOT NULL OR u.created_at > now() - interval '15 minutes')
  ) THEN
    RAISE EXCEPTION 'Access denied: unknown or stale account';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.assert_can_write_profile_for(uuid) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.create_user_profile(_user_id uuid, _first_name text, _last_name text, _username text, _state text, _country text, _registration_type text, _institution text DEFAULT NULL::text, _registration_status text DEFAULT NULL::text, _hear_about text DEFAULT NULL::text, _aspiration text DEFAULT NULL::text, _relationship text DEFAULT NULL::text, _current_programs text DEFAULT NULL::text, _tech_goals text DEFAULT NULL::text, _qualifications text DEFAULT NULL::text, _experience text DEFAULT NULL::text, _tech_skills text DEFAULT NULL::text, _programming_languages text DEFAULT NULL::text, _teaching_philosophy text DEFAULT NULL::text, _available_hours text DEFAULT NULL::text, _salary text DEFAULT NULL::text, _start_date text DEFAULT NULL::text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.assert_can_write_profile_for(_user_id);

  IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = _user_id) THEN
    RETURN; -- profile already exists; never overwrite
  END IF;

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

CREATE OR REPLACE FUNCTION public.create_user_sensitive_data(_user_id uuid, _phone text DEFAULT NULL::text, _number_of_kids text DEFAULT NULL::text, _learner_first_name text DEFAULT NULL::text, _learner_last_name text DEFAULT NULL::text, _learner_gender text DEFAULT NULL::text, _ecd_phone text DEFAULT NULL::text, _ecd_email text DEFAULT NULL::text, _facility_name text DEFAULT NULL::text, _facility_type text DEFAULT NULL::text, _number_of_learners text DEFAULT NULL::text, _age_groups text DEFAULT NULL::text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.assert_can_write_profile_for(_user_id);

  IF EXISTS (SELECT 1 FROM public.profile_sensitive_data d WHERE d.user_id = _user_id) THEN
    RETURN;
  END IF;

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

-- 2. Trigger functions must not be directly callable from the API
REVOKE ALL ON FUNCTION public.add_community_creator_as_member() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.check_progress_report_length() FROM PUBLIC, anon, authenticated;

-- 3. Signed-in-only helpers: remove anonymous execute
REVOKE EXECUTE ON FUNCTION public.admin_get_sensitive_profile_data(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_sensitive_profile_data(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_sensitive_profile_data() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_sensitive_profile_data() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_community_member(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_community_member(uuid, uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.redeem_promo_code(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.redeem_promo_code(text) TO authenticated;