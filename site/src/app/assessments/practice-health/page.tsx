import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Practice Health Assessment",
  description: "100-point practice health assessment covering every dimension of your practice in 15 minutes.",
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
            The comprehensive 100-point assessment covering every dimension of practice performance — marketing,
            speed-to-lead, case acceptance, operations, team culture, and KPIs.
          </p>

          <div className="mx-auto mt-12 max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-8 text-center">
            <span className="inline-block rounded-full bg-[var(--color-success)]/10 px-3 py-1 text-xs font-medium text-[var(--color-success)]">
              Live
            </span>
            <p className="mt-4 text-[var(--color-text-soft)]">
              Take the full 100-question Practice Health Assessment. Get your score, see where
              your practice stands, and receive personalized solution recommendations.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://app.nextgenpractice.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
              >
                Take the Assessment <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                href="#book-a-call"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--color-border)] px-8 text-sm font-medium transition-colors hover:bg-[var(--color-background-deep)]"
              >
                Book a Guided Walkthrough
              </Link>
            </div>
          </div>

          {/* What's Covered */}
          <div className="mx-auto mt-16 max-w-2xl text-left">
            <h2 className="text-2xl font-normal">What&apos;s covered</h2>
            <p className="mt-3 text-[var(--color-text-soft)]">
              100 questions across 6 pillars, scored against every area that impacts revenue:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { name: "Marketing & Lead Generation", count: 20 },
                { name: "Speed-to-Lead & Booking", count: 20 },
                { name: "Case Acceptance & Chairside", count: 20 },
                { name: "Operations & Back Office", count: 18 },
                { name: "Team, Training & Culture", count: 14 },
                { name: "Reporting, KPIs & Technology", count: 8 },
              ].map((pillar) => (
                <div
                  key={pillar.name}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-deep)] p-4"
                >
                  <p className="text-sm font-medium">{pillar.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{pillar.count} questions</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep-Dive CTA */}
          <div className="mx-auto mt-16 max-w-2xl rounded-xl bg-[var(--color-background-deep)] p-8 text-left">
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)" }}>
              Want to go deeper?
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-soft)]">
              We also have 8 focused assessments (40 questions each) that dive deep into specific areas
              like case acceptance, patient retention, revenue cycle, and more.
            </p>
            <Link
              href="/assessments"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]"
            >
              View all assessments <ArrowRight className="h-4 w-4" />
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
