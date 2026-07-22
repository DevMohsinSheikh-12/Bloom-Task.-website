// The small glowing green dot that follows every "Bloom Task" wordmark
// on the site — sized in `em` so it scales with whatever text it's dropped
// next to (nav logo, footer brand line, headlines) without per-site tuning.
export default function BrandDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`ml-1 inline-block h-[0.32em] w-[0.32em] flex-shrink-0 rounded-full bg-bloom-green align-baseline shadow-[0_0_6px_rgba(135,230,75,0.8)] ${className}`}
    />
  );
}
