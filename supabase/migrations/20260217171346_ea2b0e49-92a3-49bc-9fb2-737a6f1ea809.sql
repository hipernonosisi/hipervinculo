
CREATE TABLE public.website_audit_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_url TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  employee_count TEXT,
  current_advertising TEXT,
  desired_customers TEXT,
  email TEXT NOT NULL,
  overall_score INTEGER,
  performance_score INTEGER,
  seo_score INTEGER,
  accessibility_score INTEGER,
  best_practices_score INTEGER,
  page_speed_data JSONB,
  estimated_leads_lost INTEGER,
  estimated_revenue_lost DECIMAL(12,2),
  contact_name TEXT,
  phone TEXT,
  monthly_budget TEXT,
  timeline TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  converted_to_mvp BOOLEAN DEFAULT false
);

ALTER TABLE public.website_audit_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit website audit"
  ON public.website_audit_leads
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update website audit leads"
  ON public.website_audit_leads
  FOR UPDATE
  USING (true);

CREATE POLICY "Only admins can read website audit leads"
  ON public.website_audit_leads
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
