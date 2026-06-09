import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DollarSign, ShoppingBag, Download, Mail, MapPin, TrendingUp,
  RefreshCw, FileDown, Eye, Smartphone, Globe, Calendar,
} from "lucide-react";
import { toast } from "sonner";

type Purchase = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  stripe_session_id: string;
  amount_cents: number;
  currency: string;
  price_variant: string | null;
  marketing_opt_in: boolean;
  download_count: number;
  max_downloads: number;
  paid_at: string | null;
  created_at: string;
  expires_at: string | null;
  email_sent_at: string | null;
  first_downloaded_at: string | null;
  last_downloaded_at: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  client_ip: string | null;
  user_agent: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
};

type DownloadLog = {
  id: string;
  downloaded_at: string;
  client_ip: string | null;
  user_agent: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
};

const RANGES: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90, "all": 0 };

function fmtMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}
function fmtDate(s: string | null) {
  if (!s) return "—";
  return new Date(s).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" });
}
function deviceFromUA(ua: string | null) {
  if (!ua) return "Desconocido";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Linux/i.test(ua)) return "Linux";
  return "Otro";
}

export function EbookSalesDashboard() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<string>("30d");
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [downloadedFilter, setDownloadedFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Purchase | null>(null);
  const [logs, setLogs] = useState<DownloadLog[]>([]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("ebook_purchases")
      .select("*")
      .order("paid_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      toast.error("Error cargando ventas");
    } else {
      setPurchases((data as Purchase[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // Open detail → fetch logs
  useEffect(() => {
    if (!selected) { setLogs([]); return; }
    (async () => {
      const { data } = await supabase
        .from("ebook_download_logs")
        .select("*")
        .eq("purchase_id", selected.id)
        .order("downloaded_at", { ascending: false });
      setLogs((data as DownloadLog[]) || []);
    })();
  }, [selected]);

  const filtered = useMemo(() => {
    const days = RANGES[range];
    const cutoff = days ? Date.now() - days * 86400000 : 0;
    const q = search.trim().toLowerCase();
    return purchases.filter((p) => {
      if (!p.paid_at) return false; // only show actual paid
      if (cutoff && new Date(p.paid_at).getTime() < cutoff) return false;
      if (countryFilter !== "all" && (p.country || "Desconocido") !== countryFilter) return false;
      if (downloadedFilter === "downloaded" && p.download_count === 0) return false;
      if (downloadedFilter === "not_downloaded" && p.download_count > 0) return false;
      if (q) {
        const hay = `${p.name} ${p.email} ${p.phone || ""} ${p.city || ""} ${p.country || ""} ${p.utm_source || ""} ${p.utm_campaign || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [purchases, range, search, countryFilter, downloadedFilter]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const revenue = filtered.reduce((s, p) => s + (p.amount_cents || 0), 0);
    const downloaded = filtered.filter((p) => p.download_count > 0).length;
    const optIn = filtered.filter((p) => p.marketing_opt_in).length;
    const downloadRate = total ? Math.round((downloaded / total) * 100) : 0;
    const aov = total ? revenue / total : 0;
    return { total, revenue, downloaded, optIn, downloadRate, aov };
  }, [filtered]);

  const countryStats = useMemo(() => {
    const map = new Map<string, { count: number; revenue: number }>();
    filtered.forEach((p) => {
      const key = p.country || "Desconocido";
      const e = map.get(key) || { count: 0, revenue: 0 };
      e.count += 1;
      e.revenue += p.amount_cents || 0;
      map.set(key, e);
    });
    return Array.from(map.entries())
      .map(([country, v]) => ({ country, ...v }))
      .sort((a, b) => b.count - a.count);
  }, [filtered]);

  const sourceStats = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((p) => {
      const src = p.utm_source || (p.referrer ? new URL(p.referrer.startsWith("http") ? p.referrer : `https://${p.referrer}`).hostname : "directo");
      map.set(src, (map.get(src) || 0) + 1);
    });
    return Array.from(map.entries()).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count);
  }, [filtered]);

  const allCountries = useMemo(() => {
    const set = new Set<string>();
    purchases.forEach((p) => p.paid_at && set.add(p.country || "Desconocido"));
    return Array.from(set).sort();
  }, [purchases]);

  const exportCsv = () => {
    const headers = [
      "Fecha", "Nombre", "Email", "Teléfono", "Monto", "Moneda", "Variante",
      "País", "Ciudad", "Región", "IP", "Dispositivo",
      "Marketing Opt-in", "Descargas", "Primera descarga", "Última descarga",
      "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content", "Referrer",
      "Stripe Session",
    ];
    const rows = filtered.map((p) => [
      fmtDate(p.paid_at), p.name, p.email, p.phone || "",
      (p.amount_cents / 100).toFixed(2), p.currency.toUpperCase(),
      p.price_variant || "", p.country || "", p.city || "", p.region || "",
      p.client_ip || "", deviceFromUA(p.user_agent),
      p.marketing_opt_in ? "Sí" : "No",
      String(p.download_count),
      fmtDate(p.first_downloaded_at), fmtDate(p.last_downloaded_at),
      p.utm_source || "", p.utm_medium || "", p.utm_campaign || "",
      p.utm_term || "", p.utm_content || "", p.referrer || "",
      p.stripe_session_id,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ebook-ventas-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado");
  };

  const currency = filtered[0]?.currency || "usd";

  return (
    <div className="space-y-6">
      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl shadow-sm">
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 días</SelectItem>
            <SelectItem value="30d">Últimos 30 días</SelectItem>
            <SelectItem value="90d">Últimos 90 días</SelectItem>
            <SelectItem value="all">Todo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="País" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los países</SelectItem>
            {allCountries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={downloadedFilter} onValueChange={setDownloadedFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las compras</SelectItem>
            <SelectItem value="downloaded">Descargadas</SelectItem>
            <SelectItem value="not_downloaded">No descargadas</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Buscar nombre, email, ciudad, UTM..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refrescar
        </Button>
        <Button size="sm" onClick={exportCsv} disabled={!filtered.length}>
          <FileDown className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Ventas", value: stats.total, Icon: ShoppingBag, color: "#2F4F3E" },
          { label: "Revenue", value: fmtMoney(stats.revenue, currency), Icon: DollarSign, color: "#8BC34A" },
          { label: "Ticket medio", value: fmtMoney(stats.aov, currency), Icon: TrendingUp, color: "#2F4F3E" },
          { label: "Descargadas", value: `${stats.downloaded} (${stats.downloadRate}%)`, Icon: Download, color: "#8BC34A" },
          { label: "Marketing OK", value: stats.optIn, Icon: Mail, color: "#2F4F3E" },
          { label: "Países", value: countryStats.length, Icon: Globe, color: "#8BC34A" },
        ].map((k) => (
          <Card key={k.label} className="border-0 shadow-sm rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">{k.label}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: k.color }}>
                  <k.Icon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <p className="text-xl font-bold" style={{ color: "#2d4a2d" }}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Country + Source breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="w-4 h-4" /> Top países
            </CardTitle>
          </CardHeader>
          <CardContent>
            {countryStats.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin datos.</p>
            ) : (
              <div className="space-y-2">
                {countryStats.slice(0, 8).map((c) => (
                  <div key={c.country} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{c.country}</span>
                    <span className="text-muted-foreground">{c.count} · {fmtMoney(c.revenue, currency)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4" /> Top fuentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sourceStats.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin datos.</p>
            ) : (
              <div className="space-y-2">
                {sourceStats.slice(0, 8).map((s) => (
                  <div key={s.source} className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate max-w-[70%]">{s.source}</span>
                    <span className="text-muted-foreground">{s.count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sales table */}
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle>Ventas de eBook</CardTitle>
          <CardDescription>{filtered.length} compras en el rango seleccionado · click en una fila para detalle</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Descargas</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Marketing</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Cargando…</TableCell></TableRow>
                )}
                {!loading && filtered.length === 0 && (
                  <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Sin ventas en este rango.</TableCell></TableRow>
                )}
                {filtered.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setSelected(p)}>
                    <TableCell className="text-xs">{fmtDate(p.paid_at)}</TableCell>
                    <TableCell>
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.price_variant || "default"}</div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div>{p.email}</div>
                      <div className="text-muted-foreground">{p.phone || "—"}</div>
                    </TableCell>
                    <TableCell className="text-xs">
                      {p.country ? (
                        <>
                          <div className="font-medium">{p.country}</div>
                          <div className="text-muted-foreground">{[p.city, p.region].filter(Boolean).join(", ") || "—"}</div>
                        </>
                      ) : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell className="font-bold" style={{ color: "#2F4F3E" }}>{fmtMoney(p.amount_cents, p.currency)}</TableCell>
                    <TableCell>
                      {p.download_count === 0 ? (
                        <Badge variant="outline" className="text-orange-600 border-orange-300">No descargado</Badge>
                      ) : (
                        <Badge style={{ backgroundColor: "#8BC34A", color: "#1a2e22" }}>
                          {p.download_count}/{p.max_downloads}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="font-medium">{p.utm_source || "directo"}</div>
                      <div className="text-muted-foreground truncate max-w-[120px]">{p.utm_campaign || "—"}</div>
                    </TableCell>
                    <TableCell>
                      {p.marketing_opt_in ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sí</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell><Eye className="w-4 h-4 text-muted-foreground" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalle de venta</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nombre" value={selected.name} />
                <Field label="Email" value={selected.email} />
                <Field label="Teléfono" value={selected.phone || "—"} />
                <Field label="Monto" value={fmtMoney(selected.amount_cents, selected.currency)} />
                <Field label="Fecha pago" value={fmtDate(selected.paid_at)} />
                <Field label="Variante" value={selected.price_variant || "default"} />
                <Field label="Marketing opt-in" value={selected.marketing_opt_in ? "Sí" : "No"} />
                <Field label="Email enviado" value={fmtDate(selected.email_sent_at)} />
              </div>

              <div className="border-t pt-3">
                <p className="font-semibold mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> Ubicación de compra</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="País" value={selected.country || "—"} />
                  <Field label="Ciudad" value={selected.city || "—"} />
                  <Field label="Región" value={selected.region || "—"} />
                  <Field label="IP" value={selected.client_ip || "—"} />
                  <Field label="Dispositivo" value={deviceFromUA(selected.user_agent)} />
                  <Field label="User Agent" value={selected.user_agent || "—"} className="col-span-2 text-xs" />
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="font-semibold mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Atribución</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="UTM Source" value={selected.utm_source || "—"} />
                  <Field label="UTM Medium" value={selected.utm_medium || "—"} />
                  <Field label="UTM Campaign" value={selected.utm_campaign || "—"} />
                  <Field label="UTM Term" value={selected.utm_term || "—"} />
                  <Field label="UTM Content" value={selected.utm_content || "—"} />
                  <Field label="Referrer" value={selected.referrer || "—"} />
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Download className="w-4 h-4" /> Descargas ({selected.download_count}/{selected.max_downloads})
                </p>
                {logs.length === 0 ? (
                  <p className="text-muted-foreground text-xs">Aún no ha descargado el PDF.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>Dispositivo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((l) => (
                        <TableRow key={l.id}>
                          <TableCell className="text-xs">{fmtDate(l.downloaded_at)}</TableCell>
                          <TableCell className="text-xs">{[l.city, l.country].filter(Boolean).join(", ") || "—"}</TableCell>
                          <TableCell className="text-xs">{l.client_ip || "—"}</TableCell>
                          <TableCell className="text-xs">{deviceFromUA(l.user_agent)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              <div className="border-t pt-3 text-xs text-muted-foreground">
                <Field label="Stripe Session" value={selected.stripe_session_id} className="font-mono" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium break-words">{value}</p>
    </div>
  );
}
