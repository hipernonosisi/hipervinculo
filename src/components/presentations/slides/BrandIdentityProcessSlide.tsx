import logoHipervinculo from '@/assets/logo-hipervinculo.png';

interface BrandIdentityProcessSlideProps {
  content: {
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
}

export function BrandIdentityProcessSlide({ content }: BrandIdentityProcessSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-xl md:text-3xl font-extrabold mb-2 sm:mb-4 md:mb-6"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Steps */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4 flex-1">
        {content.steps.map((step, index) => (
          <div 
            key={index} 
            className="p-2 sm:p-4 md:p-5 rounded-md sm:rounded-xl bg-white flex flex-col"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-2 md:mb-3">
              <div 
                className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#8BC34A' }}
              >
                <span className="text-white font-extrabold text-[8px] sm:text-sm md:text-lg">
                  {index + 1}
                </span>
              </div>
              <h3 
                className="text-[8px] sm:text-sm md:text-xl font-extrabold"
                style={{ color: '#2d4a2d' }}
              >
                {step.title}
              </h3>
            </div>
            <p className="text-[6px] sm:text-xs md:text-base text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
