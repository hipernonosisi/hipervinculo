import { useState, useEffect } from "react";
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


const PRICE_USD = 49.99;
const ORIG_USD = 97;

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
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [viewers, setViewers] = useState(17);
  const [secondsLeft, setSecondsLeft] = useState(45 * 60); // 45 min flash discount

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
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Completa todos los campos");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("El correo electrónico no parece válido. Revísalo antes de continuar.");
      return;
    }

    setLoading(true);
    try {
      const { name, email, phone } = form;
      const { data, error } = await supabase.functions.invoke("create-ebook-checkout", {
        body: { name, email, phone, variant, marketing_opt_in: marketingOptIn },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo iniciar el pago");
      }
    } catch (err) {
      console.error(err);
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
                Valida tu producto <strong>antes</strong> de comprar inventario — y escala solo lo que ya funciona. Guía PDF de 50 páginas con 32 criterios de producto ganador y 3 plantillas listas para usar.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-1 text-[#8BC34A]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-sm text-white/70">50 páginas · 32 criterios · 3 plantillas</span>
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

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center">
              {/* PDF MOCKUP */}
              <div className="relative">
                <div className="absolute -inset-4 bg-[#8BC34A]/20 blur-2xl rounded-full" />
                <div className="relative w-64 md:w-80 aspect-[3/4] bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
                  <div className="h-full bg-[#2F4F3E] flex flex-col justify-between p-6 text-white">
                    <div className="bg-white p-2 rounded inline-block self-start">
                      <img src={logo} alt="Hipervínculo" className="h-6" />
                    </div>
                    <div>
                      <div className="inline-block bg-[#8BC34A] text-[#1a2e22] text-[10px] font-bold px-2 py-1 rounded mb-3">GUÍA PRÁCTICA · 2026</div>
                      <h2 className="text-2xl font-extrabold leading-tight mb-2">Vende en Amazon</h2>
                      <h3 className="text-xl font-bold text-[#8BC34A] leading-tight mb-3">Sin Quemar tu Dinero</h3>
                      <p className="text-xs text-white/70">Valida tu producto antes de comprar inventario — y escala solo lo que ya funciona.</p>
                    </div>
                    <div className="text-[10px] text-white/50 border-t border-white/20 pt-2">
                      50 páginas · 32 criterios · 3 plantillas
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
            <p className="text-muted-foreground text-lg">50+ páginas · 8 capítulos · descarga inmediata en PDF</p>
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

      {/* CHECKOUT FORM */}
      <section id="comprar" className="py-16 md:py-24 bg-[#2F4F3E] text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#8BC34A] text-[#1a2e22] px-3 py-1 rounded-full text-xs font-bold mb-4">
              <DollarSign className="w-3 h-3" /> PRODUCTO DE PAGO · NO ES GRATIS
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Compra tu guía ahora</h2>
            <p className="text-white/80 text-lg">Esta es una guía profesional de pago — <strong>no un lead magnet gratuito</strong>. Llena tus datos y procede al pago seguro con tarjeta para recibir tu PDF.</p>
          </div>

          {/* Live social proof */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-5 text-sm">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8BC34A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8BC34A]" />
              </span>
              <Eye className="w-3.5 h-3.5 text-white/80" />
              <span className="text-white/90"><strong>{viewers}</strong> viendo esta página</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
              <Flame className="w-3.5 h-3.5 text-[#8BC34A]" />
              <span className="text-white/90">Oferta termina en <strong className="font-mono">{mm}:{ss}</strong></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white text-foreground rounded-2xl p-6 md:p-8 shadow-2xl space-y-5">
            <div className="flex justify-between items-baseline pb-4 border-b border-border">
              <div>
                <div className="font-bold text-[#2F4F3E]">Amazon FBA Sin Inventario</div>
                <div className="text-xs text-muted-foreground">Guía PDF · descarga inmediata</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-[#2F4F3E]">${PRICE_USD}</div>
                <div className="text-xs line-through text-muted-foreground">${ORIG_USD}</div>
              </div>
            </div>

            {/* Guarantee strip */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#8BC34A]/10 border border-[#8BC34A]/30">
              <ShieldCheck className="w-8 h-8 text-[#2F4F3E] flex-shrink-0" />
              <div>
                <div className="font-bold text-sm text-[#2F4F3E]">Garantía de 7 días o devolución del 100%</div>
                <div className="text-xs text-muted-foreground">Si la guía no es lo que esperabas, te devolvemos tu dinero sin preguntas.</div>
              </div>
            </div>


            <div>
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tu nombre" required maxLength={120} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com" required maxLength={255} className="mt-1.5" />
              <div className="flex items-start gap-2 mt-2 p-2.5 rounded-lg bg-[#8BC34A]/10 border border-[#8BC34A]/30">
                <AlertTriangle className="w-4 h-4 text-[#2F4F3E] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#2F4F3E] font-medium leading-relaxed">
                  Asegúrate de escribir tu correo correctamente. El enlace de descarga de tu guía PDF se envía exclusivamente a esta dirección. Si hay un error, no podrás recibir tu compra.
                </p>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmEmail">Confirmar email</Label>
              <Input id="confirmEmail" type="email" value={form.confirmEmail} onChange={(e) => setForm({ ...form, confirmEmail: e.target.value })}
                placeholder="tu@email.com" required maxLength={255} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono (WhatsApp)</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 234 567 8900" required maxLength={30} className="mt-1.5" />
            </div>


            <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-[#f7faf6] cursor-pointer hover:border-[#8BC34A] transition">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#2F4F3E] cursor-pointer flex-shrink-0"
              />
              <span className="text-xs text-[#2F4F3E] leading-relaxed">
                <strong>Sí, quiero recibir información de Hipervínculo</strong> sobre futuros productos, guías y servicios.
                <span className="block text-muted-foreground mt-1 font-normal">
                  Máximo 1 email al mes con contenido informativo. No enviamos spam ni comercializamos tus datos con terceros. Puedes darte de baja cuando quieras.
                </span>
              </span>
            </label>

            <Button type="submit" disabled={loading} size="lg"
              className="w-full bg-[#8BC34A] hover:bg-[#8BC34A]/90 text-[#1a2e22] font-bold text-base py-6">
              {loading ? "Procesando..." : `Pagar $${PRICE_USD} y descargar →`}
            </Button>

            <div className="text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 flex-wrap">
                <Lock className="w-3 h-3" />
                <span>Pago seguro procesado por</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25" className="h-4 w-auto inline-block" aria-label="Stripe">
                  <path fill="#635BFF" fillRule="evenodd" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 9.04c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.58-.24 1.58-1C6.31 14 0 14.55 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.39.25-1.39.9 0 1.85 6.35 1.6 6.35 5.88z" clipRule="evenodd"/>
                </svg>
                <span>. Tu información está protegida con cifrado SSL.</span>
              </p>
            </div>


            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pago cifrado</div>
              <div className="flex items-center gap-1"><FileText className="w-3 h-3" /> PDF inmediato</div>
              <div className="flex items-center gap-1"><Shield className="w-3 h-3" /> Garantía 7 días</div>
            </div>
          </form>
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
              <a href="#comprar" className="flex-1">
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
