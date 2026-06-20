CREATE TABLE public.ebook_daily_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_date date NOT NULL UNIQUE,
  generated_at timestamptz NOT NULL DEFAULT now(),
  sessions_analyzed int NOT NULL DEFAULT 0,
  findings jsonb NOT NULL,
  summary_md text NOT NULL
);

CREATE INDEX idx_ebook_reports_date ON public.ebook_daily_reports (report_date DESC);

GRANT SELECT ON public.ebook_daily_reports TO authenticated;
GRANT ALL ON public.ebook_daily_reports TO service_role;

ALTER TABLE public.ebook_daily_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read ebook daily reports"
ON public.ebook_daily_reports
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));