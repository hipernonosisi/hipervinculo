DROP POLICY IF EXISTS "Anyone can insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Allow public inserts" ON public.preview_leads;
GRANT ALL ON public.chat_messages TO service_role;
GRANT ALL ON public.preview_leads TO service_role;

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit a valid contact form" ON public.contact_submissions
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
  AND (company_name IS NULL OR char_length(company_name) <= 200)
  AND (inquiry_type IS NULL OR char_length(inquiry_type) <= 100)
  AND (phone IS NULL OR char_length(phone) <= 40)
);

DROP POLICY IF EXISTS "Anyone can submit audit request" ON public.audit_requests;
CREATE POLICY "Anyone can submit a valid audit request" ON public.audit_requests
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(company_name)) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (website_url IS NULL OR char_length(website_url) <= 500)
  AND (business_type IS NULL OR char_length(business_type) <= 200)
  AND (monthly_revenue IS NULL OR char_length(monthly_revenue) <= 100)
  AND (monthly_ad_spend IS NULL OR char_length(monthly_ad_spend) <= 100)
  AND (growth_goals IS NULL OR char_length(growth_goals) <= 5000)
);