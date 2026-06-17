import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const HEARTBEAT_INTERVAL_MS = 15_000;       // emit heartbeat every 15s of ACTIVE time
const IDLE_THRESHOLD_MS = 30_000;           // no input for 30s = idle (don't count)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string;

function getSessionId(): string {
  let sid = sessionStorage.getItem('hv_session_id');
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('hv_session_id', sid);
  }
  return sid;
}

// === Safe-close instrumentation ===
// Per-tab counters exposed on window.__hvTracking. Inspect from devtools:
//   > __hvTracking
type TrackingStats = {
  beaconAttempts: number;
  beaconOk: number;
  beaconFail: number;
  fetchKeepaliveOk: number;
  fetchKeepaliveFail: number;
  fallbackUsed: number;
  finalFlushes: number;
  lastFailReason?: string;
};
const stats: TrackingStats = {
  beaconAttempts: 0, beaconOk: 0, beaconFail: 0,
  fetchKeepaliveOk: 0, fetchKeepaliveFail: 0,
  fallbackUsed: 0, finalFlushes: 0,
};
if (typeof window !== 'undefined') {
  (window as any).__hvTracking = stats;
}

function logSafeClose(reason: string) {
  const sent = stats.beaconOk + stats.fetchKeepaliveOk;
  const fails = stats.beaconFail + stats.fetchKeepaliveFail;
  // eslint-disable-next-line no-console
  console[fails > 0 ? 'warn' : 'log'](
    `[Tracking][safe-close:${reason}] sent=${sent} ` +
    `beaconOK=${stats.beaconOk}/${stats.beaconAttempts} ` +
    `fetchOK=${stats.fetchKeepaliveOk} fails=${fails} flushes=${stats.finalFlushes}` +
    (stats.lastFailReason ? ` lastFail="${stats.lastFailReason}"` : ''),
  );
}

export function trackEvent(eventType: string, eventData: Record<string, any> = {}, pageUrl = '/preview') {
  const sessionId = getSessionId();
  supabase
    .from('page_events')
    .insert({ session_id: sessionId, event_type: eventType, event_data: eventData, page_url: pageUrl })
    .then(({ error }) => {
      if (error) console.error('[Tracking]', error.message);
    });
}

/**
 * Best-effort insert that survives page exits / in-app browsers.
 * Order: sendBeacon → fetch(keepalive) → supabase client fallback.
 * Tracks per-channel success/failure so you can debug from the console.
 */
function beaconEvent(eventType: string, eventData: Record<string, any>, pageUrl: string) {
  const payload = JSON.stringify({
    session_id: getSessionId(),
    event_type: eventType,
    event_data: eventData,
    page_url: pageUrl,
  });

  if (SUPABASE_URL && SUPABASE_KEY) {
    const url = `${SUPABASE_URL}/rest/v1/page_events?apikey=${encodeURIComponent(SUPABASE_KEY)}`;
    const blob = new Blob([payload], { type: 'application/json' });

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      stats.beaconAttempts += 1;
      try {
        if (navigator.sendBeacon(url, blob)) {
          stats.beaconOk += 1;
          return;
        }
        stats.beaconFail += 1;
        stats.lastFailReason = 'sendBeacon returned false (queue full or payload too big)';
        console.warn('[Tracking] sendBeacon rejected payload — falling back');
      } catch (e) {
        stats.beaconFail += 1;
        stats.lastFailReason = `sendBeacon threw: ${(e as Error).message}`;
        console.warn('[Tracking] sendBeacon threw — falling back', e);
      }
    }

    // fetch keepalive fallback — survives unload in most modern browsers
    try {
      fetch(url, {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        body: payload,
      })
        .then((res) => {
          if (res.ok) {
            stats.fetchKeepaliveOk += 1;
          } else {
            stats.fetchKeepaliveFail += 1;
            stats.lastFailReason = `fetch keepalive HTTP ${res.status}`;
            console.warn(`[Tracking] fetch keepalive failed: HTTP ${res.status}`);
          }
        })
        .catch((e) => {
          stats.fetchKeepaliveFail += 1;
          stats.lastFailReason = `fetch keepalive: ${e.message}`;
          console.warn('[Tracking] fetch keepalive rejected', e);
        });
      return;
    } catch (e) {
      stats.fetchKeepaliveFail += 1;
      stats.lastFailReason = `fetch threw: ${(e as Error).message}`;
      console.warn('[Tracking] fetch threw — using supabase client fallback', e);
    }
  }

  // Last resort — may not flush on unload
  stats.fallbackUsed += 1;
  trackEvent(eventType, eventData, pageUrl);
}

