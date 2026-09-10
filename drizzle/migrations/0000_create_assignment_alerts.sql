CREATE TABLE public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  delivery_method text NOT NULL,
  instructions text NOT NULL,
  age_group text NOT NULL CHECK (age_group IN ('04-07', '08-12')),
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assignments TO authenticated;
GRANT ALL ON public.assignments TO service_role;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read active assignments"
ON public.assignments FOR SELECT TO authenticated
USING (is_active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create assignments"
ON public.assignments FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());
CREATE POLICY "Admins update assignments"
ON public.assignments FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete assignments"
ON public.assignments FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER assignments_updated_at
BEFORE UPDATE ON public.assignments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.assignment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  status text NOT NULL DEFAULT 'acknowledged' CHECK (status IN ('acknowledged', 'completed')),
  responded_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (assignment_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assignment_responses TO authenticated;
GRANT ALL ON public.assignment_responses TO service_role;
ALTER TABLE public.assignment_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own assignment responses"
ON public.assignment_responses FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users create own assignment responses"
ON public.assignment_responses FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users update own assignment responses"
ON public.assignment_responses FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users delete own assignment responses"
ON public.assignment_responses FOR DELETE TO authenticated
USING (user_id = auth.uid());
CREATE TRIGGER assignment_responses_updated_at
BEFORE UPDATE ON public.assignment_responses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX assignments_active_age_group_idx ON public.assignments (age_group, is_active, created_at DESC);
CREATE INDEX assignment_responses_user_idx ON public.assignment_responses (user_id, assignment_id);