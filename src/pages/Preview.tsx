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
  const budget = answers[9];
  const employees = answers[4];
  const advertising = answers[5];

  // Budget scoring — UPDATED RANGES
  if (budget === '$3,000 - $10,000' || budget === '$10,000 - $50,000' ||
      budget === 'More than $50,000' || budget === 'Más de $50,000') {
    points += 2;
  } else if (budget === '$1,000 - $3,000') {
    points += 1;
  }
  // Less than $1,000 / Menos de $1,000 → 0 points

  // Employee scoring
  if (employees !== 'Just me' && employees !== 'Solo yo') {
    points += 1;
  }
  if (employees === '6-15' || employees === '16-50' || employees === '50+') {
    points += 1;
  }

  // Advertising scoring
  if (advertising !== 'No, not yet' && advertising !== 'No, todavía no') {
    points += 1;
  }

  if (points >= 3) return 'hot';
  if (points >= 2) return 'warm';
  return 'cold';
}

const previewTranslations = {
  en: {
    seoTitle: 'See What Your New Website Could Look Like',
    headline: 'See What Your Website\nCould Look Like',
    subtitle: "See a custom preview of your new website before making any decisions.\nNo cost. No commitment.",
    questions: [
      { label: "What's your current website URL?", placeholder: 'www.yourbusiness.com', noWebsiteLink: "I don't have a website yet" },
      { label: "What's your business name?", placeholder: "Smith's Plumbing" },
      { label: 'What type of service do you provide?', options: ['Plumbing & HVAC', 'Legal Services', 'Medical & Dental', 'Construction & Contracting', 'Home Services', 'Landscaping', 'Auto Services', 'Real Estate', 'Other'] },
      { label: 'What area do you serve?', placeholder: 'Miami, FL or Broward County' },
      { label: 'How many people work in your business?', options: ['Just me', '2-5', '6-15', '16-50', '50+'] },
      { label: 'Are you currently investing in any online advertising?', options: ['Yes, Google Ads', 'Yes, Social Media Ads', 'Yes, Both', 'No, not yet'] },
      { label: "What's your full name?", placeholder: 'John Smith' },
      { label: "What's the best phone number to reach you?", placeholder: '(555) 123-4567' },
      { label: "What's the best email to send your preview?", placeholder: 'john@yourbusiness.com' },
      { label: "What's your approximate monthly budget for marketing?", options: ['Less than $1,000', '$1,000 - $3,000', '$3,000 - $10,000', '$10,000 - $50,000', 'More than $50,000'] },
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
        'Website Development + Lead System Setup: **$2,500** (one-time)',
        'Google Ads Management & Optimization: **$1,000/month**',
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
      { label: '¿Cuál es el nombre de tu negocio?', placeholder: 'Tu nombre de negocio' },
      { label: '¿Qué tipo de servicio ofreces?', options: ['Plomería y HVAC', 'Servicios Legales', 'Médico y Dental', 'Construcción y Contratación', 'Servicios del Hogar', 'Jardinería y Paisajismo', 'Servicios Automotrices', 'Bienes Raíces', 'Otro'] },
      { label: '¿En qué zona ofreces tus servicios?', placeholder: 'Tu ciudad o zona de servicio' },
      { label: '¿Cuántas personas trabajan en tu negocio?', options: ['Solo yo', '2-5', '6-15', '16-50', '50+'] },
      { label: '¿Actualmente inviertes en algún tipo de publicidad en línea?', options: ['Sí, Google Ads', 'Sí, Anuncios en Redes Sociales', 'Sí, Ambos', 'No, todavía no'] },
      { label: '¿Cuál es tu nombre completo?', placeholder: 'Tu nombre completo' },
      { label: '¿Cuál es el mejor teléfono para contactarte?', placeholder: '(555) 123-4567' },
      { label: '¿Cuál es el mejor email para enviarte tu vista previa?', placeholder: 'john@tunegocio.com' },
      { label: '¿Cuál es tu presupuesto mensual aproximado para marketing?', options: ['Menos de $1,000', '$1,000 - $3,000', '$3,000 - $10,000', '$10,000 - $50,000', 'Más de $50,000'] },
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
        'Desarrollo Web + Sistema de Captación: **$2,500** (único pago)',
        'Gestión y Optimización de Google Ads: **$1,000/mes**',
        'Presupuesto mínimo recomendado de anuncios: $1,200/mes (pagado directamente a Google)',
      ],
      pricingFooter: 'Sin contratos — te quedas porque el sistema funciona.',
      trustNote: 'Recuerda: la vista previa es completamente sin costo.\nSolo inviertes si te encanta lo que ves y quieres avanzar.',
      submitButton: 'Obtener Mi Vista Previa →',
    },
  },
} as const;

