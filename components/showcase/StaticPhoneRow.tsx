"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import IPhone15Pro from "@/components/ui/iphone-15-pro";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const SCREENS = [
  {
    src: "/images/screenshots/png5.png",
    alt: "The Bloom Task companion chat screen",
    label: "talk when you need to",
    rotate: -6,
  },
  {
    src: "/images/screenshots/png6.png",
    alt: "The Bloom Task Today screen",
    label: "save it, and it becomes real",
    rotate: 0,
    big: true,
  },
  {
    src: "/images/screenshots/png7.png",
    alt: "The Bloom Task Growth screen",
    label: "watch it add up, quietly",
    rotate: 6,
  },
];

// Cinematic scroll-scrubbed version (ScrollPhoneSequence) is desktop-only —
// pinned scroll-jacking reads poorly on touch/small screens and costs more
// than it's worth there. This is the simple, cheap equivalent: same real
// screenshots and captions, no scroll listeners, one fade-in on view.
export default function StaticPhoneRow() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="mx-auto mt-16 flex max-w-4xl items-start justify-center gap-4 px-6 pb-24 sm:gap-6 sm:pb-28"
    >
      {SCREENS.map((screen) => (
        <motion.div
          key={screen.src}
          variants={item}
          style={{ rotate: screen.rotate }}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.25, ease: EASE }}
          className={`flex flex-col items-center ${
            screen.big ? "z-10 w-[150px] sm:w-[180px]" : "w-[120px] sm:w-[145px]"
          }`}
        >
          <IPhone15Pro
            src={screen.src}
            alt={screen.alt}
            className="drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
          />
          <p className="mt-4 max-w-[9rem] text-center text-xs leading-snug text-bloom-text-muted">
            {screen.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
