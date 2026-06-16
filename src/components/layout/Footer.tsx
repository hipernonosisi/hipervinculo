import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook, ArrowRight, CheckCircle, Flame, ShieldCheck, Download, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import logoFull from '@/assets/logo-hipervinculo.png';

export function Footer({ hideBottomCta }: { hideBottomCta?: boolean }) {
  const { t, language } = useLanguage();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const isOnPreview = location.pathname === '/preview';
  const isOnEbook = location.pathname.startsWith('/amazon-fba-ebook');

  const quickLinks = [
    { href: '/about', label: t.nav.aboutUs },
    { href: '/services', label: t.nav.services },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/faqs', label: t.nav.faqs },
    { href: '/contact', label: t.nav.getInTouch },
  ];

  const ebookPerks = language === 'en'
    ? ['Instant PDF download', 'Step-by-step guide', 'No inventory required']
    : ['Descarga PDF inmediata', 'Guía paso a paso', 'Sin manejar inventario'];

  const defaultPerks = language === 'en'
    ? ['No contracts required', 'Results in 30 days', 'Dedicated growth partner']
    : ['Sin contratos', 'Resultados en 30 días', 'Socio de crecimiento dedicado'];

  return (
    <footer>
      {/* CTA Banner */}
      {!hideBottomCta && (isOnEbook ? (
        /* ───── EBOOK CTA — dark, rich, conversion-focused ───── */
        <div className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#1f3a2c' }}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 10% 20%, #8BC34A 0, transparent 40%), radial-gradient(circle at 90% 80%, #8BC34A 0, transparent 40%)"
          }} />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
            backgroundImage: "linear-gradient(#8BC34A 1px, transparent 1px), linear-gradient(90deg, #8BC34A 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }} />

          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#8BC34A] text-[#1a2e22] px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <Flame className="w-3.5 h-3.5" />
                {language === 'en' ? 'LAST CHANCE AT THIS PRICE' : 'ÚLTIMA OPORTUNIDAD A ESTE PRECIO'}
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] mb-5">
                {language === 'en' ? (
                  <>Start Selling on Amazon <span className="text-[#8BC34A]">Today</span></>
                ) : (
                  <>Empieza a Vender en Amazon <span className="text-[#8BC34A]">Hoy</span></>
                )}
              </h2>

              {/* Subhead */}
              <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
                {language === 'en'
                  ? 'The exact system we use with 200+ clients to launch on Amazon — no inventory, no guesswork.'
                  : 'El sistema exacto que usamos con 200+ clientes para lanzar en Amazon — sin inventario, sin adivinar.'}
              </p>

              {/* Perks - compact pill row */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
                {ebookPerks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/[0.06] border border-white/15 backdrop-blur-sm rounded-full px-3.5 py-2">
                    <CheckCircle className="h-4 w-4 text-[#8BC34A] flex-shrink-0" />
                    <span className="text-sm font-medium text-white/95">{perk}</span>
                  </div>
                ))}
              </div>

              {/* CTA + price block */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/[0.05] border border-white/15 rounded-2xl p-3 sm:p-4 sm:pl-6">
                <div className="text-left">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">$47</span>
                    <span className="text-base line-through text-white/40">$90</span>
                    <span className="text-xs font-bold text-[#8BC34A] bg-[#8BC34A]/15 px-2 py-0.5 rounded">-48%</span>
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">
                    {language === 'en' ? 'One-time payment · 7-day guarantee' : 'Pago único · Garantía 7 días'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('comprar');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 bg-[#8BC34A] hover:bg-[#7AB236] text-[#1a2e22] font-bold rounded-xl px-6 py-4 text-base transition-all shadow-lg shadow-[#8BC34A]/20 hover:shadow-[#8BC34A]/40 hover:scale-[1.02] w-full sm:w-auto justify-center"
                >
                  <Download className="h-5 w-5" />
                  {language === 'en' ? 'Get the Guide Now' : 'Obtén la Guía Ahora'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55 mt-6">
                <div className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 h-3.5 text-[#8BC34A]" /> {language === 'en' ? '7-day guarantee' : 'Garantía 7 días'}</div>
                <div className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-[#8BC34A]" /> {language === 'en' ? 'Complete PDF guide' : 'Guía PDF completa'}</div>
                <div className="flex items-center gap-1.5"><Download className="h-3.5 w-3.5 text-[#8BC34A]" /> {language === 'en' ? 'Instant access' : 'Acceso inmediato'}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ───── Default CTA (other pages) ───── */
        <div className="py-16 md:py-24" style={{ backgroundColor: '#8BCB43' }}>
          <div className="container text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {language === 'en'
                ? 'Your Growth System Starts Here'
                : 'Tu Sistema de Crecimiento Empieza Aquí'}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {defaultPerks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-sm md:text-base font-semibold">{perk}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {!isOnPreview && (
                <Link to="/preview">
                  <Button className="bg-white hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold" style={{ color: '#203B2C' }}>
                    {language === 'en' ? 'Get Your Free Preview' : 'Obtén Tu Vista Previa Gratis'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link to="/contact">
                <Button variant="outline" className="border-2 border-white rounded-full px-8 py-6 text-base font-semibold transition-colors" style={{ color: '#203B2C', backgroundColor: 'white' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#203B2C'; }}
                >
                  {language === 'en' ? 'Talk to Us' : 'Habla con Nosotros'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}


      {/* Main Footer - White */}
      <div className="bg-white border-t border-border">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Brand - Takes 4 columns */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-4">
                <img 
                  src={logoFull} 
                  alt="Hipervínculo" 
                  className="h-12" 
                />
              </Link>
              <p className="text-muted-foreground mb-6">
                {t.footer.tagline}
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/hipervinculo_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/company/hipervinculo" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://x.com/hipervinculo_ca" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/hipervinculo.net" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links - Takes 2 columns, starts at column 7 */}
            <div className="lg:col-span-2 lg:col-start-7">
              <h3 className="font-semibold text-lg mb-4 text-foreground" style={{ fontFamily: 'DM Sans, sans-serif' }}>Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact - Takes 3 columns, starts at column 9 */}
            <div className="lg:col-span-3 lg:col-start-9">
              <h3 className="font-semibold text-lg mb-4 text-foreground" style={{ fontFamily: 'DM Sans, sans-serif' }}>Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href="mailto:info@hipervinculo.net" className="hover:text-foreground transition-colors">
                    info@hipervinculo.net
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href="tel:+17865290679" className="hover:text-foreground transition-colors">
                    +1 (786) 529-0679
                  </a>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>2645 Executive Park Dr, Suite 146, Weston, FL 33331</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Dark Green */}
      <div className="bg-primary text-primary-foreground">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/80 text-center md:text-left">
              Hipervinculo builds inbound growth systems that combine web infrastructure, conversion strategy, and paid acquisition — designed for businesses that want stability, not experiments.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 pt-4 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} - Hipervinculo LLC | Lead Generation & eCommerce Growth Agency
            </p>
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                {language === 'en' ? 'Terms of Service' : 'Términos de Servicio'}
              </Link>
              <Link to="/privacy" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
