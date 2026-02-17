import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, DollarSign, Zap, Search, Eye, Shield, Loader2, Clock, SearchX, Accessibility, UserX, Share2, Mail, Link2, Check, ChevronDown } from 'lucide-react';
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

const COUNTRY_CODES = [
  { code: '+1', country: 'US', flag: '🇺🇸', label: 'USA (+1)' },
  { code: '+1', country: 'CA', flag: '🇨🇦', label: 'Canada (+1)' },
  { code: '+52', country: 'MX', flag: '🇲🇽', label: 'México (+52)' },
  { code: '+57', country: 'CO', flag: '🇨🇴', label: 'Colombia (+57)' },
  { code: '+34', country: 'ES', flag: '🇪🇸', label: 'España (+34)' },
  { code: '+44', country: 'GB', flag: '🇬🇧', label: 'UK (+44)' },
  { code: '+55', country: 'BR', flag: '🇧🇷', label: 'Brasil (+55)' },
  { code: '+54', country: 'AR', flag: '🇦🇷', label: 'Argentina (+54)' },
  { code: '+56', country: 'CL', flag: '🇨🇱', label: 'Chile (+56)' },
  { code: '+51', country: 'PE', flag: '🇵🇪', label: 'Perú (+51)' },
  { code: '+58', country: 'VE', flag: '🇻🇪', label: 'Venezuela (+58)' },
  { code: '+507', country: 'PA', flag: '🇵🇦', label: 'Panamá (+507)' },
  { code: '+506', country: 'CR', flag: '🇨🇷', label: 'Costa Rica (+506)' },
  { code: '+502', country: 'GT', flag: '🇬🇹', label: 'Guatemala (+502)' },
  { code: '+593', country: 'EC', flag: '🇪🇨', label: 'Ecuador (+593)' },
];

