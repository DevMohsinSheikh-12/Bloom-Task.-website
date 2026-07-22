"use client";

import { motion } from "framer-motion";

const COLOR_CLASSES = {
  green: "border-bloom-green/30 bg-bloom-green/10 text-bloom-green-light",
  blue: "border-bloom-blue/30 bg-bloom-blue/10 text-bloom-blue-light",
} as const;

interface TagChipProps {
  label: string;
  color?: keyof typeof COLOR_CLASSES;
  className?: string;
  floatDistance?: number;
  floatDuration?: number;
  floatDelay?: number;
}

// A small floating pill orbiting near the Saves phone — purely decorative,
// reinforcing the tagging feature. Cheap: one GPU-composited transform
// animation per chip, no layout thrash, no per-frame JS.
export default function TagChip({
  label,
  color = "green",
  className = "",
  floatDistance = 10,
  floatDuration = 5,
  floatDelay = 0,
}: TagChipProps) {
  return (
    <motion.span
      animate={{ y: [0, -floatDistance, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      className={`absolute whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] ${COLOR_CLASSES[color]} ${className}`}
    >
      {label}
    </motion.span>
  );
}
