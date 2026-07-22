
-- 1) Track tagged users on a community post
ALTER TABLE public.user_feedback
  ADD COLUMN IF NOT EXISTS tagged_user_ids uuid[] NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_user_feedback_tagged_user_ids
  ON public.user_feedback USING GIN (tagged_user_ids);

-- 2) Reactions (likes + emojis) on community posts
CREATE TABLE IF NOT EXISTS public.feedback_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id uuid NOT NULL REFERENCES public.user_feedback(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  emoji text NOT NULL DEFAULT '👍',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (feedback_id, user_id, emoji)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.feedback_reactions TO authenticated;
GRANT ALL ON public.feedback_reactions TO service_role;

ALTER TABLE public.feedback_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view reactions"
  ON public.feedback_reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add their own reactions"
  ON public.feedback_reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own reactions"
  ON public.feedback_reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 3) Comments on community posts
CREATE TABLE IF NOT EXISTS public.feedback_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id uuid NOT NULL REFERENCES public.user_feedback(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  username text NOT NULL,
  comment_text text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.feedback_comments TO authenticated;
GRANT ALL ON public.feedback_comments TO service_role;

ALTER TABLE public.feedback_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view comments"
  ON public.feedback_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add their own comments"
  ON public.feedback_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.feedback_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.feedback_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_feedback_comments_updated_at
  BEFORE UPDATE ON public.feedback_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4) Enable realtime on new tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback_comments;
