CREATE TABLE public.ebook_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  variant TEXT DEFAULT 'default',
  marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
  checkout_status TEXT NOT NULL DEFAULT 'pending',
  checkout_error TEXT,
  stripe_session_id TEXT,
  client_ip TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  fbp TEXT,
  fbc TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ebook_leads_email ON public.ebook_leads(email);
CREATE INDEX idx_ebook_leads_created ON public.ebook_leads(created_at DESC);
CREATE INDEX idx_ebook_leads_status ON public.ebook_leads(checkout_status);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ebook_leads TO authenticated;
GRANT ALL ON public.ebook_leads TO service_role;

ALTER TABLE public.ebook_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view ebook leads"
  ON public.ebook_leads FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role manages ebook leads"
  ON public.ebook_leads FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE TRIGGER update_ebook_leads_updated_at
  BEFORE UPDATE ON public.ebook_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();