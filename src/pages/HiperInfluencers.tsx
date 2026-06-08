import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Sparkles,
  Globe,
  ShoppingCart,
  Activity,
  Target,
  TrendingUp,
  BarChart3,
  Wallet,
  Users,
  GraduationCap,
  BookOpen,
  Crown,
  MessageCircle,
  FileText,
  Lightbulb,
  PlayCircle,
  PenTool,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const MINIMUM_SUBMIT_TIME_MS = 3000;

const copy = {
  en: {
    badge: 'Creator Monetization Program',
    heroTitle: 'Turn Your Audience Into a Digital Business',
    heroSubtitle: 'Launch and scale digital products without investing upfront.',
    heroSupport:
      'We build the sales system, manage the advertising, and optimize performance while you focus on creating content and serving your audience.',
    ctaApply: 'Apply Now',
    ctaHow: 'How It Works',
    backToServices: 'Services',

    problemTitle: 'Most Creators Leave Money on the Table',
    problemIntro:
      'Sponsorships and brand deals are unpredictable income. Your real leverage is selling your own digital products to the audience that already trusts you — but building the funnel, ads, tracking and infrastructure is a full-time business of its own.',
    problemPoints: [
      'Dependency on brand deals and unpredictable sponsorships.',
      'No infrastructure to convert followers into paying customers.',
      'No budget or expertise to test and scale paid advertising.',
      'Time spent learning tools instead of creating content.',
    ],

    solutionTitle: 'We Build the Business Infrastructure',
    solutionIntro:
      'Hiper Influencers is a performance-based partnership: you bring the audience, we build and operate the entire commercial engine behind your product.',
    solutionItems: [
      { icon: Globe, label: 'Landing Pages' },
      { icon: ShoppingCart, label: 'Checkout Systems' },
      { icon: Activity, label: 'Conversion Tracking' },
      { icon: Target, label: 'Meta Ads Management' },
      { icon: TrendingUp, label: 'Sales Funnels' },
      { icon: Sparkles, label: 'Campaign Optimization' },
      { icon: BarChart3, label: 'Performance Analytics' },
      { icon: Wallet, label: 'Revenue Sharing Model' },
    ],

    howTitle: 'How It Works',
    howIntro: 'A clear, six-step path from application to revenue.',
    steps: [
      { title: 'Apply to the Program', desc: 'Submit your application with your audience and product context.' },
      { title: 'Audience Evaluation', desc: 'We review quality, engagement, niche and growth potential.' },
      { title: 'Digital Product Strategy', desc: 'We define the right offer, positioning and price point.' },
      { title: 'Landing Page & Funnel Development', desc: 'We build the entire commercial infrastructure.' },
      { title: 'Campaign Launch', desc: 'Hipervinculo funds and runs the initial Meta Ads investment.' },
      { title: 'Revenue Sharing', desc: 'You earn a share of every sale. Terms are defined together based on your audience and product.' },
    ],

    sellTitle: 'What You Can Sell',
    sellIntro: 'Any digital product your audience already wants from you.',
    sellItems: [
      { icon: PlayCircle, label: 'Online Courses' },
      { icon: GraduationCap, label: 'Masterclasses' },
      { icon: BookOpen, label: 'Ebooks' },
      { icon: Crown, label: 'Memberships' },
      { icon: Users, label: 'Coaching Programs' },
      { icon: PenTool, label: 'Templates' },
      { icon: FileText, label: 'Guides' },
      { icon: MessageCircle, label: 'Private Communities' },
      { icon: Lightbulb, label: 'Digital Resources' },
    ],

    benefitsTitle: 'Why Creators Love This Model',
    benefits: [
      'No upfront investment',
      'No need to learn advertising',
      'No need to hire agencies',
      'No technical setup required',
      'Performance-based partnership',
      'Aligned incentives',
    ],

    whoTitle: 'Who Can Apply',
    whoIntro: 'We work with creators who have built real trust with a real audience.',
    whoItems: [
      'Creators with engaged audiences',
      'Influencers',
      'Educators',
      'Coaches',
      'Industry Experts',
      'Community Builders',
    ],
    whoNote:
      'Acceptance is not guaranteed. Applications are reviewed based on audience quality, engagement, niche, and growth potential.',

    revenueTitle: 'You Earn Every Time Your Product Sells',
    revenueText:
      'Creators receive a share of every sale generated through the Hiper Influencers program. Hipervinculo handles the operational execution, advertising management, technology, optimization, and infrastructure.',
    revenueNote: 'Revenue share terms are defined per creator on an introductory call, based on audience, niche and product.',
    revenueChipCreator: 'You',
    revenueChipCreatorDesc: 'Bring the audience, expertise and content.',
    revenueChipAgency: 'Hipervinculo',
    revenueChipAgencyDesc: 'Builds the funnel, runs the ads, covers the initial investment.',

    finalTitle: 'Ready to Monetize Your Audience?',
    finalText:
      'Apply today and discover if your audience qualifies for the Hiper Influencers program.',

    formTitle: 'Apply to Hiper Influencers',
    formIntro: 'Tell us about you and your audience. We review every application.',
    fields: {
      fullName: 'Full Name',
      email: 'Email',
      instagram: 'Instagram Profile (URL or @handle)',
      tiktok: 'TikTok Profile (URL or @handle)',
      youtube: 'YouTube Channel (URL)',
      followers: 'Total Follower Count',
      niche: 'Niche',
      product: 'Digital Product Idea',
      comments: 'Additional Comments',
      submit: 'Submit Application',
      submitting: 'Submitting...',
    },
    followerOptions: [
      '5K – 25K',
      '25K – 100K',
      '100K – 500K',
      '500K – 1M',
      '1M+',
    ],
    waitTitle: 'Please wait',
    waitDesc: 'Please take a moment to fill out the form.',
    errorTitle: 'Error',
    errorDesc: 'Failed to send your application. Please try again.',
  },
  es: {
    badge: 'Programa de Monetización para Creadores',
    heroTitle: 'Convierte Tu Audiencia En Un Negocio Digital',
    heroSubtitle: 'Lanza y escala productos digitales sin invertir por adelantado.',
    heroSupport:
      'Nosotros construimos el sistema de ventas, gestionamos la publicidad y optimizamos el rendimiento mientras tú te enfocas en crear contenido y servir a tu audiencia.',
    ctaApply: 'Aplicar Ahora',
    ctaHow: 'Cómo Funciona',
    backToServices: 'Servicios',

    problemTitle: 'La Mayoría de Creadores Deja Dinero Sobre la Mesa',
    problemIntro:
      'Los patrocinios y colaboraciones con marcas son ingresos impredecibles. Tu verdadera palanca es vender tus propios productos digitales a la audiencia que ya confía en ti — pero construir el funnel, los ads, el tracking y la infraestructura es un negocio en sí mismo.',
    problemPoints: [
      'Dependencia de patrocinios y deals impredecibles.',
      'Sin infraestructura para convertir seguidores en clientes.',
      'Sin presupuesto ni expertise para probar y escalar ads.',
      'Tiempo perdido aprendiendo herramientas en lugar de crear contenido.',
    ],

    solutionTitle: 'Construimos La Infraestructura del Negocio',
    solutionIntro:
      'Hiper Influencers es una alianza basada en resultados: tú aportas la audiencia, nosotros construimos y operamos todo el motor comercial detrás de tu producto.',
    solutionItems: [
      { icon: Globe, label: 'Landing Pages' },
      { icon: ShoppingCart, label: 'Sistemas de Checkout' },
      { icon: Activity, label: 'Tracking de Conversiones' },
      { icon: Target, label: 'Gestión de Meta Ads' },
      { icon: TrendingUp, label: 'Funnels de Venta' },
      { icon: Sparkles, label: 'Optimización de Campañas' },
      { icon: BarChart3, label: 'Analítica de Rendimiento' },
      { icon: Wallet, label: 'Modelo de Revenue Share' },
    ],

    howTitle: 'Cómo Funciona',
    howIntro: 'Un camino claro de seis pasos, de la aplicación al revenue.',
    steps: [
      { title: 'Aplica al Programa', desc: 'Envía tu aplicación con el contexto de tu audiencia y producto.' },
      { title: 'Evaluación de Audiencia', desc: 'Revisamos calidad, engagement, nicho y potencial de crecimiento.' },
      { title: 'Estrategia de Producto Digital', desc: 'Definimos la oferta, posicionamiento y precio correctos.' },
      { title: 'Landing Page y Funnel', desc: 'Construimos toda la infraestructura comercial.' },
      { title: 'Lanzamiento de Campaña', desc: 'Hipervinculo financia y opera la inversión inicial en Meta Ads.' },
      { title: 'Revenue Share', desc: 'Recibes una participación de cada venta. Los términos se definen juntos según tu audiencia y producto.' },
    ],

    sellTitle: 'Qué Puedes Vender',
    sellIntro: 'Cualquier producto digital que tu audiencia ya quiere de ti.',
    sellItems: [
      { icon: PlayCircle, label: 'Cursos Online' },
      { icon: GraduationCap, label: 'Masterclasses' },
      { icon: BookOpen, label: 'Ebooks' },
      { icon: Crown, label: 'Membresías' },
      { icon: Users, label: 'Programas de Coaching' },
      { icon: PenTool, label: 'Plantillas' },
      { icon: FileText, label: 'Guías' },
      { icon: MessageCircle, label: 'Comunidades Privadas' },
      { icon: Lightbulb, label: 'Recursos Digitales' },
    ],

    benefitsTitle: 'Por Qué los Creadores Aman Este Modelo',
    benefits: [
      'Sin inversión inicial',
      'Sin necesidad de aprender publicidad',
      'Sin necesidad de contratar agencias',
      'Sin configuración técnica',
      'Alianza basada en resultados',
      'Incentivos alineados',
    ],

    whoTitle: 'Quién Puede Aplicar',
    whoIntro: 'Trabajamos con creadores que han construido confianza real con una audiencia real.',
    whoItems: [
      'Creadores con audiencias comprometidas',
      'Influencers',
      'Educadores',
      'Coaches',
      'Expertos de la Industria',
      'Constructores de Comunidad',
    ],
    whoNote:
      'La aceptación no está garantizada. Las aplicaciones se revisan según calidad de audiencia, engagement, nicho y potencial de crecimiento.',

    revenueTitle: 'Ganas Cada Vez Que Tu Producto Se Vende',
    revenueText:
      'Los creadores reciben una participación de cada venta generada a través del programa Hiper Influencers. Hipervinculo se encarga de la ejecución operativa, gestión publicitaria, tecnología, optimización e infraestructura.',
    revenueNote: 'Los términos del revenue share se definen por creador en una llamada inicial, según audiencia, nicho y producto.',
    revenueChipCreator: 'Tú',
    revenueChipCreatorDesc: 'Aportas audiencia, expertise y contenido.',
    revenueChipAgency: 'Hipervinculo',
    revenueChipAgencyDesc: 'Construye el funnel, opera los ads y cubre la inversión inicial.',

    finalTitle: '¿Listo para Monetizar Tu Audiencia?',
    finalText:
      'Aplica hoy y descubre si tu audiencia califica para el programa Hiper Influencers.',

    formTitle: 'Aplica a Hiper Influencers',
    formIntro: 'Cuéntanos sobre ti y tu audiencia. Revisamos cada aplicación.',
    fields: {
      fullName: 'Nombre Completo',
      email: 'Email',
      instagram: 'Perfil de Instagram (URL o @usuario)',
      tiktok: 'Perfil de TikTok (URL o @usuario)',
      youtube: 'Canal de YouTube (URL)',
      followers: 'Cantidad Total de Seguidores',
      niche: 'Nicho',
      product: 'Idea de Producto Digital',
      comments: 'Comentarios Adicionales',
      submit: 'Enviar Aplicación',
      submitting: 'Enviando...',
    },
    followerOptions: [
      '5K – 25K',
      '25K – 100K',
      '100K – 500K',
      '500K – 1M',
      '1M+',
    ],
    waitTitle: 'Por favor espera',
    waitDesc: 'Por favor tómate un momento para llenar el formulario.',
    errorTitle: 'Error',
    errorDesc: 'No pudimos enviar tu aplicación. Intenta de nuevo.',
  },
} as const;

