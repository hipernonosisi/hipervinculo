import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layout as LayoutIcon, MessageCircle, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type QuestionType = 'text' | 'select' | 'email' | 'tel';

interface Question {
  type: QuestionType;
  label: string;
  placeholder?: string;
  options?: readonly string[];
  noWebsiteLink?: string;
}

function calculateLeadScore(answers: string[]) {
  let points = 0;
  const budget = answers[4];

  // Budget scoring
  if (budget === '$3,000 - $10,000' || budget === '$10,000 - $50,000' ||
      budget === 'More than $50,000' || budget === 'Más de $50,000') {
    points += 2;
  } else if (budget === '$1,250 - $3,000') {
    points += 1;
  }

  if (points >= 2) return 'hot';
  if (points >= 1) return 'warm';
  return 'cold';
}

const previewTranslations = {
  en: {
    seoTitle: 'See What Your New Website Could Look Like',
    headline: 'See What Your Website\nCould Look Like',
    subtitle: "See a custom preview of your new website before making any decisions.\nNo cost. No commitment.",
    questions: [
      { label: "What's your current website URL?", placeholder: 'www.yourbusiness.com', noWebsiteLink: "I don't have a website yet" },
      { label: "What's your full name?", placeholder: 'John Smith' },
      { label: "What's the best phone number to reach you?", placeholder: '(555) 123-4567' },
      { label: "What's the best email to send your preview?", placeholder: 'john@yourbusiness.com' },
      { label: "What's your approximate monthly budget for marketing?", options: ['Less than $1,250', '$1,250 - $3,000', '$3,000 - $10,000', '$10,000 - $50,000', 'More than $50,000'] },
    ],
    next: 'Next',
    back: 'Back',
    submit: 'Get My Preview',
    pressEnter: 'Press Enter ↵',
    submitting: 'Submitting...',
    pricingStep: {
      headline: "Here's How It Works",
      steps: [
        { title: 'We design your preview — no cost', subtitle: "Our team builds a custom preview of your new website so you can see exactly what you'd get." },
        { title: 'We review it together', subtitle: "We'll walk you through the preview, answer your questions, and discuss how it can generate leads for your business." },
        { title: 'If you love it, we build it', subtitle: 'We bring your new website to life and set up your lead generation system.' },
      ],
      pricingIntro: 'If you decide to move forward, here\'s the investment:',
      pricingItems: [
        'Website Development + Lead System Setup: **$3,000** (one-time)',
        'Google Ads Management & Optimization: **$1,250/month**',
        'Recommended minimum ad budget: $1,200/month (paid directly to Google)',
      ],
      pricingFooter: 'No contracts — you stay because the system works.',
      trustNote: 'Remember: the preview is completely free.\nYou only invest if you love what you see and want to move forward.',
      submitButton: 'Get My Preview →',
    },
  },
  es: {
    seoTitle: 'Mira Cómo Se Vería Tu Nuevo Sitio Web',
    headline: 'Mira Cómo Se Vería\nTu Sitio Web',
    subtitle: 'Visualiza tu nuevo sitio web antes de tomar cualquier decisión.\nSin costo. Sin compromiso.',
    questions: [
      { label: '¿Cuál es la URL de tu sitio web actual?', placeholder: 'www.tunegocio.com', noWebsiteLink: 'Aún no tengo sitio web' },
      { label: '¿Cuál es tu nombre completo?', placeholder: 'Tu nombre completo' },
      { label: '¿Cuál es el mejor teléfono para contactarte?', placeholder: '(555) 123-4567' },
      { label: '¿Cuál es el mejor email para enviarte tu vista previa?', placeholder: 'john@tunegocio.com' },
      { label: '¿Cuál es tu presupuesto mensual aproximado para marketing?', options: ['Menos de $1,250', '$1,250 - $3,000', '$3,000 - $10,000', '$10,000 - $50,000', 'Más de $50,000'] },
    ],
    next: 'Siguiente',
    back: 'Atrás',
    submit: 'Obtener Mi Vista Previa',
    pressEnter: 'Presiona Enter ↵',
    submitting: 'Enviando...',
    pricingStep: {
      headline: 'Así Es Como Funciona',
      steps: [
        { title: 'Diseñamos tu vista previa — sin costo', subtitle: 'Nuestro equipo construye una vista previa personalizada de tu nuevo sitio web para que veas exactamente lo que recibirías.' },
        { title: 'Lo revisamos juntos', subtitle: 'Te mostramos la vista previa, respondemos tus preguntas, y discutimos cómo puede generar leads para tu negocio.' },
        { title: 'Si te encanta, lo construimos', subtitle: 'Hacemos realidad tu nuevo sitio web y configuramos tu sistema de captación de clientes.' },
      ],
      pricingIntro: 'Si decides avanzar, esta es la inversión:',
      pricingItems: [
        'Desarrollo Web + Sistema de Captación: **$3,000** (único pago)',
        'Gestión y Optimización de Google Ads: **$1,250/mes**',
        'Presupuesto mínimo recomendado de anuncios: $1,200/mes (pagado directamente a Google)',
      ],
      pricingFooter: 'Sin contratos — te quedas porque el sistema funciona.',
      trustNote: 'Recuerda: la vista previa es completamente sin costo.\nSolo inviertes si te encanta lo que ves y quieres avanzar.',
      submitButton: 'Obtener Mi Vista Previa →',
    },
  },
} as const;

