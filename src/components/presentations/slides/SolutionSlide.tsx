import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle } from 'lucide-react';

interface SolutionSlideProps {
  content: {
    title: string;
    headline: string;
    intro: string;
    items: Array<{ title: string; description: string }>;
  };
}

export function SolutionSlide({ content }: SolutionSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-xl md:text-3xl font-extrabold mb-0.5 sm:mb-2"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-[9px] sm:text-base md:text-xl font-bold mb-0.5 sm:mb-2"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* Intro */}
      <p className="text-[6px] sm:text-xs md:text-sm text-gray-700 mb-1 sm:mb-3 md:mb-4">
        {content.intro}
      </p>
      
      {/* Solution items - use 3 columns for 5 items */}
      <div className="grid grid-cols-3 gap-1 sm:gap-3 md:gap-4 flex-1">
        {content.items.map((item, index) => (
          <div 
            key={index}
            className="p-1.5 sm:p-3 md:p-4 rounded-md sm:rounded-xl bg-white flex gap-1 sm:gap-3 md:gap-4"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div 
              className="w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
            >
              <CheckCircle className="w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: '#8BC34A' }} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[7px] sm:text-sm md:text-xl mb-0.5 leading-tight" style={{ color: '#2d4a2d' }}>
                {item.title}
              </h3>
              <p className="text-gray-600 text-[5px] sm:text-xs md:text-base leading-tight sm:leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative corner */}
      <div 
        className="absolute bottom-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32"
        style={{
          background: 'linear-gradient(315deg, rgba(139, 195, 74, 0.1) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
