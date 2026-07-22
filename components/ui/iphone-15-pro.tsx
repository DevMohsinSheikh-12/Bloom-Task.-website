import Image from "next/image";
import type { ReactNode } from "react";

// A CSS/SVG-based iPhone 15 Pro frame for displaying real app screenshots.
// Deliberately separate from components/hero/Phone.tsx (the GLB 3D model
// used in the hero) — this is a lightweight, no-WebGL frame that renders
// reliably anywhere, styled after shadcn.io's iphone-15-pro component
// (titanium frame, Dynamic Island, side controls) but built from scratch:
// that registry component sits behind a paid token we don't have.
//
// Corner radius is expressed in `cqw` (container query width units, keyed
// off this component's own rendered width via [container-type:inline-size])
// instead of a fixed rem value. This component renders at very different
// pixel widths across the site (~130px-260px) — a fixed rem radius looks
// right at one size and comically over-rounded at another. cqw keeps the
// silhouette proportional (~15% of width, matching a real iPhone) at any
// rendered size.
interface IPhone15ProProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  overlay?: ReactNode;
}

export default function IPhone15Pro({ src, alt, className = "", sizes, overlay }: IPhone15ProProps) {
  return (
    <div className={`relative aspect-[9/19.5] w-full [container-type:inline-size] ${className}`}>
      {/* Titanium frame */}
      <div className="absolute inset-0 rounded-[15cqw] bg-gradient-to-br from-neutral-500 via-neutral-800 to-neutral-950 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-[1.1cqw] rounded-[13.5cqw] bg-black">
          <div className="absolute inset-[3.2cqw] overflow-hidden rounded-[11cqw] bg-black">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes ?? "(min-width: 1024px) 260px, 45vw"}
              className="object-cover"
            />
            {/* Glass sheen over the screen */}
            <div className="pointer-events-none absolute inset-0 rounded-[11cqw] ring-1 ring-inset ring-white/10" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
            {overlay}
          </div>
          {/* Dynamic Island — real proportions are ~125x37pt on a 393pt-wide
              screen (a ~3.4:1 pill), sized here relative to this bezel div's
              own box so it stays a stout pill rather than a thin sliver. */}
          <div className="absolute left-1/2 top-[5%] z-10 h-[4%] w-[30%] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
        </div>
      </div>

      {/* Side controls */}
      <div className="absolute -right-[2px] top-[20%] h-[8%] w-[3px] rounded-r bg-neutral-700" />
      <div className="absolute -left-[2px] top-[16%] h-[4%] w-[3px] rounded-l bg-neutral-700" />
      <div className="absolute -left-[2px] top-[24%] h-[6%] w-[3px] rounded-l bg-neutral-700" />
      <div className="absolute -left-[2px] top-[32%] h-[6%] w-[3px] rounded-l bg-neutral-700" />
    </div>
  );
}
