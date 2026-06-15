import { Lock } from "lucide-react";

interface PaymentBadgesProps {
  variant?: "light" | "dark";
}

/**
 * Trust row: payment methods + SSL.
 * Reduces "fear of payment" near checkout CTAs.
 */
export function PaymentBadges({ variant = "light" }: PaymentBadgesProps) {
  const textColor = variant === "dark" ? "text-white/80" : "text-[#2F4F3E]/80";
  const borderColor = variant === "dark" ? "border-white/15" : "border-[#2F4F3E]/15";
  const cardBg = variant === "dark" ? "bg-white/95" : "bg-white";

  return (
    <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {/* Visa */}
          <div className={`${cardBg} border ${borderColor} rounded px-1.5 py-1 h-7 flex items-center`} aria-label="Visa">
            <svg viewBox="0 0 32 12" className="h-3 w-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="10" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="11" fill="#1A1F71" fontStyle="italic">VISA</text>
            </svg>
          </div>
          {/* Mastercard */}
          <div className={`${cardBg} border ${borderColor} rounded px-1.5 py-1 h-7 flex items-center`} aria-label="Mastercard">
            <svg viewBox="0 0 24 14" className="h-3.5 w-auto" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="7" r="6" fill="#EB001B" />
              <circle cx="15" cy="7" r="6" fill="#F79E1B" />
              <path d="M12 2.5a6 6 0 0 0 0 9 6 6 0 0 0 0-9z" fill="#FF5F00" />
            </svg>
          </div>
          {/* Amex */}
          <div className={`${cardBg} border ${borderColor} rounded px-1.5 py-1 h-7 flex items-center`} aria-label="American Express">
            <svg viewBox="0 0 32 12" className="h-3 w-auto" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="12" rx="1" fill="#006FCF" />
              <text x="16" y="9" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="7" fill="#fff">AMEX</text>
            </svg>
          </div>
          {/* Apple Pay */}
          <div className={`${cardBg} border ${borderColor} rounded px-1.5 py-1 h-7 flex items-center`} aria-label="Apple Pay">
            <svg viewBox="0 0 32 12" className="h-3 w-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="9" textAnchor="middle" fontFamily="-apple-system, Helvetica, sans-serif" fontWeight="600" fontSize="7" fill="#000">Pay</text>
              <path d="M5 6.2c-.1-.7.3-1.4.8-1.7.1.7-.3 1.4-.8 1.7z" fill="#000" />
            </svg>
          </div>
          {/* Google Pay */}
          <div className={`${cardBg} border ${borderColor} rounded px-1.5 py-1 h-7 hidden sm:flex items-center`} aria-label="Google Pay">
            <span className="text-[8px] font-bold leading-none">
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#EA4335" }}>P</span>
              <span style={{ color: "#FBBC04" }}>a</span>
              <span style={{ color: "#34A853" }}>y</span>
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${textColor}`}>
          <Lock className="w-3 h-3" /> SSL
        </div>
      </div>
    </div>
  );
}
