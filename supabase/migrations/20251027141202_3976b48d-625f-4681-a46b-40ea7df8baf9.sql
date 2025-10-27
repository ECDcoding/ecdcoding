-- Remove public access to promo codes table
-- Users can still redeem codes via the redeem_promo_code() RPC function
-- but cannot browse or view all available codes
DROP POLICY IF EXISTS "Anyone can view active promo codes" ON promo_codes;