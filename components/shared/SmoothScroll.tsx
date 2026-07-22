"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useAnimationFrame } from "framer-motion";

// Genuine inertia scrolling for the whole site. Lenis smooths the *real*
// window scroll position (it's not a virtual/transform-based scroll on a
// wrapper div), so every existing scroll-driven feature — Framer Motion's
// useScroll() in the header/ambient backdrop/phone sequence, and the hero's
// native `scroll` event listener in usePhoneTilt — keeps working unmodified
// and just inherits the eased motion for free.
//
// Driven by Framer Motion's own useAnimationFrame rather than a separate
// requestAnimationFrame loop, so Lenis's tick and every Framer-driven
// animation on the page share one frame loop instead of two competing ones —
// the standard pairing recommended by both projects' docs.
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    // Lenis computes its scrollable "limit" from the document height at the
    // time it last resized — but sections like the phone showcase mount
    // their tall (260vh) scroll track client-side only, after hydration
    // (a next/dynamic import with ssr:false). If that happens after this
    // limit was captured, Lenis caps scrolling at the shorter, stale height:
    // scrolling works, then hard-stops partway down with everything below
    // unreachable, which is exactly the bug this fixes. Watching body size
    // and calling resize() keeps Lenis in sync with the real document
    // height regardless of what changes it — dynamic imports, images,
    // fonts, anything.
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return null;
}
