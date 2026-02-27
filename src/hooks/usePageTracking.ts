import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

function getSessionId(): string {
  let sid = sessionStorage.getItem('hv_session_id');
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('hv_session_id', sid);
  }
  return sid;
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

export function usePageTracking(pageUrl = '/preview') {
  const startTime = useRef(Date.now());
  const scrollMilestones = useRef(new Set<number>());
  const tracked = useRef(false);

  // Track page view once
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent('page_view', { referrer: document.referrer, userAgent: navigator.userAgent }, pageUrl);
  }, [pageUrl]);

  // Track scroll depth milestones
  useEffect(() => {
    const handler = () => {
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

  // Track time on page when leaving
  useEffect(() => {
    const handleUnload = () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      // Use sendBeacon for reliability on page exit
      const payload = JSON.stringify({
        session_id: getSessionId(),
        event_type: 'time_on_page',
        event_data: { duration_seconds: duration },
        page_url: pageUrl,
      });
      
      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/page_events`;
      navigator.sendBeacon?.(
        url,
        new Blob([payload], { type: 'application/json' })
      ) || trackEvent('time_on_page', { duration_seconds: duration }, pageUrl);
    };

    // Also track on visibility change (mobile tab switch)
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        handleUnload();
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [pageUrl]);

  // Return a function to track custom CTA clicks
  const trackClick = useCallback(
    (label: string, extra: Record<string, any> = {}) => {
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
