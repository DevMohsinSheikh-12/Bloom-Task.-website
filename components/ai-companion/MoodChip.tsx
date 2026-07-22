"use client";

import { motion } from "framer-motion";

const COLOR_CLASSES = {
  green: "border-bloom-green/30 bg-bloom-green/10 text-bloom-green-light",
  blue: "border-bloom-blue/30 bg-bloom-blue/10 text-bloom-blue-light",
} as const;

const HOVER_SHADOW = {
  green: "0 0 0 1px rgba(135,230,75,0.5), 0 0 28px -4px rgba(135,230,75,0.75)",
  blue: "0 0 0 1px rgba(79,180,240,0.5), 0 0 28px -4px rgba(79,180,240,0.75)",
} as const;

interface MoodChipProps {
  label: string;
  color?: keyof typeof COLOR_CLASSES;
  className?: string;
  floatDistance?: number;
  floatDuration?: number;
  floatDelay?: number;
}

// Same floating-pill idea as components/saves/TagChip, deliberately kept as
// its own component instead of reusing/extending TagChip — that one is
// shared with the Saves section, which was asked to stay untouched, so this
// section's hover treatment can't risk any side effect there.
//
// The hover micro-interaction is a glow that intensifies and shifts to the
// chip's accent color (plain black shadow → colored glow) plus a small
// lift, rather than a flat scale/color swap — driven entirely through
// Framer's `whileHover` so it composes cleanly with the looping float
// animation already running on the same value (y).
export default function MoodChip({
  label,
  color = "green",
  className = "",
  floatDistance = 10,
  floatDuration = 5,
  floatDelay = 0,
}: MoodChipProps) {
  return (
    <motion.span
      animate={{ y: [0, -floatDistance, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      // whileHover's own nested `transition` is what makes this a quick
      // 0.25s reaction instead of inheriting the 5s/repeat-Infinity config
      // above — that outer transition is keyed to `y` for the looping
      // float, and would otherwise also govern whileHover's `y: -4`,
      // turning the hover lift into a slow, endlessly-repeating animation.
      whileHover={{
        scale: 1.12,
        y: -4,
        boxShadow: HOVER_SHADOW[color],
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)" }}
      className={`absolute cursor-default whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${COLOR_CLASSES[color]} ${className}`}
    >
      {label}
    </motion.span>
  );
}
