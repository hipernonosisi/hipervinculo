import { useState, useEffect, useMemo } from 'react';
import { subDays, startOfDay, endOfDay, format } from 'date-fns';
import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RefreshCw, Eye, MousePointerClick, Clock, ArrowDown, Play, Volume2,
  Film, MapPin, FileEdit, CheckCircle2, DollarSign, AlertTriangle, Settings,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, LineChart, Line,
} from 'recharts';
import logo from '@/assets/logo-hipervinculo.png';

interface PageEvent {
  session_id: string;
  event_type: string;
  event_data: any;
  created_at: string;
}

const PRESETS = [
  { key: 'today', label: 'Hoy', from: () => new Date(), to: () => new Date() },
  { key: 'yesterday', label: 'Ayer', from: () => subDays(new Date(), 1), to: () => subDays(new Date(), 1) },
  { key: '7d', label: '7d', from: () => subDays(new Date(), 7), to: () => new Date() },
  { key: '30d', label: '30d', from: () => subDays(new Date(), 30), to: () => new Date() },
  { key: '90d', label: '90d', from: () => subDays(new Date(), 90), to: () => new Date() },
];

const DEFAULT_THRESHOLDS = {
  minAvgTime: 15,        // segundos activos promedio mínimos
  minFinalRate: 30,      // % de sesiones que emiten time_on_page vs page_view
  minHeartbeatRate: 40,  // % de sesiones que emiten al menos un heartbeat
};
type Thresholds = typeof DEFAULT_THRESHOLDS;

