import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Practice Health Assessment",
  description: "100-point practice health assessment covering every dimension of your practice.",
};

export default function PracticeHealthPage() {
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
          <h1 className="text-4xl font-normal md:text-5xl">Practice Health Assessment</h1>
          <p className="mt-6 text-lg text-[var(--color-text-soft)]">
            The comprehensive 100-point assessment covering every dimension of practice performance.
          </p>
          <div className="mx-auto mt-12 max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-8 text-center">
            <span className="inline-block rounded-full bg-[var(--color-success)]/10 px-3 py-1 text-xs font-medium text-[var(--color-success)]">
              Available
            </span>
            <p className="mt-4 text-[var(--color-text-soft)]">
              This assessment is being migrated to the shared assessment engine. In the meantime,
              book a strategy call and we&apos;ll walk through it with you.
            </p>
            <Link
              href="#book-a-call"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>
      <CTASection
        headline="Want a guided walkthrough?"
        subheadline="We'll run the full 100-point assessment with you on a strategy call and build a custom action plan."
      />
    </>
  );
}
