import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const siteUrl = "https://nextgenpractice.org";

export const metadata: Metadata = {
  title: {
    default: "NextGen Practice Solutions",
    template: "%s | NextGen Practice Solutions",
  },
  description:
    "AI-powered practice growth, management, and development solutions for dental and aesthetic practices. Assessments, consulting, and technology that drive measurable results.",
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
    title: "NextGen Practice Solutions — AI-Powered Practice Growth",
    description:
      "Growth, management, and development solutions for dental and aesthetic practices. Assessments, consulting, and technology that drive measurable results.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Practice Solutions",
    description:
      "AI-powered practice growth, management, and development for dental and aesthetic practices.",
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
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
