DROP POLICY IF EXISTS "Anyone can read their phone trial by phone number" ON public.phone_trials;
DROP POLICY IF EXISTS "Anyone can update phone trial for verification" ON public.phone_trials;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'phone_trials'
      AND policyname = 'Anyone can create phone trial entry'
  ) THEN
    CREATE POLICY "Anyone can create phone trial entry"
    ON public.phone_trials
    FOR INSERT
    TO anon
    WITH CHECK (true);
  END IF;
END
$$;