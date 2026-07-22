// A subtle animated grid-mesh backdrop — hand-built rather than pulled from
// shadcn's registry: the closest fit there (Magic UI's grid/retro-grid
// components) requires the shadcn CLI's full interactive component-library
// setup (picking Radix/Base UI/React Aria, scaffolding components.json,
// utils.ts) just to land one decorative layer, which is disproportionate
// for what's a few lines of CSS. Fixed to the viewport like NoiseOverlay —
// it's a screen-space texture, not something that should scroll with the
// document.
//
// Two layers: thin white grid lines (masked to fade out near the edges so
// it reads as atmosphere, not a harsh uniform overlay), plus a slow
// diagonal green→blue shine sweeping across it via a CSS keyframe
// (`--animate-grid-shine` in globals.css) — no JS, GPU-cheap background-
// position animation only.
export default function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_15%,black_35%,transparent_100%)]"
      />
      <div
        className="absolute inset-0 animate-grid-shine opacity-25 [background-image:linear-gradient(115deg,transparent_42%,rgba(135,230,75,0.035)_50%,rgba(79,180,240,0.035)_56%,transparent_64%)] [background-size:220%_220%] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_15%,black_35%,transparent_100%)]"
      />
    </div>
  );
}
