CREATE TABLE public.institution_communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  institution_name TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.institution_communities TO authenticated;
GRANT ALL ON public.institution_communities TO service_role;

ALTER TABLE public.institution_communities ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.institution_communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (community_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_members TO authenticated;
GRANT ALL ON public.community_members TO service_role;

ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.community_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.institution_communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_messages TO authenticated;
GRANT ALL ON public.community_messages TO service_role;

ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view communities they are members of"
ON public.institution_communities
FOR SELECT
TO authenticated
USING (
  created_by = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.community_members
    WHERE community_id = institution_communities.id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "ECD managers can create communities"
ON public.institution_communities
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid()
    AND registration_type = 'ecd-manager'
  )
);

CREATE POLICY "Community creators can update their communities"
ON public.institution_communities
FOR UPDATE
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Community creators can delete their communities"
ON public.institution_communities
FOR DELETE
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Users can view their own memberships"
ON public.community_members
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR EXISTS (
  SELECT 1 FROM public.institution_communities
  WHERE id = community_members.community_id AND created_by = auth.uid()
));

CREATE POLICY "Community creators can manage members"
ON public.community_members
FOR ALL
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.institution_communities
  WHERE id = community_members.community_id AND created_by = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.institution_communities
  WHERE id = community_members.community_id AND created_by = auth.uid()
));

CREATE POLICY "Community members can view messages"
ON public.community_messages
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.community_members
  WHERE community_id = community_messages.community_id AND user_id = auth.uid()
));

CREATE POLICY "Community members can post messages"
ON public.community_messages
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.community_members
    WHERE community_id = community_messages.community_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own messages"
ON public.community_messages
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own messages"
ON public.community_messages
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.add_community_creator_as_member()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.community_members (community_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'admin');
  RETURN NEW;
END;
$$;

CREATE TRIGGER add_community_creator_as_member
AFTER INSERT ON public.institution_communities
FOR EACH ROW
EXECUTE FUNCTION public.add_community_creator_as_member();