import { fetchLatestAppVersion } from "@/lib/appVersion";
import Reveal from "@/components/motion/Reveal";
import AndroidIcon from "@/components/icons/AndroidIcon";
import BrandDot from "@/components/shared/BrandDot";
import { APK_URL } from "@/lib/constants";

export default async function DownloadSection() {
  const versionRow = await fetchLatestAppVersion();

  return (
    <section
      id="download"
      className="relative border-t border-bloom-border/60 bg-bloom-surface/40 px-6 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[58vw] max-h-[500px] w-[58vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom-green/14 blur-[140px]" />
        <div className="absolute right-[-6%] top-[15%] h-[32vw] max-h-[340px] w-[32vw] max-w-[340px] rounded-full bg-bloom-blue/12 blur-[120px]" />
      </div>

      <Reveal className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bloom-surface/40 px-8 py-12 text-center backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_-30px_rgba(0,0,0,0.6)] sm:px-12 sm:py-14">
          {/* Companion orb echo — the app's own halo-glow identity, distilled */}
          <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-28 w-28 -translate-x-1/2 rounded-full bg-gradient-to-br from-bloom-green-light/60 to-bloom-blue/40 opacity-70 blur-2xl" />

          <p className="font-voice text-lg italic text-bloom-green">ready when you are</p>
          <h2 className="mt-3 flex items-center justify-center text-3xl font-extrabold tracking-tight text-bloom-text sm:text-4xl">
            Get Bloom Task
            <BrandDot />
          </h2>

          {versionRow && (
            <p className="mt-3 text-sm text-bloom-text-muted">
              Version {versionRow.version}
              {versionRow.release_notes ? ` — ${versionRow.release_notes}` : ""}
            </p>
          )}

          <div className="mt-8">
            <a
              href={APK_URL}
              className="inline-flex items-center gap-2.5 rounded-full bg-bloom-green px-10 py-4 text-lg font-semibold text-bloom-on-green shadow-lg shadow-bloom-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-bloom-green-light hover:shadow-bloom-green/35 active:scale-[0.98]"
            >
              <AndroidIcon className="h-6 w-6" />
              Download for Android
            </a>
            <p className="mx-auto mt-5 max-w-md text-sm text-bloom-text-muted">
              You may need to allow installs from unknown sources — this is normal for apps not
              yet on the Play Store.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
