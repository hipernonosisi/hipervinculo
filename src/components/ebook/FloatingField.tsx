import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface FloatingFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "tel";
  maxLength?: number;
  placeholder?: string;
  validate?: (v: string) => boolean;
}

export function FloatingField({
  id,
  label,
  value,
  onChange,
  type = "text",
  maxLength,
  placeholder,
  validate,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isValid = validate ? validate(value) : hasValue && value.trim().length >= 2;
  const showValid = isValid && !focused && hasValue;
  const floating = focused || hasValue;

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        animate={{
          y: floating ? -8 : 14,
          scale: floating ? 0.82 : 1,
          color: focused ? "#2F4F3E" : "#6b7280",
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="absolute left-3 origin-left pointer-events-none font-medium text-sm bg-white px-1 z-10"
      >
        {label}
      </motion.label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={floating ? placeholder : ""}
        required
        maxLength={maxLength}
        className={`w-full h-12 px-3 pr-10 rounded-xl border-2 bg-white text-foreground outline-none transition-all duration-200 ${
          focused
            ? "border-[#8BC34A] shadow-[0_0_0_4px_rgba(139,195,74,0.15)]"
            : showValid
              ? "border-[#8BC34A]/60"
              : "border-border hover:border-[#8BC34A]/40"
        }`}
      />
      <AnimatePresence>
        {showValid && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#8BC34A] flex items-center justify-center"
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
