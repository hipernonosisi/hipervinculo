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
    <div className="relative w-full h-full flex flex-col p-12 overflow-hidden" style={{ backgroundColor: '#2d4a2d' }}>
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          {content.title}
        </h2>
        
        {/* Headline */}
        <p 
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: '#8BC34A' }}
        >
          {content.headline}
        </p>
        
        {/* Description */}
        <p className="text-xl text-white/80 mb-10 max-w-2xl">
          {content.description}
        </p>
        
        {/* Contact info */}
        <div className="grid grid-cols-2 gap-6 mb-10 max-w-2xl w-full">
          <div 
            className="p-4 rounded-xl flex items-center gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Mail className="w-6 h-6" style={{ color: '#8BC34A' }} />
            <div className="text-left">
              <div className="text-white/60 text-sm">Email</div>
              <div className="text-white font-medium">{content.email}</div>
            </div>
          </div>
          
          <div 
            className="p-4 rounded-xl flex items-center gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Phone className="w-6 h-6" style={{ color: '#8BC34A' }} />
            <div className="text-left">
              <div className="text-white/60 text-sm">Phone</div>
              <div className="text-white font-medium">{content.phone}</div>
            </div>
          </div>
          
          <div 
            className="p-4 rounded-xl flex items-center gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <MapPin className="w-6 h-6" style={{ color: '#8BC34A' }} />
            <div className="text-left">
              <div className="text-white/60 text-sm">Address</div>
              <div className="text-white font-medium text-sm whitespace-pre-line">{content.address}</div>
            </div>
          </div>
          
          <div 
            className="p-4 rounded-xl flex items-center gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Globe className="w-6 h-6" style={{ color: '#8BC34A' }} />
            <div className="text-left">
              <div className="text-white/60 text-sm">Website</div>
              <div className="text-white font-medium">{content.website}</div>
            </div>
          </div>
        </div>
        
        {/* CTA button */}
        <button 
          className="px-8 py-4 rounded-full text-lg font-bold transition-transform hover:scale-105"
          style={{ backgroundColor: '#8BC34A', color: '#2d4a2d' }}
        >
          {content.cta}
        </button>
      </div>
      
      {/* Footer with logo on white background */}
      <div className="flex items-center justify-center">
        <div className="bg-white px-8 py-4 rounded-xl">
          <img src={logoHipervinculo} alt="Hipervinculo" className="h-10" />
        </div>
      </div>
      
      {/* Corner decorations */}
      <div 
        className="absolute top-0 right-0 w-48 h-48"
        style={{
          background: 'linear-gradient(225deg, rgba(139, 195, 74, 0.2) 0%, transparent 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-48 h-48"
        style={{
          background: 'linear-gradient(45deg, rgba(139, 195, 74, 0.2) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
