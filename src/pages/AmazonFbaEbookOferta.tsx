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
import { usePageTracking, trackEvent } from "@/hooks/usePageTracking";

const PRICE_USD = 47;
const ORIG_USD = 90;
const PAGE = "/amazon-fba-ebook/oferta";

export default function AmazonFbaEbookOferta() {
  usePageTracking(PAGE);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
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
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Completa todos los campos");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("El correo electrónico no parece válido.");
      return;
    }

    setLoading(true);
    trackEvent("form_submit", { variant }, PAGE);
    try {
      const { name, email } = form;
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
    <div className="min-h-screen bg-white text-foreground">
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
      <div className="bg-[#2F4F3E] text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-semibold">
          <Flame className="h-4 w-4 text-[#8BC34A]" />
          <span>
            Oferta especial expira en{" "}
            <span className="font-mono text-[#8BC34A]">
              {mm}:{ss}
            </span>
          </span>
        </div>
      </div>

      {/* HERO + CHECKOUT */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-[#8BC34A]/15 text-[#2F4F3E] px-3 py-1.5 rounded-full text-xs font-bold mb-4">
              <Flame className="h-3.5 w-3.5" />
              ÚLTIMA OPORTUNIDAD
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#2F4F3E] leading-tight mb-3">
              Asegura tu Guía Amazon FBA por solo{" "}
              <span className="text-[#8BC34A]">${PRICE_USD}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Acceso inmediato · Descarga al pagar · Garantía 7 días
            </p>
          </motion.div>

          {/* PRICE BOX */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-[#2F4F3E] to-[#1f3a2c] text-white rounded-2xl p-6 md:p-8 shadow-xl mb-6"
          >
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-white/50 text-2xl line-through">
                ${ORIG_USD}
              </span>
              <span className="text-5xl md:text-6xl font-extrabold text-[#8BC34A]">
                ${PRICE_USD}
              </span>
              <span className="text-white/70 text-sm">USD</span>
            </div>
            <div className="text-center text-[#8BC34A] font-bold text-sm mb-5">
              Ahorras ${ORIG_USD - PRICE_USD} hoy
            </div>

            <ul className="space-y-2 mb-6 text-sm">
              {[
                "PDF descargable (140+ páginas)",
                "Plantillas y checklists incluidos",
                "Acceso inmediato a tu correo",
                "Garantía de devolución 7 días",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#8BC34A] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div onFocusCapture={trackFormStart} className="space-y-3">
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
                <FloatingField
                  id="phone"
                  label="WhatsApp (con código de país)"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full bg-[#8BC34A] hover:bg-[#7baf3e] text-[#2F4F3E] font-extrabold text-base md:text-lg h-14 rounded-xl shadow-lg"
              >
                {loading ? (
                  "Procesando…"
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    PAGAR ${PRICE_USD} Y DESCARGAR
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-3 text-xs text-white/70 pt-1">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Pago seguro
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Garantía 7 días
                </span>
              </div>
            </form>
          </motion.div>

          {/* TRUST FOOTER */}
          <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-3 flex-wrap">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Entrega en menos de 2 minutos
            </span>
            <span>·</span>
            <span>+200 marcas confían en Hipervínculo</span>
          </div>
        </div>
      </section>
    </div>
  );
}
