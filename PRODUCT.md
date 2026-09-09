# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, motion/react (Framer Motion), gsap + lenis for scroll, @base-ui/react, three.js via @react-three/fiber. Dev: `npm run dev`. Deploy target not confirmed — record if it changes.

## Users

Primary: anime/manga streetwear collectors browsing limited drops. They land to evaluate a piece's material, silhouette, and provenance before deciding whether to acquire. They read specs (GSM, print process, cut), judge whether a release is a single run, and act fast on capsule drops.

Secondary audiences not yet confirmed: editorial press, buyers, general shoppers. Do not design for them as primary.

## Product Purpose

Variant Studio is an editorial anime-inspired apparel atelier. The site makes it possible to browse capsule collections, examine each piece's construction in detail, and acquire limited-run items. Success looks like a collector reaching the acquire decision on a drop they understand.

## Positioning

Single-run, never-restocked capsules named after anime arcs (Jujutsu, Bushido, Ronin, Shinto, Yonko, Nostalgia, Bespoke). Crafted in Tokyo and Vancouver. A neighboring fast-fashion brand could not truthfully copy the mechanism: every release is a finite archival run with hand-drawn discharge artwork and heavyweight construction, not a restocked SKU.

## Operating Context

- Visitors arrive at the preloader, then move through: Hero → About (stacked product cards) → Horizontal Scroll Runway → Latest Products (3D cards + carousel) → Footer.
- Collectors evaluate via spec data (500GSM, 280GSM, discharge ink, ripstop, DWR) and capsule provenance, not via marketing adjectives.
- Acquire buttons exist on product cards; full checkout flow is not yet implemented.
- Environment: dark, near-black editorial surface (#050505), serif display + sans UI type, film grain and parallax as texture.

## Capabilities and Constraints

- Confirmed: 8 catalog products, 5 runway items, 4 about-section cards, 4 service offerings, capsules named after anime arcs, prices in USD.
- Confirmed brand facts: name "Variant Studio", crafted in Tokyo, inquiries hello@variant.studio, single-run positioning, never restocked.
- Confirmed constraint: all existing product copy, pricing, kanji, tags, and images are as-is. Future work must not invent SKUs, testimonials, customers, benchmarks, pricing, or licensing claims.
- Undecided: deploy target, checkout/payment implementation, size guide, shipping details, social accounts beyond placeholder text.
- Accessibility: no product-specific a11y requirement established beyond standard web WCAG expectations.

## Brand Commitments

- Name: Variant Studio. Voice: editorial, restrained, obsessive about construction. No slang, no hype adjectives.
- Identity markers: Baskervville (serif display) + Inter (sans UI); near-black ground; capsule nomenclature "CAPSULE NN // ARC"; kanji glyphs as card accents; "Crafted in Tokyo".
- References the user made binding: brand identity and contact (hello@variant.studio). Positioning and content integrity are confirmed by the codebase and treated as binding.

## Evidence on Hand

- Product data: `components/AboutSection.tsx` (4 cards), `components/HorizontalScroll.tsx` (5 runway items), `components/LatestProducts.tsx` (8 catalog products).
- Services: `components/ServicesCard.tsx` (4 items).
- Assets: `public/images/tojiherobg.jpg`, `public/images/noise.png`, `public/products/*.jpg` (12 files).
- Absences future work must not fabricate: real customer testimonials, press quotes, manufacturing locations beyond Tokyo/Vancouver, checkout, size and shipping policy.

## Product Principles

1. Material and construction claims are the product; never trade them for louder visuals.
2. Every capsule is a finite archival run — scarcity is a fact to surface, not a gimmick to invent.
3. Copy is precise and specific. GSM, ink process, and cut are named; adjectives are earned.
4. The interface recedes; the garment and its provenance lead from the first viewport.
5. Existing product truth (copy, pricing, images, brand facts) is preserved across all design work.

## Accessibility & Inclusion

Standard web WCAG expectations apply. No product-specific requirement was established during init; flag any new requirement as it arises.