ALTER TABLE public.lesson_baskets
  ADD COLUMN IF NOT EXISTS tried_lessons text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS ever_selected text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS last_shown_at timestamptz;