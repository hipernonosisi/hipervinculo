import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Search, Eye, Shield, Loader2, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { websiteScoreTranslations } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function getScoreColor(score: number) {
  if (score < 50) return '#ef4444';
  if (score < 70) return '#f97316';
  if (score < 90) return '#eab308';
  return '#22c55e';
}

function ScoreCircle({ score, size = 140 }: { score: number; size?: number }) {
  const color = getScoreColor(score);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth="8" fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span className="text-4xl font-extrabold" style={{ color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground font-medium">/100</span>
      </div>
    </div>
  );
}

function SmallScoreCircle({ score, size = 56 }: { score: number; size?: number }) {
  const color = getScoreColor(score);
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--border))" strokeWidth="4" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth="4" fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute text-base font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

export default function SharedResults() {
  const { token } = useParams<{ token: string }>();
  const { language } = useLanguage();
  const t = websiteScoreTranslations[language];
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!token) { setError(true); setLoading(false); return; }
      const { data: result, error: err } = await supabase
        .from('website_audit_leads')
        .select('*')
        .eq('share_token', token)
        .single();
      if (err || !result) { setError(true); } else { setData(result as Record<string, unknown>); }
      setLoading(false);
    }
    fetchResults();
  }, [token]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <SEO title="Results Not Found" description="" url="" />
        <div className="text-center py-32 space-y-4">
          <h1 className="text-2xl font-bold">{language === 'en' ? 'Results not found' : 'Resultados no encontrados'}</h1>
          <p className="text-muted-foreground">{language === 'en' ? 'This link may have expired or is invalid.' : 'Este enlace puede haber expirado o es inválido.'}</p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/website-score">{language === 'en' ? 'Get Your Free Score' : 'Obtén Tu Score Gratis'}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const overall = (data.overall_score as number) || 0;
  const performance = (data.performance_score as number) || 0;
  const seo = (data.seo_score as number) || 0;
  const accessibility = (data.accessibility_score as number) || 0;
  const bestPractices = (data.best_practices_score as number) || 0;
  const businessName = (data.business_name as string) || '';
  const websiteUrl = (data.website_url as string) || '';

  const scores = [
    { icon: Zap, label: t.results.performance, score: performance, desc: t.results.performanceDesc },
    { icon: Search, label: t.results.seo, score: seo, desc: t.results.seoDesc },
    { icon: Eye, label: t.results.accessibility, score: accessibility, desc: t.results.accessibilityDesc },
    { icon: Shield, label: t.results.bestPractices, score: bestPractices, desc: t.results.bestPracticesDesc },
  ];

  return (
    <Layout>
      <SEO
        title={`${businessName} - Website Score Results`}
        description={`Website performance score for ${businessName}: ${overall}/100`}
        url={`https://hipervinculo.net/results/${token}`}
      />
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                {language === 'en' ? 'Website Score Report' : 'Reporte de Score Web'}
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold">{businessName}</h1>
              <p className="text-sm text-muted-foreground">{websiteUrl}</p>
              <ScoreCircle score={overall} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {scores.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 rounded-xl border p-4">
                  <SmallScoreCircle score={item.score} />
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-semibold text-sm">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center space-y-4 pt-6">
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'Want to improve these scores? Get a free website audit.' 
                  : '¿Quieres mejorar estos scores? Obtén una auditoría web gratis.'}
              </p>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                <Link to="/website-score">
                  {language === 'en' ? 'Get Your Free Score' : 'Obtén Tu Score Gratis'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
