-- Create subscription_payments table to track user payment status
CREATE TABLE public.subscription_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subscription_type TEXT NOT NULL CHECK (subscription_type IN ('monthly', 'annual', 'reload_credits')),
  amount NUMERIC NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('active', 'pending', 'overdue', 'cancelled')),
  last_payment_date TIMESTAMP WITH TIME ZONE,
  next_payment_due TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_method TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscription_payments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own payment records
CREATE POLICY "Users can view their own payments"
ON public.subscription_payments
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own payment records (for registration)
CREATE POLICY "Users can create their own payment records"
ON public.subscription_payments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_subscription_payments_updated_at
BEFORE UPDATE ON public.subscription_payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_subscription_payments_user_id ON public.subscription_payments(user_id);
CREATE INDEX idx_subscription_payments_status ON public.subscription_payments(payment_status);
CREATE INDEX idx_subscription_payments_next_due ON public.subscription_payments(next_payment_due);