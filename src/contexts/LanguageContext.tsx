import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations, type Language } from '@/lib/i18n';
import { isPublicPath, localizedPath } from '@/lib/seoRoutes';

type TranslationType = typeof translations.en | typeof translations.es;
interface LanguageContextType { language: Language; setLanguage: (lang: Language) => void; t: TranslationType; }
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [preferred, setPreferred] = useState<Language>('en');
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('lang');
    const stored = localStorage.getItem('hipervinculo-language');
    setPreferred(param === 'es' || param === 'en' ? param : stored === 'es' ? 'es' : 'en');
  }, []);
  const language: Language = isPublicPath(location.pathname) ? (location.pathname.startsWith('/es/') || location.pathname === '/es' ? 'es' : 'en') : preferred;
  const setLanguage = (lang: Language) => {
    setPreferred(lang);
    localStorage.setItem('hipervinculo-language', lang);
    if (isPublicPath(location.pathname)) navigate(`${localizedPath(location.pathname, lang)}${location.search}${location.hash}`);
  };
  useEffect(() => { document.documentElement.lang = language; localStorage.setItem('hipervinculo-language', language); }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
