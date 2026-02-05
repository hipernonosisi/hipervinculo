-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  inquiry_type TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public form, no auth required)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create audit_requests table
CREATE TABLE public.audit_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  website_url TEXT,
  business_type TEXT,
  monthly_revenue TEXT,
  monthly_ad_spend TEXT,
  growth_goals TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public form, no auth required)
ALTER TABLE public.audit_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public audit form)
CREATE POLICY "Anyone can submit audit request"
  ON public.audit_requests
  FOR INSERT
  WITH CHECK (true);