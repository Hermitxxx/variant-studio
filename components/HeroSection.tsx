"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { X } from "lucide-react";
import { InteractiveHeadline } from "./InteractiveHeadline";
import { ServicesCard } from "./ServicesCard";
// some cahnge
interface HeroSectionProps {
  /** Controls when the hero animations trigger (synced with preloader) */
  isLoaded?: boolean;
  /** Optional callback to re-trigger the preloader intro */
  onReplay?: () => void;
}

const NAV_ITEMS = ["HOME", "ABOUT", "WORKS", "CONTACT", "BLOG"];

export const HeroSection: React.FC<HeroSectionProps> = ({
  isLoaded = true,
  onReplay,
}) => {
  const [activeNav, setActiveNav] = useState("HOME");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll tracking for sticky/weighted background movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // As the user scrolls down, the background travels downwards (parallax lag)
  // creating the sticky, weighted physical depth effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.85, 0.35]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#080808] flex flex-col justify-between select-none"
    >
      {/* 1. Background Image with Parallax Downward Travel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      >
        <motion.div
          style={{
            y: backgroundY,
            scale: backgroundScale,
            opacity: backgroundOpacity,
          }}
          className="absolute -top-[14%] -left-[2%] -right-[2%] -bottom-[14%] w-[104%] h-[128%] will-change-transform"
        >
          <Image
            src="/images/tojiherobg.jpg"
            alt="Variant Studio editorial hero portrait"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Cinematic Vignette Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Soft edge gradient to blend seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

          {/* Film Noise Grain Overlay */}
          <div
            className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "url('/images/noise.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
            }}
          />
        </motion.div>
      </motion.div>

      {/* 2. Top Header Navigation (Responsive: Centered on Desktop, Brand + Hamburger on Mobile) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={
          isLoaded
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -20 }
        }
        transition={{
          duration: 0.8,
          delay: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-30 w-full pt-6 sm:pt-8 md:pt-10 px-5 sm:px-8 md:px-12 flex items-center justify-between md:justify-center"
      >
        {/* Mobile Brand Mark (visible < md) */}
        <div className="md:hidden">
          <span
            className="font-serif text-lg font-semibold tracking-wider text-white select-none"
            style={{
              fontFamily: "var(--font-serif), 'Baskervville', Georgia, serif",
            }}
          >
            Variant
          </span>
        </div>

        {/* Desktop Navigation Links (visible >= md) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-11">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`relative text-[12px] lg:text-[13px] font-semibold tracking-[0.16em] transition-all duration-200 cursor-pointer ${activeNav === item
                ? "text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]"
                : "text-white/70 hover:text-white"
                }`}
            >
              {item}
              {activeNav === item && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button (visible < md) */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open mobile menu"
          className="md:hidden w-11 h-8 rounded-sm border border-white/20 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-1 hover:border-white/50 active:scale-95 transition-all cursor-pointer shadow-md"
        >
          <span className="w-5 h-[1.5px] bg-white" />
          <span className="w-5 h-[1.5px] bg-white" />
          <span className="w-3.5 h-[1.5px] bg-white self-start ml-3" />
        </button>
      </motion.header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#070707]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:p-12 text-white select-none"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span
                className="font-serif text-2xl font-semibold tracking-wide text-white"
                style={{
                  fontFamily: "var(--font-serif), 'Baskervville', Georgia, serif",
                }}
              >
                Variant Studio
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-5 sm:gap-7 my-auto py-8">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + idx * 0.06,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => {
                    setActiveNav(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-serif text-4xl sm:text-5xl font-medium tracking-tight transition-colors cursor-pointer flex items-center justify-between group ${activeNav === item
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                    }`}
                  style={{
                    fontFamily:
                      "var(--font-serif), 'Baskervville', Georgia, serif",
                  }}
                >
                  <span>{item.charAt(0) + item.slice(1).toLowerCase()}</span>
                  <span className="text-xs font-mono tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                    0{idx + 1}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Drawer Footer */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs font-sans text-white/60">
              <div>
                <p className="text-white font-medium mb-1">Inquiries</p>
                <a
                  href="mailto:hello@variant.studio"
                  className="hover:text-white transition-colors"
                >
                  hello@variant.studio
                </a>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Follow</p>
                <div className="flex gap-4">
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Instagram
                  </span>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    X (Twitter)
                  </span>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Dribbble
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Center Headline */}
      <div className="relative z-10 w-full flex items-center justify-center px-4 pt-4 md:pt-6 pb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            isLoaded
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.96 }
          }
          transition={{
            duration: 1.1,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full max-w-[1440px] flex justify-center"
        >
          <InteractiveHeadline
            text="Variant Studio"
            className="text-[12vw] sm:text-[11.5vw] md:text-[11vw] lg:text-[145px] xl:text-[170px]"
          />
        </motion.div>
      </div>

      {/* 4. Bottom Row Container */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-16 pb-8 md:pb-12 flex flex-col md:flex-row items-end justify-between gap-8">
        {/* Bottom Left: "Anime Streetwear" + Editorial Taglines */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={
            isLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 35 }
          }
          transition={{
            duration: 0.9,
            delay: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-start text-left max-w-sm"
        >
          <h2
            className="font-serif text-[32px] sm:text-[38px] md:text-[44px] font-medium text-white tracking-[-0.03em] leading-tight mb-3 md:mb-4"
            style={{
              fontFamily: "var(--font-serif), 'Baskervville', Georgia, serif",
            }}
          >
            Anime Streetwear
          </h2>

          <div className="space-y-1 text-[11px] sm:text-[12px] font-medium tracking-[0.08em] text-white/80 uppercase font-sans leading-relaxed">
            <p>DESIGNED TO ENDURE.</p>
            <p>WOVEN WITH OBSESSION.</p>
            <p>CONSIDERED IN EVERY DETAIL.</p>
          </div>
        </motion.div>

        {/* Bottom Center: Minimalist Hamburger Menu Pill */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={
            isLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 25 }
          }
          transition={{
            duration: 0.8,
            delay: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-12 hidden sm:flex flex-col items-center gap-2"
        >
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="w-12 h-8.5 rounded-sm border border-white/20 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-1 hover:border-white/50 hover:bg-black/60 transition-all duration-200 cursor-pointer shadow-lg group active:scale-95"
          >
            <span className="w-5 h-[1.5px] bg-white transition-transform group-hover:scale-x-110" />
            <span className="w-5 h-[1.5px] bg-white transition-transform" />
            <span className="w-5 h-[1.5px] bg-white transition-transform group-hover:scale-x-90" />
          </button>
        </motion.div>

        {/* Bottom Right: Services Slider Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={
            isLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 40 }
          }
          transition={{
            duration: 0.9,
            delay: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full md:w-auto flex justify-end"
        >
          <ServicesCard />
        </motion.div>
      </div>

      {/* Floating Replay Intro Button (Bottom Left or Top Right for easy preview) */}
      {onReplay && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onClick={onReplay}
          className="fixed bottom-3 right-3 z-30 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-[11px] tracking-wider uppercase text-white/80 hover:text-white transition-all cursor-pointer"
        >
          ↻ Replay Intro
        </motion.button>
      )}
    </section>
  );
};
