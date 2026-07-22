"use client";

import type { ComponentType } from "react";
import { AnimatedList } from "@/components/ui/animated-list";
import { NotifyIcon1, NotifyIcon2, NotifyIcon3, NotifyIcon4 } from "./notifyIcons";

interface Note {
  tone: string;
  message: string;
  accent: "green" | "blue";
  icon: ComponentType<{ className?: string }>;
}

const NOTES: Note[] = [
  { tone: "gentle", message: "take your time, i'm here", accent: "green", icon: NotifyIcon1 },
  { tone: "coach", message: "let's go, you've got this", accent: "blue", icon: NotifyIcon2 },
  { tone: "companion", message: "a warm nudge about your task", accent: "green", icon: NotifyIcon3 },
  { tone: "check-in", message: "how's today going?", accent: "blue", icon: NotifyIcon4 },
];

// AnimatedList reveals its children once, in order, then holds — it doesn't
// loop on its own. Repeating the same four notes several times over is what
// makes it read as "messages keep arriving" for the length of a normal
// viewing pass instead of settling after four beats.
const FEED: Note[] = Array.from({ length: 6 }, () => NOTES).flat();

function NoteCard({ tone, message, accent, icon: Icon }: Note) {
  return (
    <figure className="relative w-full max-w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-bloom-surface/70 px-4 py-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            accent === "green" ? "bg-bloom-green/15 text-bloom-green-light" : "bg-bloom-blue/15 text-bloom-blue-light"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="flex flex-col overflow-hidden text-left">
          <figcaption className="text-xs font-semibold uppercase tracking-wide text-bloom-text-muted">
            {tone}
          </figcaption>
          <p className="truncate text-sm text-bloom-text-soft">{message}</p>
        </div>
      </div>
    </figure>
  );
}

export default function CompanionNotifications() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-sm overflow-hidden [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)] sm:h-[340px]">
      <AnimatedList delay={1600}>
        {FEED.map((note, i) => (
          <NoteCard key={i} {...note} />
        ))}
      </AnimatedList>
    </div>
  );
}
