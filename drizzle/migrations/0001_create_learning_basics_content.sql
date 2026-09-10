CREATE TABLE public.learning_basics_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN (
    'Lesson of the Day','Numeracy','Literacy','Road Safety','Life Skills',
    'Tech Skills','All Modes of Transport','Note of the Week','Science and Discovery'
  )),
  age_group text NOT NULL CHECK (age_group IN ('04-07','08-12')),
  title text NOT NULL,
  subtitle text,
  description text,
  image_url text,
  video_url text,
  link_url text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  extras jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_basics_content TO authenticated;
GRANT ALL ON public.learning_basics_content TO service_role;

ALTER TABLE public.learning_basics_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read active content"
  ON public.learning_basics_content FOR SELECT
  TO authenticated
  USING (is_active OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert content"
  ON public.learning_basics_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update content"
  ON public.learning_basics_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete content"
  ON public.learning_basics_content FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER learning_basics_content_updated_at
  BEFORE UPDATE ON public.learning_basics_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX learning_basics_content_lookup_idx
  ON public.learning_basics_content (category, age_group, display_order);