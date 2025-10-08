-- Create a table for course likes
CREATE TABLE public.course_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS on course_likes
ALTER TABLE public.course_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for course_likes
CREATE POLICY "Users can view all likes"
  ON public.course_likes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own likes"
  ON public.course_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
  ON public.course_likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create a table for course comments
CREATE TABLE public.course_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  comment_text text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on course_comments
ALTER TABLE public.course_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for course_comments
CREATE POLICY "Users can view all comments"
  ON public.course_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own comments"
  ON public.course_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.course_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.course_comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger for updated_at on course_comments
CREATE TRIGGER update_course_comments_updated_at
  BEFORE UPDATE ON public.course_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();