function loadThresholds(): Thresholds {
  try {
    const raw = localStorage.getItem('hv_ebook_thresholds');
    if (raw) return { ...DEFAULT_THRESHOLDS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_THRESHOLDS;
}

export default function EbookAnalytics() {
  const [events, setEvents] = useState<PageEvent[]>([]);
  const [purchases, setPurchases] = useState(0);
  const [loading, setLoading] = useState(true);
  const [preset, setPreset] = useState('7d');
  const [dateFrom, setDateFrom] = useState(subDays(new Date(), 7));
  const [dateTo, setDateTo] = useState(new Date());
  const [thresholds, setThresholds] = useState<Thresholds>(loadThresholds);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const saveThresholds = (t: Thresholds) => {
    setThresholds(t);
    localStorage.setItem('hv_ebook_thresholds', JSON.stringify(t));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const from = startOfDay(dateFrom).toISOString();
      const to = endOfDay(dateTo).toISOString();
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/ebook-analytics-public?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      );
      const json = await res.json();
      setEvents(json.events || []);
      setPurchases(json.purchases || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [dateFrom, dateTo]);

  const stats = useMemo(() => {
    const sessions = new Set(events.map((e) => e.session_id));
    const pageViews = events.filter((e) => e.event_type === 'page_view').length;
    const ctaClicks = events.filter((e) => e.event_type === 'cta_click').length;
    const videoPlays = new Set(events.filter((e) => e.event_type === 'video_play').map(e => e.session_id)).size;
    const videoUnmutes = new Set(events.filter((e) => e.event_type === 'video_unmute').map(e => e.session_id)).size;
    const formStarts = new Set(events.filter((e) => e.event_type === 'form_start').map(e => e.session_id)).size;
    const formSubmits = new Set(events.filter((e) => e.event_type === 'form_submit').map(e => e.session_id)).size;
    const checkoutSessions = new Set(events.filter((e) => e.event_type === 'checkout_session_created').map(e => e.session_id)).size;
    const checkoutRedirects = new Set(events.filter((e) => e.event_type === 'checkout_redirect').map(e => e.session_id)).size;
    const checkoutErrors = events.filter((e) => e.event_type === 'checkout_error');
    const checkoutErrorSessions = new Set(checkoutErrors.map(e => e.session_id)).size;
    const recentErrors = checkoutErrors.slice(0, 5).map((e) => ({
      when: e.created_at,
      error: e.event_data?.error || 'Unknown',
    }));

    const watchEvents = events.filter((e) => e.event_type === 'video_watch_duration');
    const avgWatchSeconds = watchEvents.length > 0
      ? Math.round(watchEvents.reduce((s, e) => s + (e.event_data?.seconds_watched || 0), 0) / watchEvents.length) : 0;
    const avgWatchPercent = watchEvents.length > 0
      ? Math.round(watchEvents.reduce((s, e) => s + (e.event_data?.percent_watched || 0), 0) / watchEvents.length) : 0;
    const maxWatchSeconds = watchEvents.length > 0
      ? Math.max(...watchEvents.map((e) => e.event_data?.seconds_watched || 0)) : 0;
    const watchBuckets = { '0-30s': 0, '30s-1m': 0, '1-3m': 0, '3-5m': 0, '5m+': 0 };
    watchEvents.forEach((e) => {
      const s = e.event_data?.seconds_watched || 0;
      if (s <= 30) watchBuckets['0-30s']++;
      else if (s <= 60) watchBuckets['30s-1m']++;
      else if (s <= 180) watchBuckets['1-3m']++;
      else if (s <= 300) watchBuckets['3-5m']++;
      else watchBuckets['5m+']++;
    });

    const timeEvents = events.filter((e) => e.event_type === 'time_on_page');
    // Backward compat: new tracker writes `active_seconds`, old wrote `duration_seconds`
    const timeSec = (e: PageEvent) =>
      e.event_data?.active_seconds ?? e.event_data?.duration_seconds ?? 0;
    const avgTime = timeEvents.length > 0
      ? Math.round(timeEvents.reduce((s, e) => s + timeSec(e), 0) / timeEvents.length) : 0;
    const heartbeatSessions = new Set(events.filter((e) => e.event_type === 'heartbeat').map(e => e.session_id)).size;
    const finalEventSessions = new Set(timeEvents.map(e => e.session_id)).size;

    const scroll25 = new Set(events.filter((e) => e.event_type === 'scroll_25').map(e => e.session_id)).size;
    const scroll50 = new Set(events.filter((e) => e.event_type === 'scroll_50').map(e => e.session_id)).size;
    const scroll75 = new Set(events.filter((e) => e.event_type === 'scroll_75').map(e => e.session_id)).size;
    const scroll100 = new Set(events.filter((e) => e.event_type === 'scroll_100').map(e => e.session_id)).size;

    const sessionMaxScroll: Record<string, number> = {};
    events.forEach((e) => {
      const m = { scroll_25: 25, scroll_50: 50, scroll_75: 75, scroll_100: 100 }[e.event_type as string];
      if (m) sessionMaxScroll[e.session_id] = Math.max(sessionMaxScroll[e.session_id] || 0, m);
    });
    const scrollSessions = Object.values(sessionMaxScroll);
    const avgScrollDepth = scrollSessions.length > 0
      ? Math.round(scrollSessions.reduce((a, b) => a + b, 0) / scrollSessions.length) : 0;

    const ctaBreakdown: Record<string, number> = {};
    events.filter((e) => e.event_type === 'cta_click').forEach((e) => {
      const label = e.event_data?.label || 'Unknown';
      ctaBreakdown[label] = (ctaBreakdown[label] || 0) + 1;
    });

    const locationMap: Record<string, number> = {};
    events.filter((e) => e.event_type === 'page_view' && e.event_data?.city && e.event_data?.country)
      .forEach((e) => {
        const loc = `${e.event_data.city}, ${e.event_data.country}`;
        locationMap[loc] = (locationMap[loc] || 0) + 1;
      });
    const topLocations = Object.entries(locationMap)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count).slice(0, 10);

    const referrerMap: Record<string, number> = {};
    events.filter((e) => e.event_type === 'page_view').forEach((e) => {
      let r = e.event_data?.referrer || 'Direct';
      try { if (r && r !== 'Direct') r = new URL(r).hostname; } catch {}
      referrerMap[r] = (referrerMap[r] || 0) + 1;
    });
    const topReferrers = Object.entries(referrerMap)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count).slice(0, 8);

    const dailyMap: Record<string, number> = {};
    events.filter((e) => e.event_type === 'page_view').forEach((e) => {
      const day = format(new Date(e.created_at), 'MMM d');
      dailyMap[day] = (dailyMap[day] || 0) + 1;
    });
    const dailyViews = Object.entries(dailyMap).map(([date, views]) => ({ date, views })).reverse();

    return {
      uniqueSessions: sessions.size, pageViews, ctaClicks, videoPlays, videoUnmutes,
      formStarts, formSubmits, checkoutSessions, checkoutRedirects, checkoutErrorSessions, recentErrors,
      avgTime, avgWatchSeconds, avgWatchPercent, maxWatchSeconds,
      watchBuckets, watchEventsCount: watchEvents.length,
      scroll25, scroll50, scroll75, scroll100, avgScrollDepth,
      ctaBreakdown, dailyViews, topLocations, topReferrers,
      heartbeatSessions, finalEventSessions,
    };
  }, [events]);

  const formatTime = (s: number) => s < 60 ? `${s}s` : `${Math.floor(s/60)}m ${s%60}s`;
  const pct = (n: number, d: number) => d > 0 ? `${Math.round((n/d)*100)}%` : '0%';

  const funnelData = [
    { name: 'Visitas', value: stats.uniqueSessions, color: '#8BC34A' },
    { name: 'Scroll 50%', value: stats.scroll50, color: '#60A5FA' },
    { name: 'Play vídeo', value: stats.videoPlays, color: '#A855F7' },
    { name: 'Empezó form', value: stats.formStarts, color: '#F59E0B' },
    { name: 'Envió form', value: stats.formSubmits, color: '#FF6B35' },
    { name: 'Llegó a Stripe', value: stats.checkoutRedirects, color: '#0EA5E9' },
    { name: 'Compró', value: purchases, color: '#2F4F3E' },
  ];

  const ctaData = Object.entries(stats.ctaBreakdown).map(([label, count]) => ({ label, count }));

  // === Health alerts based on configurable thresholds ===
  const finalRate = stats.uniqueSessions > 0
    ? Math.round((stats.finalEventSessions / stats.uniqueSessions) * 100) : 0;
  const heartbeatRate = stats.uniqueSessions > 0
    ? Math.round((stats.heartbeatSessions / stats.uniqueSessions) * 100) : 0;

  const alerts: { level: 'warn' | 'crit'; title: string; detail: string }[] = [];
  if (stats.uniqueSessions >= 5) {
    if (stats.avgTime < thresholds.minAvgTime) {
      alerts.push({
        level: stats.avgTime < thresholds.minAvgTime / 2 ? 'crit' : 'warn',
        title: `Tiempo activo bajo: ${stats.avgTime}s`,
        detail: `Umbral: ≥ ${thresholds.minAvgTime}s. Los visitantes rebotan rápido o el tracking no captura bien el tiempo.`,
      });
    }
    if (finalRate < thresholds.minFinalRate) {
      alerts.push({
        level: finalRate < thresholds.minFinalRate / 2 ? 'crit' : 'warn',
        title: `Tasa de evento final baja: ${finalRate}%`,
        detail: `Solo ${stats.finalEventSessions}/${stats.uniqueSessions} sesiones emitieron time_on_page (umbral ≥ ${thresholds.minFinalRate}%). Posible bloqueo de sendBeacon en in-app browsers.`,
      });
    }
    if (heartbeatRate < thresholds.minHeartbeatRate) {
      alerts.push({
        level: 'warn',
        title: `Heartbeats bajos: ${heartbeatRate}%`,
        detail: `Solo ${stats.heartbeatSessions}/${stats.uniqueSessions} sesiones emitieron heartbeat (umbral ≥ ${thresholds.minHeartbeatRate}%). Las visitas duran <15s activos o el tracking falla.`,
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8f7]">
      <SEO
        title="Analytics · Guía Amazon FBA | Hipervínculo"
        description="Métricas públicas de tráfico de la landing de la guía Amazon FBA."
        url="https://hipervinculo.net/amazon-fba-ebook/analytics"
      />

      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded shrink-0">
              <img src={logo} alt="Hipervínculo" className="h-8" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-[#2F4F3E] leading-tight">Analytics · Guía Amazon FBA</h1>
              <p className="text-[11px] text-muted-foreground">Tráfico en tiempo real de /amazon-fba-ebook</p>
            </div>
          </div>
          <Button onClick={fetchData} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Date presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              onClick={() => { setPreset(p.key); setDateFrom(p.from()); setDateTo(p.to()); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                preset === p.key ? 'bg-[#8BC34A] text-[#1a2e22]' : 'bg-white border hover:bg-gray-50'
              }`}
            >{p.label}</button>
          ))}
          <span className="text-xs text-muted-foreground ml-2">
            {format(dateFrom, 'd MMM')} – {format(dateTo, 'd MMM yyyy')}
          </span>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {[
            { icon: Eye, label: 'Visitas únicas', value: stats.uniqueSessions, color: '#2F4F3E' },
            { icon: Eye, label: 'Page views', value: stats.pageViews, color: '#8BC34A' },
            { icon: Clock, label: 'Tiempo medio', value: formatTime(stats.avgTime), color: '#14B8A6' },
            { icon: ArrowDown, label: 'Scroll medio', value: `${stats.avgScrollDepth}%`, color: '#3B82F6' },
            { icon: Play, label: 'Play vídeo', value: stats.videoPlays, color: '#A855F7' },
            { icon: Volume2, label: 'Desmutearon', value: stats.videoUnmutes, color: '#EC4899' },
            { icon: FileEdit, label: 'Empezó form', value: stats.formStarts, color: '#F59E0B' },
            { icon: CheckCircle2, label: 'Envió form', value: stats.formSubmits, color: '#FF6B35' },
            { icon: DollarSign, label: 'Llegó a Stripe', value: stats.checkoutRedirects, color: '#0EA5E9' },
            { icon: MousePointerClick, label: 'Clicks CTA', value: stats.ctaClicks, color: '#6366F1' },
            { icon: DollarSign, label: 'Compras', value: purchases, color: '#2F4F3E' },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label} className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${color}20` }}>
                  <Icon className="h-3.5 w-3.5" style={{ color }} />
                </div>
                <p className="text-xl font-extrabold text-[#2F4F3E]">{value}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conversion funnel */}
        <Card className="border-0 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-[#2F4F3E]">Embudo de conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {funnelData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 text-center text-[11px]">
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-bold text-[#2F4F3E]">{pct(stats.scroll50, stats.uniqueSessions)}</p>
                <p className="text-muted-foreground">leyeron 50%</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-bold text-[#2F4F3E]">{pct(stats.videoPlays, stats.uniqueSessions)}</p>
                <p className="text-muted-foreground">vieron vídeo</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-bold text-[#2F4F3E]">{pct(stats.formStarts, stats.uniqueSessions)}</p>
                <p className="text-muted-foreground">tocaron form</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-bold text-[#2F4F3E]">{pct(stats.formSubmits, stats.formStarts)}</p>
                <p className="text-muted-foreground">enviaron form</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-bold text-[#2F4F3E]">{pct(purchases, stats.uniqueSessions)}</p>
                <p className="text-muted-foreground">tasa global</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout health / errors */}
        {(stats.checkoutErrorSessions > 0 || stats.formSubmits > stats.checkoutRedirects) && (
          <Card className="border-0 shadow-sm rounded-xl border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-red-700">⚠️ Salud del checkout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-[11px]">
                <div className="p-2 bg-gray-50 rounded">
                  <p className="font-bold text-[#2F4F3E]">{stats.formSubmits}</p>
                  <p className="text-muted-foreground">enviaron form</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="font-bold text-[#0EA5E9]">{stats.checkoutRedirects}</p>
                  <p className="text-muted-foreground">llegaron a Stripe</p>
                </div>
                <div className="p-2 bg-red-50 rounded">
                  <p className="font-bold text-red-600">{stats.checkoutErrorSessions}</p>
                  <p className="text-muted-foreground">con error</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="font-bold text-[#2F4F3E]">{stats.formSubmits - stats.checkoutRedirects - stats.checkoutErrorSessions}</p>
                  <p className="text-muted-foreground">sin respuesta</p>
                </div>
              </div>
              {stats.recentErrors.length > 0 && (
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-[#2F4F3E] mb-1">Últimos errores:</p>
                  {stats.recentErrors.map((e, i) => (
                    <div key={i} className="p-2 bg-red-50 rounded font-mono text-[10px] break-all">
                      <span className="text-muted-foreground">{format(new Date(e.when), 'd MMM HH:mm')}</span> — {e.error}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}


        {/* Daily views & scroll */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-[#2F4F3E]">Visitas por día</CardTitle></CardHeader>
            <CardContent>
              {stats.dailyViews.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={stats.dailyViews}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#8BC34A" strokeWidth={2} dot={{ fill: '#8BC34A', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : <p className="text-sm text-muted-foreground text-center py-10">Sin datos</p>}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-[#2F4F3E]">Profundidad de scroll</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[
                  { name: '25%', value: stats.scroll25 },
                  { name: '50%', value: stats.scroll50 },
                  { name: '75%', value: stats.scroll75 },
                  { name: '100%', value: stats.scroll100 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Video */}
        <Card className="border-0 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-[#2F4F3E] flex items-center gap-2">
              <Film className="h-4 w-4 text-purple-500" /> Engagement del vídeo (VSL)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
              {[
                { label: 'Plays', value: stats.videoPlays, sub: `${pct(stats.videoPlays, stats.uniqueSessions)} de visitas` },
                { label: 'Desmutearon', value: stats.videoUnmutes, sub: `${pct(stats.videoUnmutes, stats.videoPlays)} de plays` },
                { label: 'Vistos (media)', value: formatTime(stats.avgWatchSeconds), sub: `${stats.avgWatchPercent}% del vídeo` },
                { label: 'Máx visto', value: formatTime(stats.maxWatchSeconds), sub: 'sesión más larga' },
                { label: 'Muestra', value: stats.watchEventsCount, sub: 'sesiones medidas' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-[#2F4F3E]">{value}</p>
                  <p className="text-[10px] font-medium text-muted-foreground">{label}</p>
                  <p className="text-[9px] text-muted-foreground/70 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
            {stats.watchEventsCount > 0 && (
              <>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Distribución de duración vista</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={Object.entries(stats.watchBuckets).map(([range, count]) => ({ range, count }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#A855F7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </CardContent>
        </Card>

        {/* Referrers + Locations */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-[#2F4F3E]">Fuentes de tráfico</CardTitle></CardHeader>
            <CardContent>
              {stats.topReferrers.length > 0 ? (
                <ul className="space-y-2">
                  {stats.topReferrers.map((r) => (
                    <li key={r.source} className="flex justify-between items-center text-sm">
                      <span className="truncate text-[#2F4F3E]">{r.source}</span>
                      <span className="font-bold text-[#8BC34A]">{r.count}</span>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-muted-foreground py-6 text-center">Sin datos</p>}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-[#2F4F3E] flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Top ubicaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topLocations.length > 0 ? (
                <ul className="space-y-2">
                  {stats.topLocations.map((l) => (
                    <li key={l.location} className="flex justify-between items-center text-sm">
                      <span className="truncate text-[#2F4F3E]">{l.location}</span>
                      <span className="font-bold text-[#8BC34A]">{l.count}</span>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-muted-foreground py-6 text-center">Sin datos</p>}
            </CardContent>
          </Card>
        </div>

        {/* CTA breakdown */}
        {ctaData.length > 0 && (
          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-[#2F4F3E]">Clicks por CTA</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={Math.max(160, ctaData.length * 36)}>
                <BarChart data={ctaData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={140} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF6B35" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-[11px] text-muted-foreground py-4">
          Datos en tiempo real · Hipervínculo
        </p>
      </main>
    </div>
  );
}
