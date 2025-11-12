-- Add UPDATE policy for subscription_payments
CREATE POLICY "Users can update their own payment records"
ON public.subscription_payments
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add DELETE policy for subscription_payments  
CREATE POLICY "Users can delete their own payment records"
ON public.subscription_payments
FOR DELETE
USING (auth.uid() = user_id);