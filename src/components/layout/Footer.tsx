import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold">HV</span>
              <span className="text-xl font-semibold">Hipervínculo</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-md">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href={`mailto:${t.contact.info.email}`} className="hover:text-primary-foreground transition-colors">
                  {t.contact.info.email}
                </a>
              </li>
              <li>
                <a href={`tel:${t.contact.info.phone.replace(/\s/g, '')}`} className="hover:text-primary-foreground transition-colors">
                  {t.contact.info.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
          © {currentYear} {t.footer.company}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
