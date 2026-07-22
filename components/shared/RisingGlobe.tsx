"use client";

import type { COBEOptions } from "cobe";
import { Globe } from "@/components/ui/globe";

// A globe rising into view right before the footer, cut off exactly at its
// equator. The illusion isn't an overflow clip on the globe itself — the
// outer wrapper's height is deliberately exactly half the globe box's
// height, so what's cut away is precisely the bottom hemisphere, and the
// footer that follows immediately after reads as "where the globe
// continues, just hidden from here down."
//
// Config (and the onRender callback it carries) has to live in this Client
// Component rather than being passed in from a server parent — a function
// can't cross the server/client boundary as a prop.
const RISING_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.08, 0.12, 0.16],
  markerColor: [135 / 255, 230 / 255, 75 / 255],
  glowColor: [79 / 255, 180 / 255, 240 / 255],
  markers: [
    { location: [40.7128, -74.006], size: 0.06 },
    { location: [51.5072, -0.1276], size: 0.05 },
    { location: [35.6762, 139.6503], size: 0.06 },
    { location: [-33.8688, 151.2093], size: 0.05 },
    { location: [19.076, 72.8777], size: 0.06 },
    { location: [1.3521, 103.8198], size: 0.05 },
  ],
};

export default function RisingGlobe() {
  return (
    <div aria-hidden className="relative mt-auto h-[240px] overflow-hidden sm:h-[320px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vw] max-h-[670px] w-[70vw] max-w-[670px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom-green/10 blur-[110px]" />

      <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 sm:h-[640px] sm:w-[640px]">
        <Globe config={RISING_GLOBE_CONFIG} />
      </div>
    </div>
  );
}
