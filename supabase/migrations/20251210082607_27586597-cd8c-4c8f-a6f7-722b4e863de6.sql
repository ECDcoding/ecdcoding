-- Add SELECT policy for admins only to view audit logs
CREATE POLICY "Admins can view audit logs" 
ON public.sensitive_data_access_log 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Add explicit DENY policies for UPDATE and DELETE to document intent
-- Note: With RLS enabled, absence of UPDATE/DELETE policies already denies these operations
-- But we add comments for clarity about the security intent

COMMENT ON TABLE public.sensitive_data_access_log IS 'Audit log for sensitive data access. UPDATE and DELETE are intentionally not permitted for any user (including admins) to maintain audit trail integrity.';