import Reveal from "@/components/motion/Reveal";
import BridgeBeamDiagram from "./BridgeBeamDiagram";

export default function BridgeSection() {
  return (
    <section className="relative border-t border-bloom-border/50 px-6 py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[55vw] max-h-[460px] w-[55vw] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom-green/8 blur-[140px]" />
        <div className="absolute right-[2%] top-[10%] h-[28vw] max-h-[300px] w-[28vw] max-w-[300px] rounded-full bg-bloom-blue/9 blur-[120px]" />
      </div>

      <Reveal className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bloom-surface/35 px-8 py-16 text-center backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_-30px_rgba(0,0,0,0.6)] sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-bloom-green/12 blur-3xl" />

          <p className="select-none font-voice text-lg italic text-bloom-green">how it fits together</p>

          <div className="mt-10">
            <BridgeBeamDiagram />
          </div>

          <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-bloom-text sm:text-4xl lg:text-5xl">
            The save-to-task bridge
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-bloom-text-soft sm:text-xl">
            Two halves, joined by a bridge: saves become tasks, tasks get an importance level,
            and a soft companion presence checks in along the way — reacting to your mood, never
            your streaks.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
