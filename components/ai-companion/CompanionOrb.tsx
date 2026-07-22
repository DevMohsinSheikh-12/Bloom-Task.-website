"use client";

import { motion } from "framer-motion";

// Placeholder for the app's real "Orb" companion avatar — a simple animated
// glowing green sphere (breathing pulse + soft halo) standing in until a
// proper asset replaces it. Keep this component's name/shape as the swap
// point: drop the real asset into an <img>/<Image> here and the halo/pulse
// wrapper still works around it.
export default function CompanionOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <motion.div
        animate={{ scale: [1.15, 1.35, 1.15], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 rounded-full bg-bloom-green blur-2xl"
      />
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-bloom-green-light via-bloom-green to-bloom-green-deep shadow-[inset_0_-10px_20px_rgba(0,0,0,0.28),inset_0_8px_18px_rgba(255,255,255,0.45),0_0_50px_rgba(135,230,75,0.5)]"
      />
      <div className="pointer-events-none absolute left-[20%] top-[16%] h-[28%] w-[28%] rounded-full bg-white/55 blur-sm" />
    </div>
  );
}
