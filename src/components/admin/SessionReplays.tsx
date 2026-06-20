import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Play,
  MapPin,
  Monitor,
  Smartphone,
  RefreshCw,
  Clock,
  Search,
  Link2,
  Calendar,
  ExternalLink,
  MousePointerClick,
} from "lucide-react";
import "rrweb-player/dist/style.css";

type ChunkRow = {
  id: string;
  session_id: string;
  chunk_index: number;
  events: any[];
  page_url: string | null;
  user_agent: string | null;
  geo: any;
  created_at: string;
};

type SessionSummary = {
  session_id: string;
  page_url: string | null;
  user_agent: string | null;
  geo: any;
  first_at: string;
  last_at: string;
  event_count: number;
  chunks: number;
  clicks: number;
};

function deviceLabel(ua: string | null) {
  if (!ua) return "Desconocido";
  if (/iPhone|iPod/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  if (/Android/.test(ua)) return /Mobile/.test(ua) ? "Android phone" : "Android tablet";
  if (/Macintosh/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows";
  return "Otro";
}
function browserLabel(ua: string | null) {
  if (!ua) return "";
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  return "";
}
function isMobileUA(ua: string | null) {
  return !!ua && /iPhone|iPod|Android.*Mobile/.test(ua);
}
function fmtDuration(ms: number) {
  if (ms < 1000) return `${ms}ms`;
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${s % 60}s`;
}

export default function SessionReplays() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<SessionSummary | null>(null);
  const [playerEvents, setPlayerEvents] = useState<any[] | null>(null);
  const [loadingReplay, setLoadingReplay] = useState(false);
  const [filter, setFilter] = useState("");
  const [deviceFilter, setDeviceFilter] = useState<"all" | "mobile" | "desktop">("all");
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerInstance = useRef<any>(null);

  const fetchSessions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("session_replay_chunks")
      .select("session_id, chunk_index, page_url, user_agent, geo, created_at, events")
      .order("created_at", { ascending: false })
      .limit(2000);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const map = new Map<string, SessionSummary>();
    for (const row of (data ?? []) as ChunkRow[]) {
      const cur = map.get(row.session_id);
      const ec = Array.isArray(row.events) ? row.events.length : 0;
      const clicks = Array.isArray(row.events)
        ? row.events.filter((e: any) => e?.type === 3 || (e?.data?.type === 3)).length
        : 0;
      if (!cur) {
        map.set(row.session_id, {
          session_id: row.session_id,
          page_url: row.page_url,
          user_agent: row.user_agent,
          geo: row.geo,
          first_at: row.created_at,
          last_at: row.created_at,
          event_count: ec,
          chunks: 1,
          clicks,
        });
      } else {
        cur.event_count += ec;
        cur.clicks += clicks;
        cur.chunks += 1;
        if (row.created_at < cur.first_at) cur.first_at = row.created_at;
        if (row.created_at > cur.last_at) cur.last_at = row.created_at;
        if (!cur.page_url && row.page_url) cur.page_url = row.page_url;
        if (!cur.user_agent && row.user_agent) cur.user_agent = row.user_agent;
        if (!cur.geo && row.geo) cur.geo = row.geo;
      }
    }
    const list = Array.from(map.values()).sort((a, b) => (a.last_at < b.last_at ? 1 : -1));
    setSessions(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const openReplay = async (s: SessionSummary) => {
    setSelected(s);
    setLoadingReplay(true);
    setPlayerEvents(null);
    const { data, error } = await supabase
      .from("session_replay_chunks")
      .select("events, chunk_index")
      .eq("session_id", s.session_id)
      .order("chunk_index", { ascending: true });
    if (error) {
      console.error(error);
      setLoadingReplay(false);
      return;
    }
    const all = (data ?? []).flatMap((r: any) => (Array.isArray(r.events) ? r.events : []));
    setPlayerEvents(all);
    setLoadingReplay(false);
  };

  // Mount rrweb-player when events arrive
  useEffect(() => {
    if (!playerEvents || playerEvents.length < 2 || !playerRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const mod: any = await import("rrweb-player");
        if (cancelled || !playerRef.current) return;
        playerRef.current.innerHTML = "";
        const Player = mod.default || mod;
        const containerW = playerRef.current.clientWidth || 1100;
        playerInstance.current = new Player({
          target: playerRef.current,
          props: {
            events: playerEvents,
            width: Math.max(720, Math.min(1200, containerW)),
            height: 620,
            autoPlay: true,
            showController: true,
            speed: 2,
            speedOption: [1, 2, 4, 8],
            skipInactive: true,
            mouseTail: { strokeStyle: "#8BC34A", lineWidth: 3 },
          },
        });
      } catch (e) {
        console.error("Failed to load rrweb-player", e);
      }
    })();
    return () => {
      cancelled = true;
      try { playerInstance.current?.$destroy?.(); } catch {}
      playerInstance.current = null;
    };
  }, [playerEvents]);

  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      if (deviceFilter === "mobile" && !isMobileUA(s.user_agent)) return false;
      if (deviceFilter === "desktop" && isMobileUA(s.user_agent)) return false;
      if (!filter) return true;
      const hay = `${s.page_url ?? ""} ${s.user_agent ?? ""} ${s.geo?.city ?? ""} ${s.geo?.country ?? ""} ${s.session_id}`.toLowerCase();
      return hay.includes(filter.toLowerCase());
    });
  }, [sessions, filter, deviceFilter]);

  const stats = useMemo(() => {
    const total = sessions.length;
    const ebookSessions = sessions.filter((s) => (s.page_url || "").includes("amazon-fba-ebook"));
    const mobilePct = total ? Math.round((sessions.filter((s) => isMobileUA(s.user_agent)).length / total) * 100) : 0;
    return { total, ebookSessions: ebookSessions.length, mobilePct };
  }, [sessions]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-lg font-bold text-[#2F4F3E]">Grabaciones de sesión</h3>
          <p className="text-sm text-muted-foreground">
            {stats.total} sesiones · {stats.ebookSessions} del eBook · {stats.mobilePct}% mobile
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filtrar por URL, ciudad, dispositivo…"
              className="pl-8 h-9 w-64"
            />
          </div>
          <div className="flex rounded-md border overflow-hidden">
            {(["all", "desktop", "mobile"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDeviceFilter(d)}
                className={`px-3 h-9 text-xs font-medium ${
                  deviceFilter === d ? "bg-[#2F4F3E] text-white" : "bg-white text-[#2F4F3E] hover:bg-muted"
                }`}
              >
                {d === "all" ? "Todos" : d === "mobile" ? "Mobile" : "Desktop"}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={fetchSessions} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Cargando sesiones…
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          {sessions.length === 0
            ? "Aún no hay grabaciones. Aparecerán aquí en cuanto los visitantes naveguen el funnel del eBook."
            : "Ninguna sesión coincide con los filtros."}
        </Card>
      ) : (
        <div className="grid gap-2">
          {filtered.map((s) => {
            const dur = new Date(s.last_at).getTime() - new Date(s.first_at).getTime();
            const mobile = isMobileUA(s.user_agent);
            const Icon = mobile ? Smartphone : Monitor;
            const city = s.geo?.city || "—";
            const country = s.geo?.country || "—";
            const browser = browserLabel(s.user_agent);
            return (
              <Card
                key={s.session_id}
                className="p-3 hover:border-[#8BC34A] hover:shadow-sm transition-all cursor-pointer"
                onClick={() => openReplay(s)}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm font-semibold min-w-[140px] text-[#2F4F3E]">
                    <Icon className="w-4 h-4" />
                    {deviceLabel(s.user_agent)}
                    {browser && <span className="text-xs text-muted-foreground font-normal">· {browser}</span>}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-[160px]">
                    <MapPin className="w-3 h-3" /> {city}, {country}
                  </div>
                  <div className="text-xs text-muted-foreground flex-1 truncate min-w-[160px]" title={s.page_url || ""}>
                    {s.page_url || "—"}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" /> {fmtDuration(dur)}
                  </Badge>
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <MousePointerClick className="w-3 h-3" /> {s.clicks} clicks
                  </Badge>
                  <div className="text-xs text-muted-foreground hidden md:block">
                    {new Date(s.last_at).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); openReplay(s); }}
                    className="bg-[#2F4F3E] hover:bg-[#2F4F3E]/90"
                  >
                    <Play className="w-3 h-3 mr-1" /> Reproducir
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) { setSelected(null); setPlayerEvents(null); } }}>
        <DialogContent className="max-w-[1280px] w-[95vw] max-h-[92vh] overflow-y-auto p-0 bg-[#0f0f10] border-[#2F4F3E]/30">
          <DialogHeader className="p-4 pb-3 border-b border-white/10 bg-gradient-to-b from-[#1a1a1c] to-[#0f0f10]">
            <DialogTitle className="text-white flex items-center gap-2 text-base">
              <Play className="w-4 h-4 text-[#8BC34A]" />
              Reproducción de sesión
            </DialogTitle>
            {selected && (
              <div className="flex items-center gap-4 flex-wrap text-xs text-white/70 mt-2">
                <span className="flex items-center gap-1">
                  {isMobileUA(selected.user_agent) ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                  {deviceLabel(selected.user_agent)}
                  {browserLabel(selected.user_agent) && <span className="text-white/40">· {browserLabel(selected.user_agent)}</span>}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selected.geo?.city || "—"}, {selected.geo?.country || "—"}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {fmtDuration(new Date(selected.last_at).getTime() - new Date(selected.first_at).getTime())}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(selected.first_at).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}
                </span>
                {selected.page_url && (
                  <a
                    href={selected.page_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#8BC34A] hover:underline truncate max-w-[280px]"
                  >
                    <Link2 className="w-3 h-3" />
                    {selected.page_url}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <span className="flex items-center gap-1 text-white/40 font-mono">
                  #{selected.session_id.slice(-8)}
                </span>
              </div>
            )}
          </DialogHeader>
          <div className="p-4 bg-[#0f0f10]">
            {loadingReplay ? (
              <div className="flex items-center justify-center py-24 text-white/60">
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Cargando eventos…
              </div>
            ) : playerEvents && playerEvents.length < 2 ? (
              <div className="py-16 text-center text-white/60">
                Esta sesión es demasiado corta para reproducir ({playerEvents?.length ?? 0} evento).
              </div>
            ) : (
              <div
                ref={playerRef}
                className="w-full mx-auto rounded-lg overflow-hidden bg-white shadow-xl"
                style={{ maxWidth: 1200 }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
