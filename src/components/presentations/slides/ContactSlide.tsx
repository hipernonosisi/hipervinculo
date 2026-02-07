import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ContactSlideProps {
  content: {
    title: string;
    headline: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    cta: string;
  };
}

export function ContactSlide({ content }: ContactSlideProps) {
  return (
    <div className="relative w-full h-full flex overflow-hidden">
      {/* Left side - Dark green with content */}
      <div 
        className="flex-1 flex flex-col justify-center p-3 sm:p-6 md:p-10"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        {/* Title */}
        <h2 className="text-sm sm:text-2xl md:text-4xl font-extrabold mb-0.5 sm:mb-1 md:mb-2 text-white">
          {content.title}
        </h2>
        
        {/* Headline */}
        <p 
          className="text-[8px] sm:text-base md:text-xl font-bold mb-1 sm:mb-2 md:mb-3"
          style={{ color: '#8BC34A' }}
        >
          {content.headline}
        </p>
        
        {/* Description */}
        <p className="text-[6px] sm:text-sm md:text-base text-white/80 mb-2 sm:mb-6 md:mb-8 max-w-md leading-tight sm:leading-normal">
          {content.description}
        </p>
        
        {/* Contact info - vertical stack */}
        <div className="space-y-1 sm:space-y-2 md:space-y-3 mb-2 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <div 
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}
            >
              <Mail className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <div className="text-white/60 text-[5px] sm:text-[10px] md:text-xs">Email</div>
              <div className="text-white font-medium text-[7px] sm:text-xs md:text-base">{content.email}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <div 
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}
            >
              <Phone className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <div className="text-white/60 text-[5px] sm:text-[10px] md:text-xs">Phone</div>
              <div className="text-white font-medium text-[7px] sm:text-xs md:text-base">{content.phone}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <div 
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}
            >
              <MapPin className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <div className="text-white/60 text-[5px] sm:text-[10px] md:text-xs">Address</div>
              <div className="text-white font-medium text-[6px] sm:text-[10px] md:text-sm whitespace-pre-line leading-tight">{content.address}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <div 
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}
            >
              <Globe className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <div className="text-white/60 text-[5px] sm:text-[10px] md:text-xs">Website</div>
              <div className="text-white font-medium text-[7px] sm:text-xs md:text-base">{content.website}</div>
            </div>
          </div>
        </div>
        
        {/* CTA button */}
        <button 
          className="px-3 py-1 sm:px-6 sm:py-2 md:px-8 md:py-3 rounded-full text-[7px] sm:text-sm md:text-base font-bold transition-transform hover:scale-105 w-fit"
          style={{ backgroundColor: '#8BC34A', color: '#2d4a2d' }}
        >
          {content.cta}
        </button>
      </div>
      
      {/* Right side - White with logo */}
      <div 
        className="w-2/5 flex flex-col items-center justify-center p-2 sm:p-6 md:p-10"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Logo */}
        <img 
          src={logoHipervinculo} 
          alt="Hipervinculo" 
          className="h-6 sm:h-12 md:h-16 mb-2 sm:mb-4 md:mb-6"
        />
        
        {/* Decorative element */}
        <div className="w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 mb-2 sm:mb-4 md:mb-6" style={{ backgroundColor: '#8BC34A' }} />
        
        {/* Tagline */}
        <p 
          className="text-center text-[5px] sm:text-xs md:text-sm font-medium max-w-xs leading-tight sm:leading-normal"
          style={{ color: '#2d4a2d' }}
        >
          Performance-driven growth systems for businesses ready to scale.
        </p>
        
        {/* Decorative pattern */}
        <div 
          className="absolute bottom-0 right-0 w-20 sm:w-36 md:w-48 h-20 sm:h-36 md:h-48 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              135deg,
              transparent,
              transparent 20px,
              #8BC34A 20px,
              #8BC34A 40px
            )`
          }}
        />
      </div>
      
      {/* Corner decoration on dark side */}
      <div 
        className="absolute top-0 left-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 195, 74, 0.15) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
