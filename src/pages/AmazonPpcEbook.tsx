import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Target, TrendingUp, Shield, Clock, Star,
  Lock, Zap, BookOpen, DollarSign, BarChart3, Flame,
  AlertTriangle, ShieldCheck, Calculator, FileSpreadsheet, ListChecks,
  Search, SlidersHorizontal,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo-hipervinculo.png";
import coverAsset from "@/assets/amazon-ppc-cover.jpg.asset.json";
import { Footer } from "@/components/layout/Footer";
import { FloatingField } from "@/components/ebook/FloatingField";
import { PhoneInput } from "@/components/ui/phone-input";
import { PaymentBadges } from "@/components/ebook/PaymentBadges";
import { usePageTracking, useSectionTracking, trackEvent } from "@/hooks/usePageTracking";
import { useSessionRecording } from "@/hooks/useSessionRecording";
import { useFormFieldTracking } from "@/hooks/useFormFieldTracking";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const PRICE_USD = 67;
const ORIG_USD = 97;
const PRODUCT_KEY = "amazon-ppc";
const PAGE_URL = "/publicidad-en-amazon";

const scenarios = [
  { spend: 500, label: "$500", antes: 55, despues: 30, waste: 150, yearly: 1800 },
  { spend: 1500, label: "$1.5K", antes: 57, despues: 28, waste: 450, yearly: 5400 },
  { spend: 5000, label: "$5K", antes: 60, despues: 26, waste: 1700, yearly: 20400 },
  { spend: 25000, label: "$25K", antes: 62, despues: 25, waste: 9250, yearly: 111000 },
  { spend: 100000, label: "$100K", antes: 62, despues: 24, waste: 38000, yearly: 456000 },
];

const fmtMoney = (n: number) =>
  n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;
const fmtMoneyFull = (n: number) =>
  new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);


const benefits = [
  { icon: DollarSign, title: "Recupera margen quemado", desc: "Corta el 20–40% de gasto que hoy va a clics que jamás convierten." },
  { icon: Target, title: "Baja tu ACoS 10–20 puntos", desc: "Del rojo al verde en 30–60 días con reglas claras, no intuición." },
  { icon: TrendingUp, title: "Escala sin perder rentabilidad", desc: "Sube presupuesto solo donde el ROAS ya está blindado matemáticamente." },
  { icon: Shield, title: "Bloquea términos que sangran", desc: "Sistema de negativas desde el día cero: paras la fuga antes de gastarla." },
  { icon: BarChart3, title: "Sabe qué anunciar (y qué no)", desc: "Filtra productos que aguantan PPC. Deja de subsidiar SKUs perdedores." },
  { icon: Clock, title: "2 horas/semana, no 20", desc: "Rutina y checklists para operar la cuenta sin vivir dentro de ella." },
];

const chapters = [
  "Por qué PPC decide quién gana en Amazon",
  "Cómo funciona la subasta de Amazon Ads",
  "ACoS de break-even y vocabulario clave",
  "Los 3 tipos de campañas: SP, SB y SD",
  "Qué productos merecen publicidad",
  "Investigación de keywords y match types",
  "Arquitectura de cuenta y Single Target Campaigns",
  "Bidding por ROAS objetivo y placement multipliers",
  "Ciclo de optimización de 7 días",
  "Negativas con IA y reglas de pausa automatizadas",
  "De ACoS a TACoS: el norte verdadero",
  "Plan maestro de 90 días",
];

const templates = [
  { icon: Calculator, name: "Calculadora de break-even", desc: "Saber tu ACoS objetivo antes de encender un anuncio." },
  { icon: Search, name: "Hoja de priorización de keywords", desc: "Filtra y rankea keywords por intención de compra." },
  { icon: FileSpreadsheet, name: "Estructura de campañas para copiar", desc: "Organización, convención de nombres y presupuesto." },
  { icon: Target, name: "Plantilla STC", desc: "Control individual por keyword/ASIN sin romper la cuenta." },
  { icon: Shield, name: "Plantilla de negativas", desc: "Lista base + flujo de búsquedas no rentables." },
  { icon: ListChecks, name: "Checklist de optimización semanal", desc: "Rutina de 2 horas con KPIs y reglas de pausa." },
];

