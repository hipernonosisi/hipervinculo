import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, FastForward, Maximize, RotateCcw, RotateCw, ArrowRight,
} from 'lucide-react';
import { trackEvent } from '@/hooks/usePageTracking';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface VSLPlayerProps {
  videoUrls: string[];
  poster?: string;
  ctaUrl: string;
  ctaLabel: string;
  ctaTarget?: '_self' | '_blank';
  tapToWatchLabel: string;
  durationLabel?: string;
  pageUrl?: string;
  className?: string;
}

/**
 * Vertical VSL player — same player & UX used on /preview.
 * Autoplays muted in preview state, user taps to unmute & start tracking.
 */
export function VSLPlayer({
  videoUrls,
  poster,
  ctaUrl,
  ctaLabel,
  ctaTarget = '_self',
  tapToWatchLabel,
  durationLabel,
  pageUrl,
  className = '',
}: VSLPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'preview' | 'playing'>('preview');
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1.25);
  const [showControls, setShowControls] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const [videoSrcIndex, setVideoSrcIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const isInView = useInView(containerRef, { once: true });
  const videoPlayTracked = useRef(false);
  const videoUnmuteTracked = useRef(false);
  const maxWatchedSeconds = useRef(0);

  useEffect(() => {
    if (!isInView || !videoRef.current) return;
    const v = videoRef.current;
    v.muted = true;
    v.playbackRate = 1.25;
    v.play().catch(() => {});
  }, [isInView, videoSrcIndex]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration) {
        setProgress((v.currentTime / v.duration) * 100);
        setCurrentTime(v.currentTime);
        setDuration(v.duration);
        if (state === 'playing') {
          maxWatchedSeconds.current = Math.max(maxWatchedSeconds.current, Math.floor(v.currentTime));
        }
      }
    };
    const onLoaded = () => { if (v.duration) setDuration(v.duration); };
    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, [state]);

  useEffect(() => {
    const sendWatchDuration = () => {
      if (maxWatchedSeconds.current > 0) {
        const v = videoRef.current;
        const totalDuration = v?.duration ? Math.floor(v.duration) : 0;
        const pctWatched = totalDuration > 0 ? Math.round((maxWatchedSeconds.current / totalDuration) * 100) : 0;
        trackEvent('video_watch_duration', {
          seconds_watched: maxWatchedSeconds.current,
          total_duration: totalDuration,
          percent_watched: pctWatched,
        }, pageUrl);
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') sendWatchDuration();
    };
    window.addEventListener('beforeunload', sendWatchDuration);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('beforeunload', sendWatchDuration);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [pageUrl]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (state !== 'playing') return;
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        const v = videoRef.current;
        if (v) { v.paused ? v.play().catch(() => {}) : v.pause(); }
        setShowControls(true);
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => { setShowControls(false); setShowSpeedMenu(false); }, 4000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (state === 'preview') {
      v.muted = false;
      v.playbackRate = 1.25;
      v.currentTime = 0;
      v.play().catch(() => {});
      setMuted(false);
      setSpeed(1.25);
      setState('playing');
      if (!videoPlayTracked.current) {
        videoPlayTracked.current = true;
        trackEvent('video_play', {}, pageUrl);
      }
    }
  }, [state, pageUrl]);

  const togglePlayPause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {}); else v.pause();
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && !videoUnmuteTracked.current) {
      videoUnmuteTracked.current = true;
      trackEvent('video_unmute', {}, pageUrl);
    }
  }, [pageUrl]);

  const changeSpeed = useCallback((newSpeed: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = newSpeed;
    setSpeed(newSpeed);
    setShowSpeedMenu(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (state !== 'playing') return;
    clearTimeout(hideTimer.current);
    setShowControls(true);
  }, [state]);

  const handleMouseLeave = useCallback(() => {
    setShowSpeedMenu(false);
    hideTimer.current = setTimeout(() => setShowControls(false), 800);
  }, []);

  const handleVideoTap = useCallback(() => {
    if (state !== 'playing') return;
    const v = videoRef.current;
    if (v) {
      if (v.paused) v.play().catch(() => {}); else v.pause();
    }
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowControls(false);
      setShowSpeedMenu(false);
    }, 4000);
  }, [state]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  }, []);

  const skip = useCallback((seconds: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + seconds));
  }, []);

  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const el = playerRef.current as HTMLElement | null;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen().then(() => {
        setShowControls(true);
      }).catch(() => {
        const v = videoRef.current as any;
        if (v?.webkitEnterFullscreen) {
          v.webkitEnterFullscreen();
        }
      });
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.25 }}
      className={`relative w-full max-w-[360px] md:max-w-[420px] mx-auto ${className}`}
    >
      <div
        ref={playerRef}
        className={`relative overflow-hidden cursor-pointer group bg-black ${isFullscreen ? 'w-screen h-screen rounded-none border-0' : 'aspect-[9/16] bg-foreground/5 rounded-2xl md:rounded-3xl border border-border shadow-2xl'}`}
        onClick={state === 'preview' ? handleClick : handleVideoTap}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {poster && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}
        <video
          ref={videoRef}
          src={videoUrls[videoSrcIndex]}
          poster={poster}
          className={`absolute inset-0 w-full h-full ${isFullscreen ? 'object-contain' : 'object-cover'}`}
          playsInline
          muted
          autoPlay={state === 'preview'}
          loop={state === 'preview'}
          preload="metadata"
          onError={() => {
            setVideoSrcIndex((prev) => (prev < videoUrls.length - 1 ? prev + 1 : prev));
          }}
        />

        {state === 'preview' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-foreground/20" />
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-accent/30 absolute"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/20 absolute"
              />
              <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-accent-foreground ml-1" fill="currentColor" />
              </div>
            </div>
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10 mt-6"
            >
              <span className="text-sm md:text-base font-semibold text-background bg-accent px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                {tapToWatchLabel}
              </span>
            </motion.div>
          </div>
        )}

        {state === 'playing' && (
          <>
            {paused && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-8 h-8 text-background ml-0.5" fill="currentColor" />
                </div>
              </div>
            )}

            <div className={`absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              <div className="px-3 mb-1">
                <div
                  className="h-3 bg-background/20 rounded-full cursor-pointer relative flex items-center"
                  onClick={handleProgressClick}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    setHoverTime(duration ? pct * duration : null);
                    setHoverX(pct * 100);
                  }}
                  onMouseLeave={() => setHoverTime(null)}
                >
                  <div className="h-1.5 w-full bg-background/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  {hoverTime !== null && (
                    <div
                      className="absolute -top-7 pointer-events-none"
                      style={{ left: `${hoverX}%`, transform: 'translateX(-50%)' }}
                    >
                      <span className="bg-foreground/90 text-background text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded">
                        {formatTime(hoverTime)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-background/70 font-mono tabular-nums">{formatTime(currentTime)}</span>
                  <span className="text-[10px] text-background/70 font-mono tabular-nums">{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <div className="flex items-center gap-1.5">
                  <button onClick={togglePlayPause} className="w-8 h-8 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground/80 transition-colors">
                    {paused ? <Play className="w-4 h-4 ml-0.5" fill="currentColor" /> : <Pause className="w-4 h-4" />}
                  </button>
                  <button onClick={(e) => skip(-10, e)} className="w-8 h-8 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground/80 transition-colors">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={(e) => skip(10, e)} className="w-8 h-8 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground/80 transition-colors">
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={toggleMute} className="w-8 h-8 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground/80 transition-colors">
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowSpeedMenu(!showSpeedMenu); }}
                      className="h-8 px-2.5 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center gap-1 text-background hover:bg-foreground/80 transition-colors text-xs font-semibold"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      {speed}x
                    </button>
                    {showSpeedMenu && (
                      <div className="absolute bottom-10 right-0 bg-foreground/90 backdrop-blur-md rounded-lg overflow-hidden shadow-xl border border-background/10">
                        {[0.5, 1, 1.25, 1.5, 2].map((s) => (
                          <button
                            key={s}
                            onClick={(e) => changeSpeed(s, e)}
                            className={`block w-full px-4 py-2 text-xs font-medium text-left hover:bg-background/20 transition-colors ${speed === s ? 'text-accent' : 'text-background'}`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={toggleFullscreen} className="w-8 h-8 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground/80 transition-colors">
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`absolute top-4 left-0 right-0 z-20 flex justify-center transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              <a
                href={ctaUrl}
                target={ctaTarget}
                rel={ctaTarget === '_blank' ? 'noopener noreferrer' : undefined}
                onClick={(e) => e.stopPropagation()}
                className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </>
        )}
      </div>

      {durationLabel && (
        <div className="text-center mt-3">
          <span className="text-xs text-muted-foreground">{durationLabel}</span>
        </div>
      )}
    </motion.div>
  );
}
