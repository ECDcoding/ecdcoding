DROP POLICY IF EXISTS "Anyone can create access requests" ON public.expo_access_requests;
CREATE POLICY "Anyone can create pending access requests" ON public.expo_access_requests FOR INSERT
WITH CHECK (status = 'pending' AND reviewed_by IS NULL AND reviewed_at IS NULL AND notes IS NULL
  AND length(email) BETWEEN 3 AND 255 AND length(company_name) BETWEEN 1 AND 200);

DROP POLICY IF EXISTS "Anyone can create phone trial entry" ON public.phone_trials;

DROP POLICY IF EXISTS "System can log sensitive data access" ON public.sensitive_data_access_log;
CREATE POLICY "Users can log their own access" ON public.sensitive_data_access_log FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Authenticated users can view research videos" ON public.research_videos;
CREATE POLICY "Signed-in users can view research videos" ON public.research_videos FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can view all comments" ON public.course_comments;
CREATE POLICY "Signed-in users can view comments" ON public.course_comments FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can view all likes" ON public.course_likes;
CREATE POLICY "Signed-in users can view likes" ON public.course_likes FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone authenticated can view comments" ON public.feedback_comments;
CREATE POLICY "Signed-in users can view feedback comments" ON public.feedback_comments FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone authenticated can view reactions" ON public.feedback_reactions;
CREATE POLICY "Signed-in users can view reactions" ON public.feedback_reactions FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated can view community feedback" ON public.user_feedback;
CREATE POLICY "Signed-in users can view community feedback" ON public.user_feedback FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
CREATE POLICY "Users can list their own profile pictures" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'profile-pictures' AND (auth.uid())::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Authenticated can read research video files" ON storage.objects;
CREATE POLICY "Signed-in users can read research video files" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'research-videos' AND auth.uid() IS NOT NULL);