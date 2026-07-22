import Reveal from "@/components/motion/Reveal";
import { ChatIcon, CheckIcon } from "@/components/how-it-works/icons";
import SavesPhone from "./SavesPhone";
import SavesRingsBackdrop from "./SavesRingsBackdrop";
import { TagIcon } from "./icons";

const FEATURES = [
  { label: "Tag anything", icon: TagIcon },
  { label: "Ask your companion", icon: ChatIcon },
  { label: "Becomes a task when you're ready", icon: CheckIcon },
];

export default function SavesSection() {
  return (
    <section className="relative border-t border-bloom-border/50 px-6 pb-32 pt-24 sm:pb-36 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-8%] top-1/2 h-[46vw] max-h-[480px] w-[46vw] max-w-[480px] -translate-y-1/2 rounded-full bg-bloom-blue/9 blur-[140px]" />
        <div className="absolute left-[6%] top-[15%] h-[26vw] max-h-[300px] w-[26vw] max-w-[300px] rounded-full bg-bloom-green/9 blur-[120px]" />
      </div>

      <SavesRingsBackdrop />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <Reveal className="order-2 flex justify-center" x={40} y={0}>
          <SavesPhone />
        </Reveal>

        <Reveal className="order-1 text-center lg:text-left" x={-40} y={0} delay={0.1}>
          <p className="font-voice text-lg italic text-bloom-green">never lose it again</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bloom-text sm:text-4xl">
            Save it now. Do it later — actually.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-bloom-text-soft lg:mx-0">
            Share a link, a reel, an article — Bloom tags it and tucks it away, searchable the
            moment you need it. Ask your companion about it anytime, or let it quietly become a
            task when you&apos;re ready to act.
          </p>

          <ul className="mx-auto mt-8 max-w-lg space-y-3 lg:mx-0">
            {FEATURES.map((feature) => (
              <li
                key={feature.label}
                className="flex items-center justify-center gap-3 text-bloom-text-soft lg:justify-start"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-bloom-surface/60">
                  <feature.icon className="h-4 w-4 text-bloom-green" />
                </span>
                <span className="text-sm">{feature.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
