
-- Drop the restrictive INSERT policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can insert incomplete leads" ON public.incomplete_leads;
CREATE POLICY "Anyone can insert incomplete leads"
  ON public.incomplete_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Also fix the UPDATE policy (needed for upserts)
DROP POLICY IF EXISTS "Anyone can update incomplete leads" ON public.incomplete_leads;
CREATE POLICY "Anyone can update incomplete leads"
  ON public.incomplete_leads FOR UPDATE
  TO anon, authenticated
  USING (true);
