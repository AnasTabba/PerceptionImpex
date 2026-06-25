import type { Metadata, Viewport } from "next";
import { Spectral, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font: no external round-trip, no layout shift.
// Spectral (high-contrast serif) carries heritage gravitas in headings;
// Hanken Grotesk (clean grotesque) handles body, specs, and UI — a real
// serif/sans contrast axis rather than two near-identical geometric sans.
const display = Spectral({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://perceptionimpex.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Perception Impex — Trusted Yarn Trading & Sourcing Since 2000",
    template: "%s · Perception Impex",
  },
  description:
    "Perception Impex is a Pakistan-based yarn trading & sourcing company supplying high-quality cotton, PC, CVC, and specialty yarns through strong relationships with leading spinning mills. 25+ years of trusted partnerships.",
  keywords: [
    "yarn trading",
    "yarn sourcing",
    "cotton yarn supplier Pakistan",
    "PC yarn",
    "CVC yarn",
    "combed yarn",
    "carded yarn",
    "Pakistan textile",
    "spinning mills Pakistan",
    "B2B yarn supplier",
    "yarn exporter",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Perception Impex — Trusted Yarn Trading & Sourcing Since 2000",
    description:
      "High-quality cotton, PC, CVC, and specialty yarns sourced from Pakistan's leading spinning mills. Trusted by manufacturers and exporters since 2000.",
    siteName: "Perception Impex",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Perception Impex — 25+ years of trusted yarn trading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perception Impex — Trusted Yarn Trading & Sourcing",
    description:
      "Cotton, PC, CVC, and specialty yarns sourced from Pakistan's leading spinning mills. Trusted since 2000.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F766E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {/*
          Security headers as meta tags. These apply immediately (even before
          host-level HTTP headers are configured) and satisfy meta-tag scanners.
          frame-ancestors / X-Frame-Options still need the HTTP header (in
          render.yaml) since browsers ignore them via meta.
        */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; base-uri 'self'; object-src 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io; upgrade-insecure-requests"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* If JS is disabled, reveal all content immediately (no hidden sections). */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        {/* Structured data for rich results: Organization + LocalBusiness + WebSite */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Perception Impex",
                  url: SITE_URL,
                  logo: `${SITE_URL}/images/logo.webp`,
                  image: `${SITE_URL}/og-image.png`,
                  description:
                    "Pakistan-based yarn trading & sourcing company supplying cotton, PC, CVC, and specialty yarns from leading spinning mills since 2000.",
                  foundingDate: "2000",
                  founder: { "@type": "Person", name: "Muhammad Basheer Tabba" },
                  email: "info@perceptionimpex.com",
                  telephone: "+92-300-8209877",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "PK",
                  },
                  sameAs: [],
                },
                {
                  "@type": "LocalBusiness",
                  "@id": `${SITE_URL}/#business`,
                  name: "Perception Impex",
                  url: SITE_URL,
                  image: `${SITE_URL}/og-image.png`,
                  priceRange: "$$",
                  telephone: "+92-300-8209877",
                  email: "info@perceptionimpex.com",
                  address: { "@type": "PostalAddress", addressCountry: "PK" },
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    opens: "09:00",
                    closes: "19:00",
                  },
                  areaServed: ["Pakistan", "United States", "Canada", "United Kingdom"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Perception Impex",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
              ],
            }),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
