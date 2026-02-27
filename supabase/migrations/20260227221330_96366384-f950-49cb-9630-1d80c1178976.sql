
-- Table to store page events from /preview landing page
CREATE TABLE public.page_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- page_view, click, scroll_25, scroll_50, scroll_75, scroll_100, time_on_page, cta_click, calendar_click, video_play, video_unmute
  event_data JSONB DEFAULT '{}'::jsonb, -- element label, section, url, duration, etc.
  page_url TEXT NOT NULL DEFAULT '/preview',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast querying by date and event type
CREATE INDEX idx_page_events_created_at ON public.page_events (created_at DESC);
CREATE INDEX idx_page_events_event_type ON public.page_events (event_type);
CREATE INDEX idx_page_events_session_id ON public.page_events (session_id);

-- RLS: anyone can insert (anonymous visitors), only admins can read
ALTER TABLE public.page_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page events"
  ON public.page_events
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can read page events"
  ON public.page_events
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete page events"
  ON public.page_events
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));
