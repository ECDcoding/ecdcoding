
-- Allow members of a community to see other members
CREATE OR REPLACE FUNCTION public.is_community_member(_community_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.community_members
    WHERE community_id = _community_id AND user_id = _user_id
  )
$$;

DROP POLICY IF EXISTS "Members can view co-members" ON public.community_members;
CREATE POLICY "Members can view co-members"
ON public.community_members FOR SELECT
TO authenticated
USING (public.is_community_member(community_id, auth.uid()));
