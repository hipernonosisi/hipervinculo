import { useState, useEffect, useMemo } from 'react';
import { format, subDays, startOfDay, endOfDay, isToday, isYesterday } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { RefreshCw, Eye, MousePointerClick, Clock, ArrowDown, Calendar as CalendarIcon, Play, Volume2, Film } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface PageEvent {
  id: string;
  session_id: string;
  event_type: string;
  event_data: any;
  page_url: string;
  created_at: string;
}

const EVENT_COLORS: Record<string, string> = {
  page_view: '#8BC34A',
  cta_click: '#FF6B35',
  calendar_click: '#6366F1',
  scroll_25: '#93C5FD',
  scroll_50: '#60A5FA',
  scroll_75: '#3B82F6',
  scroll_100: '#1D4ED8',
  video_play: '#A855F7',
  video_unmute: '#EC4899',
  time_on_page: '#14B8A6',
};

export function PreviewAnalyticsDashboard() {
  const [events, setEvents] = useState<PageEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState<Date>(subDays(new Date(), 7));
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [activePreset, setActivePreset] = useState<string>('7d');

  const fetchEvents = async () => {
    setLoading(true);
    let query = supabase
      .from('page_events')
      .select('*')
      .eq('page_url', '/preview')
      .order('created_at', { ascending: false })
      .limit(5000)
      .gte('created_at', startOfDay(dateFrom).toISOString())
      .lte('created_at', endOfDay(dateTo).toISOString());

    const { data, error } = await query;
    if (error) console.error('Error fetching events:', error);
    setEvents((data as PageEvent[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [dateRange]);

  const stats = useMemo(() => {
    const sessions = new Set(events.map((e) => e.session_id));
    const pageViews = events.filter((e) => e.event_type === 'page_view').length;
    const ctaClicks = events.filter((e) => e.event_type === 'cta_click').length;
    const calendarClicks = events.filter((e) => e.event_type === 'calendar_click').length;
    const videoPlays = events.filter((e) => e.event_type === 'video_play').length;
    const videoUnmutes = events.filter((e) => e.event_type === 'video_unmute').length;

    // Video watch duration stats
    const watchEvents = events.filter((e) => e.event_type === 'video_watch_duration');
    const avgWatchSeconds = watchEvents.length > 0
      ? Math.round(watchEvents.reduce((sum, e) => sum + (e.event_data?.seconds_watched || 0), 0) / watchEvents.length)
      : 0;
    const avgWatchPercent = watchEvents.length > 0
      ? Math.round(watchEvents.reduce((sum, e) => sum + (e.event_data?.percent_watched || 0), 0) / watchEvents.length)
      : 0;
    const maxWatchSeconds = watchEvents.length > 0
      ? Math.max(...watchEvents.map((e) => e.event_data?.seconds_watched || 0))
      : 0;
    // Watch duration distribution
    const watchBuckets = { '0-30s': 0, '30s-1m': 0, '1-3m': 0, '3-5m': 0, '5m+': 0 };
    watchEvents.forEach((e) => {
      const s = e.event_data?.seconds_watched || 0;
      if (s <= 30) watchBuckets['0-30s']++;
      else if (s <= 60) watchBuckets['30s-1m']++;
      else if (s <= 180) watchBuckets['1-3m']++;
      else if (s <= 300) watchBuckets['3-5m']++;
      else watchBuckets['5m+']++;
    });

    // Average time on page
    const timeEvents = events.filter((e) => e.event_type === 'time_on_page');
    const avgTime =
      timeEvents.length > 0
        ? Math.round(
            timeEvents.reduce((sum, e) => sum + (e.event_data?.duration_seconds || 0), 0) /
              timeEvents.length
          )
        : 0;

    // Scroll funnel
    const scroll25 = new Set(events.filter((e) => e.event_type === 'scroll_25').map((e) => e.session_id)).size;
    const scroll50 = new Set(events.filter((e) => e.event_type === 'scroll_50').map((e) => e.session_id)).size;
    const scroll75 = new Set(events.filter((e) => e.event_type === 'scroll_75').map((e) => e.session_id)).size;
    const scroll100 = new Set(events.filter((e) => e.event_type === 'scroll_100').map((e) => e.session_id)).size;

    // CTA breakdown
    const ctaBreakdown: Record<string, number> = {};
    events
      .filter((e) => e.event_type === 'cta_click')
      .forEach((e) => {
        const label = e.event_data?.label || 'Unknown';
        ctaBreakdown[label] = (ctaBreakdown[label] || 0) + 1;
      });

    // Daily views (for line chart)
    const dailyMap: Record<string, number> = {};
    events
      .filter((e) => e.event_type === 'page_view')
      .forEach((e) => {
        const day = new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dailyMap[day] = (dailyMap[day] || 0) + 1;
      });
    const dailyViews = Object.entries(dailyMap)
      .map(([date, views]) => ({ date, views }))
      .reverse();

    return {
      uniqueSessions: sessions.size,
      pageViews,
      ctaClicks,
      calendarClicks,
      videoPlays,
      videoUnmutes,
      avgTime,
      avgWatchSeconds,
      avgWatchPercent,
      maxWatchSeconds,
      watchBuckets,
      watchEventsCount: watchEvents.length,
      scroll25,
      scroll50,
      scroll75,
      scroll100,
      ctaBreakdown,
      dailyViews,
    };
  }, [events]);

  const scrollFunnelData = [
    { name: 'Visited', value: stats.uniqueSessions, color: '#8BC34A' },
    { name: '25% Scroll', value: stats.scroll25, color: '#93C5FD' },
    { name: '50% Scroll', value: stats.scroll50, color: '#60A5FA' },
    { name: '75% Scroll', value: stats.scroll75, color: '#3B82F6' },
    { name: '100% Scroll', value: stats.scroll100, color: '#1D4ED8' },
  ];

  const ctaData = Object.entries(stats.ctaBreakdown).map(([label, count]) => ({
    label,
    count,
  }));

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: '#2d4a2d' }}>
            Preview Landing Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Tracking visitor behavior on /preview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border overflow-hidden">
            {(['7d', '30d', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  dateRange === range
                    ? 'bg-accent text-white'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>
          <Button onClick={fetchEvents} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { icon: Eye, label: 'Page Views', value: stats.pageViews, color: '#8BC34A' },
          { icon: Eye, label: 'Unique Visitors', value: stats.uniqueSessions, color: '#2d4a2d' },
          { icon: Clock, label: 'Avg. Time', value: formatTime(stats.avgTime), color: '#14B8A6' },
          { icon: MousePointerClick, label: 'CTA Clicks', value: stats.ctaClicks, color: '#FF6B35' },
          { icon: Calendar, label: 'Calendar Clicks', value: stats.calendarClicks, color: '#6366F1' },
          { icon: Play, label: 'Video Plays', value: stats.videoPlays, color: '#A855F7' },
          { icon: Volume2, label: 'Unmuted Video', value: stats.videoUnmutes, color: '#EC4899' },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="border-0 shadow-sm rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#2d4a2d' }}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Views Line Chart */}
        <Card className="border-0 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Daily Page Views</CardTitle>
          </CardHeader>
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
            ) : (
              <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>
            )}
          </CardContent>
        </Card>

        {/* Scroll Funnel */}
        <Card className="border-0 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Scroll Depth Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={scrollFunnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {scrollFunnelData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* VSL Video Engagement */}
      <Card className="border-0 shadow-sm rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Film className="h-4 w-4 text-purple-500" />
            VSL Video Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: 'Played Video', value: stats.videoPlays, sub: `${stats.uniqueSessions > 0 ? Math.round((stats.videoPlays / stats.uniqueSessions) * 100) : 0}% of visitors` },
              { label: 'Unmuted', value: stats.videoUnmutes, sub: `${stats.videoPlays > 0 ? Math.round((stats.videoUnmutes / stats.videoPlays) * 100) : 0}% of plays` },
              { label: 'Avg. Watch', value: formatTime(stats.avgWatchSeconds), sub: `${stats.avgWatchPercent}% of video` },
              { label: 'Max Watch', value: formatTime(stats.maxWatchSeconds), sub: 'longest session' },
              { label: 'Watch Data', value: stats.watchEventsCount, sub: 'sessions recorded' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold" style={{ color: '#2d4a2d' }}>{value}</p>
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
          {stats.watchEventsCount > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-3">Watch Duration Distribution</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={Object.entries(stats.watchBuckets).map(([range, count]) => ({ range, count }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#A855F7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CTA Clicks Breakdown */}
      {ctaData.length > 0 && (
        <Card className="border-0 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">CTA Clicks Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={Math.max(180, ctaData.length * 40)}>
              <BarChart data={ctaData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={200} />
                <Tooltip />
                <Bar dataKey="count" fill="#FF6B35" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Conversion Funnel */}
      <Card className="border-0 shadow-sm rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: 'Page Views', value: stats.pageViews, pct: 100 },
              { label: 'Scrolled 50%+', value: stats.scroll50, pct: stats.uniqueSessions > 0 ? Math.round((stats.scroll50 / stats.uniqueSessions) * 100) : 0 },
              { label: 'CTA Clicked', value: stats.ctaClicks, pct: stats.uniqueSessions > 0 ? Math.round((stats.ctaClicks / stats.uniqueSessions) * 100) : 0 },
              { label: 'Calendar Clicked', value: stats.calendarClicks, pct: stats.uniqueSessions > 0 ? Math.round((stats.calendarClicks / stats.uniqueSessions) * 100) : 0 },
            ].map(({ label, value, pct }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-36 text-sm font-medium text-muted-foreground">{label}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: `${Math.max(pct, 2)}%`,
                      backgroundColor: '#8BC34A',
                      opacity: 0.3 + (pct / 100) * 0.7,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center px-3 text-xs font-semibold">
                    {value} ({pct}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card className="border-0 shadow-sm rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Recent Events (last 50)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left p-3 font-medium">Time</th>
                  <th className="text-left p-3 font-medium">Event</th>
                  <th className="text-left p-3 font-medium">Details</th>
                  <th className="text-left p-3 font-medium">Session</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 50).map((ev) => (
                  <tr key={ev.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-muted-foreground whitespace-nowrap">
                      {new Date(ev.created_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className="text-xs font-medium"
                        style={{
                          borderColor: EVENT_COLORS[ev.event_type] || '#888',
                          color: EVENT_COLORS[ev.event_type] || '#888',
                        }}
                      >
                        {ev.event_type}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs max-w-[200px] truncate">
                      {ev.event_data?.label ||
                        (ev.event_data?.duration_seconds
                          ? `${ev.event_data.duration_seconds}s`
                          : ev.event_data?.scroll_percent
                          ? `${ev.event_data.scroll_percent}%`
                          : '—')}
                    </td>
                    <td className="p-3 text-muted-foreground text-xs font-mono">
                      {ev.session_id.slice(0, 12)}…
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
