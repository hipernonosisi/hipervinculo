import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface CreativeScopeSlideProps {
  content: {
    title: string;
    headline: string;
    included: string[];
    notIncluded: string[];
    clarification: string;
  };
}

export function CreativeScopeSlide({ content }: CreativeScopeSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-xl md:text-3xl font-extrabold mb-0.5 sm:mb-1"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-[8px] sm:text-sm md:text-lg font-medium mb-2 sm:mb-3 md:mb-4"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* Two columns */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4 flex-1">
        {/* Included */}
        <div 
          className="p-2 sm:p-4 md:p-5 rounded-md sm:rounded-xl bg-white flex flex-col"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
        >
          <h3 className="text-[9px] sm:text-base md:text-xl font-bold mb-1 sm:mb-3" style={{ color: '#8BC34A' }}>
            ✓ {content.title === 'Creative Scope' ? 'What We Create' : 'Lo Que Creamos'}
          </h3>
          <div className="space-y-0.5 sm:space-y-1.5 md:space-y-2 flex-1">
            {content.included.map((item, index) => (
              <div key={index} className="flex items-start gap-1 sm:gap-2">
                <CheckCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" style={{ color: '#8BC34A' }} />
                <span className="text-gray-700 text-[5.5px] sm:text-xs md:text-base leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Not Included */}
        <div 
          className="p-2 sm:p-4 md:p-5 rounded-md sm:rounded-xl flex flex-col"
          style={{ backgroundColor: '#2d4a2d' }}
        >
          <h3 className="text-[9px] sm:text-base md:text-xl font-bold mb-1 sm:mb-3 text-white">
            ✗ {content.title === 'Creative Scope' ? 'What You Provide' : 'Lo Que Tú Provees'}
          </h3>
          <div className="space-y-0.5 sm:space-y-1.5 md:space-y-2 flex-1">
            {content.notIncluded.map((item, index) => (
              <div key={index} className="flex items-start gap-1 sm:gap-2">
                <XCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0 text-red-400/70" />
                <span className="text-white/90 text-[5.5px] sm:text-xs md:text-base leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Clarification note */}
      <div 
        className="mt-1.5 sm:mt-3 md:mt-4 p-1.5 sm:p-3 md:p-4 rounded-md sm:rounded-xl flex items-start gap-1 sm:gap-2"
        style={{ backgroundColor: 'rgba(139, 195, 74, 0.1)' }}
      >
        <Info className="w-3 h-3 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{ color: '#8BC34A' }} />
        <p className="text-[6px] sm:text-sm md:text-base font-medium" style={{ color: '#2d4a2d' }}>
          {content.clarification}
        </p>
      </div>
    </div>
  );
}
