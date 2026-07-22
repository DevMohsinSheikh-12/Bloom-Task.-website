"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import IPhone15Pro from "@/components/ui/iphone-15-pro";

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 };

// Resting pose: a real perspective tilt (not a flat 2D rotate). rotateX
// leans the top edge back, away from the viewer, into the page. rotateZ is
// a positive (clockwise) in-plane twist — for a upright rectangle, that
// moves the top edge toward the right and the bottom edge toward the left,
// which is what actually produces the "leaning back, twisting" look rather
// than a flat diagonal photo-tilt or a horizontal turn.
const BASE_ROTATE_X = 10;
const BASE_ROTATE_Z = 8;
// Mouse-follow wobble around that resting pose — kept small so the
// presentational tilt stays legible rather than being overwhelmed by motion.
const WOBBLE = 4;

// A cheap CSS-only counterpart to the hero's WebGL phone tilt — mouse
// position drives rotateX/rotateZ through a spring, no second Canvas/GLB
// needed for a single static screenshot. Settles back to the resting pose
// (plus a gentle idle float from globals.css's `animate-float`) once the
// pointer leaves.
export default function TiltPhone({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(py, [0, 1], [BASE_ROTATE_X + WOBBLE, BASE_ROTATE_X - WOBBLE]),
    SPRING
  );
  const rotateZ = useSpring(
    useTransform(px, [0, 1], [BASE_ROTATE_Z - WOBBLE, BASE_ROTATE_Z + WOBBLE]),
    SPRING
  );

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="mx-auto w-[220px] sm:w-[250px] [perspective:1200px]"
    >
      {/* animate-float (CSS keyframes) and the spring below both animate
          `transform` — kept on separate elements so they don't fight over
          the same property each frame; child transforms compose naturally. */}
      <div className="animate-float">
        <motion.div style={{ rotateX, rotateZ }} className="[transform-style:preserve-3d]">
          <IPhone15Pro src={src} alt={alt} className="drop-shadow-[0_35px_70px_rgba(0,0,0,0.55)]" />
        </motion.div>
      </div>
    </div>
  );
}
