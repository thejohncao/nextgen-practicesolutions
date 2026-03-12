import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Case Acceptance Readiness Assessment",
  description: "50-question deep diagnostic of your treatment presentation and acceptance workflow.",
};

export default function CaseAcceptancePage() {
  return (
    <>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/assessments"
            className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-4 w-4" /> All Assessments
          </Link>
          <h1 className="text-4xl font-normal md:text-5xl">Case Acceptance Readiness</h1>
          <p className="mt-6 text-lg text-[var(--color-text-soft)]">
            50-question deep diagnostic of your treatment presentation and acceptance workflow — from clinical handoff to follow-up.
          </p>
          <div className="mx-auto mt-12 max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-8 text-center">
            <span className="inline-block rounded-full bg-[var(--color-success)]/10 px-3 py-1 text-xs font-medium text-[var(--color-success)]">
              Available
            </span>
            <p className="mt-4 text-[var(--color-text-soft)]">
              This assessment is being migrated to the shared assessment engine. In the meantime,
              book a strategy call and we&apos;ll walk through it with you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="#book-a-call"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/narrative"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--color-border)] px-8 text-sm font-medium transition-colors hover:bg-[var(--color-background-deep)]"
              >
                Learn About Narrative
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CTASection
        headline="Ready to improve case acceptance?"
        subheadline="Book a strategy call to walk through the assessment together and see how Narrative can transform your team's presentations."
      />
    </>
  );
}
