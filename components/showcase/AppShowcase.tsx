import Reveal from "@/components/motion/Reveal";
import PhoneSequenceStage from "./PhoneSequenceStage";

export default function AppShowcase() {
  return (
    <section className="relative border-t border-bloom-border/50 bg-bloom-surface/20">
      <div className="px-6 pt-24 sm:pt-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-voice text-lg italic text-bloom-blue-light">see it in action</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bloom-text sm:text-4xl">
            A look inside
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-bloom-text-soft">
            The real screens — saving, talking, and watching it all quietly add up.
          </p>
        </Reveal>
      </div>

      <PhoneSequenceStage />
      <div className="h-16 sm:h-20" />
    </section>
  );
}
