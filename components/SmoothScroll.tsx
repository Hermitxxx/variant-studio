"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import type { LenisOptions } from "lenis";
import type { ReactNode } from "react";

/**
 * Global Lenis smooth-scroll wrapper.
 *
 * Options rationale:
 *  - lerp 0.08      → slightly slower than the default 0.1 for a heavier,
 *                     more cinematic glide that suits editorial fashion brands.
 *  - syncTouch      → mirrors desktop smoothing on touch devices without
 *                     disabling native momentum (feels native but synced).
 *  - autoRaf false  → Lenis' own rAF loop is disabled so GSAP's ticker drives
 *                     the scroll updates instead. This keeps Lenis, GSAP
 *                     ScrollTrigger, and Framer Motion all on the same frame.
 *
 * GSAP ticker integration:
 *  ReactLenis exposes the lenis instance via a ref. We grab it through the
 *  `options.autoRaf` false path and register a GSAP ticker listener that
 *  manually calls `lenis.raf(time)` each frame.
 */

const LENIS_OPTIONS: LenisOptions = {
  lerp: 0.08,
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.06,
  touchInertiaExponent: 1.5,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.2,
  // autoRaf is a ReactLenis prop, not a LenisOptions field — keep false there.
};

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={LENIS_OPTIONS}
      // Disable Lenis' own rAF so GSAP's ticker drives it.
      // This keeps ScrollTrigger + Framer Motion perfectly in sync.
      autoRaf={false}
      ref={(ref) => {
        if (!ref?.lenis) return;
        const lenis = ref.lenis;

        // Feed Lenis into GSAP's unified ticker.
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000); // GSAP time is in seconds; Lenis wants ms.
        });

        // Match GSAP lag smoothing to Lenis so they never diverge on heavy frames.
        gsap.ticker.lagSmoothing(0);
      }}
    >
      {children}
    </ReactLenis>
  );
}
