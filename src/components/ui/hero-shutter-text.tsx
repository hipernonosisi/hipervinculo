import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface HeroShutterTextProps {
  text: string;
  className?: string;
}

export function HeroShutterText({ text, className = "" }: HeroShutterTextProps) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="relative inline-block overflow-hidden">
            {/* Invisible base for layout */}
            <span className="invisible">{word}</span>

            {/* Top slice */}
            <motion.span
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "inset(0 0 66% 0)" }}
              initial={{ x: "110%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{
                duration: 0.35,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              aria-hidden
            >
              {word}
            </motion.span>

            {/* Middle slice */}
            <motion.span
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "inset(33% 0 33% 0)" }}
              initial={{ x: "-110%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{
                duration: 0.35,
                delay: i * 0.08 + 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              aria-hidden
            >
              {word}
            </motion.span>

            {/* Bottom slice */}
            <motion.span
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "inset(66% 0 0 0)" }}
              initial={{ x: "110%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{
                duration: 0.35,
                delay: i * 0.08 + 0.14,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              aria-hidden
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
}
