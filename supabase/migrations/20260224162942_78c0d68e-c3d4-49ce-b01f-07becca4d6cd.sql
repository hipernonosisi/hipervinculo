
CREATE TABLE public.incomplete_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE,
  current_step integer NOT NULL DEFAULT 0,
  website_url text,
  contact_name text,
  phone text,
  email text,
  monthly_budget text,
  language text DEFAULT 'en',
  completed boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.incomplete_leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert/update (the form saves partial data)
CREATE POLICY "Anyone can insert incomplete leads"
  ON public.incomplete_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update incomplete leads"
  ON public.incomplete_leads FOR UPDATE
  USING (true);

-- Only admins can read
CREATE POLICY "Only admins can read incomplete leads"
  ON public.incomplete_leads FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Only admins can delete incomplete leads"
  ON public.incomplete_leads FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));
