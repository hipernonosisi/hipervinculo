
-- Drop old table
DROP TABLE IF EXISTS public.website_audit_leads;

-- Create new table
CREATE TABLE public.preview_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_url TEXT,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  service_area TEXT,
  employee_count TEXT,
  current_advertising TEXT,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  monthly_budget TEXT,
  lead_score TEXT DEFAULT 'cold',
  preview_sent BOOLEAN DEFAULT false,
  converted_to_client BOOLEAN DEFAULT false,
  notes TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.preview_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.preview_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can read preview leads" ON public.preview_leads
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update preview leads" ON public.preview_leads
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete preview leads" ON public.preview_leads
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_preview_leads_updated_at
  BEFORE UPDATE ON public.preview_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
