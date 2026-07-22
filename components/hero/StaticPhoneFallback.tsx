"use client";

import { useState } from "react";
import Image from "next/image";
import BrandDot from "@/components/shared/BrandDot";

type PhoneCardProps = { src: string; className: string; priority?: boolean };

function PhoneCard({ src, className, priority }: PhoneCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`absolute aspect-[9/19] rounded-[2.5rem] border border-white/10 bg-bloom-surface p-2 shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-bloom-surface via-bloom-bg to-black">
        {!imgError ? (
          <Image
            src={src}
            alt="Bloom Task app screenshot"
            fill
            sizes="250px"
            className="object-cover"
            priority={priority}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center">
            <span className="flex items-center text-2xl font-extrabold tracking-tight text-bloom-text">
              Bloom Task
              <BrandDot />
            </span>
          </div>
        )}
        {/* Dynamic Island, drawn to match the CSS iPhone 15 Pro frame used
            elsewhere on the site — consistent even though this card has no
            other chrome. */}
        <div className="absolute left-1/2 top-[3%] h-[3.6%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

// Used on small/mobile viewports and any browser without WebGL — mirrors the
// 3D hero's two-phone overlapping composition in plain CSS so there's never
// an empty box, and never a jarring one-phone-vs-two-phone mismatch against
// the desktop 3D view. Each card falls back independently to a wordmark card
// if its own screenshot hasn't been provided yet.
export default function StaticPhoneFallback() {
  return (
    // Stage height must clear the taller (bottom-anchored, aspect-[9/19])
    // front card at its rendered width — 220px/250px wide means ~464px/528px
    // tall, which the previous 360px/420px stage didn't actually contain.
    <div className="relative mx-auto h-[470px] w-[280px] sm:h-[535px] sm:w-[320px]">
      <PhoneCard src="/images/screenshots/png2.png" className="right-0 top-0 w-[190px] rotate-6 opacity-90 sm:w-[220px]" />
      <PhoneCard
        src="/images/screenshots/png1.png"
        className="bottom-0 left-0 w-[220px] -rotate-3 sm:w-[250px]"
        priority
      />
    </div>
  );
}
