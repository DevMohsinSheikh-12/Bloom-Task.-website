"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import StaticPhoneFallback from "./StaticPhoneFallback";

const PhoneCanvas = dynamic(() => import("./PhoneCanvas"), {
  ssr: false,
  loading: () => <StageSkeleton />,
});

function StageSkeleton() {
  return (
    <div className="mx-auto h-[420px] w-[240px] animate-pulse rounded-[2.5rem] bg-bloom-surface/60 sm:h-[520px] sm:w-[280px]" />
  );
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const QUERY = "(min-width: 1024px)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): "3d" | "static" {
  return window.matchMedia(QUERY).matches && supportsWebGL() ? "3d" : "static";
}

function getServerSnapshot(): "checking" {
  return "checking";
}

// Real 3D only on wide-enough viewports with WebGL support; everything else
// (phones, tablets, WebGL-less browsers) gets the static fallback — never a
// broken or empty canvas. useSyncExternalStore keeps this in sync with the
// viewport (crossing the breakpoint re-evaluates) without touching `window`
// during the server render.
export default function PhoneStage() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (mode === "checking") return <StageSkeleton />;
  if (mode === "static") return <StaticPhoneFallback />;

  return (
    <div className="h-[460px] w-full sm:h-[560px] lg:h-[620px]">
      <PhoneCanvas />
    </div>
  );
}
