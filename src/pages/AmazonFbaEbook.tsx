import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Package, TrendingUp, Shield, Clock, Star, Lock,
  FileText, Zap, BookOpen, DollarSign, Truck, BarChart3, Users,
  AlertTriangle, ShieldCheck, Flame, Eye,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo-hipervinculo.png";
import { Footer } from "@/components/layout/Footer";
import { FloatingField } from "@/components/ebook/FloatingField";
import { VSLPlayer } from "@/components/VSLPlayer";
import { usePageTracking, trackEvent } from "@/hooks/usePageTracking";
import vslEbookAsset from "@/assets/vsl-ebook.mp4.asset.json";
import vslPosterAsset from "@/assets/vsl-poster.jpg.asset.json";


const PRICE_USD = 47;
const ORIG_USD = 90;

const benefits = [
  { icon: Package, title: "Validar sin comprar inventario", desc: "Prueba si un producto se vende en Amazon antes de gastar un dólar en stock." },
  { icon: BarChart3, title: "Decidir con datos, no con fe", desc: "Sabe con datos reales cuándo conviene invertir en inventario y cuándo no." },
  { icon: Truck, title: "Proveedores white-label en EE.UU.", desc: "Consigue quién te lo envíe con tu marca, desde Estados Unidos, en días." },
  { icon: Shield, title: "Cumple la política de Amazon", desc: "Vende sin arriesgar tu cuenta siguiendo las reglas vigentes del marketplace." },
  { icon: Clock, title: "Plan claro de 90 días", desc: "Plantillas, checklists y KPIs listos para ejecutar paso a paso." },
  { icon: DollarSign, title: "Escala solo lo que funciona", desc: "Reduce hasta 85% el capital de validación con el modelo en dos fases." },
];

const chapters = [
  "Cómo elegir productos ganadores sin gastar en muestras",
  "Negociación con proveedores white-label en EE.UU.",
  "Setup paso a paso de tu cuenta de Seller Central",
  "Cómo enviar inventario al FBA desde el proveedor (sin tocarlo)",
  "Plantillas de listados que convierten",
  "Estructura de campañas PPC para nuevos lanzamientos",
  "Métricas de rentabilidad: ACoS, TACoS, márgenes reales",
  "Errores que destruyen cuentas (y cómo evitarlos)",
];

const faqs = [
  { q: "¿Necesito experiencia previa con Amazon?", a: "No. La guía empieza desde cero y te lleva paso a paso hasta tener tu primer producto en venta." },
  { q: "¿Funciona desde cualquier país?", a: "Sí. Cubrimos el modelo para vendedores desde LATAM, España y EE.UU." },
  { q: "¿Cuánto capital necesito?", a: "Mucho menos que FBA tradicional. La guía incluye estimaciones reales según tu mercado." },
  { q: "¿Cómo recibo el PDF?", a: "Te llega por correo en menos de 2 minutos después de pagar, con un enlace de descarga seguro y personal." },
];

