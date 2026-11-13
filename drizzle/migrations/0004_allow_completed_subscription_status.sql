ALTER TABLE public.subscription_payments DROP CONSTRAINT IF EXISTS subscription_payments_payment_status_check;
ALTER TABLE public.subscription_payments ADD CONSTRAINT subscription_payments_payment_status_check
  CHECK (payment_status = ANY (ARRAY['active'::text, 'pending'::text, 'overdue'::text, 'cancelled'::text, 'completed'::text]));