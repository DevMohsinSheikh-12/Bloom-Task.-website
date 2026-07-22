"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import CompanionOrb from "@/components/ai-companion/CompanionOrb";
import { BookmarkIcon, ChatIcon, CheckIcon, GrowthIcon } from "@/components/how-it-works/icons";
import { TagIcon } from "@/components/saves/icons";

const GREEN = "#87e64b";
const BLUE = "#4fb4f0";

function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 4.5a4.5 4.5 0 0 0-4.5 4.5v2.5c0 .8-.3 1.56-.85 2.15L5.5 15h13l-1.15-1.35A3.25 3.25 0 0 1 16.5 11.5V9A4.5 4.5 0 0 0 12 4.5Z"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
    </svg>
  );
}

function Circle({
  ref,
  className,
  children,
}: {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-bloom-surface/70 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md sm:size-12",
        className
      )}
    >
      {children}
    </div>
  );
}

function LabeledNode({
  nodeRef,
  icon,
  label,
  accent,
}: {
  nodeRef: Ref<HTMLDivElement>;
  icon: ReactNode;
  label: string;
  accent: "green" | "blue";
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Circle ref={nodeRef} className={accent === "green" ? "text-bloom-green-light" : "text-bloom-blue-light"}>
        {icon}
      </Circle>
      <span className="select-none text-[10px] font-semibold uppercase tracking-wider text-bloom-text-muted">
        {label}
      </span>
    </div>
  );
}

// MagicUI's own "multiple inputs → hub → multiple outputs" Animated Beam
// layout (their canonical docs-page example), kept structurally identical —
// 3 left nodes, 1 center hub, 3 right nodes, six beams with the same
// curvature/endYOffset/reverse pattern. Only the colors and icon content
// changed: the left/right nodes are our own app icons rather than
// third-party service logos (which would read as an unfinished template on
// our own site), mapped to the section's copy — ways you save flow into the
// companion (the bridge itself), which flows out to what a save becomes.
export default function BridgeBeamDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookmarkRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[380px] w-full items-center justify-center overflow-hidden px-2 sm:h-[500px] sm:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_35%,transparent_100%)]"
      />

      <div className="flex size-full flex-row items-stretch justify-between gap-3 sm:gap-10">
        <div className="flex flex-col justify-center gap-6 sm:gap-8">
          <LabeledNode
            nodeRef={bookmarkRef}
            icon={<BookmarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            label="save"
            accent="green"
          />
          <LabeledNode
            nodeRef={tagRef}
            icon={<TagIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            label="tag"
            accent="green"
          />
          <LabeledNode
            nodeRef={chatRef}
            icon={<ChatIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            label="talk"
            accent="green"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="relative flex flex-col items-center gap-1.5">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-bloom-green-light/35 to-bloom-blue/35 blur-2xl sm:h-32 sm:w-32" />
            <div ref={hubRef} className="z-10 flex size-16 items-center justify-center sm:size-20">
              <CompanionOrb className="h-12 w-12 sm:h-16 sm:w-16" />
            </div>
            <span className="select-none text-[10px] font-semibold uppercase tracking-wider text-bloom-text-muted">
              companion
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 sm:gap-8">
          <LabeledNode
            nodeRef={checkRef}
            icon={<CheckIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            label="task"
            accent="blue"
          />
          <LabeledNode
            nodeRef={growthRef}
            icon={<GrowthIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            label="grow"
            accent="blue"
          />
          <LabeledNode
            nodeRef={bellRef}
            icon={<BellIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            label="remind"
            accent="blue"
          />
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bookmarkRef}
        toRef={hubRef}
        curvature={-75}
        endYOffset={-10}
        pathWidth={2.5}
        pathColor="#ffffff"
        pathOpacity={0.15}
        duration={3}
        gradientStartColor={GREEN}
        gradientStopColor={BLUE}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tagRef}
        toRef={hubRef}
        pathWidth={2.5}
        pathColor="#ffffff"
        pathOpacity={0.15}
        duration={3}
        gradientStartColor={GREEN}
        gradientStopColor={BLUE}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={chatRef}
        toRef={hubRef}
        curvature={75}
        endYOffset={10}
        pathWidth={2.5}
        pathColor="#ffffff"
        pathOpacity={0.15}
        duration={3}
        gradientStartColor={GREEN}
        gradientStopColor={BLUE}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={checkRef}
        curvature={-75}
        endYOffset={-10}
        reverse
        pathWidth={2.5}
        pathColor="#ffffff"
        pathOpacity={0.15}
        duration={3}
        gradientStartColor={BLUE}
        gradientStopColor={GREEN}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={growthRef}
        reverse
        pathWidth={2.5}
        pathColor="#ffffff"
        pathOpacity={0.15}
        duration={3}
        gradientStartColor={BLUE}
        gradientStopColor={GREEN}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={bellRef}
        curvature={75}
        endYOffset={10}
        reverse
        pathWidth={2.5}
        pathColor="#ffffff"
        pathOpacity={0.15}
        duration={3}
        gradientStartColor={BLUE}
        gradientStopColor={GREEN}
      />
    </div>
  );
}
