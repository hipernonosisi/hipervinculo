import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Shield, Flame, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo-hipervinculo.png";
import { FloatingField } from "@/components/ebook/FloatingField";
import { PhoneInput } from "@/components/ui/phone-input";
import { usePageTracking, trackEvent } from "@/hooks/usePageTracking";

const PRICE_USD = 47;
const ORIG_USD = 90;
const PAGE = "/amazon-fba-ebook/oferta";

export default function AmazonFbaEbookOferta() {
  usePageTracking(PAGE);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 min urgency
  const formStartTracked = useRef(false);

  const variant =
    new URLSearchParams(window.location.search).get("v") || "remarketing";

  const trackFormStart = () => {
    if (formStartTracked.current) return;
    formStartTracked.current = true;
    trackEvent("form_start", { variant }, PAGE);
  };

  useEffect(() => {
    const id = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000,
    );
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
      toast.error("El correo electrónico no parece válido.");
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      toast.error("El teléfono no parece válido.");
      return;
    }

    setLoading(true);
    trackEvent("form_submit", { variant }, PAGE);
    try {
      const { name, email, phone } = form;
      const params = new URLSearchParams(window.location.search);
      const getCookie = (n: string) => {
        const m = document.cookie.match(
          new RegExp("(?:^|; )" + n + "=([^;]*)"),
        );
        return m ? decodeURIComponent(m[1]) : undefined;
      };
      const stored = (() => {
        try {
          return JSON.parse(localStorage.getItem("hv_attribution") || "{}");
        } catch {
          return {};
        }
      })();
      const utm_source = params.get("utm_source") || stored.utm_source;
      const utm_medium = params.get("utm_medium") || stored.utm_medium;
      const utm_campaign = params.get("utm_campaign") || stored.utm_campaign;
      const utm_term = params.get("utm_term") || stored.utm_term;
      const utm_content = params.get("utm_content") || stored.utm_content;
      const referrer = stored.referrer || document.referrer || undefined;
      try {
        localStorage.setItem(
          "hv_attribution",
          JSON.stringify({
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
            referrer,
          }),
        );
      } catch {}

      const { data, error } = await supabase.functions.invoke(
        "create-ebook-checkout",
        {
          body: {
            name,
            email,
            phone,
            variant,
            marketing_opt_in: true,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
            referrer,
            fbp: getCookie("_fbp"),
            fbc: getCookie("_fbc"),
          },
        },
      );

      if (error) throw error;
      if (data?.url) {
        trackEvent(
          "checkout_session_created",
          { variant, lead_id: data?.lead_id },
          PAGE,
        );
        trackEvent("checkout_redirect", { variant }, PAGE);
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo iniciar el pago");
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || String(err);
      trackEvent("checkout_error", { variant, error: msg.slice(0, 200) }, PAGE);
      toast.error("Error al iniciar el pago. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-foreground">
      <SEO
        title="Última oportunidad · Guía Amazon FBA $47"
        description="Acceso inmediato a la Guía Amazon FBA Sin Inventario. Oferta especial $47 (antes $90). Descarga al instante."
        url="https://hipervinculo.net/amazon-fba-ebook/oferta"
        noIndex
      />

      {/* MINIMAL HEADER */}
      <header className="bg-white border-b border-border/40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center">
          <div className="bg-white p-1.5 rounded">
            <img
              src={logo}
              alt="Hipervínculo"
              className="h-8 w-auto"
              width={120}
              height={32}
            />
          </div>
        </div>
      </header>

      {/* URGENCY BANNER */}
      <div className="w-full bg-[#2F4F3E] text-white py-3 px-4 flex justify-center items-center gap-3 sm:gap-4 text-sm font-semibold tracking-wide">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#8BC34A]" />
          <span className="uppercase opacity-90 text-xs sm:text-sm">
            Oferta especial expira en
          </span>
        </div>
        <span className="bg-white/10 px-3 py-1 rounded-sm font-mono text-[#8BC34A] text-base sm:text-lg tabular-nums">
          {mm}:{ss}
        </span>
      </div>

      {/* SPLIT HERO + CHECKOUT */}
      <section className="flex-1 flex items-center justify-center w-full px-4 py-10 sm:p-6 lg:p-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* LEFT — Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center lg:text-left space-y-6 lg:space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-[#8BC34A]/15 text-[#2F4F3E] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F4F3E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F4F3E]"></span>
              </span>
              Última Oportunidad
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-[#2F4F3E] leading-[1.1] tracking-tight">
              Asegura tu Guía <br className="hidden lg:block" />
              Amazon FBA por <br className="hidden lg:block" />
              solo <span className="text-[#8BC34A]">${PRICE_USD}</span>
            </h1>

            <p className="text-base lg:text-lg text-[#2F4F3E]/70 font-medium max-w-lg mx-auto lg:mx-0">
              Acceso inmediato · Descarga al pagar · Garantía 7 días
            </p>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#8BC34A]" />
              <p className="text-sm font-semibold text-[#2F4F3E]/60">
                +200 marcas confían en Hipervínculo
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Checkout Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-[#2F4F3E] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle texture overlay */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative z-10">
                {/* Price header */}
                <div className="flex justify-between items-end mb-7">
                  <div>
                    <span className="block text-[#8BC34A] text-xs font-extrabold uppercase tracking-widest mb-1">
                      Precio Oferta
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white text-5xl font-extrabold">
                        ${PRICE_USD}
                      </span>
                      <span className="text-white/40 text-lg line-through">
                        ${ORIG_USD}
                      </span>
                      <span className="text-white text-sm font-semibold">
                        USD
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#8BC34A] text-[#2F4F3E] text-[10px] font-bold px-3 py-1 rounded-md uppercase">
                    Ahorras ${ORIG_USD - PRICE_USD}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8">
                  {[
                    "PDF descargable (140+ páginas de valor)",
                    "Plantillas y checklists operativos incluidos",
                    "Acceso inmediato a tu correo",
                    "Garantía de devolución total de 7 días",
                  ].map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-white/90 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#8BC34A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8BC34A]" />
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div onFocusCapture={trackFormStart} className="space-y-4">
                    <FloatingField
                      id="name"
                      label="Nombre completo"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <FloatingField
                      id="email"
                      label="Correo electrónico"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="relative w-full bg-[#8BC34A] hover:bg-[#99d651] text-[#2F4F3E] font-extrabold text-base md:text-lg h-14 rounded-xl shadow-xl shadow-black/20 mt-2 active:scale-[0.98] overflow-hidden"
                  >
                    <span className="absolute inset-0 pointer-events-none shine-flash" />
                    {loading ? (
                      "Procesando…"
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        PAGAR ${PRICE_USD} Y DESCARGAR
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 pt-3 opacity-60">
                    <Shield className="h-4 w-4 text-white" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-[2px]">
                      Pago Seguro SSL · Garantía 7 días
                    </span>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-xs text-[#2F4F3E]/50 mt-4 flex items-center justify-center gap-1.5">
              <Clock className="h-3 w-3" /> Entrega en menos de 2 minutos
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
