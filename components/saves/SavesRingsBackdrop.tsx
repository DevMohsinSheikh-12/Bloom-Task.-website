// Three concentric "sonar" rings behind the Saves section's phone + copy.
// Each ring is two layers: a dim, static circle (its constant presence) and
// a brighter arc riding on top that spins — a solid ring is rotationally
// symmetric so spinning it alone shows no motion, the arc is what sells the
// "orbiting" read. All three also share a slow breathing scale, staggered
// via negative animation-delay so they don't pulse in lockstep.
//
// No "use client" / JS needed — everything here is CSS keyframe animation
// (see ring-spin / ring-spin-reverse / ring-pulse in globals.css), so this
// renders as static server HTML and costs nothing beyond GPU-composited
// transforms once painted.
const RINGS = [
  {
    vw: 46,
    max: 460,
    borderColor: "rgba(135, 230, 75, 0.09)",
    accentColor: "rgba(168, 238, 111, 0.4)",
    spin: "ring-spin 52s linear infinite",
    pulseDelay: "0s",
  },
  {
    vw: 34,
    max: 340,
    borderColor: "rgba(79, 180, 240, 0.1)",
    accentColor: "rgba(169, 225, 255, 0.4)",
    spin: "ring-spin-reverse 40s linear infinite",
    pulseDelay: "-4s",
  },
  {
    vw: 22,
    max: 220,
    borderColor: "rgba(135, 230, 75, 0.12)",
    accentColor: "rgba(168, 238, 111, 0.45)",
    spin: "ring-spin 64s linear infinite",
    pulseDelay: "-8s",
  },
] as const;

export default function SavesRingsBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
      }}
    >
      {RINGS.map((ring, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: `min(${ring.vw}vw, ${ring.max}px)`,
            height: `min(${ring.vw}vw, ${ring.max}px)`,
            animation: "ring-pulse 12s ease-in-out infinite",
            animationDelay: ring.pulseDelay,
          }}
        >
          <div
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: ring.borderColor, filter: "blur(1px)" }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: ring.accentColor,
              borderRightColor: ring.accentColor,
              filter: "blur(1.5px)",
              animation: ring.spin,
            }}
          />
        </div>
      ))}
    </div>
  );
}
