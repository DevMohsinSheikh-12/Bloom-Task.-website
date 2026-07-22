"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

const MAX_TILT = THREE.MathUtils.degToRad(9);
const BOB_AMPLITUDE = 0.06;
const BOB_SPEED = 0.35;
const SWAY_AMPLITUDE = THREE.MathUtils.degToRad(1.4);
const SWAY_SPEED = 0.27;

// Calm mouse-follow + scroll tilt, shared by the real GLB phone and its
// procedural placeholder. Pointer tracking comes from R3F's own state.pointer
// (updated while the cursor is over the canvas); scroll progress is tracked
// against the #hero section so the phone settles as it scrolls out of view.
// `strength` scales the tilt (0-1) so multiple phones in one composition can
// tilt by different amounts for a parallax feel instead of moving in lockstep.
// `floatSeed` phase-shifts the idle bob/sway so multiple phones don't move
// in perfect sync.
export function usePhoneTilt(strength: number = 1, floatSeed: number = 0) {
  const groupRef = useRef<Group>(null);
  // Raw scroll position updates in a hard jump per scroll event; the phone
  // reads `scrollProgress` instead, which chases that target with its own
  // damp pass each frame. Smoothing the *input* on top of the existing
  // rotation damp (below) removes the last bit of stepping you'd otherwise
  // see on scroll wheels/trackpads that fire coarse, bursty scroll events.
  const targetScrollProgress = useRef(0);
  const scrollProgress = useRef(0);
  const reducedMotion = useRef(false);
  const heroVisible = useRef(true);
  const { invalidate } = useThree();

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const onScroll = () => {
      const rect = heroEl.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const progress = THREE.MathUtils.clamp(1 - rect.bottom / total, 0, 1);
      targetScrollProgress.current = progress;
      invalidate();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // The idle bob/sway needs continuous rendering (frameloop="demand" only
    // renders on invalidate()), which isn't free — so only keep invalidating
    // every frame while the hero is actually on screen. Off-screen, the loop
    // settles and this costs nothing.
    const observer = new IntersectionObserver(([entry]) => {
      heroVisible.current = entry.isIntersecting;
      if (heroVisible.current) invalidate();
    });
    observer.observe(heroEl);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [invalidate]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (reducedMotion.current) {
      group.rotation.set(0, 0, 0);
      group.position.y = 0;
      return;
    }

    scrollProgress.current = THREE.MathUtils.damp(
      scrollProgress.current,
      targetScrollProgress.current,
      3,
      delta
    );

    const { pointer } = state;
    const targetY = (pointer.x * MAX_TILT + (scrollProgress.current - 0.5) * MAX_TILT * 0.7) * strength;
    const targetX = -pointer.y * MAX_TILT * 0.6 * strength;
    const sway = Math.sin(state.clock.elapsedTime * SWAY_SPEED + floatSeed) * SWAY_AMPLITUDE;

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 2.4, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 2.4, delta);
    group.rotation.z = sway;
    group.position.y = Math.sin(state.clock.elapsedTime * BOB_SPEED + floatSeed) * BOB_AMPLITUDE;

    if (heroVisible.current) invalidate();
  });

  return groupRef;
}
