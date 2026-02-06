-- Create rate limiting table for edge functions
CREATE TABLE public.rate_limits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text NOT NULL,
    count integer NOT NULL DEFAULT 1,
    window_start timestamp with time zone NOT NULL DEFAULT now(),
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create unique index on key for faster lookups
CREATE UNIQUE INDEX idx_rate_limits_key ON public.rate_limits(key);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- No SELECT policy needed - accessed only via service role key

-- Create function to check and update rate limit
CREATE OR REPLACE FUNCTION public.check_rate_limit(
    p_key text,
    p_max_requests integer DEFAULT 10,
    p_window_seconds integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_count integer;
    v_window_start timestamp with time zone;
BEGIN
    -- Try to get existing rate limit record
    SELECT count, window_start INTO v_count, v_window_start
    FROM rate_limits
    WHERE key = p_key;
    
    -- If no record exists, create one
    IF NOT FOUND THEN
        INSERT INTO rate_limits (key, count, window_start)
        VALUES (p_key, 1, now())
        ON CONFLICT (key) DO UPDATE SET count = rate_limits.count + 1;
        RETURN true;
    END IF;
    
    -- Check if window has expired
    IF v_window_start < now() - (p_window_seconds || ' seconds')::interval THEN
        -- Reset the window
        UPDATE rate_limits
        SET count = 1, window_start = now()
        WHERE key = p_key;
        RETURN true;
    END IF;
    
    -- Check if under limit
    IF v_count < p_max_requests THEN
        UPDATE rate_limits
        SET count = count + 1
        WHERE key = p_key;
        RETURN true;
    END IF;
    
    -- Rate limit exceeded
    RETURN false;
END;
$$;