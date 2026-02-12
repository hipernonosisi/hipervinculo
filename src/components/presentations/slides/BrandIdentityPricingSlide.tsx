import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle, Star } from 'lucide-react';

interface BrandIdentityPricingSlideProps {
  content: {
    title: string;
    headline: string;
    packages: Array<{
      name: string;
      price: string;
      highlight?: boolean;
      revisions: string;
      includes: string[];
    }>;
    note: string;
  };
}

export function BrandIdentityPricingSlide({ content }: BrandIdentityPricingSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-xl md:text-3xl font-extrabold mb-0.5"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-[7px] sm:text-sm md:text-lg font-medium mb-1.5 sm:mb-3"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* 3-column pricing */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 flex-1 min-h-0">
        {content.packages.map((pkg, index) => (
          <div 
            key={index}
            className={`flex flex-col rounded-md sm:rounded-xl overflow-hidden ${
              pkg.highlight ? 'ring-1 sm:ring-2 ring-offset-1 sm:ring-offset-2 ring-[#8BC34A]' : ''
            }`}
            style={{ 
              backgroundColor: pkg.highlight ? '#2d4a2d' : '#ffffff',
              boxShadow: pkg.highlight ? '0 4px 24px rgba(45, 74, 45, 0.2)' : '0 2px 12px rgba(0,0,0,0.04)',
            }}
          >
            {/* Package header */}
            <div className="p-1.5 sm:p-3 md:p-4">
              <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
                {pkg.highlight && <Star className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-current" style={{ color: '#8BC34A' }} />}
                <h3 
                  className="text-[8px] sm:text-sm md:text-lg font-extrabold"
                  style={{ color: pkg.highlight ? '#ffffff' : '#2d4a2d' }}
                >
                  {pkg.name}
                </h3>
              </div>
              <div 
                className="text-sm sm:text-2xl md:text-3xl font-extrabold mb-0.5 sm:mb-1"
                style={{ color: '#8BC34A' }}
              >
                {pkg.price}
              </div>
              <p 
                className="text-[6px] sm:text-xs md:text-sm font-medium"
                style={{ color: pkg.highlight ? 'rgba(255,255,255,0.7)' : '#6b7280' }}
              >
                {pkg.revisions}
              </p>
            </div>
            
            {/* Divider */}
            <div 
              className="h-px mx-1.5 sm:mx-3"
              style={{ backgroundColor: pkg.highlight ? 'rgba(139, 195, 74, 0.3)' : 'rgba(0,0,0,0.06)' }}
            />
            
            {/* Includes */}
            <div className="p-1.5 sm:p-3 md:p-4 flex-1 overflow-y-auto">
              <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5">
                {pkg.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-0.5 sm:gap-1.5">
                    <CheckCircle 
                      className="w-2 h-2 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0" 
                      style={{ color: '#8BC34A' }} 
                    />
                    <span 
                      className="text-[5px] sm:text-[10px] md:text-sm leading-tight"
                      style={{ color: pkg.highlight ? 'rgba(255,255,255,0.9)' : '#374151' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Note */}
      <div 
        className="mt-1 sm:mt-2 md:mt-3 p-1 sm:p-2 md:p-3 rounded-md sm:rounded-xl text-center"
        style={{ backgroundColor: 'rgba(139, 195, 74, 0.1)' }}
      >
        <p className="text-[6px] sm:text-xs md:text-base font-medium" style={{ color: '#2d4a2d' }}>
          {content.note}
        </p>
      </div>
    </div>
  );
}
