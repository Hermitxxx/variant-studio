"use client";

import React, { useState, useCallback } from "react";
import { Preloader } from "@/components/Preloader";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import HorizontalScroll from "@/components/HorizontalScroll";

export default function Home() {
  const [preloaderKey, setPreloaderKey] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const handleStartExit = useCallback(() => {
    // Preloader begins fade/scale exit -> immediately trigger hero entry
    setHeroLoaded(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleReplay = useCallback(() => {
    setHeroLoaded(false);
    setShowPreloader(true);
    setPreloaderKey((prev) => prev + 1);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white">
      {/* 1. Fullscreen Editorial Preloader */}
      {showPreloader && (
        <Preloader
          key={preloaderKey}
          duration={1600}
          onStartExit={handleStartExit}
          onComplete={handlePreloaderComplete}
        />
      )}

      {/* 2. Synced Editorial Hero Section */}
      <HeroSection isLoaded={heroLoaded} onReplay={handleReplay} />

      {/* 3. About Atelier & Archival Manifesto Section */}
      <AboutSection />

      {/* 4. Horizontal Scroll Runway Section */}
      <HorizontalScroll />
    </main>
  );
}
