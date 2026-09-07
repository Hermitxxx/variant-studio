"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export interface AboutShard {
  src: string;
  corner: string;
  vars: string;
  tag: string;
  title: string;
}

export interface AboutContent {
  headline: string;
  subheadline: string;
  shards: readonly AboutShard[];
}

/* Offsets and tilts per-breakpoint. Rotation is consistent while travel distance and box size scale. */
const SHARDS: readonly AboutShard[] = [
  {
    src: "/products/1.jpg",
    tag: "CAPSULE 01",
    title: "Shadow Silhouette Hoodie",
    corner: "top-4 left-4 sm:top-8 sm:left-8 tab:top-10 tab:left-10 desk:top-14 desk:left-14",
    vars: "[--rot:14deg] [--tx:35px] [--ty:140px] tab:[--tx:80px] tab:[--ty:160px] desk:[--tx:220px] desk:[--ty:180px]",
  },
  {
    src: "/products/2.jpg",
    tag: "CAPSULE 02",
    title: "Manga Heavyweight Tee",
    corner: "top-4 right-4 sm:top-8 sm:right-8 tab:top-10 tab:right-10 desk:top-14 desk:right-14",
    vars: "[--rot:-18deg] [--tx:-35px] [--ty:140px] tab:[--tx:-80px] tab:[--ty:160px] desk:[--tx:-220px] desk:[--ty:180px]",
  },
  {
    src: "/products/3.jpg",
    tag: "CAPSULE 03",
    title: "Cursed Realm Windbreaker",
    corner: "bottom-4 left-4 sm:bottom-8 sm:left-8 tab:bottom-10 tab:left-10 desk:bottom-14 desk:left-14",
    vars: "[--rot:-16deg] [--tx:35px] [--ty:-140px] tab:[--tx:80px] tab:[--ty:-160px] desk:[--tx:220px] desk:[--ty:-180px]",
  },
  {
    src: "/products/4.jpg",
    tag: "CAPSULE 04",
    title: "Bespoke Heavyweight Pant",
    corner: "bottom-4 right-4 sm:bottom-8 sm:right-8 tab:bottom-10 tab:right-10 desk:bottom-14 desk:right-14",
    vars: "[--rot:16deg] [--tx:-35px] [--ty:-140px] tab:[--tx:-80px] tab:[--ty:-160px] desk:[--tx:-220px] desk:[--ty:-180px]",
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p1", "1");
      el.style.setProperty("--p2", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // `-top` is `scrollY - sectionTop`; the pin lasts `height - vh`.
      const p1 = clamp(-top / (height - vh));
      // The headline is driven by the trailing 100vh runway, so it starts a third of the way in.
      const p2 = clamp((-top - (height - 2 * vh)) / vh);
      el.style.setProperty("--p1", String(p1));
      el.style.setProperty("--p2", String(p2));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-min w-full flex-none flex-col items-center justify-center overflow-clip bg-[#050505] text-white selection:bg-red-500 selection:text-white"
    >
      {/* Subtle Crimson Radial Ambient Glow Aura (Project Color Accent, No Noise) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div
          className="w-[500px] sm:w-[750px] md:w-[950px] h-[500px] sm:h-[750px] md:h-[950px] rounded-full blur-[120px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(185,28,28,0.12) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* Sticky stage: 100vh pinned for the section's remaining 150vh runway */}
      <div className="sticky top-0 z-[2] flex h-screen w-full max-w-[1400px] flex-none flex-col items-center justify-center px-5 sm:px-8 md:px-12 overflow-hidden">
        {/* Center Editorial Manifesto (Refined & Restrained Heading) */}
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
          <p className="font-sans text-[13px] sm:text-[14px] text-white/65 font-normal tracking-[-0.01em] max-w-md mx-auto leading-relaxed mb-6">
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

        {/* 4 Interactive Product Shards/Cards floating inward with --p1 scroll progress */}
        {CONTENT.shards.map((shard) => (
          <div
            key={shard.src}
            className={`about-shard absolute z-[3] aspect-[3/4] h-auto w-[95px] sm:w-[135px] tab:w-[170px] desk:w-[210px] flex-none will-change-transform ${shard.corner} ${shard.vars}`}
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

      {/* Scroll runway (150vh) drives the pin progress without rendering extraneous elements */}
      <div className="h-[150vh] w-full flex-none overflow-clip" aria-hidden />
    </section>
  );
}
