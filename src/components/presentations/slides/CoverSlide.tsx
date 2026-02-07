import logoHipervinculo from '@/assets/logo-hipervinculo.png';

interface CoverSlideProps {
  content: {
    title: string;
    subtitle: string;
    tagline: string;
  };
}

export function CoverSlide({ content }: CoverSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Diagonal pattern background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#f8f9f5',
          backgroundImage: `repeating-linear-gradient(
            135deg,
            transparent,
            transparent 40px,
            rgba(139, 195, 74, 0.03) 40px,
            rgba(139, 195, 74, 0.03) 80px
          )`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Logo */}
        <img 
          src={logoHipervinculo} 
          alt="Hipervinculo" 
          className="h-8 sm:h-14 md:h-20 mb-3 sm:mb-6 md:mb-8"
        />
        
        {/* Decorative line */}
        <div className="w-10 sm:w-16 md:w-20 h-0.5 sm:h-1 mb-2 sm:mb-4 md:mb-6" style={{ backgroundColor: '#8BC34A' }} />
        
        {/* Title */}
        <h1 
          className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-3 md:mb-4 tracking-tight"
          style={{ color: '#2d4a2d' }}
        >
          {content.title}
        </h1>
        
        {/* Subtitle */}
        <p 
          className="text-xs sm:text-lg md:text-xl mb-2 sm:mb-4 md:mb-6 font-medium"
          style={{ color: '#2d4a2d', opacity: 0.8 }}
        >
          {content.subtitle}
        </p>
        
        {/* Decorative line */}
        <div className="w-10 sm:w-16 md:w-20 h-0.5 sm:h-1 mb-2 sm:mb-4 md:mb-6" style={{ backgroundColor: '#8BC34A' }} />
        
        {/* Tagline */}
        <p 
          className="text-[8px] sm:text-sm md:text-lg font-medium tracking-wide uppercase"
          style={{ color: '#8BC34A' }}
        >
          {content.tagline}
        </p>
      </div>
      
      {/* Corner decorations */}
      <div 
        className="absolute top-0 left-0 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 195, 74, 0.15) 0%, transparent 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24"
        style={{
          background: 'linear-gradient(315deg, rgba(139, 195, 74, 0.15) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
