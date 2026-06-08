
CREATE TABLE public.ebook_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  price_variant TEXT DEFAULT 'default',
  download_token TEXT UNIQUE NOT NULL,
  download_count INTEGER NOT NULL DEFAULT 0,
  max_downloads INTEGER NOT NULL DEFAULT 5,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  paid_at TIMESTAMPTZ,
  email_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ebook_purchases_token ON public.ebook_purchases(download_token);
CREATE INDEX idx_ebook_purchases_session ON public.ebook_purchases(stripe_session_id);
CREATE INDEX idx_ebook_purchases_email ON public.ebook_purchases(email);

GRANT ALL ON public.ebook_purchases TO service_role;

ALTER TABLE public.ebook_purchases ENABLE ROW LEVEL SECURITY;

-- No public/authenticated access; all access via edge functions with service role
CREATE POLICY "Service role only" ON public.ebook_purchases FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER update_ebook_purchases_updated_at BEFORE UPDATE ON public.ebook_purchases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
