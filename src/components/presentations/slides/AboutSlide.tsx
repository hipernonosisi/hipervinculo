import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle } from 'lucide-react';

interface AboutSlideProps {
  content: {
    title: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
    credentials: string[];
  };
}

export function AboutSlide({ content }: AboutSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-5 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-xl md:text-3xl font-extrabold mb-1 sm:mb-4"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Description */}
      <p className="text-[8px] sm:text-sm md:text-base text-gray-700 mb-2 sm:mb-6 max-w-4xl leading-snug sm:leading-relaxed">
        {content.description}
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-6 mb-2 sm:mb-8">
        {content.stats.map((stat, index) => (
          <div 
            key={index}
            className="p-1.5 sm:p-4 md:p-6 rounded-md sm:rounded-xl text-center"
            style={{ backgroundColor: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <div 
              className="text-base sm:text-3xl md:text-5xl font-extrabold mb-0.5 sm:mb-2"
              style={{ color: '#8BC34A' }}
            >
              {stat.value}
            </div>
            <div className="text-[6px] sm:text-xs md:text-base font-medium text-gray-600 leading-tight">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Credentials */}
      <div className="grid grid-cols-2 gap-1 sm:gap-3 md:gap-4">
        {content.credentials.map((credential, index) => (
          <div key={index} className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" style={{ color: '#8BC34A' }} />
            <span className="text-gray-700 text-[7px] sm:text-sm md:text-lg font-medium leading-tight">{credential}</span>
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