const faqs = [
  { q: "¿Necesito experiencia previa con Amazon Ads?", a: "No. La guía explica desde cero hasta una estructura avanzada; funciona para sellers y marketers." },
  { q: "¿Funciona para cualquier marketplace de Amazon?", a: "Sí. Los principios son los mismos para EE.UU., Europa y LATAM, con advertencias cuando un mercado difiere." },
  { q: "¿Cuánto presupuesto necesito para empezar?", a: "La guía incluye presupuestos de arranque realistas según tu etapa, desde $10/día hasta estructuras de escala." },
  { q: "¿Cómo recibo el PDF?", a: "Te llega por correo en menos de 2 minutos después de pagar, con un enlace de descarga seguro y personal." },
];

export default function AmazonPpcEbook() {
  const [loading, setLoading] = useState(false);
  usePageTracking(PAGE_URL);
  useSectionTracking(PAGE_URL);
  useSessionRecording(true);
  const variant = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("v") || "default";
  useFormFieldTracking({ pageUrl: PAGE_URL, variant });
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [viewers, setViewers] = useState(17);
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [showCanceledModal, setShowCanceledModal] = useState(false);
  const [scenarioIdx, setScenarioIdx] = useState(2); // default $5K/mes
  const scenario = scenarios[scenarioIdx];
  const formStartTracked = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("canceled") === "1") {
      setShowCanceledModal(true);
      trackEvent('checkout_canceled', {}, PAGE_URL);
    }
    const nameP = params.get("name") || "";
    const emailP = params.get("email") || "";
    const phoneP = params.get("phone") || "";
    if (nameP || emailP || phoneP) {
      setForm((f) => ({ name: nameP || f.name, email: emailP || f.email, phone: phoneP || f.phone }));
      trackEvent('form_autofilled_from_recovery', { source: params.get('utm_source') || 'unknown' }, PAGE_URL);
    }
  }, []);

  const trackFormStart = () => {
    if (formStartTracked.current) return;
    formStartTracked.current = true;
    trackEvent('form_start', {}, PAGE_URL);
  };

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setViewers((v) => Math.max(9, Math.min(34, v + Math.round((Math.random() - 0.5) * 4))));
    }, 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Completa todos los campos");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("El correo electrónico no parece válido. Revísalo antes de continuar.");
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      toast.error("El teléfono no parece válido. Revísalo antes de continuar.");
      return;
    }

    setLoading(true);
    trackEvent('form_submit', { variant, product_key: PRODUCT_KEY }, PAGE_URL);
    try {
      window.fbq?.('track', 'InitiateCheckout', {
        value: PRICE_USD,
        currency: 'USD',
        content_name: 'Publicidad en Amazon Sin Quemar tu Dinero',
        content_category: 'ebook',
      });
    } catch (e) { console.warn('fbq InitiateCheckout error', e); }
    try {
      const { name, email, phone } = form;
      const params = new URLSearchParams(window.location.search);
      const getCookie = (n: string) => {
        const m = document.cookie.match(new RegExp("(?:^|; )" + n + "=([^;]*)"));
        return m ? decodeURIComponent(m[1]) : undefined;
      };
      const stored = (() => { try { return JSON.parse(localStorage.getItem("hv_attribution") || "{}"); } catch { return {}; } })();
      const utm_source = params.get("utm_source") || stored.utm_source;
      const utm_medium = params.get("utm_medium") || stored.utm_medium;
      const utm_campaign = params.get("utm_campaign") || stored.utm_campaign;
      const utm_term = params.get("utm_term") || stored.utm_term;
      const utm_content = params.get("utm_content") || stored.utm_content;
      const referrer = stored.referrer || document.referrer || undefined;
      try {
        localStorage.setItem("hv_attribution", JSON.stringify({ utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer }));
      } catch {}

      const { data, error } = await supabase.functions.invoke("create-ebook-checkout", {
        body: {
          name, email, phone, variant, product_key: PRODUCT_KEY, marketing_opt_in: marketingOptIn,
          utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer,
          fbp: getCookie("_fbp"), fbc: getCookie("_fbc"),
        },
      });
      if (error) throw error;
      if (data?.url) {
        trackEvent('checkout_session_created', { variant, product_key: PRODUCT_KEY, lead_id: data?.lead_id }, PAGE_URL);
        trackEvent('checkout_redirect', { variant, product_key: PRODUCT_KEY }, PAGE_URL);
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo iniciar el pago");
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || String(err);
      trackEvent('checkout_error', { variant, product_key: PRODUCT_KEY, error: msg.slice(0, 200) }, PAGE_URL);
      toast.error("Error al iniciar el pago. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      <SEO
        title="Publicidad en Amazon Sin Quemar tu Dinero · Guía PDF 2026"
        description="Aprende a rentabilizar Amazon PPC: ACoS, negativas, bidding por ROAS, estructura de campañas y 6 plantillas listas. Descarga inmediata."
        url="https://hipervinculo.net/publicidad-en-amazon"
      />

      <AnimatePresence>
        {showCanceledModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowCanceledModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="w-14 h-14 rounded-full bg-[#8BC34A]/20 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-7 h-7 text-[#2F4F3E]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#2F4F3E] text-center mb-2">¿Tuviste algún problema con el pago?</h3>
              <p className="text-sm text-muted-foreground text-center mb-5">No te preocupes. Puedes intentar el pago de nuevo ahora mismo.</p>
              <div className="space-y-3">
                <button
                  onClick={() => { setShowCanceledModal(false); document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full bg-[#2F4F3E] hover:bg-[#2F4F3E]/90 text-white font-bold py-3.5 rounded-xl transition"
                >Intentar el pago otra vez</button>
                <button onClick={() => setShowCanceledModal(false)} className="w-full text-xs text-muted-foreground hover:text-foreground py-2">No, gracias</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Barra de urgencia superior */}
      <div className="w-full bg-[#8BC34A] text-[#1a2e22] text-center text-[11px] sm:text-xs font-bold tracking-wide py-2 px-3">
        OFERTA LANZAMIENTO · AHORRA {Math.round((1 - PRICE_USD / ORIG_USD) * 100)}% HOY · TERMINA EN <span className="font-mono">{mm}:{ss}</span>
      </div>

      {/* HERO SPLIT */}
      <section data-section="hero" className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 pt-10 pb-14 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            {/* Izquierda: promesa */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#2F4F3E]/5 ring-1 ring-inset ring-[#2F4F3E]/10 px-3 py-1 text-[11px] sm:text-xs font-bold text-[#2F4F3E] mb-5">
                <Zap className="w-3 h-3 text-[#8BC34A]" /> GUÍA PDF · EDICIÓN 2026
              </div>
              <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#2F4F3E]">
                Deja de quemar clics que no venden. Sirve si gastas <span className="text-[#8BC34A]">$500 a $100.000/mes</span>.
              </h1>
              <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#2F4F3E]/75 leading-relaxed max-w-xl mx-auto lg:mx-0">
                El sistema exacto para bajar tu ACoS del 60% al 25% y convertir tu cuenta de Amazon en una máquina rentable — sin agencia, sin adivinar, sin cursos de 20 horas.
              </p>

              <ul className="mt-6 space-y-2.5 text-left max-w-md mx-auto lg:mx-0">
                  {[
                    { k: "Recuperas", v: "$150 a $38.000/mes según tu gasto" },
                    { k: "Bajas", v: "ACoS 10–20 puntos en 60 días" },
                    { k: "Ganas", v: "2 horas/semana para operar toda la cuenta" },
                  ].map((it) => (
                  <li key={it.k} className="flex items-start gap-2.5 text-sm sm:text-base text-[#2F4F3E]">
                    <CheckCircle2 className="w-5 h-5 text-[#8BC34A] flex-shrink-0 mt-0.5" />
                    <span><strong className="font-bold">{it.k}</strong> <span className="text-[#2F4F3E]/80">{it.v}</span></span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a href="#comprar" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-[#8BC34A] hover:bg-[#8BC34A]/90 text-[#1a2e22] font-extrabold text-base px-8 py-6 h-auto rounded-xl">
                    Descargar guía por ${PRICE_USD} →
                  </Button>
                </a>
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-sm text-[#2F4F3E]/60 line-through">Antes ${ORIG_USD}</span>
                  <span className="text-xs font-bold text-[#2F4F3E]">PDF · Descarga en 2 min</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#2F4F3E]/70 justify-center lg:justify-start">
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#8BC34A]" /> Garantía 7 días</div>
                <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-[#8BC34A]" /> Pago cifrado</div>
                <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#8BC34A] fill-current" /> +200 clientes reales</div>
              </div>
            </motion.div>

            {/* Derecha: tarjeta oscura de impacto */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative rounded-3xl bg-[#2F4F3E] p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
                  backgroundImage: "radial-gradient(circle at 20% 10%, #8BC34A 0, transparent 45%), radial-gradient(circle at 85% 90%, #8BC34A 0, transparent 45%)"
                }} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#8BC34A] uppercase tracking-widest">Impacto en tu cuenta</h3>
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Mes 1 → Mes 3</span>
                  </div>

                  {/* Selector de escenario */}
                  <div className="mb-5">
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">Selecciona tu gasto mensual</div>
                    <div className="flex flex-wrap gap-2">
                      {scenarios.map((s, i) => (
                        <button
                          key={s.spend}
                          type="button"
                          onClick={() => setScenarioIdx(i)}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold transition-all ${
                            i === scenarioIdx
                              ? "bg-[#8BC34A] text-[#1a2e22] shadow-lg"
                              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Antes */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Hoy sin sistema</span>
                        <span className="text-red-400 text-[10px] font-bold uppercase">Quemando</span>
                      </div>
                      <div className="flex justify-between items-end mb-2">
                        <motion.span
                          key={`antes-${scenario.spend}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl sm:text-4xl font-extrabold"
                        >
                          {scenario.antes}%
                        </motion.span>
                        <span className="text-xs text-red-300">−{fmtMoney(scenario.waste)}/mes fuga</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          key={`bar-antes-${scenario.spend}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${scenario.antes}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-red-400 h-full"
                        />
                      </div>
                    </div>

                    {/* Después */}
                    <div className="rounded-xl border border-[#8BC34A]/40 bg-[#8BC34A]/10 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BC34A]">Con la guía</span>
                        <span className="bg-[#8BC34A] text-[#1a2e22] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">Rentable</span>
                      </div>
                      <div className="flex justify-between items-end mb-2">
                        <motion.span
                          key={`dsp-${scenario.spend}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl sm:text-4xl font-extrabold text-[#8BC34A]"
                        >
                          {scenario.despues}%
                        </motion.span>
                        <span className="text-xs text-[#8BC34A]">+{fmtMoney(scenario.waste)} utilidad neta</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          key={`bar-dsp-${scenario.spend}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${scenario.despues}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-[#8BC34A] h-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Diferencia mensual</div>
                      <div className="text-2xl font-extrabold text-[#8BC34A]">+{fmtMoneyFull(scenario.waste)} <span className="text-xs text-white/60 font-medium">a tu bolsillo</span></div>
                    </div>
                    <img
                      src={coverAsset.url}
                      alt="Publicidad en Amazon Sin Quemar tu Dinero"
                      className="w-16 sm:w-20 rounded-lg shadow-xl border border-white/20"
                      width={1024} height={1024}
                    />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#2F4F3E]/50 mt-3 text-center lg:text-left">
                * Escenario: {scenario.label}/mes. Cifras basadas en cuentas reales gestionadas por Hipervínculo. Tus resultados dependerán de tu categoría y ejecución.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BANDA DE AHORRO — 3 NÚMEROS GIGANTES */}
      <section className="bg-[#f7faf6] border-y border-[#2F4F3E]/10 py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-[#8BC34A]/20 text-[#2F4F3E] text-xs font-bold uppercase tracking-wider mb-4">Cuánto te ahorras</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] leading-tight">
              El costo real de <span className="underline decoration-[#8BC34A] decoration-4 underline-offset-4">no tener</span> este sistema.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { big: "$150 a $38K", label: "gasto quemado/mes según escala", sub: "Desde cuentas de $500/mes hasta $100.000/mes gestionadas por Hipervínculo." },
              { big: "−47%", label: "reducción de ACoS típica", sub: "Aplicando el ciclo de optimización de 7 días de la guía." },
              { big: "14 días", label: "para recuperar la inversión", sub: "El precio de la guía se paga solo con la primera negativa que apliques." },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-white border border-[#2F4F3E]/10 p-6 sm:p-7 hover:border-[#8BC34A]/60 hover:shadow-lg transition">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2F4F3E] leading-none tracking-tight mb-3 whitespace-nowrap">{s.big}</div>
                <div className="text-sm font-bold text-[#8BC34A] uppercase tracking-wider mb-2">{s.label}</div>
                <div className="text-sm text-[#2F4F3E]/70 leading-relaxed">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS — outcome-first */}
      <section data-section="benefits" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] mb-4">Lo que consigues aplicando la guía</h2>
            <p className="text-[#2F4F3E]/70 text-lg">Resultados medibles, no teoría. Cada capítulo va directo al dinero.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-[#2F4F3E]/10 bg-white hover:border-[#8BC34A]/60 hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-xl bg-[#2F4F3E] flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-[#8BC34A]" />
                </div>
                <h3 className="font-bold text-[#2F4F3E] mb-2 text-lg">{b.title}</h3>
                <p className="text-sm text-[#2F4F3E]/70 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section data-section="chapters" className="py-16 md:py-24 bg-[#f7faf6]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <BookOpen className="w-10 h-10 text-[#2F4F3E] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] mb-4">Contenido de la guía</h2>
            <p className="text-muted-foreground text-lg">100 páginas · 31 capítulos · descarga inmediata en PDF</p>
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

      <section data-section="templates" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] mb-4">6 plantillas listas para usar</h2>
            <p className="text-muted-foreground text-lg">No solo teoría: recibes hojas de trabajo para aplicar el sistema desde el día 1.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-[#f7faf6] hover:border-[#8BC34A]/50 transition">
                <div className="w-10 h-10 rounded-lg bg-[#2F4F3E] flex items-center justify-center mb-4">
                  <t.icon className="w-5 h-5 text-[#8BC34A]" />
                </div>
                <h3 className="font-bold text-[#2F4F3E] mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-section="checkout" id="comprar" className="py-16 md:py-24 bg-[#2F4F3E] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 15% 30%, #8BC34A 0, transparent 35%), radial-gradient(circle at 85% 70%, #8BC34A 0, transparent 35%)"
        }} />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 max-w-6xl mx-auto items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-[#8BC34A] text-[#1a2e22] px-3 py-1 rounded-full text-xs font-bold mb-6">
                <Flame className="w-3 h-3" /> ÚLTIMA OPORTUNIDAD A ESTE PRECIO
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] mb-6 text-white">
                Deja de pagar clics que <span className="underline decoration-[#8BC34A] decoration-4 underline-offset-4">no te dejan ganancia</span>.
              </h2>
              <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8">
                En las próximas 2 horas puedes tener el sistema completo para gestionar Amazon PPC con <strong className="text-[#8BC34A]">rentabilidad</strong> — sin depender de intuición ni de agencias caras.
              </p>

              <div className="rounded-2xl bg-black/20 border border-white/10 p-5 mb-6">
                <p className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-4">Esto es lo que recibes hoy</p>
                <div className="space-y-2.5">
                  {[
                    { t: "Guía PDF (100 páginas)", v: "$97" },
                    { t: "6 plantillas y calculadoras", v: "$47" },
                    { t: "Checklists de optimización", v: "incluido" },
                    { t: "Email con soporte de descarga", v: "incluido" },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between gap-3">
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
                  <motion.span className="text-3xl font-extrabold text-[#8BC34A] leading-none" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                    ${PRICE_USD}
                  </motion.span>
                </div>
              </div>

              <div className="bg-white/[0.04] border-l-2 border-[#8BC34A] rounded-r-lg p-4 mb-6">
                <div className="flex items-center gap-1 text-[#8BC34A] mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-1.5">
                  "Pasé de no saber qué PALABRAS quemaban dinero a tener una rutina semanal clara. Bajé mi ACoS 12 puntos en 60 días."
                </p>
                <p className="text-xs text-white/55">— Cliente Hipervínculo · 2025</p>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/70">
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#8BC34A]" /> Garantía 7 días</div>
                <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-[#8BC34A]" /> Pago cifrado SSL</div>
                <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#8BC34A]" /> Descarga en 2 min</div>
              </div>
            </motion.div>

            <div className="lg:sticky lg:top-24">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#8BC34A]/30 to-[#8BC34A]/10 rounded-3xl blur-xl pointer-events-none" />
                <form id="buy-form" onSubmit={handleSubmit} onFocus={trackFormStart} className="relative bg-white text-foreground rounded-2xl p-5 sm:p-7 shadow-2xl scroll-mt-24">
                  <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-border">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-1.5 bg-[#8BC34A]/15 text-[#2F4F3E] text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-1.5">
                        <Zap className="w-3 h-3" /> Acceso inmediato
                      </div>
                      <div className="font-extrabold text-[#2F4F3E] text-base leading-tight">Publicidad en Amazon Sin Quemar tu Dinero</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="text-2xl font-extrabold text-[#2F4F3E]">${PRICE_USD}</span>
                      </div>
                      <div className="text-[11px] line-through text-muted-foreground">${ORIG_USD}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 bg-[#2F4F3E] rounded-lg px-3 py-2.5 mb-4">
                    <div className="flex items-center gap-2 text-white/90 text-xs">
                      <Flame className="w-4 h-4 text-[#8BC34A] animate-pulse" />
                      <span>Precio sube en</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#8BC34A] font-mono font-bold text-lg tabular-nums">
                      {mm}<span className="text-white/40 animate-pulse">:</span>{ss}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <FloatingField id="name" label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} type="text" maxLength={120} />
                    <FloatingField id="email" label="Tu email (recibirás el PDF aquí)" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" maxLength={255} validate={(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())} />
                    <PhoneInput value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="Teléfono" />
                  </div>

                  <label className="flex items-start gap-2 mt-4 cursor-pointer group">
                    <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#2F4F3E] cursor-pointer flex-shrink-0" />
                    <span className="text-[11px] text-muted-foreground leading-snug group-hover:text-[#2F4F3E] transition">
                      Quiero recibir 1 email/mes de Hipervínculo con guías y novedades. Sin spam.
                    </span>
                  </label>

                  <motion.div animate={{ boxShadow: ["0 0 0 0 rgba(139,195,74,0.6)", "0 0 0 12px rgba(139,195,74,0)", "0 0 0 0 rgba(139,195,74,0)"] }} transition={{ duration: 2, repeat: Infinity }} className="rounded-xl mt-5">
                    <Button type="submit" disabled={loading} size="lg" className="w-full bg-[#8BC34A] hover:bg-[#8BC34A]/90 text-[#1a2e22] font-extrabold text-base py-6 group">
                      {loading ? "Procesando..." : (
                        <>
                          Pagar ${PRICE_USD} y descargar
                          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} className="inline-block ml-1">→</motion.span>
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <div className="mt-4">
                    <PaymentBadges variant="light" />
                  </div>

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

      <section data-section="faq" className="py-16 md:py-24 bg-white">
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

      <AnimatePresence>
        {showStickyBar && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#8BC34A] shadow-[0_-8px_24px_rgba(0,0,0,0.15)]" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
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
                <motion.div animate={{ boxShadow: ["0 0 0 0 rgba(139,195,74,0.7)", "0 0 0 10px rgba(139,195,74,0)", "0 0 0 0 rgba(139,195,74,0)"] }} transition={{ duration: 1.8, repeat: Infinity }} className="rounded-xl">
                  <Button className="w-full bg-[#8BC34A] hover:bg-[#8BC34A]/90 text-[#1a2e22] font-extrabold text-base h-12">Comprar ahora →</Button>
                </motion.div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
