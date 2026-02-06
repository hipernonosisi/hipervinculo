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
    <div className="relative w-full h-full flex flex-col p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-8" />
        <div className="w-12 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-2xl md:text-3xl font-extrabold mb-2"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-xl font-bold mb-2"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* Intro */}
      <p className="text-sm text-gray-700 mb-4">
        {content.intro}
      </p>
      
      {/* Solution items - use 3 columns for 5 items */}
      <div className="grid grid-cols-3 gap-3 flex-1">
        {content.items.map((item, index) => (
          <div 
            key={index}
            className="p-3 rounded-lg bg-white flex gap-3"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
            >
              <CheckCircle className="w-4 h-4" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-0.5" style={{ color: '#2d4a2d' }}>
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative corner */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32"
        style={{
          background: 'linear-gradient(315deg, rgba(139, 195, 74, 0.1) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
