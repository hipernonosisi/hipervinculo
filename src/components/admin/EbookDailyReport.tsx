import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Play, Calendar } from "lucide-react";

interface Report {
  id: string;
  report_date: string;
  generated_at: string;
  sessions_analyzed: number;
  findings: any;
  summary_md: string;
}

function mdToHtml(md: string) {
  // tiny renderer for headings, bullets, **bold**, `code` — enough for our summary
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc(md)
    .replace(/^# (.+)$/gm, '<h2 class="text-xl font-bold text-[#2F4F3E] mt-4 mb-2">$1</h2>')
    .replace(/^## (.+)$/gm, '<h3 class="text-base font-bold text-[#2F4F3E] mt-4 mb-1">$1</h3>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-sm">$1</li>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, '<code class="bg-muted px-1 rounded text-xs">$1</code>')
    .replace(/\n\n/g, "<br/>")
    .replace(/(<li[^>]*>.*?<\/li>)(\s*<br\/>)?/g, "$1");
}

export default function EbookDailyReport() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("ebook_daily_reports")
      .select("*")
      .order("report_date", { ascending: false })
      .limit(30);
    if (error) console.error(error);
    setReports((data ?? []) as Report[]);
    setLoading(false);
  };

  const runNow = async () => {
    setRunning(true);
    const { error } = await supabase.functions.invoke("ebook-daily-report");
    if (error) console.error(error);
    await fetchReports();
    setRunning(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const active = reports[activeIdx];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-lg font-bold text-[#2F4F3E]">Reporte diario automático</h3>
          <p className="text-sm text-muted-foreground">
            Se genera todos los días a las 08:00 UTC analizando las últimas 500 sesiones del funnel.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchReports} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button size="sm" onClick={runNow} disabled={running} className="bg-[#2F4F3E] hover:bg-[#2F4F3E]/90">
            {running ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />}
            Generar ahora
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Cargando reportes…
        </div>
      ) : reports.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          Aún no hay reportes generados. Pulsa "Generar ahora" para crear el primero.
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            {reports.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setActiveIdx(i)}
                className={`w-full text-left p-2 rounded-lg border transition ${
                  i === activeIdx ? "border-[#8BC34A] bg-[#8BC34A]/10" : "border-border hover:border-[#8BC34A]/40"
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {r.report_date}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {r.sessions_analyzed} sesiones
                </div>
              </button>
            ))}
          </div>

          {active && (
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-[#2F4F3E]">{active.report_date}</Badge>
                <Badge variant="outline">{active.sessions_analyzed} sesiones</Badge>
                <span className="text-xs text-muted-foreground ml-auto">
                  Generado: {new Date(active.generated_at).toLocaleString("es-MX")}
                </span>
              </div>
              <div
                className="prose prose-sm max-w-none [&_h2]:text-[#2F4F3E] [&_h3]:text-[#2F4F3E]"
                dangerouslySetInnerHTML={{ __html: mdToHtml(active.summary_md) }}
              />
              <details className="mt-4 text-xs">
                <summary className="cursor-pointer text-muted-foreground hover:text-[#2F4F3E]">
                  Ver hallazgos en JSON (para análisis avanzado)
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded-lg overflow-x-auto text-[10px] leading-tight max-h-[400px]">
                  {JSON.stringify(active.findings, null, 2)}
                </pre>
              </details>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
