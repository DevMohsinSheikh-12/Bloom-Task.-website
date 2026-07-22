import AmbientGlow from "./AmbientGlow";
import PhoneStage from "./PhoneStage";
import AndroidIcon from "@/components/icons/AndroidIcon";
import { APK_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-20">
      <AmbientGlow />
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="text-center lg:text-left">
          <p className="font-voice text-lg italic text-bloom-green sm:text-xl">
            your companion, always
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-bloom-text sm:text-4xl lg:text-5xl">
            The app that remembers what you meant to do.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-bloom-text-soft lg:mx-0">
            Save a link, a reel, a screenshot. Bloom turns it into something you actually do —
            with a companion that notices, never nags. No guilt, no streaks, no cockpit. Just what
            matters, done.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a
              href={APK_URL}
              className="flex items-center gap-2 rounded-full bg-bloom-green px-8 py-3.5 text-base font-semibold text-bloom-on-green shadow-lg shadow-bloom-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-bloom-green-light hover:shadow-bloom-green/35 active:scale-[0.98]"
            >
              <AndroidIcon className="h-5 w-5" />
              Download for Android
            </a>
            <span className="text-sm text-bloom-text-muted">Free · direct install, no store needed</span>
          </div>
        </div>
        <div className="relative">
          <PhoneStage />
        </div>
      </div>
    </section>
  );
}
