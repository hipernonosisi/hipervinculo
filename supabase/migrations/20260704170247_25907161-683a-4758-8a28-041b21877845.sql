ALTER TABLE public.ebook_leads ADD COLUMN IF NOT EXISTS product_key TEXT NOT NULL DEFAULT 'amazon-fba';
ALTER TABLE public.ebook_purchases ADD COLUMN IF NOT EXISTS product_key TEXT NOT NULL DEFAULT 'amazon-fba';
ALTER TABLE public.ebook_download_logs ADD COLUMN IF NOT EXISTS product_key TEXT NOT NULL DEFAULT 'amazon-fba';