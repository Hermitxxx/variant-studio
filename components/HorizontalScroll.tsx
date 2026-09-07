'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

interface ProductItem {
  id: string;
  number: string;
  tag: string;
  kanji: string;
  title: string;
  watermark: string;
  price: string;
  specs: string;
  colorScheme: {
    bg: string;
    accent: string;
    badge: string;
    border: string;
  };
  image: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-01',
    number: '01',
    tag: 'CAPSULE 01 // JUJUTSU',
    kanji: '領域',
    title: 'Gojo "Hollow Purple" Heavy Tee',
    watermark: 'LIMITLESS',
    price: '$85 USD',
    specs: '280GSM Heavyweight Combed Cotton / Discharge Graphic Print',
    colorScheme: {
      bg: 'bg-gradient-to-b from-[#0a0512] via-[#06040c] to-[#040405]',
      accent: 'text-purple-400',
      badge: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
      border: 'border-purple-500/25',
    },
    image: '/products/gojo.jpg',
  },
  {
    id: 'prod-02',
    number: '02',
    tag: 'CAPSULE 02 // BUSHIDO',
    kanji: '三刀',
    title: 'Zoro "Santoryu" Oversized Tee',
    watermark: 'SANTORYU',
    price: '$85 USD',
    specs: 'Heavyweight Raw Jersey / Emerald Ink Multi-Layer Print',
    colorScheme: {
      bg: 'bg-gradient-to-b from-[#040e08] via-[#030906] to-[#040405]',
      accent: 'text-emerald-400',
      badge: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
      border: 'border-emerald-500/25',
    },
    image: '/products/zoro.jpg',
  },
  {
    id: 'prod-03',
    number: '03',
    tag: 'CAPSULE 03 // YONKO',
    kanji: '海賊',
    title: 'Luffy "King of Pirates" Calligraphy Tee',
    watermark: 'PIRATE',
    price: '$80 USD',
    specs: '300GSM Off-White Terry / Kanji Brushstroke Backprint',
    colorScheme: {
      bg: 'bg-gradient-to-b from-[#100706] via-[#0a0403] to-[#040405]',
      accent: 'text-red-400',
      badge: 'border-red-500/30 text-red-300 bg-red-500/10',
      border: 'border-red-500/25',
    },
    image: '/products/luffy.jpg',
  },
  {
    id: 'prod-04',
    number: '04',
    tag: 'CAPSULE 04 // SHINTO',
    kanji: '桜狐',
    title: 'Kitsune "Cherry Blossom" Tee',
    watermark: 'KITSUNE',
    price: '$85 USD',
    specs: 'Japanese Archival Print / Custom Milled Oatmeal Cotton',
    colorScheme: {
      bg: 'bg-gradient-to-b from-[#0e0708] via-[#080405] to-[#040405]',
      accent: 'text-rose-400',
      badge: 'border-rose-500/30 text-rose-300 bg-rose-500/10',
      border: 'border-rose-500/25',
    },
    image: '/products/kitsune.jpg',
  },
  {
    id: 'prod-05',
    number: '05',
    tag: 'CAPSULE 05 // NOSTALGIA',
    kanji: '世界',
    title: '"Choose Your World" Archive Tee',
    watermark: 'WORLD',
    price: '$78 USD',
    specs: 'Vintage Washed Black / 90s Relic Manga Collage',
    colorScheme: {
      bg: 'bg-gradient-to-b from-[#070b10] via-[#04070a] to-[#040405]',
      accent: 'text-amber-400',
      badge: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
      border: 'border-amber-500/25',
    },
    image: '/products/retro.jpg',
  },
];

