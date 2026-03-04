import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface HeroShutterTextProps {
  text: string;
  className?: string;
}

export function HeroShutterText({ text, className = "" }: HeroShutterTextProps) {
  const lines = text.split("\n");
  let wordCounter = 0;

  return (
    <span className={cn("inline", className)}>
      {lines.map((line, lineIdx) => {
        const words = line.split(" ");
        return (
          <React.Fragment key={lineIdx}>
            {words.map((word, wordIdx) => {
              const delay = wordCounter * 0.08;
              wordCounter++;
              return (
                <React.Fragment key={`${word}-${wordIdx}`}>
                  <span className="relative inline-block overflow-hidden">
                    <span className="invisible">{word}</span>

                    {/* Top slice */}
                    <motion.span
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: "inset(0 0 66% 0)" }}
                      initial={{ x: "110%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.35,
                        delay,
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
                        delay: delay + 0.07,
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
                        delay: delay + 0.14,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      aria-hidden
                    >
                      {word}
                    </motion.span>
                  </span>
                  {wordIdx < words.length - 1 && " "}
                </React.Fragment>
              );
            })}
            {lineIdx < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </span>
  );
}
