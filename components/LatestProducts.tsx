'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { CarouselNavigator } from '@/components/CarouselNavigator';

import { RevealWrapper } from '@/components/RevealWrapper';

interface Product {
  id: string;
  number: string;
  tag: string;
  kanji: string;
  title: string;
  desc: string;
  price: string;
  badge: string;
  image: string;
  glowClass: string;
  badgeColor: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'lp-01',
    number: '01',
    tag: 'CAPSULE 01 // JUJUTSU',
    kanji: '領域',
    title: 'Gojo "Hollow Purple" Heavy Tee',
    desc: '280GSM Combed Cotton with high-density discharge graphic print.',
    price: '$85 USD',
    badge: 'Atelier Spec',
    image: '/products/gojo.jpg',
    glowClass: 'hover:shadow-purple-500/[0.12] hover:border-purple-500/30',
    badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
  },
  {
    id: 'lp-02',
    number: '02',
    tag: 'CAPSULE 02 // BUSHIDO',
    kanji: '三刀',
    title: 'Zoro "Santoryu" Oversized Tee',
    desc: 'Heavyweight raw jersey crafted with layered emerald pigments.',
    price: '$85 USD',
    badge: 'Archival Cut',
    image: '/products/zoro.jpg',
    glowClass: 'hover:shadow-emerald-500/[0.12] hover:border-emerald-500/30',
    badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
  },
  {
    id: 'lp-03',
    number: '03',
    tag: 'CAPSULE 03 // YONKO',
    kanji: '海賊',
    title: 'Luffy "King of Pirates" Calligraphy Tee',
    desc: '300GSM natural oatmeal terry with brushstroke kanji backprint.',
    price: '$80 USD',
    badge: 'Limited Run',
    image: '/products/luffy.jpg',
    glowClass: 'hover:shadow-red-500/[0.12] hover:border-red-500/30',
    badgeColor: 'border-red-500/30 text-red-300 bg-red-500/10',
  },
  {
    id: 'lp-04',
    number: '04',
    tag: 'CAPSULE 04 // SHINTO',
    kanji: '桜狐',
    title: 'Kitsune "Cherry Blossom" Graphic Tee',
    desc: 'Japanese archival print on custom-milled heavyweight cotton.',
    price: '$85 USD',
    badge: 'Kyoto Spec',
    image: '/products/kitsune.jpg',
    glowClass: 'hover:shadow-rose-500/[0.12] hover:border-rose-500/30',
    badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-500/10',
  },
  {
    id: 'lp-05',
    number: '05',
    tag: 'CAPSULE 05 // RONIN',
    kanji: '前進',
    title: 'Ronin "Step Forward" Tokyo Tee',
    desc: 'Bespoke tactical oversized silhouette with dual katana graphic.',
    price: '$88 USD',
    badge: 'Tokyo Drop',
    image: '/products/ronin.jpg',
    glowClass: 'hover:shadow-amber-500/[0.12] hover:border-amber-500/30',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
  },
  {
    id: 'lp-06',
    number: '06',
    tag: 'CAPSULE 06 // NOSTALGIA',
    kanji: '世界',
    title: '"Choose Your World" Archive Tee',
    desc: 'Vintage washed black heavyweight tee featuring a 90s relic manga collage.',
    price: '$78 USD',
    badge: 'Archive Relic',
    image: '/products/retro.jpg',
    glowClass: 'hover:shadow-cyan-500/[0.12] hover:border-cyan-500/30',
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
  },
  {
    id: 'lp-07',
    number: '07',
    tag: 'CAPSULE 07 // COMPLETE SET',
    kanji: '一味',
    title: 'Straw Hat Crew Oversized Set',
    desc: 'Heavyweight boxy crew tee paired with modular tactical military cargos.',
    price: '$145 USD',
    badge: 'Capsule Suite',
    image: '/products/outfit.jpg',
    glowClass: 'hover:shadow-yellow-500/[0.12] hover:border-yellow-500/30',
    badgeColor: 'border-yellow-500/30 text-yellow-300 bg-yellow-500/10',
  },
  {
    id: 'lp-08',
    number: '08',
    tag: 'CAPSULE 08 // BESPOKE',
    kanji: '特異',
    title: 'Variant Atelier Cursed Realm Tee',
    desc: '500GSM custom-milled loopback jersey with reinforced chainstitched seams.',
    price: '$92 USD',
    badge: 'Masterwork',
    image: '/products/1.jpg',
    glowClass: 'hover:shadow-indigo-500/[0.12] hover:border-indigo-500/30',
    badgeColor: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
  },
];

