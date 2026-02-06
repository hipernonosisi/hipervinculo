-- Drop the public SELECT policies
DROP POLICY IF EXISTS "Allow reading audit requests" ON public.audit_requests;
DROP POLICY IF EXISTS "Allow reading contact submissions" ON public.contact_submissions;

-- Create new policies that only allow authenticated users to read
CREATE POLICY "Authenticated users can read audit requests"
ON public.audit_requests
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (true);