
-- Add share_token column for unique shareable links
ALTER TABLE public.website_audit_leads 
ADD COLUMN IF NOT EXISTS share_token TEXT UNIQUE;

-- Create index for fast lookup
CREATE INDEX IF NOT EXISTS idx_website_audit_leads_share_token ON public.website_audit_leads(share_token);

-- Create RLS policy to allow public read access via share_token
CREATE POLICY "Anyone can read results with share_token" 
ON public.website_audit_leads 
FOR SELECT 
USING (share_token IS NOT NULL);
