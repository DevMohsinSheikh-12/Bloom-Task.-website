"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import IPhone15Pro from "@/components/ui/iphone-15-pro";
import { makePhoneCurves, remap, type PhoneTimeline } from "./scrollTimeline";

const PHONES: PhoneTimeline[] = [
  {
    src: "/images/screenshots/png5.png",
    alt: "The Bloom Task companion chat screen",
    label: "talk when you need to",
    start: 0.1,
    end: 0.34,
    finalX: -230,
    finalY: 36,
    finalRotate: -10,
    finalScale: 0.92,
    trailClass: "bg-bloom-blue/50",
  },
  {
    src: "/images/screenshots/png6.png",
    alt: "The Bloom Task Today screen",
    label: "save it, and it becomes real",
    start: 0.16,
    end: 0.4,
    finalX: 0,
    finalY: -14,
    finalRotate: 0,
    finalScale: 1.15,
    trailClass: "bg-bloom-green/50",
    big: true,
  },
  {
    src: "/images/screenshots/png7.png",
    alt: "The Bloom Task Growth screen",
    label: "watch it add up, quietly",
    start: 0.22,
    end: 0.46,
    finalX: 230,
    finalY: 36,
    finalRotate: 10,
    finalScale: 0.92,
    trailClass: "bg-bloom-blue/50",
  },
];

function PhoneItem({ phone, progress }: { phone: PhoneTimeline; progress: MotionValue<number> }) {
  const { xAt, yAt, rotateAt, scaleAt, glowAt, labelOpacityAt, labelYAt, trailXAt, trailYAt, trailOpacityAt } =
    makePhoneCurves(phone);

  const x = useTransform(progress, xAt);
  const y = useTransform(progress, yAt);
  const rotate = useTransform(progress, rotateAt);
  const scale = useTransform(progress, scaleAt);
  const glow = useTransform(progress, glowAt);
  const labelOpacity = useTransform(progress, labelOpacityAt);
  const labelY = useTransform(progress, labelYAt);
  const trailX = useTransform(progress, trailXAt);
  const trailY = useTransform(progress, trailYAt);
  const trailOpacity = useTransform(progress, trailOpacityAt);

  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${phone.big ? "z-10" : "z-0"}`}
    >
      {/* Trailing glow — a lagged copy of this phone's own path. The
          translate-to-center classes below live on a static wrapper, not
          the motion.div itself — Framer's inline `transform` (from the x/y
          style values) would otherwise silently replace the Tailwind
          translate classes entirely, since they target the same property. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{ x: trailX, y: trailY, opacity: trailOpacity }}
          className={`h-16 w-16 rounded-full ${phone.trailClass} blur-2xl`}
        />
      </div>

      <motion.div style={{ x, y }}>
        <motion.div
          style={{ rotate, scale }}
          className="w-[170px] md:w-[195px] lg:w-[215px]"
        >
          <IPhone15Pro
            src={phone.src}
            alt={phone.alt}
            className="drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
            overlay={
              <motion.div
                style={{ opacity: glow }}
                className="pointer-events-none absolute inset-0 rounded-[11cqw] bg-gradient-to-br from-white/70 via-bloom-green-light/60 to-bloom-blue/40 mix-blend-screen"
              />
            }
          />
        </motion.div>

        {/* Same fix as the trailing glow above — centering lives on the
            static wrapper, animated opacity/y on the motion.p inside it. */}
        <div className="absolute left-1/2 top-full mt-6 w-max max-w-[10rem] -translate-x-1/2 text-center">
          <motion.p
            style={{ opacity: labelOpacity, y: labelY }}
            className="text-sm leading-snug text-bloom-text-soft"
          >
            {phone.label}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ScrollPhoneSequence() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  // Raw scroll progress jumps in whatever steps the input device fires
  // (mouse wheel especially); spring-smoothing it here is what makes the
  // whole sequence — phone positions, glow, everything below reading off
  // this value — feel like one continuous motion rather than tracking the
  // scrollbar 1:1.
  const scrollYProgress = useSpring(rawScrollYProgress, { stiffness: 220, damping: 32, mass: 0.5 });

  const glowScale = useTransform(scrollYProgress, (p) => remap(p, [0, 0.5, 1], [0.85, 1.1, 1]));
  const glowOpacity = useTransform(scrollYProgress, (p) => remap(p, [0, 0.5, 1], [0.12, 0.28, 0.22]));

  return (
    <div ref={trackRef} className="relative h-[260vh]">
      {/* Header is now a floating pill (top-4 + h-16 ≈ 5rem footprint), not
          an in-flow 4rem bar — offset to clear it. */}
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vw] max-h-[560px] w-[50vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom-green/30 blur-[130px]"
        />

        <div className="relative h-[420px] w-full max-w-5xl">
          {PHONES.map((phone) => (
            <PhoneItem key={phone.src} phone={phone} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}