export default function HiperInfluencers() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const c = copy[language];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formLoadTime] = useState(() => Date.now());
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    followers: '',
    niche: '',
    product: '',
    comments: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      navigate('/thank-you/contact');
      return;
    }
    if (Date.now() - formLoadTime < MINIMUM_SUBMIT_TIME_MS) {
      toast({ title: c.waitTitle, description: c.waitDesc, variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const summary = [
        `Instagram: ${form.instagram || '-'}`,
        `TikTok: ${form.tiktok || '-'}`,
        `YouTube: ${form.youtube || '-'}`,
        `Followers: ${form.followers || '-'}`,
        `Niche: ${form.niche || '-'}`,
        `Product Idea: ${form.product || '-'}`,
        `Comments: ${form.comments || '-'}`,
      ].join('\n');

      const { error } = await supabase.from('contact_submissions').insert({
        full_name: form.fullName,
        company_name: form.niche || null,
        email: form.email,
        phone: '',
        inquiry_type: 'hiper-influencers',
        message: summary,
      });
      if (error) throw error;

      supabase.functions
        .invoke('send-notification', {
          body: {
            type: 'contact',
            language,
            fullName: form.fullName,
            email: form.email,
            companyName: `Hiper Influencers — ${form.niche || 'Application'}`,
            phone: '',
            inquiryType: 'hiper-influencers',
            message: summary,
          },
        })
        .catch((err) => console.error('Notification failed:', err));

      navigate('/thank-you/contact');
    } catch (err) {
      console.error(err);
      toast({ title: c.errorTitle, description: c.errorDesc, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const seoTitle =
    language === 'en'
      ? 'Hiper Influencers | Creator Monetization Program by Hipervinculo'
      : 'Hiper Influencers | Programa de Monetización para Creadores de Hipervinculo';
  const seoDesc =
    language === 'en'
      ? 'Launch and scale digital products without investing upfront. Hipervinculo builds your funnel, manages Meta Ads, and helps creators monetize their audience through a performance-based partnership.'
      : 'Lanza y escala productos digitales sin invertir por adelantado. Hipervinculo construye tu funnel, gestiona Meta Ads y ayuda a creadores a monetizar su audiencia mediante una alianza basada en resultados.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Hiper Influencers',
    description: seoDesc,
    url: 'https://hipervinculo.net/hiper-influencers',
    provider: {
      '@type': 'Organization',
      name: 'Hipervínculo',
      url: 'https://hipervinculo.net',
    },
  };

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDesc}
        url="https://hipervinculo.net/hiper-influencers"
        type="service"
        structuredData={structuredData}
      />

      {/* HERO */}
      <section className="relative py-28 md:py-36 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #2d4a2d 0px, #2d4a2d 1px, transparent 1px, transparent 12px)`,
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <Link to="/services" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
                <ArrowLeft className="h-4 w-4" />
                {c.backToServices}
              </Link>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#8BC34A' }}
              >
                <Rocket className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>
              <p className="text-accent font-semibold text-[15px] mb-4">{c.badge}</p>
              <h1
                className="text-[44px] md:text-[60px] lg:text-[76px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.heroTitle}
              </h1>
              <p className="text-[20px] md:text-[22px] font-semibold mb-5" style={{ color: '#2d4a2d' }}>
                {c.heroSubtitle}
              </p>
              <p className="text-[17px] md:text-[18px] text-muted-foreground max-w-2xl leading-relaxed mb-10">
                {c.heroSupport}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-14 px-8 text-[16px] font-semibold shadow-lg"
                  style={{ backgroundColor: '#8BC34A', color: 'white' }}
                >
                  <a href="#apply">
                    {c.ctaApply} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 px-8 text-[16px] font-semibold border-2"
                  style={{ borderColor: '#8BC34A', color: '#2d4a2d' }}
                >
                  <a href="#how">{c.ctaHow}</a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2
                className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800 }}
              >
                {c.problemTitle}
              </h2>
              <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">{c.problemIntro}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="space-y-4">
                {c.problemPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                    <p className="text-[17px] text-primary-foreground/90">{p}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <h2
                className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.solutionTitle}
              </h2>
              <p className="text-[18px] md:text-[20px] text-muted-foreground mb-12 max-w-3xl">{c.solutionIntro}</p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.solutionItems.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                    <Card className="h-full border-2 border-border/50 rounded-2xl hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: '#8BC34A' }}
                        >
                          <item.icon className="h-6 w-6 text-white" strokeWidth={1.75} />
                        </div>
                        <p className="text-[16px] font-bold" style={{ color: '#2d4a2d' }}>
                          {item.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 md:py-28" style={{ backgroundColor: '#f8f9f5' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <h2
                className="text-[36px] md:text-[48px] lg:text-[56px] mb-4 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.howTitle}
              </h2>
              <p className="text-[18px] text-muted-foreground mb-12">{c.howIntro}</p>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-5">
              {c.steps.map((step, i) => (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <Card className="h-full border-2 border-border/50 rounded-2xl bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-7">
                      <div className="flex items-start gap-5">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-[18px]"
                          style={{ backgroundColor: '#2d4a2d' }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="text-[18px] md:text-[20px] font-extrabold mb-2" style={{ color: '#2d4a2d' }}>
                            {step.title}
                          </h3>
                          <p className="text-[15px] text-muted-foreground leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN SELL */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <h2
                className="text-[36px] md:text-[48px] lg:text-[56px] mb-4 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.sellTitle}
              </h2>
              <p className="text-[18px] text-muted-foreground mb-12">{c.sellIntro}</p>
            </AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {c.sellItems.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.04}>
                  <div
                    className="flex items-center gap-4 p-5 rounded-xl border-2 border-border/50 bg-[#f8f9f5] hover:border-accent transition-colors h-full"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#8BC34A' }}
                    >
                      <item.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                    </div>
                    <p className="text-[15px] md:text-[16px] font-semibold" style={{ color: '#2d4a2d' }}>
                      {item.label}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8f9f5' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2
                className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.benefitsTitle}
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-4">
              {c.benefits.map((b, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-white border-2 border-border/50">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#8BC34A' }}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-[16px] md:text-[17px] font-semibold" style={{ color: '#2d4a2d' }}>
                      {b}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO CAN APPLY */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2
                className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.whoTitle}
              </h2>
              <p className="text-[18px] text-muted-foreground mb-10">{c.whoIntro}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {c.whoItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#8BC34A' }}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl bg-[#f8f9f5] border-l-4" style={{ borderColor: '#8BC34A' }}>
                <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">{c.whoNote}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* REVENUE SHARE */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#2d4a2d' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2
                className="text-[36px] md:text-[48px] lg:text-[56px] text-white mb-6 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800 }}
              >
                {c.revenueTitle}
              </h2>
              <p className="text-[17px] md:text-[19px] text-white/85 leading-relaxed mb-12 max-w-3xl mx-auto">
                {c.revenueText}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto text-left">
                <div className="bg-white rounded-2xl p-8">
                  <p className="text-[13px] uppercase tracking-wider font-bold text-muted-foreground mb-3">
                    {c.revenueChipCreator}
                  </p>
                  <p className="text-[22px] md:text-[24px] font-extrabold mb-2" style={{ color: '#2d4a2d' }}>
                    {language === 'en' ? 'Earn from every sale' : 'Gana en cada venta'}
                  </p>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {c.revenueChipCreatorDesc}
                  </p>
                </div>
                <div className="rounded-2xl p-8 border-2 border-white/30">
                  <p className="text-[13px] uppercase tracking-wider font-bold text-white/70 mb-3">
                    {c.revenueChipAgency}
                  </p>
                  <p className="text-[22px] md:text-[24px] font-extrabold text-white mb-2">
                    {language === 'en' ? 'We build, run & invest' : 'Construimos, operamos e invertimos'}
                  </p>
                  <p className="text-[15px] text-white/75 leading-relaxed">
                    {c.revenueChipAgencyDesc}
                  </p>
                </div>
              </div>
              <p className="text-[14px] md:text-[15px] text-white/65 mt-8 max-w-2xl mx-auto">
                {c.revenueNote}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection className="text-center mb-10">
              <h2
                className="text-[36px] md:text-[44px] lg:text-[52px] mb-4 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.formTitle}
              </h2>
              <p className="text-[17px] text-muted-foreground">{c.formIntro}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-[#f8f9f5] rounded-2xl p-7 md:p-10 border-2 border-border/50">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <Input
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      placeholder="Leave empty"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      required
                      maxLength={100}
                      placeholder={c.fields.fullName}
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="bg-white border-border/50 rounded-xl h-12 px-4"
                    />
                    <Input
                      required
                      type="email"
                      maxLength={255}
                      placeholder={c.fields.email}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-white border-border/50 rounded-xl h-12 px-4"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      maxLength={255}
                      placeholder={c.fields.instagram}
                      value={form.instagram}
                      onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                      className="bg-white border-border/50 rounded-xl h-12 px-4"
                    />
                    <Input
                      maxLength={255}
                      placeholder={c.fields.tiktok}
                      value={form.tiktok}
                      onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
                      className="bg-white border-border/50 rounded-xl h-12 px-4"
                    />
                  </div>

                  <Input
                    maxLength={255}
                    placeholder={c.fields.youtube}
                    value={form.youtube}
                    onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                    className="bg-white border-border/50 rounded-xl h-12 px-4"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select value={form.followers} onValueChange={(v) => setForm({ ...form, followers: v })}>
                      <SelectTrigger className="bg-white border-border/50 rounded-xl h-12 px-4">
                        <SelectValue placeholder={c.fields.followers} />
                      </SelectTrigger>
                      <SelectContent>
                        {c.followerOptions.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      maxLength={120}
                      placeholder={c.fields.niche}
                      value={form.niche}
                      onChange={(e) => setForm({ ...form, niche: e.target.value })}
                      className="bg-white border-border/50 rounded-xl h-12 px-4"
                    />
                  </div>

                  <Textarea
                    maxLength={500}
                    placeholder={c.fields.product}
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                    className="bg-white border-border/50 rounded-xl px-4 py-3 min-h-[100px]"
                  />

                  <Textarea
                    maxLength={1000}
                    placeholder={c.fields.comments}
                    value={form.comments}
                    onChange={(e) => setForm({ ...form, comments: e.target.value })}
                    className="bg-white border-border/50 rounded-xl px-4 py-3 min-h-[100px]"
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full rounded-full h-14 text-[16px] font-semibold shadow-lg"
                    style={{ backgroundColor: '#8BC34A', color: 'white' }}
                  >
                    {isSubmitting ? c.fields.submitting : c.fields.submit}
                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#203B2C' }}>
        <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2
              className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
              style={{ fontWeight: 800 }}
            >
              {c.finalTitle}
            </h2>
            <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">{c.finalText}</p>
            <Button
              asChild
              size="lg"
              className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95"
            >
              <a href="#apply">
                {c.ctaApply}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
