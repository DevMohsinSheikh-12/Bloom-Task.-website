// Barely-visible grain texture over the whole viewport — an inline SVG
// feTurbulence data URI (no image asset, no JS, one static tiled layer), the
// same trick high-end marketing sites use for a tactile, non-flat feel.
// Fixed (not absolute) since it's a screen-space texture, not part of the
// page's parallax system — it should stay put, just tile with the viewport.
const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "120px 120px",
      }}
    />
  );
}
