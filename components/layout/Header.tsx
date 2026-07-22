"use client";

import Link from "next/link";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import AndroidIcon from "@/components/icons/AndroidIcon";
import BrandDot from "@/components/shared/BrandDot";
import { APK_URL } from "@/lib/constants";

const SCROLL_THRESHOLD = 16;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  return (
    <header
      className={`fixed inset-x-4 top-4 z-50 mx-auto flex max-w-2xl items-center justify-between rounded-full border px-5 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "h-14 border-white/15 bg-bloom-surface/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_45px_-20px_rgba(0,0,0,0.6)]"
          : "h-16 border-white/10 bg-bloom-surface/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_-15px_rgba(0,0,0,0.4)]"
      }`}
    >
      <Link
        href="/"
        className="flex items-center text-base font-bold tracking-tight text-bloom-text transition-colors duration-200 hover:text-bloom-green-light"
      >
        Bloom Task
        <BrandDot />
      </Link>
      <a
        href={APK_URL}
        className="flex items-center gap-1.5 rounded-full bg-bloom-green px-4 py-2 text-sm font-semibold text-bloom-on-green shadow-sm shadow-bloom-green/10 transition-all duration-200 hover:scale-[1.05] hover:bg-bloom-green-light hover:shadow-bloom-green/30 active:scale-[0.97]"
      >
        <AndroidIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Download for Android</span>
        <span className="sm:hidden">Download</span>
      </a>
    </header>
  );
}
