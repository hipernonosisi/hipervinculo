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
        className="flex-1 flex flex-col justify-center p-10"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">
          {content.title}
        </h2>
        
        {/* Headline */}
        <p 
          className="text-xl font-bold mb-3"
          style={{ color: '#8BC34A' }}
        >
          {content.headline}
        </p>
        
        {/* Description */}
        <p className="text-base text-white/80 mb-8 max-w-md">
          {content.description}
        </p>
        
        {/* Contact info - vertical stack */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}
            >
              <Mail className="w-5 h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <div className="text-white/60 text-xs">Email</div>
              <div className="text-white font-medium">{content.email}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}
            >
              <Phone className="w-5 h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <div className="text-white/60 text-xs">Phone</div>
              <div className="text-white font-medium">{content.phone}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}
            >
              <MapPin className="w-5 h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <div className="text-white/60 text-xs">Address</div>
              <div className="text-white font-medium text-sm whitespace-pre-line">{content.address}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}
            >
              <Globe className="w-5 h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <div className="text-white/60 text-xs">Website</div>
              <div className="text-white font-medium">{content.website}</div>
            </div>
          </div>
        </div>
        
        {/* CTA button */}
        <button 
          className="px-8 py-3 rounded-full text-base font-bold transition-transform hover:scale-105 w-fit"
          style={{ backgroundColor: '#8BC34A', color: '#2d4a2d' }}
        >
          {content.cta}
        </button>
      </div>
      
      {/* Right side - White with logo */}
      <div 
        className="w-2/5 flex flex-col items-center justify-center p-10"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Logo */}
        <img 
          src={logoHipervinculo} 
          alt="Hipervinculo" 
          className="h-16 mb-6"
        />
        
        {/* Decorative element */}
        <div className="w-16 h-1 mb-6" style={{ backgroundColor: '#8BC34A' }} />
        
        {/* Tagline */}
        <p 
          className="text-center text-sm font-medium max-w-xs"
          style={{ color: '#2d4a2d' }}
        >
          Performance-driven growth systems for businesses ready to scale.
        </p>
        
        {/* Decorative pattern */}
        <div 
          className="absolute bottom-0 right-0 w-48 h-48 opacity-10"
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
        className="absolute top-0 left-0 w-32 h-32"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 195, 74, 0.15) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
