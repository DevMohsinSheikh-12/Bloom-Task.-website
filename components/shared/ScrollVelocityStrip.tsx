import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";

const PHRASES = ["save it", "talk it out", "no pressure", "watch yourself grow"];

// A compact rhythmic beat between AI Companion and Saves — not a full
// section, just a strip. Marquee text repeats the same handful of phrases
// forever, so it's marked aria-hidden; the real copy lives in the headings
// above and below it.
export default function ScrollVelocityStrip() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-bloom-border/50 bg-bloom-surface/20 py-6 sm:py-8"
    >
      <ScrollVelocityContainer>
        <ScrollVelocityRow
          baseVelocity={3}
          className="text-2xl font-bold tracking-tight text-bloom-text sm:text-3xl"
        >
          {PHRASES.map((phrase, i) => (
            <span key={phrase} className="mx-4 inline-flex items-center gap-4 sm:mx-6">
              <span className={i % 2 === 0 ? "text-bloom-green" : "text-bloom-blue"}>{phrase}</span>
              <span className="text-bloom-text-muted/40">•</span>
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}
