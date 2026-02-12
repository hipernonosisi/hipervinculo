import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle, XCircle, PlusCircle } from 'lucide-react';

interface ShopifyScopeSlideProps {
  content: {
    title: string;
    headline: string;
    included: Array<{ title: string; description: string }>;
    notIncluded: Array<{ title: string; description: string }>;
    addons?: Array<{ title: string; description: string; price: string }>;
  };
}

export function ShopifyScopeSlide({ content }: ShopifyScopeSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-5 md:p-6 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-0.5 sm:mb-1">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-5 md:h-7" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-lg md:text-2xl font-extrabold mb-0.5"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-[7px] sm:text-xs md:text-base font-medium mb-1 sm:mb-2"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* Three columns: Included / Not Included / Add-ons */}
      <div className={`grid ${content.addons ? 'grid-cols-3' : 'grid-cols-2'} gap-1.5 sm:gap-3 md:gap-4 flex-1 min-h-0`}>
        {/* Included */}
        <div className="flex flex-col">
          <div 
            className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2 pb-0.5 sm:pb-1 border-b"
            style={{ borderColor: 'rgba(139, 195, 74, 0.3)' }}
          >
            <CheckCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" style={{ color: '#8BC34A' }} />
            <h3 
              className="text-[8px] sm:text-sm md:text-base font-extrabold"
              style={{ color: '#2d4a2d' }}
            >
              {content.title.includes('Alcance') ? 'Incluido' : 'Included'}
            </h3>
          </div>
          <div className="space-y-1 sm:space-y-2">
            {content.included.map((item, i) => (
              <div key={i}>
                <h4 
                  className="text-[6px] sm:text-xs md:text-sm font-bold leading-tight"
                  style={{ color: '#2d4a2d' }}
                >
                  {item.title}
                </h4>
                <p 
                  className="text-[5px] sm:text-[10px] md:text-xs leading-tight mt-0.5"
                  style={{ color: '#6b7280' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Not Included */}
        <div className="flex flex-col">
          <div 
            className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2 pb-0.5 sm:pb-1 border-b"
            style={{ borderColor: 'rgba(220, 38, 38, 0.2)' }}
          >
            <XCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" style={{ color: '#dc2626' }} />
            <h3 
              className="text-[8px] sm:text-sm md:text-base font-extrabold"
              style={{ color: '#2d4a2d' }}
            >
              {content.title.includes('Alcance') ? 'No Incluido' : 'Not Included'}
            </h3>
          </div>
          <div className="space-y-1 sm:space-y-2">
            {content.notIncluded.map((item, i) => (
              <div key={i}>
                <h4 
                  className="text-[6px] sm:text-xs md:text-sm font-bold leading-tight"
                  style={{ color: '#2d4a2d' }}
                >
                  {item.title}
                </h4>
                <p 
                  className="text-[5px] sm:text-[10px] md:text-xs leading-tight mt-0.5"
                  style={{ color: '#6b7280' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        {content.addons && (
          <div className="flex flex-col">
            <div 
              className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2 pb-0.5 sm:pb-1 border-b"
              style={{ borderColor: 'rgba(139, 195, 74, 0.3)' }}
            >
              <PlusCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4" style={{ color: '#8BC34A' }} />
              <h3 
                className="text-[8px] sm:text-sm md:text-base font-extrabold"
                style={{ color: '#2d4a2d' }}
              >
                {content.title.includes('Alcance') ? 'Add-ons' : 'Add-ons'}
              </h3>
            </div>
            <div className="space-y-1 sm:space-y-2">
              {content.addons.map((item, i) => (
                <div key={i} className="p-1 sm:p-1.5 rounded-md" style={{ backgroundColor: 'rgba(139, 195, 74, 0.08)' }}>
                  <div className="flex items-start justify-between gap-0.5">
                    <h4 
                      className="text-[6px] sm:text-xs md:text-sm font-bold leading-tight"
                      style={{ color: '#2d4a2d' }}
                    >
                      {item.title}
                    </h4>
                    <span 
                      className="text-[7px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap"
                      style={{ color: '#8BC34A' }}
                    >
                      {item.price}
                    </span>
                  </div>
                  <p 
                    className="text-[5px] sm:text-[10px] md:text-xs leading-tight mt-0.5"
                    style={{ color: '#6b7280' }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Important note */}
      <div 
        className="mt-1 sm:mt-1.5 md:mt-2 p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-xl text-center"
        style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', border: '1px solid rgba(220, 38, 38, 0.15)' }}
      >
        <p className="text-[5.5px] sm:text-xs md:text-sm font-semibold" style={{ color: '#991b1b' }}>
          {content.title.includes('Alcance') 
            ? '⚠️ No abrimos cuentas de Shopify. El cliente debe proveer su propia cuenta y suscripción activa.'
            : '⚠️ We do not create Shopify accounts. The client must provide their own active Shopify account and subscription.'}
        </p>
      </div>
    </div>
  );
}
