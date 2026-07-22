import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import AICompanionSection from "@/components/ai-companion/AICompanionSection";
import ScrollVelocityStrip from "@/components/shared/ScrollVelocityStrip";
import SavesSection from "@/components/saves/SavesSection";
import AppShowcase from "@/components/showcase/AppShowcase";
import BridgeSection from "@/components/bridge/BridgeSection";
import DownloadSection from "@/components/download/DownloadSection";
import RisingGlobe from "@/components/shared/RisingGlobe";

// DownloadSection fetches the live app_version row — force dynamic
// rendering so that stays a per-request lookup instead of getting frozen at
// build time (this page has no other per-request API forcing that itself).
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />

      <HowItWorks />

      <AICompanionSection />

      <ScrollVelocityStrip />

      <SavesSection />

      <AppShowcase />

      <BridgeSection />

      <DownloadSection />

      <RisingGlobe />
    </>
  );
}
