import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import logoFull from '@/assets/logo-hipervinculo.png';
import logoSymbol from '@/assets/symbol-hipervinculo.png';

const serviceLinks = [
  { slug: 'lead-generation-systems', en: 'Lead Generation Systems', es: 'Sistemas de Generación de Leads' },
  { slug: 'ecommerce-growth-partners', en: 'E-Commerce Growth', es: 'Crecimiento E-Commerce' },
  { slug: 'conversion-website-development', en: 'Website Development', es: 'Desarrollo Web' },
  { slug: 'amazon-seller-services', en: 'Amazon Seller Services', es: 'Servicios Amazon Seller' },
  { slug: 'google-ads-management', en: 'Google Ads Management', es: 'Gestión de Google Ads' },
  { slug: 'tracking-attribution', en: 'Tracking & Attribution', es: 'Tracking & Atribución' },
  { slug: 'custom-enterprise-applications', en: 'Custom Applications', es: 'Aplicaciones a Medida' },
  { slug: 'brand-identity-manual', en: 'Brand Identity Manual', es: 'Manual de Identidad de Marca' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/about', label: t.nav.aboutUs },
    { href: '/services', label: t.nav.services, hasDropdown: true },
    { href: '/portfolio', label: language === 'en' ? 'Portfolio' : 'Portafolio' },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/faqs', label: t.nav.faqs },
    { href: '/contact', label: t.nav.getInTouch },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  // Close services dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setServicesOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container flex h-36 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoFull} alt="Hipervínculo" className="h-20 hidden sm:block" />
          <img src={logoSymbol} alt="Hipervínculo" className="h-16 sm:hidden" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center ml-auto mr-6">
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex items-center">
              {link.hasDropdown ? (
                <div className="relative" ref={servicesRef}>
                  <button
                    onClick={() => setServicesOpen((prev) => !prev)}
                    className={cn(
                      "flex items-center gap-1 text-[15px] font-medium transition-colors hover:text-accent px-5 py-2",
                      location.pathname.startsWith('/services') ? "text-accent" : "text-foreground"
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} />
                  </button>

                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-border rounded-xl shadow-xl py-2 w-64">
                      <Link
                        to="/services"
                        className="block px-4 py-2.5 text-[14px] font-semibold text-foreground hover:bg-muted/50 transition-colors border-b border-border/50 mb-1"
                      >
                        {language === 'en' ? 'All Services' : 'Todos los Servicios'}
                      </Link>
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className="block px-4 py-2 text-[13px] text-muted-foreground hover:text-accent hover:bg-muted/50 transition-colors"
                        >
                          {s[language]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.href}
                  className={cn(
                    "text-[15px] font-medium transition-colors hover:text-accent px-5 py-2",
                    location.pathname === link.href ? "text-accent" : "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )}
              {index < navLinks.length - 1 && (
                <span className="text-gray-300">|</span>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[13px] font-medium text-foreground hover:text-accent transition-colors border border-gray-300 rounded-full px-3 py-1.5"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'ES' : 'EN'}</span>
          </button>
          <Button asChild variant="outline" className="rounded-full px-4 py-1 h-9 font-semibold text-[13px] border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link to="/preview">{language === 'en' ? 'Free Preview' : 'Vista Previa Gratis'}</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white rounded-full px-4 py-1 h-9 font-semibold text-[13px]">
            <Link to="/audit">{t.nav.getFreeAudit}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Green line below header */}
      <div className="h-1 w-full bg-accent"></div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setServicesOpen((prev) => !prev)}
                      className={cn(
                        "flex items-center justify-between w-full text-[15px] font-medium transition-colors hover:text-accent py-2",
                        location.pathname.startsWith('/services') ? "text-accent" : "text-foreground"
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                    </button>
                    {servicesOpen && (
                      <div className="ml-4 mt-1 mb-2 space-y-1 border-l-2 border-accent/30 pl-4">
                        <Link
                          to="/services"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-[14px] font-semibold text-foreground py-1.5"
                        >
                          {language === 'en' ? 'All Services' : 'Todos los Servicios'}
                        </Link>
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-[13px] text-muted-foreground hover:text-accent py-1.5"
                          >
                            {s[language]}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-[15px] font-medium transition-colors hover:text-accent py-2",
                      location.pathname === link.href ? "text-accent" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <div className="flex gap-3">
                <Button asChild variant="outline" className="rounded-full flex-1 border-accent text-accent hover:bg-accent/10 hover:text-accent text-[14px]">
                  <Link to="/preview" onClick={() => setIsMenuOpen(false)}>{language === 'en' ? 'Free Preview' : 'Vista Previa Gratis'}</Link>
                </Button>
                <Button asChild className="bg-accent hover:bg-accent/90 text-white rounded-full flex-1">
                  <Link to="/audit" onClick={() => setIsMenuOpen(false)}>{t.nav.getFreeAudit}</Link>
                </Button>
              </div>
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 text-[14px] font-medium border border-gray-300 rounded-full px-4 py-2 w-full"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'Cambiar a Español' : 'Switch to English'}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
