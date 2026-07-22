DROP POLICY IF EXISTS "ECD managers can create communities" ON public.institution_communities;
CREATE POLICY "Parents and ECD managers can create communities"
ON public.institution_communities
FOR INSERT
TO authenticated
WITH CHECK (
  created_by = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
      AND profiles.registration_type IN ('parent','ecd-manager')
  )
);