export default function AmazonFbaEbook() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  usePageTracking("/amazon-fba-ebook");
  const [form, setForm] = useState({ name: "", email: "" });
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [viewers, setViewers] = useState(17);
  const [secondsLeft, setSecondsLeft] = useState(45 * 60); // 45 min flash discount
  const formStartTracked = useRef(false);

  const trackFormStart = () => {
    if (formStartTracked.current) return;
    formStartTracked.current = true;
    trackEvent('form_start', {}, '/amazon-fba-ebook');
  };

  const variant = new URLSearchParams(window.location.search).get("v") || "default";

  // Show sticky CTA bar after scrolling past hero
  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live viewers ticker
  useEffect(() => {
    const id = setInterval(() => {
      setViewers((v) => Math.max(9, Math.min(34, v + Math.round((Math.random() - 0.5) * 4))));
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // Countdown timer
  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Completa todos los campos");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("El correo electrónico no parece válido. Revísalo antes de continuar.");
      return;
    }

    setLoading(true);
    trackEvent('form_submit', { variant }, '/amazon-fba-ebook');
    try {
      const { name, email } = form;
      // Capture attribution
      const params = new URLSearchParams(window.location.search);
      const getCookie = (n: string) => {
        const m = document.cookie.match(new RegExp("(?:^|; )" + n + "=([^;]*)"));
        return m ? decodeURIComponent(m[1]) : undefined;
      };
      // Persist UTMs across sessions
      const stored = (() => { try { return JSON.parse(localStorage.getItem("hv_attribution") || "{}"); } catch { return {}; } })();
      const utm_source = params.get("utm_source") || stored.utm_source;
      const utm_medium = params.get("utm_medium") || stored.utm_medium;
      const utm_campaign = params.get("utm_campaign") || stored.utm_campaign;
      const utm_term = params.get("utm_term") || stored.utm_term;
      const utm_content = params.get("utm_content") || stored.utm_content;
      const referrer = stored.referrer || document.referrer || undefined;
      try {
        localStorage.setItem("hv_attribution", JSON.stringify({
          utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer,
        }));
      } catch {}

      const { data, error } = await supabase.functions.invoke("create-ebook-checkout", {
        body: {
          name, email, phone, variant, marketing_opt_in: marketingOptIn,
          utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer,
          fbp: getCookie("_fbp"), fbc: getCookie("_fbc"),
        },
      });

      if (error) throw error;
      if (data?.url) {
        trackEvent('checkout_session_created', { variant, lead_id: data?.lead_id }, '/amazon-fba-ebook');
        trackEvent('checkout_redirect', { variant }, '/amazon-fba-ebook');
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo iniciar el pago");
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || String(err);
      trackEvent('checkout_error', { variant, error: msg.slice(0, 200) }, '/amazon-fba-ebook');
      toast.error("Error al iniciar el pago. Intenta de nuevo.");
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white text-foreground">
      <SEO
        title="Amazon FBA Sin Inventario | Guía PDF Hipervínculo"
        description="Aprende a vender en Amazon FBA sin manejar inventario. Guía PDF completa con estrategias 2026, proveedores y plantillas. Descarga inmediata."
        url="https://hipervinculo.net/amazon-fba-ebook"
      />

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-border/40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="bg-white p-1.5 rounded shrink-0">
            <img src={logo} alt="Hipervínculo" className="h-7 md:h-10" />
          </div>
          <a href="#comprar" className="inline-flex shrink-0">
            <Button size="sm" className="bg-[#2F4F3E] hover:bg-[#2F4F3E]/90 text-white text-xs sm:text-sm h-9 px-3 sm:px-4">
              <span className="hidden sm:inline">Comprar guía · </span>${PRICE_USD}
            </Button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#2F4F3E] text-white">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, #8BC34A 0, transparent 40%), radial-gradient(circle at 80% 80%, #8BC34A 0, transparent 40%)"
        }} />
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-[#8BC34A] text-[#1a2e22] px-3 py-1 rounded-full text-xs font-bold mb-6">
                <Zap className="w-3 h-3" /> NUEVA EDICIÓN 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
                Vende en Amazon <span className="text-[#8BC34A]">sin quemar tu dinero</span>
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-6 leading-relaxed">
                Valida tu producto <strong>antes</strong> de comprar inventario — y escala solo lo que ya funciona. Guía PDF con 32 criterios de producto ganador y 3 plantillas listas para usar.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-1 text-[#8BC34A]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-sm text-white/70">32 criterios · 3 plantillas</span>
              </div>

              {/* Urgency banner */}
              <div className="inline-flex items-center gap-2 bg-[#8BC34A]/15 border border-[#8BC34A]/40 rounded-lg px-3 py-2 mb-5">
                <Flame className="w-4 h-4 text-[#8BC34A] animate-pulse" />
                <span className="text-sm text-white">
                  Descuento -48% termina en <strong className="font-mono text-[#8BC34A]">{mm}:{ss}</strong>
                </span>
              </div>

              <div className="flex flex-wrap gap-4 items-baseline mb-6">
                <motion.span
                  className="text-5xl font-extrabold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  ${PRICE_USD}
                </motion.span>
                <span className="text-xl line-through text-white/50">${ORIG_USD}</span>
                <span className="bg-[#8BC34A] text-[#1a2e22] text-xs font-bold px-2 py-1 rounded">-48%</span>
              </div>
              <a href="#comprar">
                <Button size="lg" className="bg-[#8BC34A] hover:bg-[#8BC34A]/90 text-[#1a2e22] font-bold text-base px-8 py-6">
                  Descargar mi guía ahora →
                </Button>
              </a>
              <div className="flex items-center gap-2 mt-6 text-sm text-white/70">
                <Lock className="w-4 h-4" /> Pago seguro · Descarga inmediata por email
              </div>
            </motion.div>

            <div className="flex justify-center relative">
              <div className="absolute -inset-4 bg-[#8BC34A]/20 blur-2xl rounded-full pointer-events-none" />
              <VSLPlayer
                videoUrls={[vslEbookAsset.url]}
                poster={vslPosterAsset.url}
                ctaUrl="#comprar"
                ctaLabel={`Comprar guía · $${PRICE_USD}`}
                tapToWatchLabel="Toca para ver con sonido"
                pageUrl="/amazon-fba-ebook"
                className="relative"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] mb-4">Lo que vas a lograr</h2>
            <p className="text-muted-foreground text-lg">El modelo en dos fases: validar sin inventario y escalar con inventario. Basado en operaciones reales con nuestros 200+ clientes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl border border-border bg-white hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-lg bg-[#8BC34A]/15 flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-[#2F4F3E]" />
                </div>
                <h3 className="font-bold text-[#2F4F3E] mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="py-16 md:py-24 bg-[#f7faf6]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <BookOpen className="w-10 h-10 text-[#2F4F3E] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] mb-4">Contenido de la guía</h2>
            <p className="text-muted-foreground text-lg">8 capítulos · descarga inmediata en PDF</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {chapters.map((c, i) => (
              <div key={i} className="flex gap-3 p-4 bg-white rounded-lg border border-border">
                <CheckCircle2 className="w-5 h-5 text-[#8BC34A] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT — 2 columnas: copy persuasivo + buy box compacto */}
      <section id="comprar" className="py-16 md:py-24 bg-[#2F4F3E] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 15% 30%, #8BC34A 0, transparent 35%), radial-gradient(circle at 85% 70%, #8BC34A 0, transparent 35%)"
        }} />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 max-w-6xl mx-auto items-start">

            {/* ───── LEFT: Persuasive copy ───── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#8BC34A] text-[#1a2e22] px-3 py-1 rounded-full text-xs font-bold mb-6">
                <Flame className="w-3 h-3" /> ÚLTIMA OPORTUNIDAD A ESTE PRECIO
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] mb-6 text-white">
                Deja de arriesgar miles en inventario que <span className="underline decoration-[#8BC34A] decoration-4 underline-offset-4">quizás no se venda</span>.
              </h2>

              <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8">
                En las próximas 2 horas puedes tener el sistema completo para validar productos en Amazon <strong className="text-[#8BC34A]">sin comprar stock</strong> — y escalar solo lo que ya está vendiendo.
              </p>

              {/* Stack visible de lo que recibes */}
              <div className="rounded-2xl bg-black/20 border border-white/10 p-5 mb-6">
                <p className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-4">Esto es lo que recibes hoy</p>
                <div className="space-y-2.5">
                  {[
                    { t: "Guía PDF", v: "$67" },
                    { t: "32 criterios de producto ganador", v: "$27" },
                    { t: "3 plantillas (listado, PPC, KPIs)", v: "incluido" },
                    { t: "Checklist de proveedores white-label EE.UU.", v: "incluido" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-[#8BC34A] flex-shrink-0" />
                        <span className="text-white/90 text-sm">{item.t}</span>
                      </div>
                      <span className="text-xs text-white/45 font-mono shrink-0">{item.v}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm text-white/60">Valor total</span>
                  <span className="text-base line-through text-white/40">${ORIG_USD}</span>
                </div>
                <div className="mt-1 flex items-end justify-between">
                  <span className="text-base font-bold text-white">Tu precio hoy</span>
                  <motion.span
                    className="text-3xl font-extrabold text-[#8BC34A] leading-none"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ${PRICE_USD}
                  </motion.span>
                </div>
              </div>

              {/* Testimonio mini */}
              <div className="bg-white/[0.04] border-l-2 border-[#8BC34A] rounded-r-lg p-4 mb-6">
                <div className="flex items-center gap-1 text-[#8BC34A] mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-1.5">
                  "Lancé 3 productos en 90 días sin tocar inventario. Solo escalé el que ya vendía."
                </p>
                <p className="text-xs text-white/55">— Cliente Hipervínculo · 2025</p>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/70">
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#8BC34A]" /> Garantía 7 días</div>
                <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-[#8BC34A]" /> Pago cifrado SSL</div>
                <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#8BC34A]" /> Descarga en 2 min</div>
              </div>
            </motion.div>

            {/* ───── RIGHT: Sticky Buy Box ───── */}
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#8BC34A]/30 to-[#8BC34A]/10 rounded-3xl blur-xl pointer-events-none" />

                <form id="buy-form" onSubmit={handleSubmit} onFocus={trackFormStart} className="relative bg-white text-foreground rounded-2xl p-5 sm:p-7 shadow-2xl scroll-mt-24">
                  {/* Header buy box */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-border">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-1.5 bg-[#8BC34A]/15 text-[#2F4F3E] text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-1.5">
                        <Zap className="w-3 h-3" /> Acceso inmediato
                      </div>
                      <div className="font-extrabold text-[#2F4F3E] text-base leading-tight">Amazon FBA Sin Inventario</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="text-2xl font-extrabold text-[#2F4F3E]">${PRICE_USD}</span>
                      </div>
                      <div className="text-[11px] line-through text-muted-foreground">${ORIG_USD}</div>
                    </div>
                  </div>

                  {/* Countdown urgencia */}
                  <div className="flex items-center justify-between gap-2 bg-[#2F4F3E] rounded-lg px-3 py-2.5 mb-4">
                    <div className="flex items-center gap-2 text-white/90 text-xs">
                      <Flame className="w-4 h-4 text-[#8BC34A] animate-pulse" />
                      <span>Precio sube en</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#8BC34A] font-mono font-bold text-lg tabular-nums">
                      {mm}<span className="text-white/40 animate-pulse">:</span>{ss}
                    </div>
                  </div>

                  {/* Fields — condensados */}
                  <div className="space-y-3">
                    <FloatingField
                      id="name"
                      label="Nombre"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      type="text"
                      maxLength={120}
                    />
                    <FloatingField
                      id="email"
                      label="Tu email (recibirás el PDF aquí)"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      type="email"
                      maxLength={255}
                      validate={(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())}
                    />
                    <FloatingField
                      id="phone"
                      label="WhatsApp"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                      type="tel"
                      maxLength={30}
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  {/* Marketing checkbox compacto */}
                  <label className="flex items-start gap-2 mt-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#2F4F3E] cursor-pointer flex-shrink-0"
                    />
                    <span className="text-[11px] text-muted-foreground leading-snug group-hover:text-[#2F4F3E] transition">
                      Quiero recibir 1 email/mes de Hipervínculo con guías y novedades. Sin spam.
                    </span>
                  </label>

                  {/* Submit con halo pulsante */}
                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0 rgba(139,195,74,0.6)", "0 0 0 12px rgba(139,195,74,0)", "0 0 0 0 rgba(139,195,74,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="rounded-xl mt-5"
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full bg-[#8BC34A] hover:bg-[#8BC34A]/90 text-[#1a2e22] font-extrabold text-base py-6 group"
                    >
                      {loading ? "Procesando..." : (
                        <>
                          Pagar ${PRICE_USD} y descargar
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block ml-1"
                          >→</motion.span>
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Live viewers + Stripe */}
                  <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8BC34A] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8BC34A]" />
                      </span>
                      <strong className="text-[#2F4F3E]">{viewers}</strong> viendo ahora
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Lock className="w-3 h-3" />
                      <span>Procesado por</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25" className="h-3 w-auto inline-block" aria-label="Stripe">
                        <path fill="#635BFF" fillRule="evenodd" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 9.04c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.58-.24 1.58-1C6.31 14 0 14.55 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.39.25-1.39.9 0 1.85 6.35 1.6 6.35 5.88z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] text-center mb-12">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group p-5 rounded-xl border border-border bg-white">
                <summary className="font-bold text-[#2F4F3E] cursor-pointer flex justify-between items-center list-none">
                  {f.q}
                  <span className="text-[#8BC34A] group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* MOBILE STICKY BUY BAR */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#8BC34A] shadow-[0_-8px_24px_rgba(0,0,0,0.15)]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="flex-shrink-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-[#2F4F3E]">${PRICE_USD}</span>
                  <span className="text-xs line-through text-muted-foreground">${ORIG_USD}</span>
                </div>
                <div className="text-[10px] text-[#2F4F3E] font-mono flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#8BC34A]" /> {mm}:{ss}
                </div>
              </div>
              <a href="#buy-form" className="flex-1">
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(139,195,74,0.7)", "0 0 0 10px rgba(139,195,74,0)", "0 0 0 0 rgba(139,195,74,0)"] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="rounded-xl"
                >
                  <Button className="w-full bg-[#8BC34A] hover:bg-[#8BC34A]/90 text-[#1a2e22] font-extrabold text-base h-12">
                    Comprar ahora →
                  </Button>
                </motion.div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>

  );
}
