import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const siteUrl = "https://nextgenpractice.org";

export const metadata: Metadata = {
  title: {
    default: "NextGen Practice Solutions — AI-Powered Dental Practice Growth",
    template: "%s | NextGen Practice Solutions",
  },
  description:
    "Stop leaving revenue on the table. AI-powered systems for patient acquisition, case acceptance, and practice operations.",
  keywords: [
    "dental practice consulting",
    "dental practice management",
    "case acceptance",
    "patient acquisition",
    "dental marketing",
    "practice growth",
    "dental AI",
    "treatment coordinator training",
    "revenue cycle management",
    "dental KPI dashboard",
    "patient retention",
    "recall compliance",
    "dental practice assessment",
  ],
  authors: [{ name: "NextGen Practice Solutions" }],
  creator: "NextGen Practice Solutions",
  publisher: "Cao Consulting LLC",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NextGen Practice Solutions",
    title: "NextGen Practice Solutions — AI-Powered Dental Practice Growth",
    description:
      "Stop leaving revenue on the table. AI-powered systems for patient acquisition, case acceptance, and practice operations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Practice Solutions",
    description:
      "AI-powered systems for patient acquisition, case acceptance, and practice operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "NextGen Practice Solutions",
        url: siteUrl,
        description:
          "AI-powered practice growth, management, and development solutions for dental and aesthetic practices.",
        address: {
          "@type": "PostalAddress",
          addressRegion: "CA",
          addressLocality: "Orange County",
          addressCountry: "US",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Cao Consulting LLC",
        },
      },
      {
        "@type": "Service",
        name: "NextGen Practice Solutions",
        provider: {
          "@type": "Organization",
          name: "NextGen Practice Solutions",
        },
        serviceType: "Dental Practice Consulting",
        description:
          "AI-powered systems for patient acquisition, case acceptance, revenue cycle management, and team performance for dental practices.",
        areaServed: "US",
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
