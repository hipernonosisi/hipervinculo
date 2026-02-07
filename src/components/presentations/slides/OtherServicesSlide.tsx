import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { ArrowRight } from 'lucide-react';

interface OtherServicesSlideProps {
  content: {
    title: string;
    headline: string;
    services: Array<{
      title: string;
      description: string;
    }>;
  };
}

export function OtherServicesSlide({ content }: OtherServicesSlideProps) {
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
      
      {/* Services grid - 3 columns */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 flex-1">
        {content.services.map((service, index) => (
          <div 
            key={index}
            className="p-1.5 sm:p-3 md:p-4 rounded-md sm:rounded-xl bg-white flex items-start gap-1 sm:gap-2 md:gap-3"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div 
              className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
            >
              <ArrowRight className="w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[7px] sm:text-sm md:text-lg mb-0.5 sm:mb-1 leading-tight" style={{ color: '#2d4a2d' }}>
                {service.title}
              </h3>
              <p className="text-gray-600 text-[5px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
