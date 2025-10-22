-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can view their own comments" ON public.course_comments;

-- Create a new policy that allows all authenticated users to view all comments
CREATE POLICY "Authenticated users can view all comments"
ON public.course_comments
FOR SELECT
TO authenticated
USING (true);