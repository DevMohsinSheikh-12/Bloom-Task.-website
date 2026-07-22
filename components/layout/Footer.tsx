import { fetchLatestAppVersion } from "@/lib/appVersion";
import Reveal from "@/components/motion/Reveal";
import BrandDot from "@/components/shared/BrandDot";
import CompanionOrb from "@/components/ai-companion/CompanionOrb";
import { APK_URL } from "@/lib/constants";

const REPO_URL = "https://github.com/DevMohsinSheikh-12/Bloom-Task-app-release";

function ArrowUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 19V6M12 6l-6 6M12 6l6 6"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function Footer() {
  const versionRow = await fetchLatestAppVersion();

  return (
    // No border-t/hard seam here — the glow used to straddle that exact
    // boundary line (top-0, half bleeding into the section above), which
    // read as a collision rather than a clean transition. Keeping the glow
    // fully inside the footer's own bounds and relying on the glass card
    // below for visual separation instead.
    <footer className="relative overflow-hidden bg-bloom-surface/15 px-6 pb-10 pt-6 sm:pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-[36vw] max-h-[340px] w-[36vw] max-w-[340px] -translate-x-1/2 rounded-full bg-bloom-green/8 blur-[130px]" />
      </div>

      <a
        href="#top"
        aria-label="Back to top"
        className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-bloom-bg/50 text-bloom-text-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-bloom-green/40 hover:text-bloom-green-light"
      >
        <ArrowUpIcon className="h-4 w-4" />
      </a>

      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bloom-surface/40 px-8 py-10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_-30px_rgba(0,0,0,0.6)] sm:px-12 sm:py-12">
          <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-3">
                <CompanionOrb className="h-9 w-9" />
                <p className="flex items-center text-xl font-bold tracking-tight text-bloom-text">
                  Bloom Task
                  <BrandDot />
                </p>
              </div>
              <p className="mt-3 font-voice text-base italic text-bloom-text-soft">
                your companion, always
              </p>
            </div>

            <div className="flex gap-12 sm:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-bloom-text-muted">
                  Get the app
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      href={APK_URL}
                      className="text-bloom-text-soft transition-colors duration-200 hover:text-bloom-green-light"
                    >
                      Download for Android
                    </a>
                  </li>
                  {versionRow && (
                    <li className="text-bloom-text-muted">Version {versionRow.version}</li>
                  )}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-bloom-text-muted">
                  Support
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      href={`${REPO_URL}/issues`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bloom-text-soft transition-colors duration-200 hover:text-bloom-green-light"
                    >
                      Report an issue
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-bloom-border/50 pt-6 text-xs text-bloom-text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Bloom Task. Made with care.</p>
            <p>
              3D model: &ldquo;Apple iPhone 15 Pro Max Black&rdquo; by polyman Studio, licensed
              under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline decoration-bloom-text-muted/50 underline-offset-2 transition-colors duration-200 hover:text-bloom-text-soft"
              >
                CC Attribution 4.0
              </a>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
