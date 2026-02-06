-- Allow reading audit_requests (for admin dashboard)
CREATE POLICY "Allow reading audit requests"
ON public.audit_requests
FOR SELECT
USING (true);

-- Allow reading contact_submissions (for admin dashboard)
CREATE POLICY "Allow reading contact submissions"
ON public.contact_submissions
FOR SELECT
USING (true);