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
    <div className="relative w-full h-full flex flex-col items-center justify-center p-12 overflow-hidden">
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
          className="h-20 md:h-24 mb-12"
        />
        
        {/* Decorative line */}
        <div className="w-24 h-1 mb-8" style={{ backgroundColor: '#8BC34A' }} />
        
        {/* Title */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight"
          style={{ color: '#2d4a2d' }}
        >
          {content.title}
        </h1>
        
        {/* Subtitle */}
        <p 
          className="text-xl md:text-2xl mb-8 font-medium"
          style={{ color: '#2d4a2d', opacity: 0.8 }}
        >
          {content.subtitle}
        </p>
        
        {/* Decorative line */}
        <div className="w-24 h-1 mb-8" style={{ backgroundColor: '#8BC34A' }} />
        
        {/* Tagline */}
        <p 
          className="text-lg md:text-xl font-medium tracking-wide uppercase"
          style={{ color: '#8BC34A' }}
        >
          {content.tagline}
        </p>
      </div>
      
      {/* Corner decorations */}
      <div 
        className="absolute top-0 left-0 w-32 h-32"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 195, 74, 0.15) 0%, transparent 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-32 h-32"
        style={{
          background: 'linear-gradient(315deg, rgba(139, 195, 74, 0.15) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
