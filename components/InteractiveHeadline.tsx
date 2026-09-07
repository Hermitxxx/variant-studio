"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";

interface InteractiveHeadlineProps {
  text?: string;
  className?: string;
}

interface LetterOffset {
  x: number;
  y: number;
}

export const InteractiveHeadline: React.FC<InteractiveHeadlineProps> = ({
  text = "Variant Studio",
  className = "",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [offsets, setOffsets] = useState<LetterOffset[]>(
    () => Array(text.length).fill({ x: 0, y: 0 })
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLHeadingElement>) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const radius = 100; // Interaction influence radius
      const strength = 28; // Max deflection distance in px

      const nextOffsets = letterRefs.current.map((span) => {
        if (!span) return { x: 0, y: 0 };
        const rect = span.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const dx = mouseX - letterCenterX;
        const dy = mouseY - letterCenterY;
        const dist = Math.hypot(dx, dy);

        if (dist < radius && dist > 0) {
          // Repel away from mouse
          const power = Math.pow((radius - dist) / radius, 1.2);
          const angle = Math.atan2(dy, dx);
          return {
            x: -Math.cos(angle) * power * strength,
            y: -Math.sin(angle) * power * strength,
          };
        }
        return { x: 0, y: 0 };
      });

      setOffsets(nextOffsets);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setOffsets(Array(text.length).fill({ x: 0, y: 0 }));
  }, [text.length]);

  return (
    <h1
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`font-serif text-white tracking-[-0.045em] leading-[0.9] select-none text-center inline-flex items-center justify-center flex-wrap cursor-default ${className}`}
      style={{
        fontFamily: "var(--font-serif), 'Baskervville', Georgia, serif",
      }}
    >
      {text.split("").map((char, index) => {
        if (char === " ") {
          return (
            <span
              key={index}
              className="inline-block w-[2.5vw] md:w-[3vw] lg:w-[35px]"
            >
              &nbsp;
            </span>
          );
        }

        const offset = offsets[index] || { x: 0, y: 0 };

        return (
          <motion.span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            animate={{
              x: offset.x,
              y: offset.y,
            }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 280,
              mass: 0.6,
            }}
            className="inline-block transition-colors duration-150 will-change-transform"
          >
            {char}
          </motion.span>
        );
      })}
    </h1>
  );
};
