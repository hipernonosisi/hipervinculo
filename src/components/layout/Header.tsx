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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/30">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logoFull} 
            alt="Hipervínculo" 
            className="h-12 hidden sm:block" 
          />
          <img 
            src={logoSymbol} 
            alt="Hipervínculo" 
            className="h-10 sm:hidden" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex items-center">
              <Link
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent px-4 py-2",
                  location.pathname === link.href ? "text-accent" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 && (
                <span className="text-border">|</span>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors border border-border rounded-full px-3 py-1.5"
          >
            <Globe className="h-4 w-4" />
            <span>{language.toUpperCase()}</span>
          </button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-5 font-semibold">
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
                  "text-sm font-medium transition-colors hover:text-accent py-2",
                  location.pathname === link.href ? "text-accent" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-sm font-medium border border-border rounded-full px-3 py-1.5"
              >
                <Globe className="h-4 w-4" />
                <span>{language.toUpperCase()}</span>
              </button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
                <Link to="/audit" onClick={() => setIsMenuOpen(false)}>{t.nav.getFreeAudit}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
