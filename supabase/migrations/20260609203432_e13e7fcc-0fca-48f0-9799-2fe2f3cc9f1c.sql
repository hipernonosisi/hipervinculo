
ALTER TABLE public.ebook_purchases
  ADD COLUMN IF NOT EXISTS client_ip TEXT,
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS region TEXT,
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS fbp TEXT,
  ADD COLUMN IF NOT EXISTS fbc TEXT,
  ADD COLUMN IF NOT EXISTS first_downloaded_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_downloaded_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.ebook_download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID NOT NULL REFERENCES public.ebook_purchases(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  client_ip TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  region TEXT
);

CREATE INDEX IF NOT EXISTS idx_ebook_download_logs_purchase ON public.ebook_download_logs(purchase_id);
CREATE INDEX IF NOT EXISTS idx_ebook_download_logs_date ON public.ebook_download_logs(downloaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_ebook_purchases_paid_at ON public.ebook_purchases(paid_at DESC);

GRANT ALL ON public.ebook_download_logs TO service_role;
GRANT SELECT ON public.ebook_download_logs TO authenticated;

ALTER TABLE public.ebook_download_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all download logs"
  ON public.ebook_download_logs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Ensure ebook_purchases is readable by admins (it currently has only 1 policy; add admin SELECT if missing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='ebook_purchases' AND policyname='Admins can view all ebook purchases'
  ) THEN
    CREATE POLICY "Admins can view all ebook purchases"
      ON public.ebook_purchases FOR SELECT
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
