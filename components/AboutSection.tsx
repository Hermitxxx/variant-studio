"use client";

import { useRef } from "react";
import { useTransform, motion, useScroll, type MotionValue } from "motion/react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const CARDS = [
  {
    index: "01",
    capsule: "Jujutsu",
    title: "Shadow Silhouette Hoodie",
    description:
      "500GSM custom-milled loopback terry with hand-drawn discharge print. Reinforced chainstitched seams, ribbed cuffs, and a boxy oversized silhouette built to age with character.",
    specs: ["500GSM", "Discharge Ink", "Single Run"],
    image: "/products/1.jpg",
    /**
     * Surface wash: very dark, each card has its own subtle hue so the stack
     * reads as distinct physical objects. No flat fills — the hue is almost
     * invisible at opacity; depth comes from the shadow, not the color.
     */
    wash: "rgba(60, 10, 10, 0.92)",
    accent: "#c0392b",
  },
  {
    index: "02",
    capsule: "Bushido",
    title: "Manga Heavyweight Tee",
    description:
      "280GSM combed cotton with high-density discharge graphic. Dropped shoulders, double-needle hem, and a relaxed archival cut inspired by 90s Tokyo streetwear.",
    specs: ["280GSM", "Combed Cotton", "Archival Cut"],
    image: "/products/2.jpg",
    wash: "rgba(10, 10, 40, 0.92)",
    accent: "#3b5bdb",
  },
  {
    index: "03",
    capsule: "Ronin",
    title: "Cursed Realm Windbreaker",
    description:
      "Technical ripstop shell with tonal manga-panel lining. Water-resistant DWR coating, sealed seams, and dual katana-strap chest pockets for a tactical silhouette.",
    specs: ["Ripstop Shell", "DWR Coating", "Tactical Fit"],
    image: "/products/3.jpg",
    wash: "rgba(8, 28, 14, 0.93)",
    accent: "#2f9e44",
  },
  {
    index: "04",
    capsule: "Shinto",
    title: "Bespoke Heavyweight Pant",
    description:
      "500GSM brushed fleece cargo with modular pocket system. Double-knee reinforcement, adjustable hem snaps, and a tapered drop-crotch cut.",
    specs: ["500GSM Fleece", "Modular Pockets", "Tapered Drop"],
    image: "/products/4.jpg",
    wash: "rgba(28, 20, 8, 0.93)",
    accent: "#e67700",
  },
];

/* ------------------------------------------------------------------ */
/*  CARD COMPONENT                                                     */
/* ------------------------------------------------------------------ */

interface CardProps {
  i: number;
  index: string;
  capsule: string;
  title: string;
  description: string;
  specs: string[];
  image: string;
  wash: string;
  accent: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({
  i,
  index,
  capsule,
  title,
  description,
  specs,
  image,
  wash,
  accent,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: wash,
          scale,
          top: `calc(-5vh + ${i * 28}px)`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)`,
        }}
        className="relative -top-[25%] h-[500px] w-[90%] sm:w-[82%] lg:w-[72%] rounded-2xl overflow-hidden origin-top flex"
      >
        {/* ── Giant faded index watermark ──────────────────────────── */}
        <span
          aria-hidden
          className="absolute left-6 top-1/2 -translate-y-1/2 font-serif leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(8rem, 22vw, 18rem)",
            color: accent,
            opacity: 0.06,
            letterSpacing: "-0.06em",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {index}
        </span>

        {/* ── Left: Text column ────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col justify-between w-[45%] md:w-[42%] p-8 md:p-10 lg:p-12 shrink-0">
          {/* Top: capsule line — understated, not an eyebrow */}
          <div className="flex items-center gap-2">
            <span
              className="block w-5 h-px"
              style={{ backgroundColor: accent, opacity: 0.7 }}
            />
            <span
              className="text-[10px] tracking-[0.22em] uppercase"
              style={{ color: accent, opacity: 0.7 }}
            >
              {capsule}
            </span>
          </div>

          {/* Middle: title — owns the space */}
          <div>
            <h2
              className="text-white leading-[0.92] tracking-[-0.025em] mb-5"
              style={{
                fontFamily: "var(--font-serif), 'Baskervville', Georgia, serif",
                fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
              }}
            >
              {title}
            </h2>
            <p className="text-white/55 text-sm leading-relaxed font-light max-w-[36ch]">
              {description}
            </p>
          </div>

          {/* Bottom: spec pills — data, not costume mono */}
          <div className="flex flex-wrap gap-2">
            {specs.map((spec) => (
              <span
                key={spec}
                className="text-[10px] tracking-[0.14em] uppercase px-3 py-1 rounded-full border"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: Full-bleed image, no inner radius ─────────────── */}
        {/*
          The image column clips flush against the right edge of the card.
          A gradient on the left merges it into the text area so there is no
          visible seam — depth without a border.
        */}
        <div className="relative flex-1 h-full overflow-hidden">
          {/* Gradient fade into card surface on the left edge */}
          <div
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${wash}, transparent)`,
            }}
          />
          {/* Top vignette so titles in the background don't fight the image */}
          <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-black/40 to-transparent" />

          <motion.div
            className="w-full h-full"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <Image
              fill
              src={image}
              alt={title}
              className="object-cover object-center"
              sizes="(max-width: 768px) 60vw, 40vw"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN SECTION                                                       */
/* ------------------------------------------------------------------ */

export function AboutSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="text-white w-full bg-[#050505]">
      {CARDS.map((card, i) => {
        const targetScale = 1 - (CARDS.length - i) * 0.05;
        return (
          <Card
            key={card.index}
            i={i}
            index={card.index}
            capsule={card.capsule}
            title={card.title}
            description={card.description}
            specs={card.specs}
            image={card.image}
            wash={card.wash}
            accent={card.accent}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}
