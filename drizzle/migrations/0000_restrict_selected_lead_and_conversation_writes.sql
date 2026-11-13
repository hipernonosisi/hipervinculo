-- Remove unrestricted client writes from only the two selected tables.
-- Chat writes already use the service-role client in the chat edge function.
-- Incomplete leads currently have no browser-side writer; preserve admin reads/deletes.
DROP POLICY IF EXISTS "Anyone can insert incomplete leads" ON public.incomplete_leads;
DROP POLICY IF EXISTS "Anyone can update incomplete leads" ON public.incomplete_leads;
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can update conversations" ON public.chat_conversations;

REVOKE INSERT, UPDATE ON public.incomplete_leads FROM PUBLIC, anon, authenticated;
REVOKE INSERT, UPDATE ON public.chat_conversations FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.incomplete_leads TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_conversations TO service_role;

ALTER TABLE public.incomplete_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