const PRODUCTS_PER_PAGE = 4;

export default function LatestProducts() {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE);
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const currentProducts = PRODUCTS.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <section className="relative w-full bg-[#050505] py-24 px-6 sm:px-12 lg:px-20 text-white border-t border-white/10 overflow-hidden">


      <RevealWrapper className="max-w-7xl mx-auto" yOffset={50} duration={0.9} blur>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Catalog Edition // 2026</span>
              <span className="text-white/20">|</span>
              <span>Tokyo Atelier</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              Latest Drops
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="max-w-md text-sm font-sans text-white/70 font-light leading-relaxed">
              Explore our current roster of heavyweight silhouettes. Hover over each piece to examine
              the depth and structural architecture.
            </p>
            <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-white/50 border border-white/10 rounded-full px-4 py-1.5 bg-white/5 backdrop-blur-sm self-start sm:self-auto">
              <span>PAGE {currentPage + 1} / {totalPages}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid of 3D Product Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            {currentProducts.map((product) => (
              <CardContainer
                key={product.id}
                className="w-full"
                containerClassName="py-0 w-full"
              >
                <CardBody
                  className={`relative w-full h-auto rounded-2xl border border-white/10 bg-[#0a0a0d]/90 p-6 sm:p-7 shadow-2xl transition-all duration-300 ${product.glowClass} flex flex-col justify-between`}
                >
                  {/* Card Top Details */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-3">
                      <CardItem
                        translateZ={30}
                        className="flex items-center gap-2 text-white/60"
                      >
                        <span className="font-bold text-white">[{product.number}]</span>
                        <span className="text-white/30">//</span>
                        <span className="tracking-wider text-white/50">{product.tag}</span>
                      </CardItem>

                      <CardItem translateZ={35}>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-wider backdrop-blur-md border transition-colors duration-200 ${product.badgeColor}`}
                        >
                          {product.badge}
                        </span>
                      </CardItem>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <CardItem
                        translateZ={40}
                        as="h3"
                        className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white"
                      >
                        {product.title}
                      </CardItem>
                      <CardItem
                        translateZ={25}
                        className="select-none font-serif text-2xl text-white/20 shrink-0"
                      >
                        {product.kanji}
                      </CardItem>
                    </div>

                    <CardItem
                      as="p"
                      translateZ={30}
                      className="mt-2 text-xs sm:text-sm text-white/60 font-light line-clamp-2"
                    >
                      {product.desc}
                    </CardItem>
                  </div>

                  {/* 3D Product Image Container */}
                  <CardItem
                    translateZ={70}
                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/10 mt-6 group-hover/card:shadow-[0_16px_36px_rgba(0,0,0,0.85)]"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Technical Tick Marks */}
                    <span className="absolute left-3 top-3 font-mono text-[10px] text-white/40">+</span>
                    <span className="absolute right-3 top-3 font-mono text-[10px] text-white/40">+</span>
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/40">+</span>
                    <span className="absolute bottom-3 right-3 font-mono text-[10px] text-white/40">+</span>
                  </CardItem>

                  {/* Card Bottom Actions */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <CardItem translateZ={30}>
                      <span className="font-mono text-base sm:text-lg font-bold tracking-tight text-white">
                        {product.price}
                      </span>
                    </CardItem>

                    <CardItem
                      translateZ={50}
                      as="button"
                      type="button"
                      className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-mono uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                    >
                      <span>Acquire</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigator Pagination */}
        <div className="mt-16 flex flex-col items-center justify-center gap-3">
          <CarouselNavigator
            totalSlides={totalPages}
            currentIndex={currentPage}
            onIndexChange={setCurrentPage}
            autoDelay={6000}
          />
          <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
            Displaying {currentProducts.length} of {PRODUCTS.length} Available Pieces
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
