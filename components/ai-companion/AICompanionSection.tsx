import Reveal from "@/components/motion/Reveal";
import CompanionNotifications from "./CompanionNotifications";
import MoodChip from "./MoodChip";
import TiltPhone from "./TiltPhone";

export default function AICompanionSection() {
  return (
    <section className="relative border-t border-bloom-border/50 px-6 pb-32 pt-24 sm:pb-36 sm:pt-28">
      {/* Only one clipping boundary here (this wrapper), not also on the
          section itself — a redundant second overflow-hidden on the section
          plus a blur radius large relative to the margin before either clip
          edge was cutting the glow off mid-fade, reading as a visible seam
          rather than a smooth falloff. Blobs are sized with real margin to
          spare now so the blur fully dissipates before it ever gets clipped. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8%] top-1/2 h-[38vw] max-h-[380px] w-[38vw] max-w-[380px] -translate-y-1/2 rounded-full bg-bloom-green/8 blur-[140px]" />
        <div className="absolute right-[4%] top-[20%] h-[22vw] max-h-[260px] w-[22vw] max-w-[260px] rounded-full bg-bloom-blue/8 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <Reveal className="order-2 flex justify-center lg:order-1" x={-40} y={0}>
          {/* Sized to match TiltPhone's own width exactly — Reveal above is
              a flex grid-item, which stretches to fill its whole ~500px+
              column, not the phone's 220-250px. Chips are absolutely
              positioned, so without this wrapper they'd anchor to that wide
              invisible box instead of the phone, landing far from it
              regardless of how small their offset numbers were. */}
          <div className="relative w-[220px] sm:w-[250px]">
            <TiltPhone src="/images/screenshots/png3.png" alt="The Bloom Task companion chat screen" />

            <MoodChip label="gentle" color="green" className="-right-1 top-[8%] z-10" floatDuration={4.8} floatDelay={0.2} />
            <MoodChip label="coach" color="blue" className="-left-1 top-[44%] z-10" floatDuration={5.2} floatDelay={0.9} />
            <MoodChip
              label="curious"
              color="green"
              className="-right-1 bottom-[8%] z-10"
              floatDuration={4.6}
              floatDelay={1.5}
            />
          </div>
        </Reveal>

        <Reveal className="order-1 text-center lg:order-2 lg:text-left" x={40} y={0} delay={0.1}>
          <p className="font-voice text-lg italic text-bloom-green">meet your companion</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bloom-text sm:text-4xl">
            It notices. It adapts. It never judges.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-bloom-text-soft lg:mx-0">
            Bloom&apos;s AI reads the room — rushed, tired, motivated — and adjusts what it asks
            of you. Some days that&apos;s a gentle nudge. Other days, it just listens. Always
            warm, never a lecture.
          </p>

          <div className="mt-10 flex justify-center lg:justify-start">
            <CompanionNotifications />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