export default function HorizontalScroll() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  const update = useCallback(() => {
    const runway = runwayRef.current;
    const track = trackRef.current;
    if (!runway || !track) return;

    const { top, height } = runway.getBoundingClientRect();
    const vh = window.innerHeight;
    const maxScroll = height - vh;
    if (maxScroll <= 0) return;

    // Progress 0 when runway top enters viewport, 1 when runway reaches bottom
    const progress = Math.min(Math.max(-top / maxScroll, 0), 1);

    const maxTranslate = track.scrollWidth - window.innerWidth;
    if (maxTranslate > 0) {
      const currentTranslate = progress * maxTranslate;
      track.style.transform = `translate3d(-${currentTranslate}px, 0, 0)`;
    }

    // Parallax effect on watermarks
    const cards = track.querySelectorAll<HTMLElement>('.product-card');
    cards.forEach((card) => {
      const heading = card.querySelector<HTMLElement>('.parallax-heading');
      if (heading) {
        const rect = card.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const offset = (center - window.innerWidth / 2) / window.innerWidth;
        heading.style.transform = `translate3d(${offset * -160}px, 0, 0)`;
      }
    });

    // Update persistent progress bar
    if (progressRef.current) {
      progressRef.current.style.width = `${progress * 100}%`;
    }

    // Update active index indicator [01 / 05]
    const activeIdx = Math.min(
      Math.floor(progress * PRODUCTS.length),
      PRODUCTS.length - 1
    );
    if (indexRef.current) {
      indexRef.current.textContent = `[0${activeIdx + 1} / 0${PRODUCTS.length}]`;
    }
  }, []);

  // Sync directly with Lenis scroll engine
  useLenis(update);

  // Fallback native scroll listener & resize
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
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [update]);

  return (
    <section className="relative w-full bg-[#050505] text-white">
      {/* Editorial Intro Banner */}
      <div className="relative w-full border-t border-white/10 bg-[#050505] px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span>Capsule Archive // Drop 01</span>
              <span className="text-white/20">|</span>
              <span>Tokyo Atelier</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              Curated Silhouettes
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-neutral-400 sm:text-base">
            Engineered in limited quantities. Scroll down to navigate horizontally across each
            heavyweight piece from the latest capsule collection.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Runway (Pinned 450vh) */}
      <div ref={runwayRef} className="relative h-[450vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          {/* Horizontal Track */}
          <div
            ref={trackRef}
            className="flex h-full w-max will-change-transform items-center"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {PRODUCTS.map((prod, index) => (
              <div
                key={prod.id}
                className={`product-card relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-12 sm:py-12 ${prod.colorScheme.bg}`}
              >
                {/* Giant Background Parallax Typographic Watermark */}
                <h2 className="parallax-heading pointer-events-none absolute select-none text-[22vw] sm:text-[18vw] font-black uppercase tracking-tighter text-white/[0.04] will-change-transform whitespace-nowrap">
                  {prod.watermark}
                </h2>

                {/* Japanese Kanji Accent Floating Behind */}
                <span className="pointer-events-none absolute right-[8%] top-[10%] select-none font-serif text-7xl font-light text-white/[0.04] sm:text-9xl">
                  {prod.kanji}
                </span>

                {/* Top Metadata Header per Card */}
                <div className="absolute left-6 right-6 top-6 mx-auto flex max-w-6xl items-center justify-between font-mono text-xs text-neutral-400 sm:left-12 sm:right-12 sm:top-8">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">[{prod.number} / 05]</span>
                    <span className="hidden text-neutral-500 sm:inline">//</span>
                    <span className="hidden tracking-wider sm:inline">{prod.tag}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md ${prod.colorScheme.badge}`}
                    >
                      {prod.kanji} Atelier Cut
                    </span>
                  </div>
                </div>

                {/* Center Product Showcase */}
                <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-5 sm:gap-8 md:flex-row md:items-center md:justify-center md:gap-12">
                  {/* Product Image Frame */}
                  <div
                    className={`group relative aspect-[3/4] w-[220px] shrink-0 overflow-hidden rounded-xl border bg-black/60 shadow-2xl shadow-black sm:w-[280px] md:w-[340px] lg:w-[380px] ${prod.colorScheme.border}`}
                  >
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 400px"
                      priority={index < 2}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle inner shadow overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                    {/* Corner Accent Markers */}
                    <span className="absolute left-3 top-3 font-mono text-[10px] text-white/40">+</span>
                    <span className="absolute right-3 top-3 font-mono text-[10px] text-white/40">+</span>
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/40">+</span>
                    <span className="absolute bottom-3 right-3 font-mono text-[10px] text-white/40">+</span>
                  </div>

                  {/* Product Details Column */}
                  <div className="flex max-w-sm flex-col items-center text-center md:items-start md:text-left">
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                      Release 2026 // Archive Spec
                    </span>
                    <h3 className="mt-2 text-xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {prod.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-400 sm:text-sm">
                      {prod.specs}
                    </p>

                    {/* Price and Action */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                      <span className="font-mono text-base font-bold tracking-tight text-white sm:text-lg">
                        {prod.price}
                      </span>
                      <button
                        type="button"
                        className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                      >
                        <span>Acquire Piece</span>
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Technical Status Bar */}
                <div className="absolute bottom-6 left-6 right-6 mx-auto flex max-w-6xl items-center justify-between font-mono text-[10px] text-neutral-500 sm:bottom-8 sm:left-12 sm:right-12">
                  <span>COORD // 35.6764° N, 139.6500° E</span>
                  <span className="hidden sm:inline">SWIPE / SCROLL TO DISCOVER</span>
                  <span>ARCHIVAL NO. {prod.id}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Persistent Floating Navigation HUD */}
          <div className="pointer-events-none absolute bottom-4 left-6 right-6 z-20 mx-auto flex max-w-6xl items-center justify-between text-xs font-mono sm:bottom-6 sm:left-12 sm:right-12">
            <div className="flex items-center gap-3">
              <span ref={indexRef} className="font-bold text-white">
                [01 / 05]
              </span>
              <span className="text-neutral-500">//</span>
              <span className="text-neutral-400 uppercase text-[10px] tracking-widest hidden sm:inline">
                Runway Navigation
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-32 sm:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-white transition-[width] duration-75 ease-out rounded-full"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
