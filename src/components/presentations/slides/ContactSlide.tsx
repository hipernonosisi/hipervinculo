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
    <div className="relative w-full h-full flex flex-col p-8 overflow-hidden" style={{ backgroundColor: '#2d4a2d' }}>
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">
          {content.title}
        </h2>
        
        {/* Headline */}
        <p 
          className="text-xl md:text-2xl font-bold mb-2"
          style={{ color: '#8BC34A' }}
        >
          {content.headline}
        </p>
        
        {/* Description */}
        <p className="text-base text-white/80 mb-6 max-w-xl">
          {content.description}
        </p>
        
        {/* Contact info */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-xl w-full">
          <div 
            className="p-3 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Mail className="w-5 h-5" style={{ color: '#8BC34A' }} />
            <div className="text-left">
              <div className="text-white/60 text-xs">Email</div>
              <div className="text-white text-sm font-medium">{content.email}</div>
            </div>
          </div>
          
          <div 
            className="p-3 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Phone className="w-5 h-5" style={{ color: '#8BC34A' }} />
            <div className="text-left">
              <div className="text-white/60 text-xs">Phone</div>
              <div className="text-white text-sm font-medium">{content.phone}</div>
            </div>
          </div>
          
          <div 
            className="p-3 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <MapPin className="w-5 h-5" style={{ color: '#8BC34A' }} />
            <div className="text-left">
              <div className="text-white/60 text-xs">Address</div>
              <div className="text-white text-xs font-medium whitespace-pre-line">{content.address}</div>
            </div>
          </div>
          
          <div 
            className="p-3 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Globe className="w-5 h-5" style={{ color: '#8BC34A' }} />
            <div className="text-left">
              <div className="text-white/60 text-xs">Website</div>
              <div className="text-white text-sm font-medium">{content.website}</div>
            </div>
          </div>
        </div>
        
        {/* CTA button */}
        <button 
          className="px-6 py-3 rounded-full text-base font-bold transition-transform hover:scale-105"
          style={{ backgroundColor: '#8BC34A', color: '#2d4a2d' }}
        >
          {content.cta}
        </button>
      </div>
      
      {/* Footer with logo on white background */}
      <div className="flex items-center justify-center">
        <div className="bg-white px-6 py-3 rounded-lg">
          <img src={logoHipervinculo} alt="Hipervinculo" className="h-8" />
        </div>
      </div>
      
      {/* Corner decorations */}
      <div 
        className="absolute top-0 right-0 w-32 h-32"
        style={{
          background: 'linear-gradient(225deg, rgba(139, 195, 74, 0.2) 0%, transparent 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-32 h-32"
        style={{
          background: 'linear-gradient(45deg, rgba(139, 195, 74, 0.2) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
