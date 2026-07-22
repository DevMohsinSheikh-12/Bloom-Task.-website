"use client";

// Minimal stroke icons for the "How it works" cards. Hand-drawn inline SVGs
// rather than an icon library — four icons don't justify a new dependency.
//
// Each icon's moving parts use Framer Motion `variants` with a "hover" key,
// but deliberately have no `initial`/`animate`/`whileHover` of their own —
// they rely entirely on variant *propagation* from an ancestor motion
// component that sets `whileHover="hover"` (HowItWorks.tsx's card). Used
// bare (e.g. Saves' feature list, which has no such ancestor), the "hover"
// variant simply never activates and they render exactly as a plain static
// SVG would — safe to share without side effects on call sites that don't
// opt into the propagation.
import { motion, type Variants } from "framer-motion";

type IconProps = { className?: string };

export function BookmarkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <motion.path
        d="M6.5 4A1.5 1.5 0 0 1 8 2.5h8A1.5 1.5 0 0 1 17.5 4v16l-5.5-3.4L6.5 20V4Z"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hover: { y: [0, 3, 0], transition: { duration: 0.55, ease: "easeInOut" } } }}
      />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  const dot = (delay: number): Variants => ({
    hover: { y: [0, -2.5, 0], transition: { duration: 0.5, ease: "easeInOut", delay } },
  });

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4.5 6A1.5 1.5 0 0 1 6 4.5h12A1.5 1.5 0 0 1 19.5 6v9a1.5 1.5 0 0 1-1.5 1.5H9.5L5.5 20v-3.5H6A1.5 1.5 0 0 1 4.5 15V6Z"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.circle cx="8.75" cy="10.25" r="0.9" fill="currentColor" variants={dot(0)} />
      <motion.circle cx="12" cy="10.25" r="0.9" fill="currentColor" variants={dot(0.12)} />
      <motion.circle cx="15.25" cy="10.25" r="0.9" fill="currentColor" variants={dot(0.24)} />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={1.75} />
      <motion.path
        d="M8.25 12.25l2.5 2.5 5-5.25"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hover: { pathLength: [0, 1], transition: { duration: 0.5, ease: "easeInOut" } } }}
      />
    </svg>
  );
}

export function GrowthIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <motion.path
        d="M4.5 17.5L9.75 12l3.25 3.25 6.5-7.5"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hover: { y: [0, -2.5, 0], transition: { duration: 0.5, ease: "easeInOut" } } }}
      />
      <motion.path
        d="M15.5 7.5h4v4"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hover: { y: [0, -2.5, 0], transition: { duration: 0.5, ease: "easeInOut", delay: 0.05 } } }}
      />
    </svg>
  );
}