const TOTAL_STEPS = 11; // 10 questions + 1 pricing screen
const PRICING_STEP = 10; // index 10 = pricing screen

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
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(''));

  const questions: Question[] = t.questions.map((q, i) => {
    const base: Question = {
      type: 'options' in q ? 'select' : i === 7 ? 'tel' : i === 8 ? 'email' : 'text',
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
        business_name: answers[1],
        business_type: answers[2],
        service_area: answers[3],
        employee_count: answers[4],
        current_advertising: answers[5],
        contact_name: answers[6],
        phone: answers[7],
        email: answers[8],
        monthly_budget: answers[9],
        lead_score: leadScore,
        language,
      });

      if (error) throw error;

      supabase.functions.invoke('send-notification', {
        body: {
          type: 'preview-lead',
          language,
          businessName: answers[1],
          businessType: answers[2],
          websiteUrl: answers[0],
          serviceArea: answers[3],
          employeeCount: answers[4],
          currentAdvertising: answers[5],
          contactName: answers[6],
          phone: answers[7],
          email: answers[8],
          monthlyBudget: answers[9],
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
    }
  }, [canProceed, isPricingStep, handleSubmit]);

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
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
    <Layout>
      <SEO
        title={t.seoTitle}
        description={t.subtitle}
        url="https://hipervinculo.net/preview"
      />
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              {isPricingStep ? (
                <>
                  <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                    {language === 'en' ? 'Before you go' : 'Antes de terminar'}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {language === 'en' ? 'One Last Step' : 'Un Último Paso'}
                  </h1>
                  <p className="text-muted-foreground">
                    {language === 'en'
                      ? 'Review what happens next, then request your preview.'
                      : 'Revisa lo que sigue y solicita tu vista previa.'}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 whitespace-pre-line">{t.headline}</h1>
                  <p className="text-muted-foreground whitespace-pre-line">{t.subtitle}</p>
                </>
              )}
            </div>

            {/* Progress - only for question steps */}
            {!isPricingStep && (
              <div className="mb-12">
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
                <div className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-center">{pricing.headline}</h2>

                  {/* 3 Steps */}
                  <div className="space-y-4">
                    {pricing.steps.map((step, i) => {
                      const Icon = pricingIcons[i];
                      return (
                        <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-border bg-background">
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
                  <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
                    <p className="font-bold text-foreground">{pricing.pricingIntro}</p>
                    <ul className="space-y-2 text-sm text-foreground">
                      {pricing.pricingItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span>{renderBold(item)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground">{pricing.pricingFooter}</p>
                  </div>

                  {/* Trust Note */}
                  <p className="text-sm text-muted-foreground text-center whitespace-pre-line">{pricing.trustNote}</p>
                </div>
              ) : (
                /* Regular Question */
                <div className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-bold">{questions[currentStep].label}</h2>

                  {questions[currentStep].type === 'tel' && (
                    <div className="space-y-3">
                      <PhoneInput
                        value={answers[currentStep]}
                        onChange={(val) => handleAnswer(val)}
                        placeholder={questions[currentStep].placeholder}
                        className="text-lg py-1"
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
                        className="text-lg py-6"
                        autoFocus
                      />
                      {questions[currentStep].noWebsiteLink && (
                        <button
                          type="button"
                          onClick={() => {
                            handleAnswer('no-website');
                            setCurrentStep((prev) => prev + 1);
                          }}
                          className="text-sm text-muted-foreground underline hover:text-foreground transition-colors"
                        >
                          {questions[currentStep].noWebsiteLink}
                        </button>
                      )}
                    </div>
                  )}

                  {questions[currentStep].type === 'select' && questions[currentStep].options && (
                    <div className="grid gap-3">
                      {questions[currentStep].options!.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className={cn(
                            'text-left p-4 rounded-lg border-2 transition-all',
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
            <div className="flex items-center justify-between mt-12">
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
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
