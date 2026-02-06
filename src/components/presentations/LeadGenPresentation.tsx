import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/hooks/use-toast';

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
      description: language === 'en' ? 'This may take a few seconds' : 'Esto puede tomar unos segundos',
    });
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      // Fixed PDF dimensions (16:9 aspect ratio)
      const pdfWidth = 1920;
      const pdfHeight = 1080;
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [pdfWidth, pdfHeight],
      });
      
      const originalSlide = currentSlide;
      
      // Create a hidden container for rendering at exact size
      const hiddenContainer = document.createElement('div');
      hiddenContainer.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: ${pdfWidth}px;
        height: ${pdfHeight}px;
        overflow: hidden;
        background: #f8f9f5;
      `;
      document.body.appendChild(hiddenContainer);
      
      for (let i = 0; i < slides.length; i++) {
        // Update slide for preview
        setCurrentSlide(i);
        
        // Clone the slide container and render at fixed size
        const slideContainer = containerRef.current;
        if (!slideContainer) continue;
        
        // Clone the slide content
        const clone = slideContainer.cloneNode(true) as HTMLElement;
        clone.style.cssText = `
          width: ${pdfWidth}px;
          height: ${pdfHeight}px;
          transform: none;
          border-radius: 0;
          box-shadow: none;
        `;
        
        hiddenContainer.innerHTML = '';
        hiddenContainer.appendChild(clone);
        
        // Wait for render and fonts
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const canvas = await html2canvas(hiddenContainer, {
          scale: 1,
          useCORS: true,
          logging: false,
          backgroundColor: '#f8f9f5',
          width: pdfWidth,
          height: pdfHeight,
          windowWidth: pdfWidth,
          windowHeight: pdfHeight,
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        if (i > 0) {
          pdf.addPage([pdfWidth, pdfHeight], 'landscape');
        }
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      // Cleanup
      document.body.removeChild(hiddenContainer);
      setCurrentSlide(originalSlide);
      
      const fileName = `hipervinculo-lead-generation-${language}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: language === 'en' ? 'PDF Downloaded!' : '¡PDF Descargado!',
        description: fileName,
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
  }, [language, slides.length, currentSlide, toast]);
  
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
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-100 overflow-hidden">
        <div 
          ref={containerRef}
          className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{ 
            width: '100%',
            maxWidth: '1200px',
            aspectRatio: '16/9',
          }}
        >
          {slides[currentSlide].component}
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
