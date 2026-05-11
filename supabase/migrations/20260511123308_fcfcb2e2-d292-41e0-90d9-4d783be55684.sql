
CREATE TABLE public.lesson_baskets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  lessons text[] NOT NULL DEFAULT '{}',
  duration_days integer NOT NULL DEFAULT 30,
  starts_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lesson_baskets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own basket" ON public.lesson_baskets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own basket" ON public.lesson_baskets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own basket" ON public.lesson_baskets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own basket" ON public.lesson_baskets FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins view all baskets" ON public.lesson_baskets FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER lesson_baskets_updated_at
  BEFORE UPDATE ON public.lesson_baskets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
