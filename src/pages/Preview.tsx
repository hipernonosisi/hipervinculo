import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  // Budget scoring
  if (budget === '$1,500 - $3,000' || budget === 'More than $3,000' || budget === 'Más de $3,000') {
    points += 2;
  } else if (budget === '$500 - $1,500') {
    points += 1;
  }

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
    headline: 'See What Your New Website Could Look Like',
    subtitle: "See a custom preview of your new website before making any decisions. No cost. No commitment.",
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
      { label: "What's your approximate monthly budget for marketing?", options: ['Less than $500', '$500 - $1,500', '$1,500 - $3,000', 'More than $3,000'] },
    ],
    next: 'Next',
    back: 'Back',
    submit: 'Get My Preview',
    pressEnter: 'Press Enter ↵',
    submitting: 'Submitting...',
  },
  es: {
    seoTitle: 'Mira Cómo Se Vería Tu Nuevo Sitio Web',
    headline: 'Mira Cómo Se Vería Tu Nuevo Sitio Web',
    subtitle: 'Visualiza tu nuevo sitio web antes de tomar cualquier decisión. Sin costo. Sin compromiso.',
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
      { label: '¿Cuál es tu presupuesto mensual aproximado para marketing?', options: ['Menos de $500', '$500 - $1,500', '$1,500 - $3,000', 'Más de $3,000'] },
    ],
    next: 'Siguiente',
    back: 'Atrás',
    submit: 'Obtener Mi Vista Previa',
    pressEnter: 'Presiona Enter ↵',
    submitting: 'Enviando...',
  },
} as const;

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

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const canProceed = answers[currentStep].trim() !== '';

  const handleNext = useCallback(async () => {
    if (!canProceed) return;

    if (isLastStep) {
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

        // Send notification (don't block)
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
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [canProceed, isLastStep, answers, language, toast, navigate]);

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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.headline}</h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>

            {/* Progress */}
            <div className="mb-12">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{language === 'en' ? 'Question' : 'Pregunta'} {currentStep + 1} {language === 'en' ? 'of' : 'de'} {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="space-y-8 animate-fade-in" key={currentStep}>
              <h2 className="text-2xl md:text-3xl font-bold">{currentQuestion.label}</h2>

              {(currentQuestion.type === 'text' || currentQuestion.type === 'tel' || currentQuestion.type === 'email') && (
                <div className="space-y-3">
                  <Input
                    type={currentQuestion.type === 'tel' ? 'tel' : currentQuestion.type === 'email' ? 'email' : 'text'}
                    value={answers[currentStep]}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="text-lg py-6"
                    autoFocus
                  />
                  {currentQuestion.noWebsiteLink && (
                    <button
                      type="button"
                      onClick={() => {
                        handleAnswer('no-website');
                        setCurrentStep((prev) => prev + 1);
                      }}
                      className="text-sm text-muted-foreground underline hover:text-foreground transition-colors"
                    >
                      {currentQuestion.noWebsiteLink}
                    </button>
                  )}
                </div>
              )}

              {currentQuestion.type === 'select' && currentQuestion.options && (
                <div className="grid gap-3">
                  {currentQuestion.options.map((option) => (
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
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {t.pressEnter}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed || isSubmitting}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting
                    ? t.submitting
                    : isLastStep
                    ? t.submit
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
