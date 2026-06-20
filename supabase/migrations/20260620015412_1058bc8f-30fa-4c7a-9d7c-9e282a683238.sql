CREATE TABLE public.session_replay_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  chunk_index int NOT NULL,
  events jsonb NOT NULL,
  page_url text,
  user_agent text,
  geo jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_srch_session_id ON public.session_replay_chunks (session_id, chunk_index);
CREATE INDEX idx_srch_created_at ON public.session_replay_chunks (created_at DESC);

GRANT SELECT ON public.session_replay_chunks TO authenticated;
GRANT ALL ON public.session_replay_chunks TO service_role;

ALTER TABLE public.session_replay_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read session replays"
ON public.session_replay_chunks
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trim trigger: keep only last 500 distinct sessions
CREATE OR REPLACE FUNCTION public.trim_session_replays()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.session_replay_chunks
  WHERE session_id NOT IN (
    SELECT session_id FROM (
      SELECT session_id, MAX(created_at) AS last_at
      FROM public.session_replay_chunks
      GROUP BY session_id
      ORDER BY last_at DESC
      LIMIT 500
    ) keep
  );
  RETURN NULL;
END;
$$;

CREATE TRIGGER trim_session_replays_trg
AFTER INSERT ON public.session_replay_chunks
FOR EACH STATEMENT
EXECUTE FUNCTION public.trim_session_replays();