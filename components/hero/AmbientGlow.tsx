"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// Dual green/blue ambient glow — green dominant (matches the app's own
// single-color AmbientGlow.tsx treatment), blue secondary and smaller, per
// the brief. Soft continuous halos (blurred radial gradients), never hard
// rings, echoing the app's "one smooth halo" rule for its Orb glow.
export default function AmbientGlow() {
  const { scrollYProgress } = useScroll();
  const greenY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blueY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: greenY }}
        className="absolute left-[-8%] top-[-6%] h-[42vw] max-h-[420px] w-[42vw] max-w-[420px] rounded-full bg-bloom-green/8 blur-[130px]"
      />
      <motion.div
        style={{ y: blueY }}
        className="absolute right-[-4%] top-[6%] h-[40vw] max-h-[480px] w-[40vw] max-w-[480px] rounded-full bg-bloom-blue/16 blur-[110px]"
      />
    </div>
  );
}
