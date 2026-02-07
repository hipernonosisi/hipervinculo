import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { Server } from 'lucide-react';

interface TechStackSlideProps {
  content: {
    title: string;
    headline: string;
    categories: Array<{
      name: string;
      tools: string[];
    }>;
  };
}

export function TechStackSlide({ content }: TechStackSlideProps) {
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
      
      {/* Tech categories - 3 columns for better fit */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 flex-1">
        {content.categories.map((category, index) => (
          <div 
            key={index}
            className="p-2 sm:p-4 md:p-5 rounded-md sm:rounded-xl bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-1.5 sm:mb-3 md:mb-4">
              <div 
                className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
              >
                <Server className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: '#8BC34A' }} />
              </div>
              <h3 className="font-bold text-[8px] sm:text-sm md:text-xl leading-tight" style={{ color: '#2d4a2d' }}>
                {category.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-0.5 sm:gap-1.5 md:gap-2">
              {category.tools.map((tool, toolIndex) => (
                <span 
                  key={toolIndex}
                  className="px-1.5 py-0.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[6px] sm:text-xs md:text-base"
                  style={{ 
                    backgroundColor: 'rgba(45, 74, 45, 0.08)',
                    color: '#2d4a2d'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
