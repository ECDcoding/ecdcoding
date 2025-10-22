-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Users can view all comments" ON public.course_comments;

-- Create a new policy that only allows users to view their own comments
CREATE POLICY "Users can view their own comments"
ON public.course_comments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);