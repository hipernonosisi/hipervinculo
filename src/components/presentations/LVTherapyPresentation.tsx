import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pdf } from '@react-pdf/renderer';
import { lvTherapyPresentationContent, LVTherapyLanguage } from './data/lvTherapyPresentationContent';
import { CoverSlide } from './slides/CoverSlide';
import { AboutSlide } from './slides/AboutSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { SolutionSlide } from './slides/SolutionSlide';
import { PricingSlide } from './slides/PricingSlide';
import { OtherServicesSlide } from './slides/OtherServicesSlide';
import { ContactSlide } from './slides/ContactSlide';
import { LVTherapyPDFDocument } from './pdf/LVTherapyPDFSlides';
import { useToast } from '@/hooks/use-toast';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle, XCircle, Search, Video, Layout, MapPin, Bot, ArrowRight } from 'lucide-react';

const imageToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Custom slide: Digital Audit (Pros & Cons)
function AuditSlide({ content }: { content: typeof lvTherapyPresentationContent.en.audit }) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      <h2 className="text-sm sm:text-2xl md:text-4xl font-bold mb-0.5 sm:mb-1" style={{ color: '#2d4a2d' }}>{content.title}</h2>
      <p className="text-[10px] sm:text-lg md:text-2xl font-bold mb-2 sm:mb-4" style={{ color: '#8BC34A' }}>{content.headline}</p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
        <div>
          <h3 className="text-[9px] sm:text-sm md:text-lg font-bold mb-1 sm:mb-2 flex items-center gap-1" style={{ color: '#2d4a2d' }}>
            <CheckCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" style={{ color: '#8BC34A' }} />
            Strengths
          </h3>
          <div className="space-y-1 sm:space-y-2">
            {content.strengths.map((item, idx) => (
              <div key={idx} className="bg-white rounded-md sm:rounded-xl p-1.5 sm:p-3 shadow-sm">
                <p className="text-[8px] sm:text-xs md:text-sm font-bold" style={{ color: '#2d4a2d' }}>{item.title}</p>
                <p className="text-[7px] sm:text-[10px] md:text-xs" style={{ color: '#6b7280' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[9px] sm:text-sm md:text-lg font-bold mb-1 sm:mb-2 flex items-center gap-1" style={{ color: '#ef4444' }}>
            <XCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
            Growth Opportunities
          </h3>
          <div className="space-y-1 sm:space-y-2">
            {content.weaknesses.map((item, idx) => (
              <div key={idx} className="bg-white rounded-md sm:rounded-xl p-1.5 sm:p-3 shadow-sm border-l-2" style={{ borderColor: '#ef4444' }}>
                <p className="text-[8px] sm:text-xs md:text-sm font-bold" style={{ color: '#2d4a2d' }}>{item.title}</p>
                <p className="text-[7px] sm:text-[10px] md:text-xs" style={{ color: '#6b7280' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom slide: Google Ads Strategy
function GoogleAdsSlide({ content }: { content: typeof lvTherapyPresentationContent.en.googleAds }) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      <h2 className="text-sm sm:text-2xl md:text-4xl font-bold mb-0.5 sm:mb-1" style={{ color: '#2d4a2d' }}>{content.title}</h2>
      <p className="text-[10px] sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#8BC34A' }}>{content.headline}</p>
      <p className="text-[8px] sm:text-xs md:text-base mb-2 sm:mb-4" style={{ color: '#6b7280' }}>{content.description}</p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
        <div>
          <h3 className="text-[9px] sm:text-sm md:text-base font-bold mb-1 sm:mb-2 flex items-center gap-1" style={{ color: '#2d4a2d' }}>
            <Search className="w-2.5 h-2.5 sm:w-4 sm:h-4" style={{ color: '#8BC34A' }} />
            Target Keywords
          </h3>
          <div className="space-y-0.5 sm:space-y-1">
            {content.targeting.map((keyword, idx) => (
              <div key={idx} className="bg-white rounded-md sm:rounded-lg px-1.5 py-0.5 sm:px-3 sm:py-1.5 shadow-sm">
                <p className="text-[7px] sm:text-[10px] md:text-xs font-mono" style={{ color: '#2d4a2d' }}>{keyword}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-1 sm:space-y-3">
          {content.adTypes.map((type, idx) => (
            <div key={idx} className="bg-white rounded-md sm:rounded-xl p-1.5 sm:p-3 shadow-sm">
              <p className="text-[8px] sm:text-xs md:text-sm font-bold mb-0.5" style={{ color: '#2d4a2d' }}>{type.title}</p>
              <p className="text-[7px] sm:text-[10px] md:text-xs" style={{ color: '#6b7280' }}>{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Custom slide: Meta Ads + Video Strategy
function MetaAdsVideoSlide({ content }: { content: typeof lvTherapyPresentationContent.en.metaAdsVideo }) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      <h2 className="text-sm sm:text-2xl md:text-4xl font-bold mb-0.5 sm:mb-1" style={{ color: '#2d4a2d' }}>{content.title}</h2>
      <p className="text-[10px] sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#8BC34A' }}>{content.headline}</p>
      <p className="text-[8px] sm:text-xs md:text-base mb-2 sm:mb-3" style={{ color: '#6b7280' }}>{content.description}</p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
        <div>
          <h3 className="text-[9px] sm:text-sm font-bold mb-1 sm:mb-2" style={{ color: '#2d4a2d' }}>Video Concepts</h3>
          <div className="space-y-1 sm:space-y-2">
            {content.concepts.map((concept, idx) => (
              <div key={idx} className="bg-white rounded-md sm:rounded-xl p-1.5 sm:p-3 shadow-sm">
                <p className="text-[8px] sm:text-xs md:text-sm font-bold" style={{ color: '#8BC34A' }}>{concept.title}</p>
                <p className="text-[7px] sm:text-[10px] md:text-xs" style={{ color: '#6b7280' }}>{concept.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[9px] sm:text-sm font-bold mb-1 sm:mb-2" style={{ color: '#2d4a2d' }}>Pain Points to Address</h3>
          <div className="rounded-md sm:rounded-xl p-2 sm:p-4" style={{ backgroundColor: '#2d4a2d' }}>
            {content.painPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-1 mb-1 sm:mb-2">
                <Video className="w-2 h-2 sm:w-3 sm:h-3 mt-0.5 shrink-0" style={{ color: '#8BC34A' }} />
                <p className="text-[7px] sm:text-[10px] md:text-xs text-white/90">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom slide: Landing Page
function LandingPageSlide({ content }: { content: typeof lvTherapyPresentationContent.en.landingPage }) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      <h2 className="text-sm sm:text-2xl md:text-4xl font-bold mb-0.5 sm:mb-1" style={{ color: '#2d4a2d' }}>{content.title}</h2>
      <p className="text-[10px] sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#8BC34A' }}>{content.headline}</p>
      <p className="text-[8px] sm:text-xs md:text-base mb-2 sm:mb-3" style={{ color: '#6b7280' }}>{content.description}</p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
        <div>
          <h3 className="text-[9px] sm:text-sm font-bold mb-1 sm:mb-2" style={{ color: '#2d4a2d' }}>Features</h3>
          <div className="space-y-0.5 sm:space-y-1.5">
            {content.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-1">
                <CheckCircle className="w-2 h-2 sm:w-3.5 sm:h-3.5 mt-0.5 shrink-0" style={{ color: '#8BC34A' }} />
                <p className="text-[7px] sm:text-[10px] md:text-xs" style={{ color: '#6b7280' }}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[9px] sm:text-sm font-bold mb-1 sm:mb-2" style={{ color: '#2d4a2d' }}>Current vs. Proposed</h3>
          <div className="bg-white rounded-md sm:rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 text-[7px] sm:text-[10px] md:text-xs font-bold p-1.5 sm:p-2" style={{ backgroundColor: '#2d4a2d', color: 'white' }}>
              <span>Metric</span>
              <span>Current</span>
              <span>Proposed</span>
            </div>
            {content.comparison.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 text-[7px] sm:text-[10px] md:text-xs p-1.5 sm:p-2 border-b last:border-0" style={{ color: '#6b7280' }}>
                <span className="font-semibold" style={{ color: '#2d4a2d' }}>{row.label}</span>
                <span className="text-red-500">{row.current}</span>
                <span style={{ color: '#8BC34A' }} className="font-semibold">{row.proposed}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom slide: Local SEO
function LocalSeoSlide({ content }: { content: typeof lvTherapyPresentationContent.en.localSeo }) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      <h2 className="text-sm sm:text-2xl md:text-4xl font-bold mb-0.5 sm:mb-1" style={{ color: '#2d4a2d' }}>{content.title}</h2>
      <p className="text-[10px] sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#8BC34A' }}>{content.headline}</p>
      <p className="text-[8px] sm:text-xs md:text-base mb-2 sm:mb-4" style={{ color: '#6b7280' }}>{content.description}</p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
        {content.actions.map((action, idx) => (
          <div key={idx} className="bg-white rounded-md sm:rounded-xl p-2 sm:p-4 shadow-sm">
            <div className="flex items-center gap-1 mb-1 sm:mb-2">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}>
                <MapPin className="w-2 h-2 sm:w-3 sm:h-3" style={{ color: '#8BC34A' }} />
              </div>
              <p className="text-[8px] sm:text-xs md:text-sm font-bold" style={{ color: '#2d4a2d' }}>{action.title}</p>
            </div>
            <p className="text-[7px] sm:text-[10px] md:text-xs" style={{ color: '#6b7280' }}>{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Custom slide: Qualification Bot
function QualificationBotSlide({ content }: { content: typeof lvTherapyPresentationContent.en.qualificationBot }) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      <h2 className="text-sm sm:text-2xl md:text-4xl font-bold mb-0.5 sm:mb-1" style={{ color: '#2d4a2d' }}>{content.title}</h2>
      <p className="text-[10px] sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#8BC34A' }}>{content.headline}</p>
      <p className="text-[8px] sm:text-xs md:text-base mb-2 sm:mb-3" style={{ color: '#6b7280' }}>{content.description}</p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
        <div>
          <h3 className="text-[9px] sm:text-sm font-bold mb-1 sm:mb-2" style={{ color: '#2d4a2d' }}>Patient Journey</h3>
          <div className="space-y-1 sm:space-y-2">
            {content.flow.map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 text-[8px] sm:text-xs font-bold text-white" style={{ backgroundColor: '#8BC34A' }}>
                  {idx + 1}
                </div>
                <div>
                  <p className="text-[8px] sm:text-xs md:text-sm font-bold" style={{ color: '#2d4a2d' }}>{item.step}</p>
                  <p className="text-[7px] sm:text-[10px] md:text-xs" style={{ color: '#6b7280' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[9px] sm:text-sm font-bold mb-1 sm:mb-2" style={{ color: '#2d4a2d' }}>Key Benefits</h3>
          <div className="rounded-md sm:rounded-xl p-2 sm:p-4" style={{ backgroundColor: '#2d4a2d' }}>
            {content.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-1 mb-1 sm:mb-2">
                <CheckCircle className="w-2 h-2 sm:w-3.5 sm:h-3.5 mt-0.5 shrink-0" style={{ color: '#8BC34A' }} />
                <p className="text-[7px] sm:text-[10px] md:text-xs text-white/90">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LVTherapyPresentation() {
  const [language, setLanguage] = useState<LVTherapyLanguage>('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  const content = lvTherapyPresentationContent[language];
  
  const slides = [
    { id: 'cover', component: <CoverSlide content={content.cover} /> },
    { id: 'about', component: <AboutSlide content={content.about} /> },
    { id: 'audit', component: <AuditSlide content={content.audit} /> },
    { id: 'problem', component: <ProblemSlide content={content.problem} /> },
    { id: 'solution', component: <SolutionSlide content={content.solution} /> },
    { id: 'googleAds', component: <GoogleAdsSlide content={content.googleAds} /> },
    { id: 'metaAdsVideo', component: <MetaAdsVideoSlide content={content.metaAdsVideo} /> },
    { id: 'landingPage', component: <LandingPageSlide content={content.landingPage} /> },
    { id: 'localSeo', component: <LocalSeoSlide content={content.localSeo} /> },
    { id: 'qualificationBot', component: <QualificationBotSlide content={content.qualificationBot} /> },
    { id: 'pricing', component: <PricingSlide content={content.pricing} /> },
    { id: 'otherServices', component: <OtherServicesSlide content={content.otherServices} /> },
    { id: 'contact', component: <ContactSlide content={content.contact} /> },
  ];
  
  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);
  
  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);
  
  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  }, []);
  
  const exportToPDF = useCallback(async () => {
    setIsExporting(true);
    toast({
      title: language === 'en' ? 'Generating PDF...' : 'Generando PDF...',
      description: language === 'en' ? 'Creating vector PDF with text' : 'Creando PDF vectorial con texto',
    });
    
    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      
      const blob = await pdf(
        <LVTherapyPDFDocument content={content} logoBase64={logoBase64} />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hipervinculo-lv-therapy-strategy-${language}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: language === 'en' ? 'PDF Downloaded!' : '¡PDF Descargado!',
        description: `hipervinculo-lv-therapy-strategy-${language}.pdf`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Error',
        description: language === 'en' ? 'Failed to generate PDF' : 'Error al generar el PDF',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  }, [language, content, toast]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevSlide();
    if (e.key === 'ArrowRight') goToNextSlide();
  }, [goToPrevSlide, goToNextSlide]);
  
  return (
    <div className="flex flex-col h-full" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="flex items-center justify-between px-3 py-2 sm:p-4 bg-white border-b gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <h2 className="text-sm sm:text-lg font-bold truncate" style={{ color: '#2d4a2d' }}>
            LV Therapy
          </h2>
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            {currentSlide + 1}/{slides.length}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-1 sm:gap-2 h-8 px-2 sm:px-3 text-xs sm:text-sm">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {language === 'en' ? 'ES' : 'EN'}
          </Button>
          <Button size="sm" onClick={exportToPDF} disabled={isExporting} className="gap-1 sm:gap-2 h-8 px-2 sm:px-3 text-xs sm:text-sm" style={{ backgroundColor: '#8BC34A', color: 'white' }}>
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            PDF
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-8 bg-gray-100 flex items-start justify-center">
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden w-full shrink-0" style={{ maxWidth: '1200px', aspectRatio: '16/9' }}>
          {slides[currentSlide].component}
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 sm:gap-4 px-3 py-2 sm:p-4 bg-white border-t">
        <Button variant="outline" size="icon" onClick={goToPrevSlide} disabled={currentSlide === 0} className="h-8 w-8 sm:h-10 sm:w-10">
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none py-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`shrink-0 h-2 sm:h-2.5 rounded-full transition-all ${index === currentSlide ? 'w-4 sm:w-6' : 'w-2 sm:w-2.5 hover:opacity-80'}`}
              style={{ backgroundColor: index === currentSlide ? '#8BC34A' : 'rgba(139, 195, 74, 0.3)' }}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={goToNextSlide} disabled={currentSlide === slides.length - 1} className="h-8 w-8 sm:h-10 sm:w-10">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
}
