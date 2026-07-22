import type { Metadata } from "next";
import DownloadSection from "@/components/download/DownloadSection";

export const metadata: Metadata = {
  title: "Download — Bloom Task",
  description: "Get the latest Bloom Task Android build.",
};

// See app/page.tsx — same reasoning: keep the live app_version lookup fresh
// per request instead of frozen at build time.
export const dynamic = "force-dynamic";

export default function DownloadPage() {
  return <DownloadSection />;
}