function formatPhoneUS(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function isValidPhone(phone: string, countryCode: string): boolean {
  const digits = phone.replace(/\D/g, '');
  if (countryCode === '+1') return digits.length === 10;
  return digits.length >= 7 && digits.length <= 15;
}

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

const industryData: Record<string, { potentialLeadsLost: { low: number; high: number } }> = {
  'Plumbing & HVAC': { potentialLeadsLost: { low: 10, high: 25 } },
  'Legal Services': { potentialLeadsLost: { low: 5, high: 15 } },
  'Medical & Dental': { potentialLeadsLost: { low: 8, high: 20 } },
  'Construction & Contracting': { potentialLeadsLost: { low: 5, high: 12 } },
  'Home Services': { potentialLeadsLost: { low: 12, high: 30 } },
  'Landscaping': { potentialLeadsLost: { low: 10, high: 25 } },
  'Auto Services': { potentialLeadsLost: { low: 10, high: 20 } },
  'Other': { potentialLeadsLost: { low: 8, high: 20 } },
};
const AVG_CUSTOMER_VALUE = 3000;

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
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const [leadSiteLoaded, setLeadSiteLoaded] = useState(false);
  const [leadSiteError, setLeadSiteError] = useState(false);
  const [optimizedSiteLoaded, setOptimizedSiteLoaded] = useState(false);

  // Final form — pre-fill from Phase 1 answers
  const [finalName, setFinalName] = useState('');
  const [finalPhone, setFinalPhone] = useState('');
  const [finalMvp, setFinalMvp] = useState('');
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);
  const [finalFormInitialized, setFinalFormInitialized] = useState(false);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]); // US +1
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phoneError, setPhoneError] = useState('');

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
        contact_name: answers[6],
        phone: `${countryCode.code} ${answers[7]}`,
        email: answers[8],
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
      const revenueLost = leadsLost * AVG_CUSTOMER_VALUE;

      // Generate share token
      const token = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
      setShareToken(token);

      // Update record with scores and share token
      await supabase.from('website_audit_leads').update({
        overall_score: scores.overall,
        performance_score: scores.performance,
        seo_score: scores.seo,
        accessibility_score: scores.accessibility,
        best_practices_score: scores.bestPractices,
        page_speed_data: (scores.rawData || {}) as unknown as import('@/integrations/supabase/types').Json,
        estimated_leads_lost: leadsLost,
        estimated_revenue_lost: revenueLost,
        share_token: token,
      }).eq('id', data.id);

      // Send notification
      supabase.functions.invoke('send-notification', {
        body: {
          type: 'website-audit',
          language,
          businessName: answers[1],
          email: answers[8],
          websiteUrl: answers[0],
          businessType: answers[2],
          contactName: answers[6],
          phone: `${countryCode.code} ${answers[7]}`,
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

  // Pre-fill final form with Phase 1 answers
  useEffect(() => {
    if (phase === 'results' && !finalFormInitialized) {
      if (answers[6]) setFinalName(answers[6]);
      if (answers[7]) setFinalPhone(answers[7]);
      setFinalFormInitialized(true);
    }
  }, [phase, finalFormInitialized, answers]);


  const handleSubmitFinal = async () => {
    if (!finalName || !finalPhone || !finalMvp || !recordId) return;
    setIsSubmittingFinal(true);
    try {
      const wantsMvp = finalMvp === 'yes';
      await supabase.from('website_audit_leads').update({
        contact_name: finalName,
        phone: `${countryCode.code} ${finalPhone}`,
        converted_to_mvp: wantsMvp,
      }).eq('id', recordId);

      // Send qualified lead notification
      supabase.functions.invoke('send-notification', {
        body: {
          type: 'website-audit-qualified',
          language,
          businessName: answers[1],
          email: answers[8],
          websiteUrl: answers[0],
          businessType: answers[2],
          contactName: finalName,
          phone: `${countryCode.code} ${finalPhone}`,
          wantsMvp,
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
  const revenueLost = leadsLost * AVG_CUSTOMER_VALUE;
  const roiMultiplier = revenueLost > 0 ? Math.max(2, Math.round(revenueLost / 2200)) : 5;

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
                    <Input value={answers[currentStep]} onChange={e => handleAnswer(e.target.value)} placeholder={currentQuestion.placeholder} className="text-lg py-6" autoFocus />
                  )}
                  {'placeholder' in currentQuestion && currentStep === 7 && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="flex items-center gap-1 h-[52px] px-3 rounded-md border border-input bg-background text-sm whitespace-nowrap"
                          >
                            <span>{countryCode.flag}</span>
                            <span>{countryCode.code}</span>
                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          </button>
                          {showCountryDropdown && (
                            <div className="absolute z-50 top-full left-0 mt-1 w-56 max-h-60 overflow-y-auto rounded-lg border bg-background shadow-lg">
                              {COUNTRY_CODES.map((cc, i) => (
                                <button
                                  key={`${cc.country}-${i}`}
                                  type="button"
                                  onClick={() => { setCountryCode(cc); setShowCountryDropdown(false); }}
                                  className={cn("w-full text-left px-3 py-2 text-sm hover:bg-accent/10 flex items-center gap-2", countryCode.country === cc.country && countryCode.code === cc.code ? 'bg-accent/5' : '')}
                                >
                                  <span>{cc.flag}</span>
                                  <span>{cc.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <Input
                          type="tel"
                          value={answers[currentStep]}
                          onChange={e => { handleAnswer(e.target.value); setPhoneError(''); }}
                          onBlur={() => {
                            const val = answers[currentStep];
                            if (val && countryCode.code === '+1') {
                              handleAnswer(formatPhoneUS(val));
                            }
                            if (val && !isValidPhone(val, countryCode.code)) {
                              setPhoneError(language === 'en' ? 'Please enter a valid phone number' : 'Ingresa un número de teléfono válido');
                            } else {
                              setPhoneError('');
                            }
                          }}
                          placeholder={currentQuestion.placeholder}
                          className="text-lg py-6 flex-1"
                          autoFocus
                        />
                      </div>
                      {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
                    </div>
                  )}
                  {'placeholder' in currentQuestion && currentStep === 8 && (
                    <Input type="email" value={answers[currentStep]} onChange={e => handleAnswer(e.target.value)} placeholder={currentQuestion.placeholder} className="text-lg py-6" autoFocus />
                  )}
                  {'options' in currentQuestion && currentQuestion.options && (
                    <div className="grid gap-3">
                      {currentQuestion.options.map(option => {
                        const isOther = option === 'Other' || option === 'Otro';
                        const hasOther = 'hasOtherInput' in currentQuestion && currentQuestion.hasOtherInput;
                        const isCustomAnswer = hasOther && answers[currentStep] !== '' && !(currentQuestion.options as readonly string[]).includes(answers[currentStep]);
                        const isSelected = answers[currentStep] === option || (isOther && isCustomAnswer);
                        return (
                          <button key={option} onClick={() => handleAnswer(option)}
                            className={cn("text-left p-4 rounded-lg border-2 transition-all", isSelected ? "border-accent bg-accent/5" : "border-border hover:border-accent/50")}>
                            {option}
                          </button>
                        );
                      })}
                      {(() => {
                        const hasOther = 'hasOtherInput' in currentQuestion && currentQuestion.hasOtherInput;
                        const selectedIsOther = answers[currentStep] === 'Other' || answers[currentStep] === 'Otro';
                        const isCustom = hasOther && answers[currentStep] !== '' && !(currentQuestion.options as readonly string[]).includes(answers[currentStep]);
                        if (hasOther && (selectedIsOther || isCustom)) {
                          return (
                            <Input
                              value={selectedIsOther ? '' : answers[currentStep]}
                              onChange={e => handleAnswer(e.target.value || '')}
                              placeholder={'otherPlaceholder' in currentQuestion ? currentQuestion.otherPlaceholder as string : ''}
                              className="text-lg py-6 mt-2"
                              autoFocus
                            />
                          );
                        }
                        return null;
                      })()}
                    </div>
                  )}

                  {/* Privacy disclaimer before phone/name questions */}
                  {(currentStep === 6 || currentStep === 7 || currentStep === 8) && (
                    <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-4 border border-border">
                      {t.privacyDisclaimer}
                    </p>
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
                  <p className="text-sm text-muted-foreground">{t.results.estimated.replace('{businessType}', answers[2])}</p>
                )}
                {/* Share Buttons */}
                {shareToken && (
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-2"
                      onClick={() => {
                        const url = `${window.location.origin}/results/${shareToken}`;
                        navigator.clipboard.writeText(url);
                        setLinkCopied(true);
                        setTimeout(() => setLinkCopied(false), 2000);
                      }}
                    >
                      {linkCopied ? <Check className="h-4 w-4 text-accent" /> : <Link2 className="h-4 w-4" />}
                      {linkCopied 
                        ? (language === 'en' ? 'Link Copied!' : 'Link Copiado!') 
                        : (language === 'en' ? 'Copy Link' : 'Copiar Link')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-2"
                      onClick={() => {
                        const url = `${window.location.origin}/results/${shareToken}`;
                        const subject = language === 'en' 
                          ? `Website Score Results - ${answers[1]}` 
                          : `Resultados de Score Web - ${answers[1]}`;
                        const body = language === 'en'
                          ? `Check out the website performance score for ${answers[1]}: ${url}`
                          : `Mira el score de rendimiento web de ${answers[1]}: ${url}`;
                        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                      }}
                    >
                      <Mail className="h-4 w-4" />
                      {language === 'en' ? 'Share via Email' : 'Compartir por Email'}
                    </Button>
                  </div>
                )}
              </motion.div>

              {/* Screenshot Comparison */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className={cn("space-y-6", scoreData.isEstimated && "ring-2 ring-accent rounded-2xl p-6")}>
                <h2 className="text-xl md:text-2xl font-bold text-center">{t.results.comparisonTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lead's current site */}
                  <div className="space-y-3">
                    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-destructive/40 relative aspect-[3/4]">
                      {!leadSiteLoaded && !leadSiteError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      )}
                      {leadSiteError ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <p className="text-sm text-muted-foreground">{t.results.previewNotAvailable}</p>
                        </div>
                      ) : (
                        <img
                          src={`https://image.thum.io/get/width/600/crop/800/${answers[0]}`}
                          alt={language === 'en' ? 'Your current website' : 'Tu sitio web actual'}
                          className={cn("w-full h-full object-cover object-top", !leadSiteLoaded && "opacity-0")}
                          onLoad={() => setLeadSiteLoaded(true)}
                          onError={() => { setLeadSiteError(true); setLeadSiteLoaded(true); }}
                        />
                      )}
                    </div>
                    <p className="text-center text-sm font-semibold text-destructive">{t.results.yourSite}</p>
                  </div>
                  {/* Optimized site example */}
                  <div className="space-y-3">
                    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-accent/60 relative aspect-[3/4]">
                      {!optimizedSiteLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      )}
                      <img
                        src="https://image.thum.io/get/width/600/crop/800/https://hipervinculo.net/"
                        alt={language === 'en' ? 'Conversion-optimized website example' : 'Ejemplo de sitio optimizado para conversión'}
                        className={cn("w-full h-full object-cover object-top", !optimizedSiteLoaded && "opacity-0")}
                        onLoad={() => setOptimizedSiteLoaded(true)}
                      />
                    </div>
                    <p className="text-center text-sm font-semibold text-accent">{t.results.optimizedSite}</p>
                  </div>
                </div>
                <p className="text-center text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">{t.results.comparisonText}</p>
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

              {/* Issues — Interactive Cards */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-5">
                <h2 className="text-xl md:text-2xl font-bold">{t.results.issuesTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(() => {
                    const issues: { icon: typeof Clock; title: string; desc: string; severity: 'high' | 'medium' | 'low'; show: boolean }[] = [
                      {
                        icon: AlertTriangle,
                        title: t.results.technicalIssuesTitle,
                        desc: t.results.technicalIssuesDesc,
                        severity: 'high',
                        show: scoreData.isEstimated,
                      },
                      {
                        icon: Clock,
                        title: language === 'en' ? 'Slow Load Speed' : 'Velocidad de Carga Lenta',
                        desc: t.results.slowSite,
                        severity: 'high',
                        show: scoreData.performance < 60,
                      },
                      {
                        icon: SearchX,
                        title: language === 'en' ? 'SEO Gaps' : 'Problemas de SEO',
                        desc: t.results.poorSeo,
                        severity: 'medium',
                        show: scoreData.seo < 70,
                      },
                      {
                        icon: Accessibility,
                        title: language === 'en' ? 'Accessibility Issues' : 'Problemas de Accesibilidad',
                        desc: t.results.poorAccessibility,
                        severity: 'low',
                        show: scoreData.accessibility < 70,
                      },
                      {
                        icon: UserX,
                        title: language === 'en' ? 'No Lead Capture' : 'Sin Captación de Leads',
                        desc: t.results.noLeadCapture,
                        severity: 'high',
                        show: true,
                      },
                    ];
                    const visibleIssues = issues.filter(i => i.show);
                    const severityConfig = {
                      high: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', iconColor: 'text-red-500', label: language === 'en' ? 'High' : 'Alto' },
                      medium: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', iconColor: 'text-orange-500', label: language === 'en' ? 'Medium' : 'Medio' },
                      low: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', iconColor: 'text-yellow-600', label: language === 'en' ? 'Low' : 'Bajo' },
                    };
                    return visibleIssues.map((issue, i) => {
                      const config = severityConfig[issue.severity];
                      const isExpanded = expandedIssue === i;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          onClick={() => setExpandedIssue(isExpanded ? null : i)}
                          className={cn(
                            'rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:shadow-md',
                            config.bg, config.border,
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn('rounded-lg p-2', config.bg)}>
                              <issue.icon className={cn('h-5 w-5', config.iconColor)} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-sm">{issue.title}</h3>
                                <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider', config.badge)}>
                                  {config.label}
                                </span>
                              </div>
                              <AnimatePresence>
                                {isExpanded ? (
                                  <motion.p
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="text-sm text-muted-foreground leading-relaxed overflow-hidden"
                                  >
                                    {issue.desc}
                                  </motion.p>
                                ) : (
                                  <p className="text-sm text-muted-foreground truncate">{issue.desc}</p>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      );
                    });
                  })()}
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
                    .replace('${value}', `$${AVG_CUSTOMER_VALUE.toLocaleString()}`)
                    .replace('${revenue}', `$${revenueLost.toLocaleString()}`)
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
                <p className="text-sm text-muted-foreground text-center">{t.results.noContracts}</p>
                <p className="text-xs text-muted-foreground text-center mt-1">{t.results.adBudgetNote}</p>

                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#203B2C' }}>
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2" style={{ backgroundColor: 'rgba(157, 194, 9, 0.15)' }}>
                        <AlertTriangle className="h-5 w-5" style={{ color: '#9DC209' }} />
                      </div>
                      <h3 className="text-lg font-extrabold text-white">
                        {language === 'en' ? 'Your ROI Opportunity' : 'Tu Oportunidad de ROI'}
                      </h3>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                        <p className="text-2xl md:text-3xl font-extrabold" style={{ color: '#ef4444' }}>
                          ${revenueLost.toLocaleString()}
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          {language === 'en' ? 'Lost per month' : 'Perdidos por mes'}
                        </p>
                      </div>
                      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                        <p className="text-2xl md:text-3xl font-extrabold text-white">$2,200</p>
                        <p className="text-xs text-white/60 mt-1">
                          {language === 'en' ? 'Total investment/mo' : 'Inversión total/mes'}
                        </p>
                      </div>
                      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(157, 194, 9, 0.15)' }}>
                        <p className="text-2xl md:text-3xl font-extrabold" style={{ color: '#9DC209' }}>
                          {roiMultiplier}x
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          {language === 'en' ? 'Typical return' : 'Retorno típico'}
                        </p>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{language === 'en' ? 'Management fee' : 'Gestión'}</span>
                        <span className="text-white font-semibold">$1,000/{language === 'en' ? 'mo' : 'mes'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{language === 'en' ? 'Min. ad budget' : 'Presupuesto mín. ads'}</span>
                        <span className="text-white font-semibold">$1,200/{language === 'en' ? 'mo' : 'mes'}</span>
                      </div>
                      <div className="border-t border-white/10 pt-2 flex items-center justify-between text-sm">
                        <span className="text-white/70 font-semibold">{language === 'en' ? 'Total' : 'Total'}</span>
                        <span className="font-extrabold" style={{ color: '#9DC209' }}>$2,200/{language === 'en' ? 'mo' : 'mes'}</span>
                      </div>
                    </div>

                    {/* Bottom text */}
                    <p className="text-sm text-white/70 text-center leading-relaxed">
                      {language === 'en'
                        ? "That's real leads calling your business. Ad budget is paid directly to Google, not to us."
                        : 'Son leads reales llamando a tu negocio. El presupuesto de ads se paga directamente a Google, no a nosotros.'}
                    </p>
                  </div>
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
                    <label className="text-sm font-medium mb-1 block">{t.results.formName} <span className="text-destructive">*</span></label>
                    <Input value={finalName} onChange={e => setFinalName(e.target.value)} className="py-5" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.results.formPhone} <span className="text-destructive">*</span></label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center gap-1 h-[46px] px-3 rounded-md border border-input bg-background text-sm whitespace-nowrap"
                        >
                          <span>{countryCode.flag}</span>
                          <span>{countryCode.code}</span>
                          <ChevronDown className="h-3 w-3 text-muted-foreground" />
                        </button>
                        {showCountryDropdown && (
                          <div className="absolute z-50 bottom-full left-0 mb-1 w-56 max-h-60 overflow-y-auto rounded-lg border bg-background shadow-lg">
                            {COUNTRY_CODES.map((cc, i) => (
                              <button
                                key={`${cc.country}-${i}`}
                                type="button"
                                onClick={() => { setCountryCode(cc); setShowCountryDropdown(false); }}
                                className={cn("w-full text-left px-3 py-2 text-sm hover:bg-accent/10 flex items-center gap-2", countryCode.country === cc.country && countryCode.code === cc.code ? 'bg-accent/5' : '')}
                              >
                                <span>{cc.flag}</span>
                                <span>{cc.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <Input
                        type="tel"
                        value={finalPhone}
                        onChange={e => setFinalPhone(e.target.value)}
                        onBlur={() => {
                          if (finalPhone && countryCode.code === '+1') {
                            setFinalPhone(formatPhoneUS(finalPhone));
                          }
                        }}
                        className="py-5 flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.results.formMvp} <span className="text-destructive">*</span></label>
                    <p className="text-sm text-muted-foreground mb-3">{t.results.mvpExplanation}</p>
                    <div className="grid gap-2">
                      <button onClick={() => setFinalMvp('yes')}
                        className={cn("text-left p-3 rounded-lg border-2 text-sm transition-all font-medium", finalMvp === 'yes' ? "border-accent bg-accent/5" : "border-border hover:border-accent/50")}>
                        ✅ {t.results.mvpYes}
                      </button>
                      <button onClick={() => setFinalMvp('no')}
                        className={cn("text-left p-3 rounded-lg border-2 text-sm transition-all", finalMvp === 'no' ? "border-accent bg-accent/5" : "border-border hover:border-accent/50")}>
                        {t.results.mvpNo}
                      </button>
                    </div>
                  </div>
                  <Button onClick={handleSubmitFinal} disabled={!finalName || !finalPhone || !finalMvp || isSubmittingFinal}
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
