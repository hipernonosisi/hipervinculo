import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import logoFull from '@/assets/logo-hipervinculo.png';
import logoSymbol from '@/assets/symbol-hipervinculo.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { href: '/about', label: t.nav.aboutUs },
    { href: '/services', label: t.nav.services },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/faqs', label: t.nav.faqs },
    { href: '/contact', label: t.nav.getInTouch },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container flex h-36 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logoFull} 
            alt="Hipervínculo" 
            className="h-20 hidden sm:block" 
          />
          <img 
            src={logoSymbol} 
            alt="Hipervínculo" 
            className="h-16 sm:hidden" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex items-center">
              <Link
                to={link.href}
                className={cn(
                  "text-[15px] font-medium transition-colors hover:text-accent px-5 py-2",
                  location.pathname === link.href ? "text-accent" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 && (
                <span className="text-gray-300">|</span>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[14px] font-medium text-foreground hover:text-accent transition-colors border border-gray-300 rounded-full px-4 py-2"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'en' ? 'ES' : 'EN'}</span>
          </button>
          <Button asChild variant="outline" className="rounded-full px-5 py-1.5 h-10 font-semibold text-[14px] border-accent text-accent hover:bg-accent/10">
            <Link to="/website-score">{language === 'en' ? 'Free Website Score' : 'Score Web Gratis'}</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white rounded-full px-5 py-1.5 h-10 font-semibold text-[14px]">
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
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-[15px] font-medium transition-colors hover:text-accent py-2",
                  location.pathname === link.href ? "text-accent" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-[14px] font-medium border border-gray-300 rounded-full px-4 py-2"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'ES' : 'EN'}</span>
              </button>
              <Button asChild variant="outline" className="rounded-full px-4 border-accent text-accent hover:bg-accent/10 text-[14px]">
                <Link to="/website-score" onClick={() => setIsMenuOpen(false)}>{language === 'en' ? 'Free Website Score' : 'Score Web Gratis'}</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-white rounded-full px-6">
                <Link to="/audit" onClick={() => setIsMenuOpen(false)}>{t.nav.getFreeAudit}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
