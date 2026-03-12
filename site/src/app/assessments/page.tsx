import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, BookOpen } from "lucide-react";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { assessments, getFeaturedAssessment, getDeepDiveAssessments } from "@/data/assessments";

export const metadata: Metadata = {
  title: "Assessments",
  description:
    "Eight diagnostic assessments covering every dimension of practice performance — from patient acquisition to case acceptance to revenue cycle.",
};

export default function AssessmentsPage() {
  const featured = getFeaturedAssessment();
  const deepDives = getDeepDiveAssessments();

  return (
    <>
      <HeroSection
        headline="Know exactly where your practice stands."
        subheadline="Eight diagnostic assessments covering every dimension of practice performance — from patient acquisition to case acceptance to revenue cycle."
      />

      {/* Featured Assessment */}
      {featured && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-8 md:p-12">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                    Start Here
                  </span>
                  <h2 className="mt-1 text-2xl font-normal md:text-3xl">
                    {featured.name}
                  </h2>
                  <p className="mt-3 text-[var(--color-text-soft)]">
                    Not sure where to start? The Practice Health Assessment covers everything in 15 minutes
                    and tells you which deep dives matter most.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {featured.questionCount} questions
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">&middot;</span>
                    <span className="text-sm text-[var(--color-text-muted)]">~15 minutes</span>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/assessments/${featured.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
                    >
                      Take the Assessment
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Deep-Dive Assessments Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-normal md:text-3xl">
            Deep-Dive Assessments
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--color-text-soft)]">
            Focused diagnostics that go deep into specific areas of your practice.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {deepDives.map((assessment) => (
              <Link
                key={assessment.slug}
                href={`/assessments/${assessment.slug}`}
                className="group rounded-xl border border-[var(--color-border)] bg-white p-6 transition-all hover:border-[var(--color-primary)]/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      assessment.status === "built"
                        ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                        : "bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]"
                    }`}
                  >
                    {assessment.status === "built" ? "Available" : "Coming Soon"}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    ~{assessment.questionCount} questions
                  </span>
                </div>
                <h3
                  className="mt-4 text-lg font-semibold"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {assessment.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                  {assessment.description}
                </p>
                <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                  Maps to: {assessment.primaryMapping}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Practice OS Audit */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[var(--color-accent-gold)]/20 bg-[var(--color-accent-gold)]/5 p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-gold)] text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-gold)]">
                  Infrastructure Layer
                </span>
                <h2 className="mt-1 text-2xl font-normal md:text-3xl">
                  Practice OS Completeness Audit
                </h2>
                <p className="mt-3 text-[var(--color-text-soft)]">
                  Beyond diagnostics — do you have the foundational documents and systems that a well-run
                  practice needs? The Practice OS audit evaluates your operational infrastructure across 7
                  critical categories.
                </p>
                <div className="mt-6">
                  <Link
                    href="/practice-os"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-accent-gold)] px-6 py-3 text-sm font-medium text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)] hover:text-white"
                  >
                    Take the Practice OS Audit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Want us to run the assessment with you?"
        subheadline="Book a guided strategy call where we walk through the assessment together and build a custom action plan for your practice."
      />
    </>
  );
}
