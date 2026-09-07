"use client";

import { useRef } from "react";
import { useTransform, motion, useScroll, type MotionValue } from "motion/react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const CARDS = [
  {
    tag: "CAPSULE 01 // JUJUTSU",
    title: "Shadow Silhouette Hoodie",
    description:
      "500GSM custom-milled loopback terry with hand-drawn discharge print. Reinforced chainstitched seams, ribbed cuffs, and a boxy oversized silhouette built to age with character.",
    image: "/products/1.jpg",
    color: "#1a0a0a",
  },
  {
    tag: "CAPSULE 02 // BUSHIDO",
    title: "Manga Heavyweight Tee",
    description:
      "280GSM combed cotton with high-density discharge graphic. Dropped shoulders, double-needle hem, and a relaxed archival cut inspired by 90s Tokyo streetwear.",
    image: "/products/2.jpg",
    color: "#0a0a1a",
  },
  {
    tag: "CAPSULE 03 // RONIN",
    title: "Cursed Realm Windbreaker",
    description:
      "Technical ripstop shell with tonal manga-panel lining. Water-resistant DWR coating, sealed seams, and dual katana-strap chest pockets for a tactical silhouette.",
    image: "/products/3.jpg",
    color: "#0a1a0f",
  },
  {
    tag: "CAPSULE 04 // SHINTO",
    title: "Bespoke Heavyweight Pant",
    description:
      "500GSM brushed fleece cargo with modular pocket system. Double-knee reinforcement, adjustable hem snaps, and a tapered drop-crotch cut.",
    image: "/products/4.jpg",
    color: "#12100a",
  },
];

/* ------------------------------------------------------------------ */
/*  CARD COMPONENT                                                     */
/* ------------------------------------------------------------------ */

interface CardProps {
  i: number;
  tag: string;
  title: string;
  description: string;
  image: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({
  i,
  tag,
  title,
  description,
  image,
  color,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[450px] w-[90%] sm:w-[80%] lg:w-[70%] rounded-xl p-4 sm:p-6 lg:p-10 origin-top border border-white/10"
      >
        {/* Card header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
            {tag}
          </span>
          <span className="text-[9px] font-mono tracking-widest text-red-500/50 uppercase">
            [{String(i + 1).padStart(2, "0")}]
          </span>
        </div>

        <h2
          className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3"
          style={{
            fontFamily: "var(--font-serif), 'Baskervville', Georgia, serif",
          }}
        >
          {title}
        </h2>

        <div className="flex flex-col md:flex-row h-full gap-4 sm:gap-6 lg:gap-10">
          {/* Text side */}
          <div className="w-full md:w-[40%] relative md:top-[5%]">
            <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-4 mt-4 text-[9px] font-mono tracking-widest text-white/25 uppercase">
              <span>500GSM</span>
              <span className="text-red-500/30">·</span>
              <span>Discharge Ink</span>
              <span className="text-red-500/30">·</span>
              <span>Single Run</span>
            </div>
          </div>

          {/* Image side with parallax zoom */}
          <div className="relative w-full md:w-[60%] h-full rounded-lg overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image
                fill
                src={image}
                alt={title}
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </motion.div>
            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
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
            key={card.tag}
            i={i}
            tag={card.tag}
            title={card.title}
            description={card.description}
            image={card.image}
            color={card.color}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}
