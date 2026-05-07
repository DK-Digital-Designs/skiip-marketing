import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skiip.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SKIIP | Skip the Queue at Live Events",
    template: "%s | SKIIP"
  },
  description: SITE.description,
  openGraph: {
    title: "SKIIP | Skip the Queue at Live Events",
    description: SITE.description,
    url: siteUrl,
    siteName: "SKIIP",
    images: [{ url: "/uploads/skiip-logo.png", width: 1200, height: 630, alt: "SKIIP" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SKIIP | Skip the Queue at Live Events",
    description: SITE.description,
    images: ["/uploads/skiip-logo.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" className="site-main">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
