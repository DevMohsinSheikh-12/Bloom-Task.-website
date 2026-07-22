"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import { BookmarkIcon, ChatIcon, CheckIcon, GrowthIcon } from "./icons";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

// One variants map covers both the scroll-entrance orchestration (hidden →
// show, driven by the parent's stagger) and the hover gesture (triggered
// directly on this element via whileHover="hover") — a motion component only
// accepts a single `variants` prop, so both live here together. Setting
// whileHover to a variant *name* rather than an inline object is what lets
// this "hover" state propagate down to each icon's own variants (see
// icons.tsx) without any extra wiring.
const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  hover: { y: -8, transition: { duration: 0.3, ease: EASE } },
};

const CARDS = [
  {
    title: "Save Anything",
    description: "A link, a reel, a screenshot — Bloom quietly turns it into something real.",
    icon: BookmarkIcon,
    from: "from-bloom-green-light/40",
    to: "to-bloom-blue/30",
    glow: "bg-bloom-green/40",
    iconGlow: "drop-shadow-[0_0_10px_rgba(135,230,75,0.85)]",
  },
  {
    title: "Talk It Out",
    description: "Plan your day or just vent — your companion adapts to how you're feeling.",
    icon: ChatIcon,
    from: "from-bloom-blue-light/40",
    to: "to-bloom-green/30",
    glow: "bg-bloom-blue/40",
    iconGlow: "drop-shadow-[0_0_10px_rgba(79,180,240,0.85)]",
  },
  {
    title: "No Pressure",
    description: "No guilt, no streaks, no cockpit — just what matters, done.",
    icon: CheckIcon,
    from: "from-bloom-green-light/40",
    to: "to-bloom-green-deep/30",
    glow: "bg-bloom-green/40",
    iconGlow: "drop-shadow-[0_0_10px_rgba(135,230,75,0.85)]",
  },
  {
    title: "Watch Yourself Grow",
    description: "Gentle progress tracking that quietly adds up over time.",
    icon: GrowthIcon,
    from: "from-bloom-blue-light/40",
    to: "to-bloom-blue-deep/30",
    glow: "bg-bloom-blue/40",
    iconGlow: "drop-shadow-[0_0_10px_rgba(79,180,240,0.85)]",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-voice text-lg italic text-bloom-green">how it works</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bloom-text sm:text-4xl">
            Four small habits, one quiet companion
          </h2>
        </div>

        {/* This wrapper's own top edge is the grid's top edge (the mt-14
            gap now lives here, not on the grid) — so the line's top offset
            only needs to account for a card's own internal layout (py-10
            padding + half the h-20 orb = 5rem/80px to the orb's center),
            not the headline block's variable height above it too. */}
        <div className="relative mt-14">
          {/* Connecting thread — only reads as a sequence at the 4-across
              desktop layout; at 1-2 columns the cards wrap and a straight
              line would cut across unrelated cards, so it's lg-only. Spans
              from card 1's center (12.5% of the row) to card 4's center
              (87.5%) — each card is an even quarter of the row. */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-20 -z-10 hidden h-px overflow-hidden lg:block"
          >
            <div className="h-full w-full bg-gradient-to-r from-bloom-green/0 via-bloom-border to-bloom-blue/0" />
            <motion.div
              className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-bloom-green to-transparent"
              animate={{ x: ["-100%", "500%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
            />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CARDS.map((cardData) => (
            <motion.div
              key={cardData.title}
              variants={card}
              whileHover="hover"
              className="relative flex min-h-[300px] flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-bloom-surface/35 px-6 py-10 text-center backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(135,230,75,0.04),0_20px_50px_-25px_rgba(0,0,0,0.6)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-bloom-green/40 hover:bg-bloom-surface/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_50px_rgba(135,230,75,0.08),0_0_45px_-10px_rgba(135,230,75,0.4)] sm:min-h-[340px]"
            >
              {/* Soft interior wash — the "floating glass panel" glow */}
              <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

              {/* Glass icon orb. animate-float (CSS keyframe, translateY) is
                  on this outer div; the continuous breathing scale pulse
                  below is Framer Motion on the inner div — both touch
                  `transform`, so they're kept on separate elements rather
                  than fighting over the same property each frame. */}
              <div className="animate-float">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-gradient-to-br ${cardData.from} ${cardData.to} backdrop-blur-md shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),inset_0_-8px_16px_rgba(0,0,0,0.25),0_10px_30px_-6px_rgba(135,230,75,0.4)]`}
                >
                  <motion.div
                    animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.18, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -inset-3 -z-10 rounded-full ${cardData.glow} blur-2xl`}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent" />
                  <cardData.icon className={`h-9 w-9 text-white ${cardData.iconGlow}`} />
                </motion.div>
              </div>

              <h3 className="mt-6 text-lg font-bold text-bloom-text">{cardData.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bloom-text-muted">{cardData.description}</p>
            </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
