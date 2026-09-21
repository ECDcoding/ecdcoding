ALTER TABLE public.lesson_baskets
  ADD COLUMN IF NOT EXISTS age_band text NOT NULL DEFAULT '04-05';

ALTER TABLE public.lesson_baskets
  DROP CONSTRAINT IF EXISTS lesson_baskets_user_id_key;

DROP INDEX IF EXISTS lesson_baskets_user_id_key;

CREATE UNIQUE INDEX IF NOT EXISTS lesson_baskets_user_id_age_band_key
  ON public.lesson_baskets (user_id, age_band);