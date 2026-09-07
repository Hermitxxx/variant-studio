"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { ShadeGradient } from "@/components/ShadeGradient";

export interface AboutShard {
  src: string;
  corner: string;
  tag: string;
  title: string;
  tx: number;
  ty: number;
  rot: number;
}

export interface AboutContent {
  headline: string;
  subheadline: string;
  shards: readonly AboutShard[];
}

const SHARDS: readonly AboutShard[] = [
  {
    src: "/products/1.jpg",
    tag: "CAPSULE 01",
    title: "Shadow Silhouette Hoodie",
    corner: "top-4 left-4 sm:top-8 sm:left-8 md:top-10 md:left-10 lg:top-14 lg:left-14",
    tx: 45,
    ty: 110,
    rot: 14,
  },
  {
    src: "/products/2.jpg",
    tag: "CAPSULE 02",
    title: "Manga Heavyweight Tee",
    corner: "top-4 right-4 sm:top-8 sm:right-8 md:top-10 md:right-10 lg:top-14 lg:right-14",
    tx: -45,
    ty: 110,
    rot: -16,
  },
  {
    src: "/products/3.jpg",
    tag: "CAPSULE 03",
    title: "Cursed Realm Windbreaker",
    corner: "bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10 lg:bottom-14 lg:left-14",
    tx: 45,
    ty: -110,
    rot: -14,
  },
  {
    src: "/products/4.jpg",
    tag: "CAPSULE 04",
    title: "Bespoke Heavyweight Pant",
    corner: "bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 lg:bottom-14 lg:right-14",
    tx: -45,
    ty: -110,
    rot: 16,
  },
];

const CONTENT: AboutContent = {
  headline: "Archival anime streetwear, tailored to endure.",
  subheadline:
    "Forged in 500GSM custom-milled heavyweight terry with hand-drawn discharge prints built to age with character.",
  shards: SHARDS,
};

const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const { top, height } = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const maxScroll = height - vh;
    if (maxScroll <= 0) return;

    // Pin progress: 0 when entering viewport, 1 when section finishes
    const p1 = clamp(-top / maxScroll);
    const p2 = clamp((-top - (height - 2 * vh)) / vh);

    el.style.setProperty("--p1", String(p1));
    el.style.setProperty("--p2", String(p2));

    // Responsive travel factor: smoothly scales from mobile to 4K
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    const factor = isMobile ? 0.85 : isTablet ? 1.4 : 2.2;

    const shards = el.querySelectorAll<HTMLElement>(".about-shard");
    shards.forEach((shard, idx) => {
      const item = SHARDS[idx];
      if (!item) return;
      const x = item.tx * factor * p1;
      const y = item.ty * factor * p1;
      const r = item.rot * p1;
      shard.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
    });

    const headline = el.querySelector<HTMLElement>(".about-headline");
    if (headline) {
      headline.style.transform = `translate3d(0, ${-p2 * 35}px, 0)`;
      headline.style.opacity = String(1 - p2 * 0.35);
    }
  }, []);

  // Synchronize directly with Lenis scroll engine (crucial for mobile touch)
  useLenis(update);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [update]);

  return (
    <section
      ref={ref}
      className="relative flex h-min w-full flex-none flex-col items-center justify-center bg-transparent text-white selection:bg-red-500 selection:text-white"
    >
      {/* Artisanal Crimson / Smoked Ruby Shader Gradient Background */}
      <ShadeGradient
        color1="#ff1b6b"
        color2="#991b1b"
        color3="#31103f"
        uSpeed={0.28}
        brightness={1.0}
        overlayOpacity="bg-black/35"
      />

      {/* Sticky stage: 100dvh pinned for the section's remaining 150vh runway */}
      <div className="sticky top-0 z-[2] flex h-[100dvh] w-full max-w-[1400px] flex-none flex-col items-center justify-center px-5 sm:px-8 md:px-12">
        {/* Center Editorial Manifesto */}
        <div className="about-headline relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center justify-center px-4 will-change-transform">
          {/* Chapter Indicator */}
          <span className="text-[11px] font-mono tracking-[0.25em] text-white/40 uppercase font-medium mb-3">
            ABOUT // 01
          </span>

          {/* Sized-down, restrained serif headline */}
          <h2
            className="font-serif text-[26px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-normal text-white tracking-[-0.025em] leading-[1.18] max-w-xl mx-auto mb-4"
            style={{
              fontFamily: "var(--font-serif), 'Baskervville', Georgia, serif",
            }}
          >
            {CONTENT.headline}
          </h2>

          {/* Restrained Description */}
          <p className="font-sans text-[13px] sm:text-[14px] text-white/70 font-normal tracking-[-0.01em] max-w-md mx-auto leading-relaxed mb-6">
            {CONTENT.subheadline}
          </p>

          {/* Minimalist Specs Row */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-mono tracking-widest text-white/45 uppercase pt-2">
            <span>500GSM TERRY</span>
            <span className="text-white/20">·</span>
            <span>DISCHARGE INK</span>
            <span className="text-white/20">·</span>
            <span>SINGLE RUN</span>
          </div>
        </div>

        {/* 4 Interactive Product Shards/Cards floating inward with scroll progress */}
        {CONTENT.shards.map((shard) => (
          <div
            key={shard.src}
            className={`about-shard absolute z-[3] aspect-[3/4] h-auto w-[90px] sm:w-[130px] md:w-[170px] lg:w-[210px] flex-none will-change-transform ${shard.corner}`}
          >
            <div className="group relative w-full h-full rounded-sm overflow-hidden bg-[#0a0a0a] border border-white/15 hover:border-red-500/60 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.85)] cursor-pointer">
              {/* Product Image */}
              <Image
                src={shard.src}
                alt={shard.title}
                fill
                sizes="(max-width: 640px) 100px, (max-width: 810px) 140px, (max-width: 1200px) 180px, 220px"
                className="object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />

              {/* Subtle Dark Vignette on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Top Tag Pill */}
              <div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15">
                <span className="text-[8px] sm:text-[9px] font-mono tracking-wider text-white/90 font-medium uppercase">
                  {shard.tag}
                </span>
              </div>

              {/* Bottom Title Label */}
              <div className="absolute bottom-2 left-2 right-2 z-10 flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-sans font-semibold text-white tracking-tight leading-tight line-clamp-1 group-hover:text-red-400 transition-colors">
                  {shard.title}
                </span>
                <span className="text-[8px] sm:text-[8.5px] font-mono text-white/50 tracking-wider uppercase mt-0.5">
                  500GSM TERRY
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll runway (150vh) drives the pin progress */}
      <div className="h-[150vh] w-full flex-none" aria-hidden />
    </section>
  );
}
