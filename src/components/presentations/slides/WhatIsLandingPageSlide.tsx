import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface WhatIsLandingPageSlideProps {
  content: {
    title: string;
    headline: string;
    definition: string;
    keyPoints: string[];
    notIncluded: string[];
  };
}

export function WhatIsLandingPageSlide({ content }: WhatIsLandingPageSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-5 md:p-6 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-0.5 sm:mb-1">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-5 md:h-7" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-lg md:text-2xl font-extrabold mb-0.5"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-[7px] sm:text-xs md:text-base font-medium mb-1 sm:mb-2"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* Definition box */}
      <div 
        className="p-1.5 sm:p-2.5 md:p-3 rounded-md sm:rounded-xl mb-1 sm:mb-2"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <div className="flex items-start gap-1 sm:gap-2">
          <Info className="w-2.5 h-2.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" style={{ color: '#8BC34A' }} />
          <p 
            className="text-[5.5px] sm:text-[10px] md:text-sm leading-tight"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            {content.definition}
          </p>
        </div>
      </div>
      
      {/* Two columns */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4 flex-1 min-h-0">
        {/* Key Points */}
        <div className="flex flex-col">
          <div 
            className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-1.5 pb-0.5 sm:pb-1 border-b"
            style={{ borderColor: 'rgba(139, 195, 74, 0.3)' }}
          >
            <CheckCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" style={{ color: '#8BC34A' }} />
            <h3 
              className="text-[8px] sm:text-sm md:text-base font-extrabold"
              style={{ color: '#2d4a2d' }}
            >
              {content.title.includes('Qué') ? 'Características Clave' : 'Key Characteristics'}
            </h3>
          </div>
          <div className="space-y-0.5 sm:space-y-1.5">
            {content.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-0.5 sm:gap-1">
                <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 mt-0.5 flex-shrink-0" style={{ color: '#8BC34A' }} />
                <span 
                  className="text-[5.5px] sm:text-[10px] md:text-sm leading-tight"
                  style={{ color: '#374151' }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Not Included */}
        <div className="flex flex-col">
          <div 
            className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-1.5 pb-0.5 sm:pb-1 border-b"
            style={{ borderColor: 'rgba(220, 38, 38, 0.2)' }}
          >
            <XCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" style={{ color: '#dc2626' }} />
            <h3 
              className="text-[8px] sm:text-sm md:text-base font-extrabold"
              style={{ color: '#2d4a2d' }}
            >
              {content.title.includes('Qué') ? 'Importante' : 'Important'}
            </h3>
          </div>
          <div className="space-y-0.5 sm:space-y-1.5">
            {content.notIncluded.map((point, i) => (
              <div key={i} className="flex items-start gap-0.5 sm:gap-1">
                <XCircle className="w-2 h-2 sm:w-3 sm:h-3 mt-0.5 flex-shrink-0" style={{ color: '#dc2626' }} />
                <span 
                  className="text-[5.5px] sm:text-[10px] md:text-sm leading-tight"
                  style={{ color: '#374151' }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
