CREATE POLICY "Only admins can delete audit requests"
ON public.audit_requests FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));