// Generates the automated daily report from the last 500 distinct sessions in
// the ebook funnel. Stores a structured + markdown summary in `ebook_daily_reports`.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FUNNEL_STEPS = [
  "page_view",
  "form_field_focus",
  "form_start",
  "form_submit",
  "checkout_session_created",
  "checkout_redirect",
] as const;

type Ev = {
  session_id: string;
  event_type: string;
  event_data: Record<string, any> | null;
  page_url: string | null;
  created_at: string;
};

function deviceFromUA(ua: string | undefined | null) {
  if (!ua) return "unknown";
  if (/iPhone|iPod|Android.*Mobile/.test(ua)) return "mobile";
  if (/iPad|Android/.test(ua)) return "tablet";
  return "desktop";
}

function median(arr: number[]) {
  if (arr.length === 0) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

function pct(part: number, whole: number) {
  return whole > 0 ? Math.round((part / whole) * 1000) / 10 : 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1) The 500 most recent distinct sessions touching the ebook funnel
    const { data: sessRows, error: sessErr } = await sb
      .from("page_events")
      .select("session_id, created_at, event_data, page_url")
      .like("page_url", "%amazon-fba-ebook%")
      .order("created_at", { ascending: false })
      .limit(8000);
    if (sessErr) throw sessErr;

    const sessionsMap = new Map<string, { last: string; ua?: string; variant?: string }>();
    for (const r of sessRows ?? []) {
      const sid = (r as any).session_id;
      if (!sessionsMap.has(sid)) {
        sessionsMap.set(sid, {
          last: (r as any).created_at,
          ua: (r as any).event_data?.userAgent,
          variant: (r as any).event_data?.variant || (r as any).event_data?.n,
        });
      } else {
        const cur = sessionsMap.get(sid)!;
        if (!cur.ua && (r as any).event_data?.userAgent) cur.ua = (r as any).event_data.userAgent;
        if (!cur.variant && ((r as any).event_data?.variant || (r as any).event_data?.n)) {
          cur.variant = (r as any).event_data?.variant || (r as any).event_data?.n;
        }
      }
    }
    const ranked = Array.from(sessionsMap.entries())
      .sort((a, b) => (a[1].last < b[1].last ? 1 : -1))
      .slice(0, 500);
    const sessionIds = ranked.map(([sid]) => sid);
    if (sessionIds.length === 0) {
      return new Response(JSON.stringify({ ok: true, sessions_analyzed: 0, note: "no_sessions" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2) Fetch all events for those sessions (paginated to bypass 1k limit)
    const events: Ev[] = [];
    const chunkSize = 100; // session_ids per IN query
    for (let i = 0; i < sessionIds.length; i += chunkSize) {
      const slice = sessionIds.slice(i, i + chunkSize);
      let from = 0;
      while (true) {
        const { data, error } = await sb
          .from("page_events")
          .select("session_id, event_type, event_data, page_url, created_at")
          .in("session_id", slice)
          .order("created_at", { ascending: true })
          .range(from, from + 999);
        if (error) throw error;
        if (!data || data.length === 0) break;
        events.push(...(data as Ev[]));
        if (data.length < 1000) break;
        from += 1000;
      }
    }

    // 3) Aggregate per session
    type SessAgg = {
      sid: string;
      device: string;
      variant: string;
      reached: Set<string>;
      firstAt: number;
      lastAt: number;
      stepFirst: Record<string, number>;
      fields: Record<string, { focusCount: number; dwellMs: number[]; lastBlur?: { valid: boolean; len: number } }>;
      submitted: boolean;
      checkout: boolean;
    };
    const byId = new Map<string, SessAgg>();
    for (const e of events) {
      let agg = byId.get(e.session_id);
      const ts = new Date(e.created_at).getTime();
      const variant = (e.event_data as any)?.variant || (e.event_data as any)?.n;
      const ua = (e.event_data as any)?.userAgent;
      if (!agg) {
        agg = {
          sid: e.session_id,
          device: deviceFromUA(ua),
          variant: variant || "default",
          reached: new Set(),
          firstAt: ts,
          lastAt: ts,
          stepFirst: {},
          fields: {},
          submitted: false,
          checkout: false,
        };
        byId.set(e.session_id, agg);
      }
      if (ua && agg.device === "unknown") agg.device = deviceFromUA(ua);
      if (variant && agg.variant === "default") agg.variant = variant;
      agg.lastAt = Math.max(agg.lastAt, ts);
      agg.firstAt = Math.min(agg.firstAt, ts);
      agg.reached.add(e.event_type);
      if (!(e.event_type in agg.stepFirst)) agg.stepFirst[e.event_type] = ts;

      if (e.event_type === "form_field_focus") {
        const f = (e.event_data as any)?.field || "unknown";
        if (!agg.fields[f]) agg.fields[f] = { focusCount: 0, dwellMs: [] };
        agg.fields[f].focusCount += 1;
      } else if (e.event_type === "form_field_blur") {
        const f = (e.event_data as any)?.field || "unknown";
        if (!agg.fields[f]) agg.fields[f] = { focusCount: 0, dwellMs: [] };
        const dwell = Number((e.event_data as any)?.dwell_ms) || 0;
        if (dwell > 0 && dwell < 10 * 60 * 1000) agg.fields[f].dwellMs.push(dwell);
        agg.fields[f].lastBlur = {
          valid: !!(e.event_data as any)?.valid,
          len: Number((e.event_data as any)?.value_len) || 0,
        };
      } else if (e.event_type === "form_submit") {
        agg.submitted = true;
      } else if (e.event_type === "checkout_session_created" || e.event_type === "checkout_redirect") {
        agg.checkout = true;
      }
    }

    const sessions = Array.from(byId.values());
    const total = sessions.length;

    // 4) Funnel rates
    const funnel = FUNNEL_STEPS.map((step) => ({
      step,
      count: sessions.filter((s) => s.reached.has(step)).length,
    }));
    const reachedView = funnel.find((f) => f.step === "page_view")!.count;
    const funnelWithRate = funnel.map((f, i) => ({
      ...f,
      pct_of_views: pct(f.count, reachedView),
      drop_pct_from_prev: i === 0 ? 0 : pct(funnel[i - 1].count - f.count, funnel[i - 1].count || 1),
    }));

    // 5) Step-to-step median time (only for sessions reaching the later step)
    const stepTimings = FUNNEL_STEPS.slice(1).map((to, idx) => {
      const from = FUNNEL_STEPS[idx];
      const deltas = sessions
        .filter((s) => s.stepFirst[from] && s.stepFirst[to])
        .map((s) => s.stepFirst[to] - s.stepFirst[from])
        .filter((d) => d >= 0 && d < 30 * 60 * 1000);
      return { from, to, sample: deltas.length, median_ms: median(deltas) };
    });

    // 6) Field stuck stats
    const fieldKeys = new Set<string>();
    sessions.forEach((s) => Object.keys(s.fields).forEach((k) => fieldKeys.add(k)));
    const fieldStats = Array.from(fieldKeys).map((field) => {
      const focusedSessions = sessions.filter((s) => s.fields[field]?.focusCount);
      const dwellPool = focusedSessions.flatMap((s) => s.fields[field].dwellMs);
      const blurredEmpty = focusedSessions.filter((s) => s.fields[field].lastBlur && s.fields[field].lastBlur!.len === 0).length;
      const blurredInvalid = focusedSessions.filter((s) => s.fields[field].lastBlur && !s.fields[field].lastBlur!.valid && s.fields[field].lastBlur!.len > 0).length;
      const abandonedAfter = focusedSessions.filter((s) => !s.submitted).length;
      return {
        field,
        sessions_focused: focusedSessions.length,
        avg_focus_count: focusedSessions.length
          ? Math.round((focusedSessions.reduce((a, s) => a + s.fields[field].focusCount, 0) / focusedSessions.length) * 10) / 10
          : 0,
        median_dwell_ms: median(dwellPool),
        blurred_empty: blurredEmpty,
        blurred_invalid: blurredInvalid,
        abandon_rate_pct: pct(abandonedAfter, focusedSessions.length),
      };
    }).sort((a, b) => b.abandon_rate_pct - a.abandon_rate_pct);

    // 7) Splits by variant + device
    const splitBy = (key: "variant" | "device") => {
      const groups = new Map<string, SessAgg[]>();
      sessions.forEach((s) => {
        const k = (s as any)[key] || "unknown";
        if (!groups.has(k)) groups.set(k, []);
        groups.get(k)!.push(s);
      });
      return Array.from(groups.entries()).map(([k, arr]) => ({
        key: k,
        sessions: arr.length,
        form_starts: arr.filter((s) => s.reached.has("form_start") || s.reached.has("form_field_focus")).length,
        form_submits: arr.filter((s) => s.submitted).length,
        checkouts: arr.filter((s) => s.checkout).length,
        submit_rate_pct: pct(arr.filter((s) => s.submitted).length, arr.length),
      })).sort((a, b) => b.sessions - a.sessions);
    };
    const byVariant = splitBy("variant");
    const byDevice = splitBy("device");

    // 8) Top abandon-after-field findings
    const topStuck = fieldStats.filter((f) => f.sessions_focused >= 3).slice(0, 3);

    const summaryLines: string[] = [];
    summaryLines.push(`# Reporte diario del eBook — ${new Date().toISOString().slice(0, 10)}`);
    summaryLines.push(`Ventana analizada: **últimas ${total} sesiones** del funnel \`/amazon-fba-ebook*\`.`);
    summaryLines.push("");
    summaryLines.push("## Embudo (% sobre page_view)");
    funnelWithRate.forEach((f) => {
      summaryLines.push(`- \`${f.step}\`: **${f.count}** (${f.pct_of_views}%) — caída desde el paso anterior: ${f.drop_pct_from_prev}%`);
    });
    summaryLines.push("");
    summaryLines.push("## Tiempo mediano entre pasos");
    stepTimings.forEach((t) => {
      summaryLines.push(`- \`${t.from}\` → \`${t.to}\`: ${Math.round(t.median_ms / 1000)}s (n=${t.sample})`);
    });
    summaryLines.push("");
    summaryLines.push("## Campos con mayor fricción");
    if (topStuck.length === 0) {
      summaryLines.push("- (sin datos suficientes de campos)");
    } else {
      topStuck.forEach((f) => {
        summaryLines.push(`- **${f.field}**: ${f.sessions_focused} foc., abandono ${f.abandon_rate_pct}%, dwell mediano ${Math.round(f.median_dwell_ms / 1000)}s, vacíos al blur: ${f.blurred_empty}, inválidos: ${f.blurred_invalid}`);
      });
    }
    summaryLines.push("");
    summaryLines.push("## Conversión por variante");
    byVariant.forEach((g) => {
      summaryLines.push(`- \`${g.key}\`: ${g.sessions} sesiones → ${g.form_submits} submits (${g.submit_rate_pct}%) → ${g.checkouts} checkouts`);
    });
    summaryLines.push("");
    summaryLines.push("## Conversión por dispositivo");
    byDevice.forEach((g) => {
      summaryLines.push(`- \`${g.key}\`: ${g.sessions} sesiones → ${g.form_submits} submits (${g.submit_rate_pct}%)`);
    });

    const findings = {
      window: { sessions: total, from: ranked[ranked.length - 1]?.[1].last, to: ranked[0]?.[1].last },
      funnel: funnelWithRate,
      step_timings: stepTimings,
      field_stats: fieldStats,
      by_variant: byVariant,
      by_device: byDevice,
    };
    const summary_md = summaryLines.join("\n");

    const today = new Date().toISOString().slice(0, 10);
    const { error: upErr } = await sb.from("ebook_daily_reports").upsert(
      { report_date: today, sessions_analyzed: total, findings, summary_md, generated_at: new Date().toISOString() },
      { onConflict: "report_date" },
    );
    if (upErr) throw upErr;

    return new Response(JSON.stringify({ ok: true, sessions_analyzed: total, report_date: today }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[ebook-daily-report]", (e as Error).message);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
