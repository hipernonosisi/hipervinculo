import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Loader2, Play, MapPin, Monitor, Smartphone, RefreshCw, Clock } from "lucide-react";
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
  const [selected, setSelected] = useState<string | null>(null);
  const [playerEvents, setPlayerEvents] = useState<any[] | null>(null);
  const [loadingReplay, setLoadingReplay] = useState(false);
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
        });
      } else {
        cur.event_count += ec;
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

  const openReplay = async (sessionId: string) => {
    setSelected(sessionId);
    setLoadingReplay(true);
    setPlayerEvents(null);
    const { data, error } = await supabase
      .from("session_replay_chunks")
      .select("events, chunk_index")
      .eq("session_id", sessionId)
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
        playerInstance.current = new Player({
          target: playerRef.current,
          props: {
            events: playerEvents,
            width: Math.min(900, playerRef.current.clientWidth || 800),
            height: 520,
            autoPlay: false,
            showController: true,
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

  const stats = useMemo(() => {
    const total = sessions.length;
    const ebookSessions = sessions.filter((s) => (s.page_url || "").includes("amazon-fba-ebook"));
    const mobilePct = total ? Math.round((sessions.filter((s) => isMobileUA(s.user_agent)).length / total) * 100) : 0;
    return { total, ebookSessions: ebookSessions.length, mobilePct };
  }, [sessions]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#2F4F3E]">Grabaciones de sesión</h3>
          <p className="text-sm text-muted-foreground">
            Últimas {stats.total} sesiones · {stats.ebookSessions} del eBook · {stats.mobilePct}% mobile
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSessions} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Cargando sesiones…
        </div>
      ) : sessions.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          Aún no hay grabaciones. Aparecerán aquí en cuanto los visitantes naveguen el funnel.
        </Card>
      ) : (
        <div className="grid gap-2">
          {sessions.map((s) => {
            const dur = new Date(s.last_at).getTime() - new Date(s.first_at).getTime();
            const Icon = isMobileUA(s.user_agent) ? Smartphone : Monitor;
            const city = s.geo?.city || "—";
            const country = s.geo?.country || "—";
            return (
              <Card key={s.session_id} className="p-3 hover:border-[#8BC34A] transition-colors">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm font-medium min-w-[120px]">
                    <Icon className="w-4 h-4 text-[#2F4F3E]" />
                    {deviceLabel(s.user_agent)}
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
                  <Badge variant="outline" className="text-xs">{s.event_count} eventos</Badge>
                  <div className="text-xs text-muted-foreground">
                    {new Date(s.last_at).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}
                  </div>
                  <Button size="sm" onClick={() => openReplay(s.session_id)} className="bg-[#2F4F3E] hover:bg-[#2F4F3E]/90">
                    <Play className="w-3 h-3 mr-1" /> Ver
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) { setSelected(null); setPlayerEvents(null); } }}>
        <DialogContent className="max-w-[960px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2F4F3E]">Reproduciendo sesión</DialogTitle>
          </DialogHeader>
          {loadingReplay ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Cargando eventos…
            </div>
          ) : playerEvents && playerEvents.length < 2 ? (
            <div className="py-10 text-center text-muted-foreground">
              Esta sesión es demasiado corta para reproducir ({playerEvents.length} evento).
            </div>
          ) : (
            <div ref={playerRef} className="w-full overflow-hidden rounded-lg border" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
