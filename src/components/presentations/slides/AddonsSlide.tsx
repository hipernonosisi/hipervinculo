import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { Plus } from 'lucide-react';

interface AddonsSlideProps {
  content: {
    title: string;
    items: Array<{
      title: string;
      price: string;
      description: string;
    }>;
  };
}

export function AddonsSlide({ content }: AddonsSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-xl md:text-3xl font-extrabold mb-2 sm:mb-3 md:mb-4"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Add-on items - 3 columns for better fit */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 flex-1">
        {content.items.map((item, index) => (
          <div 
            key={index}
            className="p-1.5 sm:p-3 md:p-4 rounded-md sm:rounded-lg bg-white flex flex-col"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <div 
                className="w-4 h-4 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
              >
                <Plus className="w-2 h-2 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" style={{ color: '#8BC34A' }} />
              </div>
              <span 
                className="font-bold text-[7px] sm:text-sm md:text-base"
                style={{ color: '#8BC34A' }}
              >
                {item.price}
              </span>
            </div>
            <h3 className="font-bold text-[7px] sm:text-sm md:text-lg mb-0.5 sm:mb-1 leading-tight" style={{ color: '#2d4a2d' }}>
              {item.title}
            </h3>
            <p className="text-[5px] sm:text-xs md:text-sm text-gray-600 leading-tight sm:leading-snug">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
