import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AmbientBackdrop from "@/components/shared/AmbientBackdrop";
import GridBackground from "@/components/shared/GridBackground";
import NoiseOverlay from "@/components/shared/NoiseOverlay";
import SmoothScroll from "@/components/shared/SmoothScroll";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Bloom Task — your companion, always",
  description:
    "Bloom Task turns the things you save into the things you actually do — a warm AI companion that notices how you're feeling and adjusts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-bloom-bg text-bloom-text">
        <SmoothScroll />
        <GridBackground />
        <AmbientBackdrop />
        <NoiseOverlay />
        <Header />
        {/* Header is `fixed` (a floating pill), not in document flow — this
            padding is the sole clearance for its ~5rem footprint (top-4 +
            h-16), shared by every route. */}
        {/* id="top" gives the footer's "back to top" link something to
            target on every route — not every page has a #hero section. */}
        {/* flex flex-col so a trailing child can use mt-auto to anchor to
            this element's bottom edge (see RisingGlobe) — otherwise flex-1
            growing main taller than its content on short viewports leaves
            the extra space as a trailing gap after the last child instead
            of closing it. */}
        <main id="top" className="flex flex-1 flex-col pt-20 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
