CREATE OR REPLACE FUNCTION public.search_app_users(search_text text DEFAULT '', limit_count int DEFAULT 50)
RETURNS TABLE(user_id uuid, display_name text, username text, registration_type text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.user_id,
    COALESCE(NULLIF(TRIM(CONCAT(p.first_name, ' ', p.last_name)), ''), p.username, 'Member') AS display_name,
    p.username,
    p.registration_type
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND p.user_id <> auth.uid()
    AND (
      COALESCE(search_text, '') = ''
      OR p.first_name ILIKE '%' || search_text || '%'
      OR p.last_name  ILIKE '%' || search_text || '%'
      OR p.username   ILIKE '%' || search_text || '%'
    )
  ORDER BY display_name
  LIMIT GREATEST(1, LEAST(limit_count, 100));
$$;

REVOKE ALL ON FUNCTION public.search_app_users(text, int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.search_app_users(text, int) TO authenticated;