"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import StaticPhoneRow from "./StaticPhoneRow";

const ScrollPhoneSequence = dynamic(() => import("./ScrollPhoneSequence"), {
  ssr: false,
  loading: () => <StaticPhoneRow />,
});

const QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const widthMql = window.matchMedia(QUERY);
  const motionMql = window.matchMedia(REDUCED_MOTION_QUERY);
  widthMql.addEventListener("change", callback);
  motionMql.addEventListener("change", callback);
  return () => {
    widthMql.removeEventListener("change", callback);
    motionMql.removeEventListener("change", callback);
  };
}

function getSnapshot(): "cinematic" | "static" {
  const wide = window.matchMedia(QUERY).matches;
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  return wide && !reducedMotion ? "cinematic" : "static";
}

function getServerSnapshot(): "static" {
  return "static";
}

// The pinned scroll-scrubbed sequence is reserved for wide viewports without
// a reduced-motion preference — see StaticPhoneRow for why.
export default function PhoneSequenceStage() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return mode === "cinematic" ? <ScrollPhoneSequence /> : <StaticPhoneRow />;
}
