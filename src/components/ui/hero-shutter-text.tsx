import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface HeroShutterTextProps {
  text: string;
  className?: string;
}

export function HeroShutterText({ text, className = "" }: HeroShutterTextProps) {
  const characters = text.split("");

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {characters.map((char, i) => (
        <span key={`${char}-${i}`} className="relative inline-block overflow-hidden">
          {/* Base character for layout */}
          <span className="invisible">{char === " " ? "\u00A0" : char}</span>

          {/* Top slice */}
          <motion.span
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(0 0 66% 0)" }}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.03,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            aria-hidden
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Middle slice */}
          <motion.span
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(33% 0 33% 0)" }}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.03 + 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            aria-hidden
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Bottom slice */}
          <motion.span
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(66% 0 0 0)" }}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.03 + 0.16,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            aria-hidden
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
