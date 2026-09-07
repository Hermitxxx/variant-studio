"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  /** Callback triggered when preloader animation initiates its exit */
  onStartExit?: () => void;
  /** Callback triggered when preloader has fully exited and unmounted */
  onComplete?: () => void;
  /** Display duration in ms before exit transition starts (default 1300ms) */
  duration?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onStartExit,
  onComplete,
  duration = 1600,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onStartExit?.();
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onStartExit]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden select-none pointer-events-none"
        >
          {/* Subtle noise grain */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "url('/images/noise.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
            }}
          />

          {/* Centered Brand Title with Smooth Fade-in & Blur Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            exit={{
              opacity: 0,
              y: -15,
              filter: "blur(4px)",
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            className="relative z-10 px-6 text-center"
          >
            <h1
              className="font-serif text-[11vw] sm:text-[10vw] md:text-[8vw] lg:text-[110px] xl:text-[130px] font-semibold text-white tracking-[-0.04em] leading-none"
              style={{
                fontFamily: "var(--font-serif), 'Baskervville', Georgia, serif",
              }}
            >
              Variant Studio
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
