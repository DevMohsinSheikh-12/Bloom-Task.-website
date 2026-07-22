"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// Six blobs spread down the page (in viewport-height units, so they land
// near roughly where each section falls), alternating green/blue emphasis
// and varying size/opacity so the glow doesn't read as one repeating tile.
// Positioned `absolute` against the (relative) <body> — not `fixed` — so
// each blob scrolls with the document and only comes into view near its
// intended section, then nudged by a slower parallax offset so the whole
// layer visibly lags behind foreground content as you scroll.
// Opacities kept deliberately low — the base body gradient (globals.css)
// now carries most of the visual depth, so these read as accents drifting
// past each section rather than a full-bleed color tint.
const BLOBS = [
  { top: "-4vh", side: "left-[-12%]", size: "50vw", max: "520px", color: "bg-bloom-green/6", blur: "blur-[140px]" },
  { top: "55vh", side: "right-[-10%]", size: "38vw", max: "420px", color: "bg-bloom-blue/7", blur: "blur-[130px]" },
  { top: "120vh", side: "left-[6%]", size: "42vw", max: "460px", color: "bg-bloom-green/5", blur: "blur-[150px]" },
  { top: "215vh", side: "right-[0%]", size: "34vw", max: "380px", color: "bg-bloom-blue/6", blur: "blur-[120px]" },
  { top: "300vh", side: "left-[-8%]", size: "44vw", max: "480px", color: "bg-bloom-green/5", blur: "blur-[140px]" },
  { top: "380vh", side: "right-[-6%]", size: "36vw", max: "400px", color: "bg-bloom-blue/5", blur: "blur-[130px]" },
] as const;

export default function AmbientBackdrop() {
  const { scrollY } = useScroll();
  // Lags 35% behind real scroll — the classic "background moves slower"
  // parallax read, cheap since it's a single transform on one wrapper.
  const y = useTransform(scrollY, (latest) => latest * 0.35);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        {BLOBS.map((blob, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${blob.side} ${blob.color} ${blob.blur}`}
            style={{ top: blob.top, width: blob.size, height: blob.size, maxWidth: blob.max, maxHeight: blob.max }}
          />
        ))}
      </motion.div>
    </div>
  );
}
