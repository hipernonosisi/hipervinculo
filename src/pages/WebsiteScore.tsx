import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, DollarSign, Zap, Search, Eye, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { websiteScoreTranslations } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'form' | 'analysis' | 'results';

interface ScoreData {
  overall: number;
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  isEstimated: boolean;
  rawData?: Record<string, unknown>;
}

const industryData: Record<string, { avgCustomerValue: number; potentialLeadsLost: { low: number; high: number } }> = {
  'Plumbing & HVAC': { avgCustomerValue: 500, potentialLeadsLost: { low: 10, high: 25 } },
  'Legal Services': { avgCustomerValue: 2000, potentialLeadsLost: { low: 5, high: 15 } },
  'Medical & Dental': { avgCustomerValue: 800, potentialLeadsLost: { low: 8, high: 20 } },
  'Construction & Contracting': { avgCustomerValue: 3000, potentialLeadsLost: { low: 5, high: 12 } },
  'Home Services': { avgCustomerValue: 400, potentialLeadsLost: { low: 12, high: 30 } },
  'Landscaping': { avgCustomerValue: 350, potentialLeadsLost: { low: 10, high: 25 } },
  'Auto Services': { avgCustomerValue: 450, potentialLeadsLost: { low: 10, high: 20 } },
  'Other': { avgCustomerValue: 500, potentialLeadsLost: { low: 8, high: 20 } },
};

// Map Spanish options to English keys for industryData lookup
const businessTypeKeyMap: Record<string, string> = {
  'Plomería y HVAC': 'Plumbing & HVAC',
  'Servicios Legales': 'Legal Services',
  'Médico y Dental': 'Medical & Dental',
  'Construcción y Contratistas': 'Construction & Contracting',
  'Servicios del Hogar': 'Home Services',
  'Jardinería': 'Landscaping',
  'Servicios Automotrices': 'Auto Services',
  'Otro': 'Other',
};

function getScoreColor(score: number) {
  if (score < 50) return '#ef4444';
  if (score < 70) return '#f97316';
  if (score < 90) return '#eab308';
  return '#22c55e';
}

function getScoreLabel(score: number, t: { critical: string; needsImprovement: string; average: string; good: string }) {
  if (score < 50) return t.critical;
  if (score < 70) return t.needsImprovement;
  if (score < 90) return t.average;
  return t.good;
}

function ScoreCircle({ score, size = 180 }: { score: number; size?: number }) {
  const color = getScoreColor(score);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--border))" strokeWidth="10" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth="10" fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-5xl font-extrabold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {score}
        </motion.span>
        <span className="text-sm text-muted-foreground font-medium">/100</span>
      </div>
    </div>
  );
}

function SmallScoreCircle({ score, size = 64 }: { score: number; size?: number }) {
  const color = getScoreColor(score);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--border))" strokeWidth="5" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth="5" fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute text-lg font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

