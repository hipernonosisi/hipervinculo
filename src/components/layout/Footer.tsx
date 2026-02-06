import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoFull from '@/assets/logo-hipervinculo.png';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/about', label: t.nav.aboutUs },
    { href: '/services', label: t.nav.services },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/faqs', label: t.nav.faqs },
    { href: '/contact', label: t.nav.getInTouch },
  ];

  return (
    <footer>
      {/* Main Footer - White */}
      <div className="bg-white border-t border-border">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand - Takes 5 columns */}
            <div className="md:col-span-5">
              <Link to="/" className="inline-block mb-4">
                <img 
                  src={logoFull} 
                  alt="Hipervínculo" 
                  className="h-12" 
                />
              </Link>
              <p className="text-muted-foreground mb-6">
                Your growth partner for ambitious eCommerce brands.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links - Takes 3 columns, starts at column 7 */}
            <div className="md:col-span-3 md:col-start-7">
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

            {/* Contact - Takes 4 columns */}
            <div className="md:col-span-4">
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
            <Link to="/privacy" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