const TOTAL_STEPS = 6; // 5 questions + 1 pricing screen
const PRICING_STEP = 5; // index 5 = pricing screen

const pricingIcons = [LayoutIcon, MessageCircle, Rocket];

function renderBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
  );
}

export default function Preview() {
  const { language } = useLanguage();
  const t = previewTranslations[language];
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem('preview_session_id');
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem('preview_session_id', id);
    return id;
  });

  // Save partial data to incomplete_leads on each step change
  useEffect(() => {
    const savePartialData = async () => {
      const payload = {
        session_id: sessionId,
        current_step: currentStep,
        website_url: answers[0] || null,
        contact_name: answers[1] || null,
        phone: answers[2] || null,
        email: answers[3] || null,
        monthly_budget: answers[4] || null,
        language,
        updated_at: new Date().toISOString(),
      };
      
      await supabase.from('incomplete_leads').upsert(payload, { onConflict: 'session_id' });
    };

    // Only save if the user has started interacting
    if (currentStep > 0 || answers.some(a => a)) {
      savePartialData();
    }
  }, [currentStep, sessionId, language]);

  const questions: Question[] = t.questions.map((q, i) => {
    const base: Question = {
      type: 'options' in q ? 'select' : i === 2 ? 'tel' : i === 3 ? 'email' : 'text',
      label: q.label,
      placeholder: 'placeholder' in q ? q.placeholder : undefined,
      options: 'options' in q ? q.options : undefined,
    };
    if (i === 0 && 'noWebsiteLink' in q) {
      base.noWebsiteLink = q.noWebsiteLink;
    }
    return base;
  });

  const isPricingStep = currentStep === PRICING_STEP;
  const isLastStep = currentStep === PRICING_STEP;

  const isValidDomain = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    // Match domain with TLD (e.g. example.com, my-site.co.uk)
    return /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(
      trimmed.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '')
    );
  };

  const canProceed = isPricingStep || (() => {
    const val = answers[currentStep]?.trim();
    if (!val) return false;
    // Step 0 (website URL): require valid domain unless "no website" was selected
    if (currentStep === 0 && val !== (language === 'en' ? "I don't have a website yet" : "Aún no tengo sitio web")) {
      return isValidDomain(val);
    }
    return true;
  })();

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const leadScore = calculateLeadScore(answers);

      const { error } = await supabase.from('preview_leads').insert({
        website_url: answers[0],
        business_name: '',
        business_type: '',
        contact_name: answers[1],
        phone: answers[2],
        email: answers[3],
        monthly_budget: answers[4],
        lead_score: leadScore,
        language,
      });

      if (error) throw error;

      // Mark incomplete lead as completed
      supabase.from('incomplete_leads')
        .update({ completed: true })
        .eq('session_id', sessionId)
        .then(() => {});

      supabase.functions.invoke('send-notification', {
        body: {
          type: 'preview-lead',
          language,
          businessName: '',
          businessType: '',
          websiteUrl: answers[0],
          contactName: answers[1],
          phone: answers[2],
          email: answers[3],
          monthlyBudget: answers[4],
          leadScore,
        }
      }).catch(err => console.error('Notification error:', err));

      navigate('/thank-you/preview');
    } catch (error) {
      console.error('Error submitting preview request:', error);
      toast({
        title: 'Error',
        description: language === 'en' ? 'Failed to submit. Please try again.' : 'Error al enviar. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, language, toast, navigate]);

  const handleNext = useCallback(async () => {
    if (!canProceed) return;

    if (isPricingStep) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [canProceed, isPricingStep, handleSubmit]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };

  // Handle Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && canProceed && !isSubmitting) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canProceed, isSubmitting, handleNext]);

  const pricing = t.pricingStep;

  return (
    <Layout hideBottomCta>
      <SEO
        title={t.seoTitle}
        description={t.subtitle}
        url="https://hipervinculo.net/preview"
      />
      <section className="py-10 md:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 md:mb-12">
              {isPricingStep ? (
                <>
                  <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                    {language === 'en' ? 'Before you go' : 'Antes de terminar'}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-bold mb-4 whitespace-pre-line">
                    {language === 'en'
                      ? 'One Last Step to Get\nYour No-Cost Preview'
                      : 'Un Último Paso para\nTu Vista Previa Sin Costo'}
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground whitespace-pre-line">{t.subtitle}</p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl md:text-4xl font-bold mb-4 whitespace-pre-line">{t.headline}</h1>
                  <p className="text-sm md:text-base text-muted-foreground whitespace-pre-line">{t.subtitle}</p>
                </>
              )}
            </div>

            {/* Progress - only for question steps */}
            {!isPricingStep && (
              <div className="mb-6 md:mb-12">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>
                    {language === 'en' ? 'Step' : 'Paso'} {currentStep + 1} {language === 'en' ? 'of' : 'de'} {TOTAL_STEPS}
                  </span>
                  <span>{Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="animate-fade-in" key={currentStep}>
              {isPricingStep ? (
                /* Pricing / How It Works Screen */
                <div className="space-y-5 md:space-y-8">
                  <h2 className="text-xl md:text-3xl font-bold text-center">{pricing.headline}</h2>

                  {/* 3 Steps */}
                  <div className="space-y-4">
                    {pricing.steps.map((step, i) => {
                      const Icon = pricingIcons[i];
                      return (
                        <div key={i} className="flex gap-4 items-start p-3 md:p-4 rounded-xl border border-border bg-background">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">{step.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{step.subtitle}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pricing Box */}
                  <div className="rounded-xl border border-border bg-muted/50 p-4 md:p-6 space-y-4">
                    <p className="text-sm md:text-base font-bold text-foreground">{pricing.pricingIntro}</p>
                    <ul className="space-y-2 text-xs md:text-sm text-foreground">
                      {pricing.pricingItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span>{renderBold(item)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs md:text-sm text-muted-foreground">{pricing.pricingFooter}</p>
                  </div>

                  {/* Trust Note */}
                  <p className="text-sm text-muted-foreground text-center whitespace-pre-line">{pricing.trustNote}</p>
                </div>
              ) : (
                /* Regular Question */
                <div className="space-y-5 md:space-y-8">
                  <h2 className="text-xl md:text-3xl font-bold">{questions[currentStep].label}</h2>

                  {questions[currentStep].type === 'tel' && (
                    <div className="space-y-3">
                      <PhoneInput
                        value={answers[currentStep]}
                        onChange={(val) => handleAnswer(val)}
                        placeholder={questions[currentStep].placeholder}
                        className="text-base py-1 md:text-lg"
                        autoFocus
                      />
                    </div>
                  )}

                  {(questions[currentStep].type === 'text' || questions[currentStep].type === 'email') && (
                    <div className="space-y-3">
                      <Input
                        type={questions[currentStep].type === 'email' ? 'email' : 'text'}
                        value={answers[currentStep]}
                        onChange={(e) => handleAnswer(e.target.value)}
                        placeholder={questions[currentStep].placeholder}
                        className="text-base py-4 md:text-lg md:py-6"
                        autoFocus
                      />
                      {questions[currentStep].noWebsiteLink && (
                        <button
                          type="button"
                          onClick={() => {
                            handleAnswer('no-website');
                            setCurrentStep((prev) => prev + 1);
                            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                          }}
                          className="text-sm text-muted-foreground underline hover:text-foreground transition-colors py-2"
                        >
                          {questions[currentStep].noWebsiteLink}
                        </button>
                      )}
                    </div>
                  )}

                  {questions[currentStep].type === 'select' && questions[currentStep].options && (
                    <div className="grid gap-2 md:gap-3">
                      {questions[currentStep].options!.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className={cn(
                            'text-left p-3 md:p-4 rounded-lg border-2 transition-all min-h-[48px] text-sm md:text-base',
                            answers[currentStep] === option
                              ? 'border-accent bg-accent/5'
                              : 'border-border hover:border-accent/50'
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 md:mt-12 sticky bottom-0 bg-background py-4 md:py-0 md:static border-t md:border-t-0 border-border -mx-4 px-4 md:mx-0 md:px-0">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={currentStep === 0 ? 'invisible' : ''}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> {t.back}
              </Button>

              <div className="flex items-center gap-4">
                {!isPricingStep && (
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {t.pressEnter}
                  </span>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!canProceed || isSubmitting}
                  className={cn(
                    isPricingStep
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 py-3 h-auto animate-pulse hover:animate-none"
                      : "bg-accent hover:bg-accent/90 text-accent-foreground"
                  )}
                  size={isPricingStep ? "lg" : "default"}
                >
                  {isSubmitting
                    ? t.submitting
                    : isLastStep
                    ? pricing.submitButton
                    : t.next}
                  {!isPricingStep && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