export default function WebsiteScore() {
  const { language } = useLanguage();
  const t = websiteScoreTranslations[language];
  const { toast } = useToast();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>('form');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Final form
  const [finalName, setFinalName] = useState('');
  const [finalPhone, setFinalPhone] = useState('');
  const [finalBudget, setFinalBudget] = useState('');
  const [finalTimeline, setFinalTimeline] = useState('');
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);

  const questions = t.questions;
  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const canProceed = answers[currentStep].trim() !== '';

  const getBusinessTypeKey = (answer: string) => businessTypeKeyMap[answer] || answer;

  const fetchPageSpeedScores = async (url: string): Promise<ScoreData> => {
    try {
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      const cats = data.lighthouseResult?.categories;
      if (!cats) throw new Error('No categories');
      const perf = Math.round((cats.performance?.score || 0) * 100);
      const acc = Math.round((cats.accessibility?.score || 0) * 100);
      const bp = Math.round((cats['best-practices']?.score || 0) * 100);
      const seo = Math.round((cats.seo?.score || 0) * 100);
      return {
        overall: Math.round((perf + acc + bp + seo) / 4),
        performance: perf, seo, accessibility: acc, bestPractices: bp,
        isEstimated: false,
        rawData: data,
      };
    } catch {
      return {
        overall: 53, performance: 45, seo: 55, accessibility: 60, bestPractices: 50,
        isEstimated: true,
      };
    }
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from('website_audit_leads').insert({
        website_url: answers[0],
        business_name: answers[1],
        business_type: answers[2],
        employee_count: answers[3],
        current_advertising: answers[4],
        desired_customers: answers[5],
        email: answers[6],
        language,
      }).select('id').single();

      if (error) throw error;
      setRecordId(data.id);
      setPhase('analysis');

      // Fetch scores during animation
      const scores = await fetchPageSpeedScores(answers[0]);
      setScoreData(scores);

      // Calculate financial impact
      const key = getBusinessTypeKey(answers[2]);
      const industry = industryData[key] || industryData['Other'];
      const leadsLost = scores.overall <= 50 ? industry.potentialLeadsLost.high : industry.potentialLeadsLost.low;
      const revenueLost = leadsLost * industry.avgCustomerValue;

      // Update record with scores
      await supabase.from('website_audit_leads').update({
        overall_score: scores.overall,
        performance_score: scores.performance,
        seo_score: scores.seo,
        accessibility_score: scores.accessibility,
        best_practices_score: scores.bestPractices,
        page_speed_data: (scores.rawData || {}) as unknown as import('@/integrations/supabase/types').Json,
        estimated_leads_lost: leadsLost,
        estimated_revenue_lost: revenueLost,
      }).eq('id', data.id);

      // Send notification
      supabase.functions.invoke('send-notification', {
        body: {
          type: 'website-audit',
          language,
          businessName: answers[1],
          email: answers[6],
          websiteUrl: answers[0],
          businessType: answers[2],
          overallScore: scores.overall,
          estimatedLeadsLost: leadsLost,
          estimatedRevenueLost: revenueLost,
        }
      }).catch(err => console.error('Notification error:', err));

    } catch (error) {
      console.error('Submit error:', error);
      toast({ title: 'Error', description: 'Failed to submit. Please try again.', variant: 'destructive' });
      setPhase('form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = useCallback(async () => {
    if (!canProceed) return;
    if (isLastStep) {
      await handleSubmitForm();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }, [canProceed, isLastStep, answers]);

  const handleBack = () => { if (currentStep > 0) setCurrentStep(prev => prev - 1); };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };

  // Enter key handler for form phase
  useEffect(() => {
    if (phase !== 'form') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && canProceed && !isSubmitting) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canProceed, isSubmitting, handleNext, phase]);

  // Analysis animation
  useEffect(() => {
    if (phase !== 'analysis') return;
    const interval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= t.analysis.steps.length - 1) {
          clearInterval(interval);
          // Wait a bit then show results
          setTimeout(() => setPhase('results'), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [phase, t.analysis.steps.length]);

  const handleSubmitFinal = async () => {
    if (!finalName || !finalPhone || !finalBudget || !finalTimeline || !recordId) return;
    setIsSubmittingFinal(true);
    try {
      await supabase.from('website_audit_leads').update({
        contact_name: finalName,
        phone: finalPhone,
        monthly_budget: finalBudget,
        timeline: finalTimeline,
      }).eq('id', recordId);

      // Send qualified lead notification
      supabase.functions.invoke('send-notification', {
        body: {
          type: 'website-audit-qualified',
          language,
          businessName: answers[1],
          email: answers[6],
          websiteUrl: answers[0],
          businessType: answers[2],
          contactName: finalName,
          phone: finalPhone,
          monthlyBudget: finalBudget,
          timeline: finalTimeline,
          overallScore: scoreData?.overall,
        }
      }).catch(err => console.error('Notification error:', err));

      navigate('/thank-you/website-score');
    } catch (error) {
      console.error('Final submit error:', error);
      toast({ title: 'Error', description: 'Failed to submit. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmittingFinal(false);
    }
  };

  // Computed values for results
  const key = getBusinessTypeKey(answers[2]);
  const industry = industryData[key] || industryData['Other'];
  const leadsLost = scoreData ? (scoreData.overall <= 50 ? industry.potentialLeadsLost.high : industry.potentialLeadsLost.low) : 0;
  const revenueLost = leadsLost * industry.avgCustomerValue;
  const roiMultiplier = revenueLost > 0 ? Math.round(revenueLost / 1000) : 5;

  return (
    <Layout>
      <SEO
        title={language === 'en' ? 'Free Website Score | Hipervínculo' : 'Score Web Gratis | Hipervínculo'}
        description={t.subtitle}
        url="https://hipervinculo.net/website-score"
      />

      {/* Phase 1: Form */}
      {phase === 'form' && (
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.headline}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
              </div>

              <div className="mb-12">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{language === 'en' ? 'Question' : 'Pregunta'} {currentStep + 1} {language === 'en' ? 'of' : 'de'} {questions.length}</span>
                  <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent transition-all duration-300" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-bold">{currentQuestion.label}</h2>

                  {'placeholder' in currentQuestion && currentStep === 0 && (
                    <Input value={answers[currentStep]} onChange={e => handleAnswer(e.target.value)} placeholder={currentQuestion.placeholder} className="text-lg py-6" autoFocus />
                  )}
                  {'placeholder' in currentQuestion && currentStep === 1 && (
                    <Input value={answers[currentStep]} onChange={e => handleAnswer(e.target.value)} placeholder={currentQuestion.placeholder} className="text-lg py-6" autoFocus />
                  )}
                  {'placeholder' in currentQuestion && currentStep === 6 && (
                    <Input type="email" value={answers[currentStep]} onChange={e => handleAnswer(e.target.value)} placeholder={currentQuestion.placeholder} className="text-lg py-6" autoFocus />
                  )}
                  {'options' in currentQuestion && currentQuestion.options && (
                    <div className="grid gap-3">
                      {currentQuestion.options.map(option => (
                        <button key={option} onClick={() => handleAnswer(option)}
                          className={cn("text-left p-4 rounded-lg border-2 transition-all", answers[currentStep] === option ? "border-accent bg-accent/5" : "border-border hover:border-accent/50")}>
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-12">
                <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0} className={currentStep === 0 ? 'invisible' : ''}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t.back}
                </Button>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground hidden sm:inline">{t.pressEnter}</span>
                  <Button onClick={handleNext} disabled={!canProceed || isSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLastStep ? t.submit : t.next}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Phase 2: Analysis Animation */}
      {phase === 'analysis' && (
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-lg mx-auto text-center space-y-12">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-accent/20" />
                <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                <Search className="absolute inset-0 m-auto h-8 w-8 text-accent" />
              </div>
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.p key={analysisStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xl font-semibold">
                    {t.analysis.steps[analysisStep]}
                  </motion.p>
                </AnimatePresence>
                <div className="h-2 bg-secondary rounded-full overflow-hidden max-w-xs mx-auto">
                  <motion.div className="h-full bg-accent" initial={{ width: '0%' }} animate={{ width: `${((analysisStep + 1) / t.analysis.steps.length) * 100}%` }} transition={{ duration: 0.5 }} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{answers[0]}</p>
            </div>
          </div>
        </section>
      )}

      {/* Phase 3: Results */}
      {phase === 'results' && scoreData && (
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-12">

              {/* Main Score */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
                <ScoreCircle score={scoreData.overall} />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {t.results.yourScore} <span style={{ color: getScoreColor(scoreData.overall) }}>{scoreData.overall}/100</span>
                  </h1>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: getScoreColor(scoreData.overall) }}>
                    {getScoreLabel(scoreData.overall, t.results)}
                  </span>
                </div>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  {t.results.industryAvg.replace('{businessType}', answers[2])}
                </p>
                {scoreData.isEstimated && (
                  <p className="text-sm text-muted-foreground italic">{t.results.estimated.replace('{businessType}', answers[2])}</p>
                )}
              </motion.div>

              {/* Score Breakdown */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: t.results.performance, score: scoreData.performance, desc: t.results.performanceDesc },
                  { icon: Search, label: t.results.seo, score: scoreData.seo, desc: t.results.seoDesc },
                  { icon: Eye, label: t.results.accessibility, score: scoreData.accessibility, desc: t.results.accessibilityDesc },
                  { icon: Shield, label: t.results.bestPractices, score: scoreData.bestPractices, desc: t.results.bestPracticesDesc },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border p-5">
                    <SmallScoreCircle score={item.score} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold text-base">{item.label}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Issues */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">{t.results.issuesTitle}</h2>
                <div className="space-y-3">
                  {scoreData.performance < 60 && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-sm">{t.results.slowSite}</p>
                    </div>
                  )}
                  {scoreData.seo < 70 && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                      <p className="text-sm">{t.results.poorSeo}</p>
                    </div>
                  )}
                  {scoreData.accessibility < 70 && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                      <p className="text-sm">{t.results.poorAccessibility}</p>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm">{t.results.noLeadCapture}</p>
                  </div>
                </div>
              </motion.div>

              {/* Financial Impact */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="rounded-2xl p-8 text-white" style={{ backgroundColor: '#2d4a2d' }}>
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-6 w-6" />
                  <h2 className="text-xl md:text-2xl font-extrabold text-white">{t.results.impactTitle}</h2>
                </div>
                <p className="text-lg leading-relaxed opacity-95">
                  {t.results.impactText
                    .replace('{leads}', String(leadsLost))
                    .replace('${value}', String(industry.avgCustomerValue.toLocaleString()))
                    .replace('${revenue}', String(revenueLost.toLocaleString()))
                  }
                </p>
              </motion.div>

              {/* Solution + Pricing */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">{t.results.solutionTitle}</h2>
                <p className="text-muted-foreground">{t.results.solutionText}</p>
                <ul className="space-y-3">
                  {t.results.solutionFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="rounded-xl border-2 border-accent p-6 text-center">
                    <p className="text-3xl font-extrabold text-accent">{t.results.setupPrice}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.results.setupLabel}</p>
                  </div>
                  <div className="rounded-xl border-2 border-accent p-6 text-center">
                    <p className="text-3xl font-extrabold text-accent">{t.results.monthlyPrice}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.results.monthlyLabel}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center italic">{t.results.noContracts}</p>

                <div className="rounded-xl bg-secondary p-6 text-center">
                  <p className="font-semibold">
                    {t.results.roiText
                      .replace('${revenue}', String(revenueLost.toLocaleString()))
                      .replace('{multiplier}', String(roiMultiplier))
                    }
                  </p>
                </div>
              </motion.div>

              {/* Final CTA + Form */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                className="rounded-2xl border-2 border-accent p-8 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold">{t.results.ctaTitle}</h2>
                  <p className="text-muted-foreground">{t.results.ctaText}</p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.results.formName}</label>
                    <Input value={finalName} onChange={e => setFinalName(e.target.value)} className="py-5" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.results.formPhone}</label>
                    <Input type="tel" value={finalPhone} onChange={e => setFinalPhone(e.target.value)} className="py-5" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.results.formBudget}</label>
                    <div className="grid gap-2">
                      {t.results.budgetOptions.map(opt => (
                        <button key={opt} onClick={() => setFinalBudget(opt)}
                          className={cn("text-left p-3 rounded-lg border-2 text-sm transition-all", finalBudget === opt ? "border-accent bg-accent/5" : "border-border hover:border-accent/50")}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.results.formTimeline}</label>
                    <div className="grid gap-2">
                      {t.results.timelineOptions.map(opt => (
                        <button key={opt} onClick={() => setFinalTimeline(opt)}
                          className={cn("text-left p-3 rounded-lg border-2 text-sm transition-all", finalTimeline === opt ? "border-accent bg-accent/5" : "border-border hover:border-accent/50")}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleSubmitFinal} disabled={!finalName || !finalPhone || !finalBudget || !finalTimeline || isSubmittingFinal}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base">
                    {isSubmittingFinal ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {t.results.submitFinal}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
