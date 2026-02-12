import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pdf } from '@react-pdf/renderer';
import { shopifyDevPresentationContent, ShopifyDevLanguage } from './data/shopifyDevPresentationContent';
import { CoverSlide } from './slides/CoverSlide';
import { AboutSlide } from './slides/AboutSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { SolutionSlide } from './slides/SolutionSlide';
import { ShopifyScopeSlide } from './slides/ShopifyScopeSlide';
import { BrandIdentityProcessSlide } from './slides/BrandIdentityProcessSlide';
import { BrandIdentityPricingSlide } from './slides/BrandIdentityPricingSlide';
import { OtherServicesSlide } from './slides/OtherServicesSlide';
import { ContactSlide } from './slides/ContactSlide';
import { ShopifyDevPDFDocument } from './pdf/ShopifyDevPDFSlides';
import { useToast } from '@/hooks/use-toast';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import symbolHipervinculo from '@/assets/symbol-hipervinculo.png';

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

export function ShopifyDevPresentation() {
  const [language, setLanguage] = useState<ShopifyDevLanguage>('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const content = shopifyDevPresentationContent[language];
  
  const slides = [
    { id: 'cover', component: <CoverSlide content={content.cover} /> },
    { id: 'about', component: <AboutSlide content={content.about} /> },
    { id: 'problem', component: <ProblemSlide content={content.problem} /> },
    { id: 'solution', component: <SolutionSlide content={content.solution} /> },
    { id: 'scope', component: <ShopifyScopeSlide content={content.scope} /> },
    { id: 'process', component: <BrandIdentityProcessSlide content={content.process} /> },
    { id: 'pricing', component: <BrandIdentityPricingSlide content={content.pricing} /> },
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
      const symbolBase64 = await imageToBase64(symbolHipervinculo);
      
      const blob = await pdf(
        <ShopifyDevPDFDocument 
          content={content} 
          logoBase64={logoBase64}
          symbolBase64={symbolBase64}
        />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hipervinculo-shopify-development-${language}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: language === 'en' ? 'PDF Downloaded!' : '¡PDF Descargado!',
        description: `hipervinculo-shopify-development-${language}.pdf`,
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
    <div 
      className="flex flex-col h-full"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 sm:p-4 bg-white border-b gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <h2 className="text-sm sm:text-lg font-bold truncate" style={{ color: '#2d4a2d' }}>
            {language === 'en' ? 'Shopify Development' : 'Desarrollo Shopify'}
          </h2>
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            {currentSlide + 1}/{slides.length}
          </span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="gap-1 sm:gap-2 h-8 px-2 sm:px-3 text-xs sm:text-sm"
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {language === 'en' ? 'ES' : 'EN'}
          </Button>
          
          <Button
            size="sm"
            onClick={exportToPDF}
            disabled={isExporting}
            className="gap-1 sm:gap-2 h-8 px-2 sm:px-3 text-xs sm:text-sm"
            style={{ backgroundColor: '#8BC34A', color: 'white' }}
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            PDF
          </Button>
        </div>
      </div>
      
      {/* Slide viewer */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-8 bg-gray-100 flex items-start justify-center">
        <div 
          ref={containerRef}
          className="relative bg-white rounded-lg shadow-2xl overflow-hidden w-full shrink-0"
          style={{ maxWidth: '1200px', aspectRatio: '16/9' }}
        >
          {slides[currentSlide].component}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 px-3 py-2 sm:p-4 bg-white border-t">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevSlide}
          disabled={currentSlide === 0}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        
        <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none py-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`shrink-0 h-2 sm:h-2.5 rounded-full transition-all ${
                index === currentSlide ? 'w-4 sm:w-6' : 'w-2 sm:w-2.5 hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: index === currentSlide ? '#8BC34A' : 'rgba(139, 195, 74, 0.3)'
              }}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextSlide}
          disabled={currentSlide === slides.length - 1}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
}
