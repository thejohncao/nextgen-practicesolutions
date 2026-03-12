import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Narrative — Case Acceptance",
  description:
    "Transform treatment presentations into guided patient journeys that close. The Narrative system reimagines how practices present and accept treatment.",
};

export default function NarrativePage() {
  return (
    <>
      <HeroSection
        headline="Transform treatment presentations into guided patient journeys that close."
        subheadline="Narrative reimagines case acceptance — from clinical diagnosis to financial presentation to follow-up. A complete system, not just a script."
        primaryCTA={{ label: "Book a Demo", href: "#book-a-call" }}
        secondaryCTA={{ label: "Take the Assessment", href: "/assessments/case-acceptance" }}
      />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-8 text-center">
            <span className="inline-block rounded-full bg-[var(--color-accent-gold)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent-gold)]">
              Full Product Page Coming Soon
            </span>
            <p className="mt-4 text-[var(--color-text-soft)]">
              The complete Narrative product page — including interactive demo, feature walkthrough, and
              case studies — is currently in development. In the meantime, take the Case Acceptance
              Readiness Assessment to see how your practice scores.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/assessments/case-acceptance"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
              >
                Case Acceptance Assessment <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#book-a-call"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-background-deep)]"
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to transform case acceptance at your practice?"
        subheadline="Book a demo to see Narrative in action, or take the assessment to find out where you stand."
        variant="dark"
      />
    </>
  );
}
