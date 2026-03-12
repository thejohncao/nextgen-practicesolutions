import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";

interface AssessmentComingSoonProps {
  title: string;
  description: string;
  questionCount: number;
  primaryMapping: string;
}

export function AssessmentComingSoon({
  title,
  description,
  questionCount,
  primaryMapping,
}: AssessmentComingSoonProps) {
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
          <h1 className="text-4xl font-normal md:text-5xl">{title}</h1>
          <p className="mt-6 text-lg text-[var(--color-text-soft)]">{description}</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span>~{questionCount} questions</span>
            <span>&middot;</span>
            <span>Maps to: {primaryMapping}</span>
          </div>

          <div className="mx-auto mt-12 max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-8 text-center">
            <Bell className="mx-auto h-8 w-8 text-[var(--color-accent-gold)]" />
            <span className="mt-4 inline-block rounded-full bg-[var(--color-accent-gold)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent-gold)]">
              Coming Soon
            </span>
            <p className="mt-4 text-[var(--color-text-soft)]">
              This assessment is in development. Book a strategy call and we&apos;ll run a guided
              version with you — covering the same diagnostic areas with personalized analysis.
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
        headline="Can't wait for this assessment?"
        subheadline="Take the Practice Health Assessment for a broad diagnostic, or book a strategy call for a guided deep dive."
      />
    </>
  );
}