async function fetchGeoData(): Promise<Record<string, string>> {
  try {
    const res = await supabase.functions.invoke('geolocate');
    if (res.error) throw res.error;
    return res.data as Record<string, string>;
  } catch (e) {
    console.warn('[Geo] Could not fetch location', e);
    return {};
  }
}

export function usePageTracking(pageUrl = '/preview') {
  const scrollMilestones = useRef(new Set<number>());
  const tracked = useRef(false);

  // Accumulated ACTIVE time tracking (resilient to in-app browsers)
  const activeMs = useRef(0);
  const lastTick = useRef(Date.now());
  const lastActivity = useRef(Date.now());
  const isVisible = useRef(typeof document !== 'undefined' ? document.visibilityState === 'visible' : true);
  const heartbeatsSent = useRef(0);
  const lastReportedSeconds = useRef(0);
  const finalSent = useRef(false);

  // Track page view once with geo data
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    fetchGeoData().then((geo) => {
      trackEvent('page_view', { referrer: document.referrer, userAgent: navigator.userAgent, ...geo }, pageUrl);
    });
  }, [pageUrl]);

  // Track scroll depth milestones + count scroll as activity
  useEffect(() => {
    const handler = () => {
      lastActivity.current = Date.now();
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach((milestone) => {
        if (pct >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackEvent(`scroll_${milestone}`, { scroll_percent: milestone }, pageUrl);
        }
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [pageUrl]);

  // Activity listeners — feed the active-time accumulator
  useEffect(() => {
    const bump = () => { lastActivity.current = Date.now(); };
    const events = ['pointerdown', 'keydown', 'touchstart', 'mousemove'] as const;
    events.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, bump));
  }, []);

  // Accumulate active time + send heartbeats. Works even if unload never fires.
  useEffect(() => {
    const accumulate = () => {
      const now = Date.now();
      const delta = now - lastTick.current;
      lastTick.current = now;
      const idle = now - lastActivity.current > IDLE_THRESHOLD_MS;
      if (isVisible.current && !idle && delta < 60_000) {
        activeMs.current += delta;
      }
    };

    const tick = () => {
      accumulate();
      const seconds = Math.round(activeMs.current / 1000);
      // Heartbeat if we accumulated meaningful new time since last report
      if (seconds - lastReportedSeconds.current >= HEARTBEAT_INTERVAL_MS / 1000) {
        heartbeatsSent.current += 1;
        lastReportedSeconds.current = seconds;
        trackEvent(
          'heartbeat',
          { active_seconds: seconds, beat: heartbeatsSent.current },
          pageUrl,
        );
      }
    };

    const interval = window.setInterval(tick, 5000);

    const handleVisibility = () => {
      accumulate(); // close the current window
      const visible = document.visibilityState === 'visible';
      isVisible.current = visible;
      lastTick.current = Date.now();
      lastActivity.current = Date.now();
      if (!visible) {
        flushFinal('visibility_hidden');
      }
    };

    let lastFlushAt = 0;
    const flushFinal = (reason: string) => {
      const now = Date.now();
      // Debounce: avoid duplicate flushes within 2s (e.g. visibilitychange + pagehide back to back)
      if (now - lastFlushAt < 2000) return;
      lastFlushAt = now;
      accumulate();
      const seconds = Math.round(activeMs.current / 1000);
      // Always emit final — even if 0 — so we know the session ended
      beaconEvent(
        'time_on_page',
        { active_seconds: seconds, total_seconds: seconds, reason, heartbeats: heartbeatsSent.current },
        pageUrl,
      );
      stats.finalFlushes += 1;
      finalSent.current = true;
      logSafeClose(reason);
    };

    const handlePageHide = () => flushFinal('pagehide');
    const handleBeforeUnload = () => flushFinal('beforeunload');

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageUrl]);

  // Return a function to track custom CTA clicks
  const trackClick = useCallback(
    (label: string, extra: Record<string, any> = {}) => {
      lastActivity.current = Date.now();
      trackEvent('cta_click', { label, ...extra }, pageUrl);
    },
    [pageUrl]
  );

  const trackCalendarClick = useCallback(() => {
    trackEvent('calendar_click', {}, pageUrl);
  }, [pageUrl]);

  const trackVideoPlay = useCallback(() => {
    trackEvent('video_play', {}, pageUrl);
  }, [pageUrl]);

  const trackVideoUnmute = useCallback(() => {
    trackEvent('video_unmute', {}, pageUrl);
  }, [pageUrl]);

  return { trackClick, trackCalendarClick, trackVideoPlay, trackVideoUnmute };
}
