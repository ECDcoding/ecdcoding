-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view all feedback" ON public.user_feedback;

-- Create policy for users to view only their own feedback
CREATE POLICY "Users can view their own feedback" 
ON public.user_feedback 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for admins to view all feedback
CREATE POLICY "Admins can view all feedback" 
ON public.user_feedback 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));