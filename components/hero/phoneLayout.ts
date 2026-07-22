export type PhoneLayout = {
  screenshot: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  tiltStrength: number;
  floatSeed: number;
};

// Front phone: larger, lower, closer to camera (+z), full tilt, extends
// further down/forward for depth. Back phone: smaller, higher, further from
// camera (-z), rotated the other way, subtler tilt (parallax — it moves less
// than the front one). Tight x/y overlap between the two plus steeper
// rotation on both gives the cluster more energy than a flat side-by-side
// layout. Shared by the real GLB phones, the procedural placeholder
// fallback, and the Suspense loader skeleton so the composition never jumps
// between states.
export const PHONE_LAYOUT: PhoneLayout[] = [
  {
    screenshot: "/images/screenshots/png1.png",
    position: [-0.5, -0.46, 0.85],
    rotation: [0.1, -0.42, -0.12],
    scale: 1,
    tiltStrength: 1,
    floatSeed: 0,
  },
  {
    screenshot: "/images/screenshots/png2.png",
    position: [0.45, 0.15, -0.85],
    rotation: [-0.08, 0.48, 0.14],
    scale: 0.78,
    tiltStrength: 0.55,
    floatSeed: 2.1,
  },
];
