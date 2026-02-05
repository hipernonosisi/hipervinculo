import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type QuestionType = 'text' | 'select' | 'textarea' | 'email';

interface Question {
  type: QuestionType;
  label: string;
  placeholder?: string;
  options?: readonly string[];
}

export default function Audit() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '', '', '']);

  const questions: Question[] = [
    { type: 'text', label: t.audit.questions[0].label, placeholder: t.audit.questions[0].placeholder },
    { type: 'text', label: t.audit.questions[1].label, placeholder: t.audit.questions[1].placeholder },
    { type: 'select', label: t.audit.questions[2].label, options: t.audit.questions[2].options },
    { type: 'select', label: t.audit.questions[3].label, options: t.audit.questions[3].options },
    { type: 'select', label: t.audit.questions[4].label, options: t.audit.questions[4].options },
    { type: 'textarea', label: t.audit.questions[5].label, placeholder: t.audit.questions[5].placeholder },
    { type: 'email', label: t.audit.questions[6].label, placeholder: t.audit.questions[6].placeholder },
  ];

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const canProceed = answers[currentStep].trim() !== '';

  const handleNext = useCallback(async () => {
    if (!canProceed) return;

    if (isLastStep) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase.from('audit_requests').insert({
          company_name: answers[0],
          website_url: answers[1],
          business_type: answers[2],
          monthly_revenue: answers[3],
          monthly_ad_spend: answers[4],
          growth_goals: answers[5],
          email: answers[6],
        });

        if (error) throw error;

        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Your audit request has been submitted.",
        });
      } catch (error) {
        console.error('Error submitting audit:', error);
        toast({
          title: "Error",
          description: "Failed to submit. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [canProceed, isLastStep, answers, toast]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
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

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-lg mx-auto text-center space-y-6">
              <div className="p-4 rounded-full bg-accent/10 w-fit mx-auto">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
              <h1 className="text-3xl font-bold">Thank you!</h1>
              <p className="text-lg text-muted-foreground">{t.audit.success}</p>
              <Button onClick={() => navigate('/')}>Back to Home</Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.audit.title}</h1>
              <p className="text-muted-foreground">{t.audit.subtitle}</p>
            </div>

            {/* Progress */}
            <div className="mb-12">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentStep + 1} of {questions.length}</span>
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

              {currentQuestion.type === 'text' && (
                <Input
                  value={answers[currentStep]}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="text-lg py-6"
                  autoFocus
                />
              )}

              {currentQuestion.type === 'email' && (
                <Input
                  type="email"
                  value={answers[currentStep]}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="text-lg py-6"
                  autoFocus
                />
              )}

              {currentQuestion.type === 'textarea' && (
                <Textarea
                  value={answers[currentStep]}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  rows={4}
                  className="text-lg"
                  autoFocus
                />
              )}

              {currentQuestion.type === 'select' && currentQuestion.options && (
                <div className="grid gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={cn(
                        "text-left p-4 rounded-lg border-2 transition-all",
                        answers[currentStep] === option
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
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
                <ArrowLeft className="mr-2 h-4 w-4" /> {t.audit.back}
              </Button>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {t.audit.pressEnter}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed || isSubmitting}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : isLastStep
                    ? t.audit.submit
                    : t.audit.next}
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
