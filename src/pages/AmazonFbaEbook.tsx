import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2, Package, TrendingUp, Shield, Clock, Star, Lock,
  FileText, Zap, BookOpen, DollarSign, Truck, BarChart3, Users,
  AlertTriangle,
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
  { icon: Package, title: "Sin inventario propio", desc: "Aprende el modelo dropshipping + FBA sin invertir miles en stock." },
  { icon: TrendingUp, title: "Estrategias 2026", desc: "Tácticas actualizadas que funcionan hoy en el marketplace de Amazon." },
  { icon: DollarSign, title: "Listado de proveedores", desc: "Fuentes verificadas en US, Asia y LATAM para empezar rápido." },
  { icon: Truck, title: "Logística sin dolor", desc: "Cómo coordinar envíos directos al FBA desde el proveedor." },
  { icon: BarChart3, title: "Métricas que importan", desc: "KPIs reales para escalar con rentabilidad, no por intuición." },
  { icon: Shield, title: "Cumple políticas Amazon", desc: "Evita suspensiones siguiendo las reglas del marketplace." },
];

const chapters = [
  "Cómo elegir productos ganadores sin gastar en muestras",
  "Negociación con proveedores en China y EE.UU.",
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
  const [form, setForm] = useState({ name: "", email: "", confirmEmail: "", phone: "" });
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const variant = new URLSearchParams(window.location.search).get("v") || "default";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.confirmEmail.trim() || !form.phone.trim()) {
      toast.error("Completa todos los campos");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("El correo electrónico no parece válido. Revísalo antes de continuar.");
      return;
    }
    if (form.email.trim() !== form.confirmEmail.trim()) {
      toast.error("Los correos electrónicos no coinciden. Verifica ambos campos.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-ebook-checkout", {
        body: { ...form, variant, marketing_opt_in: marketingOptIn },
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
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="bg-white p-1.5 rounded">
            <img src={logo} alt="Hipervínculo" className="h-8 md:h-10" />
          </div>
          <a href="#comprar" className="hidden sm:inline-flex">
            <Button size="sm" className="bg-[#2F4F3E] hover:bg-[#2F4F3E]/90 text-white">
              Comprar guía · ${PRICE_USD}
            </Button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#2F4F3E] text-white">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, #8BC34A 0, transparent 40%), radial-gradient(circle at 80% 80%, #8BC34A 0, transparent 40%)"
        }} />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-[#8BC34A] text-[#1a2e22] px-3 py-1 rounded-full text-xs font-bold mb-6">
                <Zap className="w-3 h-3" /> NUEVA EDICIÓN 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Vende en Amazon <span className="text-[#8BC34A]">sin manejar inventario</span>
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
                Guía PDF de 50+ páginas con el modelo exacto que usamos en Hipervínculo para lanzar productos en Amazon FBA sin comprar stock por adelantado ni almacenar nada en casa.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-1 text-[#8BC34A]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-sm text-white/70">200+ clientes · 20+ años de experiencia</span>
              </div>
              <div className="flex flex-wrap gap-4 items-baseline mb-6">
                <span className="text-5xl font-extrabold">${PRICE_USD}</span>
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
                      <div className="inline-block bg-[#8BC34A] text-[#1a2e22] text-[10px] font-bold px-2 py-1 rounded mb-3">GUÍA 2026</div>
                      <h2 className="text-2xl font-extrabold leading-tight mb-2">Amazon FBA</h2>
                      <h3 className="text-xl font-bold text-[#8BC34A] leading-tight mb-3">Sin Inventario</h3>
                      <p className="text-xs text-white/70">El modelo completo para vender sin comprar stock por adelantado.</p>
                    </div>
                    <div className="text-[10px] text-white/50 border-t border-white/20 pt-2">
                      50+ páginas · PDF · Hipervínculo
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] mb-4">Lo que vas a aprender</h2>
            <p className="text-muted-foreground text-lg">Estrategias reales, no teoría reciclada. Cada capítulo viene del trabajo con nuestros 200+ clientes.</p>
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
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Compra tu guía ahora</h2>
            <p className="text-white/80 text-lg">Llena tus datos y procede al pago seguro con tarjeta.</p>
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

    </div>
  );
}
