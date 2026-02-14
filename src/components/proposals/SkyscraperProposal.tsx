import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { skyscraperProposalContent } from './data/skyscraperProposalContent';
import { CoverSlide } from '@/components/presentations/slides/CoverSlide';
import { AboutSlide } from '@/components/presentations/slides/AboutSlide';
import { PricingSlide } from '@/components/presentations/slides/PricingSlide';
import { ContactSlide } from '@/components/presentations/slides/ContactSlide';
import { ProposalServiceSlide } from './slides/ProposalServiceSlide';
import { ProposalTermsSlide } from './slides/ProposalTermsSlide';
import { useToast } from '@/hooks/use-toast';

export function SkyscraperProposal() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const content = skyscraperProposalContent;

  const slides = [
    { id: 'cover', component: <CoverSlide content={content.cover} /> },
    { id: 'about', component: <AboutSlide content={content.about} /> },
    {
      id: 'webService',
      component: (
        <ProposalServiceSlide
          content={{
            ...content.webService,
          }}
        />
      ),
    },
    {
      id: 'leadGenService',
      component: (
        <ProposalServiceSlide
          content={{
            ...content.leadGenService,
            price: content.leadGenService.retainer,
            priceLabel: content.leadGenService.retainerLabel,
            secondaryPrice: content.leadGenService.mediaSpend,
            secondaryPriceLabel: content.leadGenService.mediaSpendLabel,
          }}
        />
      ),
    },
    { id: 'investment', component: <PricingSlide content={content.investment} /> },
    { id: 'terms', component: <ProposalTermsSlide content={content.terms} /> },
    { id: 'contact', component: <ContactSlide content={content.contact} /> },
  ];

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevSlide();
      if (e.key === 'ArrowRight') goToNextSlide();
    },
    [goToPrevSlide, goToNextSlide]
  );

  return (
    <div className="flex flex-col h-full" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 sm:p-4 bg-white border-b gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <h2 className="text-sm sm:text-lg font-bold truncate" style={{ color: '#2d4a2d' }}>
            Proposal — Skyscraper Construction
          </h2>
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            {currentSlide + 1}/{slides.length}
          </span>
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
        <Button variant="outline" size="icon" onClick={goToPrevSlide} disabled={currentSlide === 0} className="h-8 w-8 sm:h-10 sm:w-10">
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
                backgroundColor: index === currentSlide ? '#8BC34A' : 'rgba(139, 195, 74, 0.3)',
              }}
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
