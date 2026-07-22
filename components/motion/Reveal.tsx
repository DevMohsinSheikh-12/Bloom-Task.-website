"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}

// Single-block scroll-in reveal — fades/slides an entire section into place
// once as it enters the viewport. Used for sections that don't need
// per-child staggering (see StaggerGroup for that case). `x` defaults to 0
// (a no-op) so existing vertical-only usages are unaffected — pass it for
// side-by-side layouts where the two halves should slide in from opposite
// directions instead of both rising from below.
export default function Reveal({ children, className, delay = 0, y = 24, x = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
