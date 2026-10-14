import type { Metadata } from "next";
import { Suspense } from "react";
import { DiscoveryUrlObserver } from "@/components/discovery-url-observer";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import Link from "next/link";
import Navigation from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { brand, nav } from "@/data/site";
import "./globals.css";
import { Brand } from "@/components/brand";
import { pageMetadata } from "@/data/seo";
import { CameraTransitions } from "@/components/camera-transitions";
const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: "AUREL FRAME | Wedding & Event Photography — Studio Demo",
    template: "%s | AUREL FRAME",
  },
  description:
    "An editorial wedding, event and portrait photography studio concept by MSPixelPulse. Explore cinematic stock galleries and a private demo inquiry experience.",
  openGraph: pageMetadata(
    "/",
    "AUREL FRAME — Moments Become Masterpieces.",
    "A fictional editorial photography and cinematography studio by MSPixelPulse.",
  ).openGraph,
  twitter: pageMetadata(
    "/",
    "AUREL FRAME — Moments Become Masterpieces.",
    "A fictional editorial photography and cinematography studio by MSPixelPulse.",
  ).twitter,
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <footer>
          <div className="footer-main">
            <div>
              <Link prefetch={false} href="/" className="wordmark">
                <Brand />
              </Link>
              <p>Every Moment, Beautifully Remembered.</p>
              <span className="eyebrow">
                A fictional studio / Canada & United States concept
              </span>
            </div>
            <nav aria-label="Footer navigation">
              {nav.map((n, i) => (
                <Link
                  prefetch={false}
                  key={n}
                  href={i === 0 ? "/" : "/" + n.toLowerCase()}
                >
                  {n}
                </Link>
              ))}
            </nav>
            <div>
              <span className="eyebrow">Created by MSPixelPulse</span>
              <a href="https://mspixelpulse.com/projects">
                Explore the agency portfolio ↗
              </a>
              <a href="https://mspixelpulse.com/contact">
                Build a website like this ↗
              </a>
              <span className="footer-categories">
                <Link prefetch={false} href="/portfolio">
                  Wedding stories
                </Link>
                <Link prefetch={false} href="/portfolio?type=Film#discovery">
                  Film studies
                </Link>
                <Link prefetch={false} href="/services">
                  Portraits & events
                </Link>
              </span>
              <p>
                Agency contact placeholder:
                <br />
                hello@mspixelpulse.com
                <br />
                +1 (000) 000-0000
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 AUREL FRAME. An MSPixelPulse demo.</span>
            <Link prefetch={false} href="/privacy">
              Privacy & demo notice
            </Link>
            <Link prefetch={false} href="/credits">
              Image credits
            </Link>
          </div>
          <p className="disclosure">
            Fictional studio. Licensed stock imagery, illustrative collections
            and stock film studies. No real client work, credentials, bookings
            or availability are represented.
          </p>
        </footer>
        <Suspense fallback={null}>
          <DiscoveryUrlObserver />
        </Suspense>
        <Reveal />
        <CameraTransitions />
      </body>
    </html>
  );
}
