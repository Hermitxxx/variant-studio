"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Cyberpunk Capsules",
    description: "Oversized silhouettes infused with neo-Tokyo aesthetics and technical waterproof detailing.",
  },
  {
    title: "Heavyweight Terry",
    description: "500GSM custom-milled cotton tees & hoodies engineered for structural drape and longevity.",
  },
  {
    title: "Archival Manga Prints",
    description: "Bespoke hand-drawn anime artwork rendered in high-density discharge ink that never cracks.",
  },
  {
    title: "Single-Run Editions",
    description: "Strictly limited releases crafted in Tokyo and Vancouver. Never restocked once archived.",
  },
];

const AUTO_PLAY_INTERVAL = 3000; // 3 seconds per slide

export const ServicesCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, progressKey]);

  const activeService = SERVICES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full max-w-[360px] md:max-w-[400px] bg-black/65 backdrop-blur-md border border-white/15 p-5 md:p-6 text-white select-none transition-all duration-300 ${className}`}
    >
      {/* Top Controls Row */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous service"
            className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next service"
            className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 h-[1.5px] bg-white/20 overflow-hidden relative mx-1">
          {!isPaused && (
            <motion.div
              key={progressKey}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: AUTO_PLAY_INTERVAL / 1000,
                ease: "linear",
              }}
              className="absolute left-0 top-0 bottom-0 bg-white"
            />
          )}
        </div>

        {/* Slide Counter */}
        <div className="text-[12px] font-medium tracking-tight text-white/90 tabular-nums">
          {String(currentIndex + 1).padStart(2, "0")}/
          {String(SERVICES.length).padStart(2, "0")}
        </div>
      </div>

      {/* Slide Content */}
      <div className="min-h-[78px] flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-[19px] md:text-[21px] font-semibold text-white tracking-[-0.03em] leading-snug mb-1.5 font-sans">
              {activeService.title}
            </h4>
            <p className="text-[13px] md:text-[14px] text-white/75 font-normal tracking-[-0.015em] leading-relaxed">
              {activeService.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
