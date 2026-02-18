import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CountryCode {
  code: string;
  flag: string;
  label: string;
}

const COUNTRY_CODES: CountryCode[] = [
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+1", flag: "🇨🇦", label: "CA" },
  { code: "+52", flag: "🇲🇽", label: "MX" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+34", flag: "🇪🇸", label: "ES" },
  { code: "+57", flag: "🇨🇴", label: "CO" },
  { code: "+54", flag: "🇦🇷", label: "AR" },
  { code: "+56", flag: "🇨🇱", label: "CL" },
  { code: "+55", flag: "🇧🇷", label: "BR" },
  { code: "+51", flag: "🇵🇪", label: "PE" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

function formatUSPhone(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function PhoneInput({ value, onChange, placeholder = "(555) 123-4567", className, autoFocus }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = React.useState(COUNTRY_CODES[0]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Extract phone number without country code for display
  const phoneNumber = React.useMemo(() => {
    if (value.startsWith("+")) {
      const match = COUNTRY_CODES.find((c) => value.startsWith(c.code));
      if (match) return value.slice(match.code.length).trim();
    }
    return value;
  }, [value]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = selectedCountry.code === "+1" ? formatUSPhone(raw) : raw;
    onChange(`${selectedCountry.code} ${formatted}`);
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    onChange(`${country.code} ${phoneNumber}`);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={cn("relative flex items-center gap-0 rounded-md border border-input bg-background", className)} ref={dropdownRef}>
      {/* Country selector */}
      <button
        type="button"
        onClick={() => setShowDropdown((p) => !p)}
        className="flex items-center gap-1 px-3 h-full border-r border-input text-sm shrink-0 hover:bg-muted/50 transition-colors rounded-l-md"
      >
        <span className="text-base">{selectedCountry.flag}</span>
        <span className="text-muted-foreground">{selectedCountry.code}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      {/* Phone input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent px-3 py-2 text-base md:text-sm outline-none placeholder:text-muted-foreground h-full"
      />

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute mt-1 top-full left-0 z-50 bg-background border border-input rounded-md shadow-lg py-1 w-48">
          {COUNTRY_CODES.map((country) => (
            <button
              key={`${country.label}-${country.code}`}
              type="button"
              onClick={() => handleCountrySelect(country)}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted/50 transition-colors",
                selectedCountry.label === country.label && "bg-muted/30"
              )}
            >
              <span>{country.flag}</span>
              <span>{country.label}</span>
              <span className="text-muted-foreground">{country.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
