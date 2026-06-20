// Records DOM + interactions on the ebook funnel using rrweb and ships chunks
// to the store-session-replay edge function. Only the last 500 sessions are kept.
import { useEffect } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ENDPOINT = `${SUPABASE_URL}/functions/v1/store-session-replay`;
const FLUSH_INTERVAL_MS = 10_000;
const MAX_RECORDING_MS = 5 * 60 * 1000; // hard cap per session
const MAX_BUFFER_BYTES = 800_000;       // flush early when buffer gets big

function getSessionId(): string {
  let sid = sessionStorage.getItem("hv_session_id");
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("hv_session_id", sid);
  }
  return sid;
}

function readGeo() {
  try {
    const raw = sessionStorage.getItem("hv_geo");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Records the page using rrweb and flushes chunks to the backend.
 * Pass `enabled=false` to opt out (e.g. for admins / preview iframe).
 */
export function useSessionRecording(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (SUPABASE_URL == null) return;

    // Honor Do-Not-Track and prerender
    if (navigator.doNotTrack === "1") return;
    if ((document as any).prerendering) return;

    // Don't record the admin / lovable preview iframe
    if (window.location.pathname.startsWith("/admin")) return;

    let buffer: any[] = [];
    let chunkIndex = 0;
    let bufferBytes = 0;
    let stopFn: (() => void) | null = null;
    let flushTimer: number | null = null;
    let hardCapTimer: number | null = null;
    let cancelled = false;

    const sessionId = getSessionId();

    const flush = (final = false) => {
      if (buffer.length === 0) return;
      const events = buffer;
      const idx = chunkIndex++;
      buffer = [];
      bufferBytes = 0;

      const payload = JSON.stringify({
        session_id: sessionId,
        chunk_index: idx,
        events,
        page_url: window.location.pathname + window.location.search,
        user_agent: navigator.userAgent,
        geo: readGeo(),
      });

      try {
        // keepalive lets the request survive pagehide on most browsers
        fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: final || payload.length < 60_000,
        }).catch((err) => console.warn("[SessionReplay] flush failed", err));
      } catch (err) {
        console.warn("[SessionReplay] flush threw", err);
      }
    };

    // Lazy-load rrweb so it only loads where recording is active
    (async () => {
      try {
        const { record } = await import("rrweb");
        if (cancelled) return;

        stopFn = record({
          emit(event: any) {
            buffer.push(event);
            // rough byte estimate; avoid stringifying on every event
            bufferBytes += JSON.stringify(event).length;
            if (bufferBytes >= MAX_BUFFER_BYTES) flush(false);
          },
          // Mask sensitive inputs by default (emails/phones may be PII, but we
          // need to see *behavior*, not content — values are still masked safely)
          maskAllInputs: true,
          maskInputOptions: { password: true, email: true, tel: true },
          sampling: {
            mousemove: 100,    // throttle mousemove to every 100ms
            scroll: 150,
            input: "last",     // only the final input value of a sequence
          },
          slimDOMOptions: {
            script: true,
            comment: true,
            headFavicon: true,
            headWhitespace: true,
            headMetaDescKeywords: true,
            headMetaSocial: true,
            headMetaRobots: true,
            headMetaHttpEquiv: true,
            headMetaAuthorship: true,
            headMetaVerification: true,
          },
        });

        flushTimer = window.setInterval(() => flush(false), FLUSH_INTERVAL_MS);
        hardCapTimer = window.setTimeout(() => {
          flush(true);
          stopFn?.();
          stopFn = null;
        }, MAX_RECORDING_MS);
      } catch (err) {
        console.warn("[SessionReplay] failed to load rrweb", err);
      }
    })();

    const onHide = () => flush(true);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") onHide();
    });
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);

    return () => {
      cancelled = true;
      if (flushTimer) clearInterval(flushTimer);
      if (hardCapTimer) clearTimeout(hardCapTimer);
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
      flush(true);
      stopFn?.();
    };
  }, [enabled]);
}
