import logoHipervinculo from '@/assets/logo-hipervinculo.png';

interface MethodologySlideProps {
  title?: string;
  phase: string;
  items: Array<{ title: string; description: string }>;
  phaseNumber?: number;
}

export function MethodologySlide({ title, phase, items, phaseNumber = 1 }: MethodologySlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title (only on first methodology slide) */}
      {title && (
        <h2 
          className="text-sm sm:text-xl md:text-3xl font-extrabold mb-1 sm:mb-2 md:mb-3"
          style={{ color: '#2d4a2d' }}
        >
          {title}
        </h2>
      )}
      
      {/* Phase header */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-3 md:mb-4">
        <div 
          className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center text-[8px] sm:text-sm md:text-lg font-extrabold text-white"
          style={{ backgroundColor: '#8BC34A' }}
        >
          {phaseNumber}
        </div>
        <h3 
          className="text-xs sm:text-lg md:text-2xl font-bold"
          style={{ color: '#2d4a2d' }}
        >
          {phase}
        </h3>
      </div>
      
      {/* Methodology items */}
      <div className="grid grid-cols-1 gap-1 sm:gap-2 flex-1 overflow-hidden">
        {items.map((item, index) => (
          <div 
            key={index}
            className="p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg bg-white flex gap-1.5 sm:gap-2 md:gap-3 items-start"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div 
              className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-md sm:rounded-lg flex items-center justify-center text-[7px] sm:text-xs md:text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: 'rgba(45, 74, 45, 0.1)', color: '#2d4a2d' }}
            >
              {String.fromCharCode(65 + index)}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-[8px] sm:text-sm md:text-lg mb-0 sm:mb-0.5 leading-tight" style={{ color: '#2d4a2d' }}>
                {item.title}
              </h4>
              <p className="text-gray-600 text-[6px] sm:text-xs md:text-sm leading-tight sm:leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 mt-2 sm:mt-4 md:mt-6 mb-1 sm:mb-2">
        {[1, 2, 3, 4].map((num) => (
          <div 
            key={num}
            className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-colors"
            style={{ 
              backgroundColor: num === phaseNumber ? '#8BC34A' : 'rgba(139, 195, 74, 0.2)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
