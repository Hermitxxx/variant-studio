"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * The live site runs Lenis on the document (`<html class="lenis">`). Its exact options are
 * not exposed in the page, so this uses library defaults, which is what a stock Framer Lenis
 * integration ships with.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
    return <ReactLenis root>{children}</ReactLenis>;
}
