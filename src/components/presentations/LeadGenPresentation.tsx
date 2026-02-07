import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pdf } from '@react-pdf/renderer';
import { leadGenPresentationContent, PresentationLanguage } from './data/leadGenPresentationContent';
import { CoverSlide } from './slides/CoverSlide';
import { AboutSlide } from './slides/AboutSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { SolutionSlide } from './slides/SolutionSlide';
import { MethodologySlide } from './slides/MethodologySlide';
import { TechStackSlide } from './slides/TechStackSlide';
import { ReportingSlide } from './slides/ReportingSlide';
import { PricingSlide } from './slides/PricingSlide';
import { AddonsSlide } from './slides/AddonsSlide';
import { OtherServicesSlide } from './slides/OtherServicesSlide';
import { ContactSlide } from './slides/ContactSlide';
import { LeadGenPDFDocument } from './pdf/PDFSlides';
import { useToast } from '@/hooks/use-toast';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import symbolHipervinculo from '@/assets/symbol-hipervinculo.png';

// Helper function to convert image URL to base64
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

export function LeadGenPresentation() {
  const [language, setLanguage] = useState<PresentationLanguage>('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const content = leadGenPresentationContent[language];
  
  const slides = [
    { id: 'cover', component: <CoverSlide content={content.cover} /> },
    { id: 'about', component: <AboutSlide content={content.about} /> },
    { id: 'problem', component: <ProblemSlide content={content.problem} /> },
    { id: 'solution', component: <SolutionSlide content={content.solution} /> },
    { id: 'methodology1', component: <MethodologySlide title={content.methodology1.title} phase={content.methodology1.phase} items={content.methodology1.items} phaseNumber={1} /> },
    { id: 'methodology2', component: <MethodologySlide phase={content.methodology2.phase} items={content.methodology2.items} phaseNumber={2} /> },
    { id: 'methodology3', component: <MethodologySlide phase={content.methodology3.phase} items={content.methodology3.items} phaseNumber={3} /> },
    { id: 'methodology4', component: <MethodologySlide phase={content.methodology4.phase} items={content.methodology4.items} phaseNumber={4} /> },
    { id: 'techStack', component: <TechStackSlide content={content.techStack} /> },
    { id: 'reporting', component: <ReportingSlide content={content.reporting} /> },
    { id: 'pricing', component: <PricingSlide content={content.pricing} /> },
    { id: 'addons', component: <AddonsSlide content={content.addons} /> },
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
      // Convert images to base64 for PDF embedding
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const symbolBase64 = await imageToBase64(symbolHipervinculo);
      
      // Generate PDF using @react-pdf/renderer (vector text)
      const blob = await pdf(
        <LeadGenPDFDocument 
          content={content} 
          logoBase64={logoBase64}
          symbolBase64={symbolBase64}
        />
      ).toBlob();
      
      // Download the PDF
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hipervinculo-lead-generation-${language}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: language === 'en' ? 'PDF Downloaded!' : '¡PDF Descargado!',
        description: `hipervinculo-lead-generation-${language}.pdf`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' ? 'Failed to generate PDF' : 'Error al generar el PDF',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  }, [language, content, toast]);
  
  // Keyboard navigation
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
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold" style={{ color: '#2d4a2d' }}>
            Lead Generation Systems
          </h2>
          <span className="text-sm text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'ES' : 'EN'}
          </Button>
          
          <Button
            size="sm"
            onClick={exportToPDF}
            disabled={isExporting}
            className="gap-2"
            style={{ backgroundColor: '#8BC34A', color: 'white' }}
          >
            <Download className="w-4 h-4" />
            {isExporting 
              ? (language === 'en' ? 'Exporting...' : 'Exportando...') 
              : 'PDF'
            }
          </Button>
        </div>
      </div>
      
      {/* Slide viewer */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100">
        <div className="flex items-center justify-center min-h-full">
          <div 
            ref={containerRef}
            className="relative bg-white rounded-lg shadow-2xl overflow-hidden w-full"
            style={{ 
              maxWidth: '1200px',
              aspectRatio: '16/9',
            }}
          >
            {slides[currentSlide].component}
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 p-4 bg-white border-t">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevSlide}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        {/* Slide dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-6' 
                  : 'hover:opacity-80'
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
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
