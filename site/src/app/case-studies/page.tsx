import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Case Studies — Real Practice Results",
  description:
    "See how dental and aesthetic practices are using NextGen solutions to increase case acceptance, recover lapsed patients, and accelerate growth.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-normal tracking-tight md:text-5xl">
            Real Practices. Real Results.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-soft)]">
            See how practices like yours are using NextGen solutions to grow revenue, retain patients,
            and build high-performing teams.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl space-y-12">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group block rounded-2xl border border-[var(--color-border)] bg-white p-8 transition-shadow hover:shadow-lg md:p-10"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <span className="rounded-full bg-[var(--color-background-deep)] px-3 py-1 font-medium">
                  {cs.practiceType}
                </span>
                <span>{cs.location}</span>
              </div>

              <h2 className="mt-4 text-2xl font-normal group-hover:text-[var(--color-primary)] md:text-3xl">
                {cs.title}
              </h2>

              <p className="mt-3 max-w-3xl text-[var(--color-text-soft)]">{cs.summary}</p>

              {/* Results Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cs.results.map((result) => (
                  <div
                    key={result.metric}
                    className="rounded-lg bg-[var(--color-background-deep)] p-4"
                  >
                    <p className="text-xs text-[var(--color-text-muted)]">{result.metric}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-[var(--color-text-muted)] line-through">
                        {result.before}
                      </span>
                      <ArrowRight className="h-3 w-3 text-[var(--color-success)]" />
                      <span className="text-lg font-semibold text-[var(--color-success)]" style={{ fontFamily: "var(--font-body)" }}>
                        {result.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Solutions Used */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[var(--color-text-muted)]">Solutions used:</span>
                {cs.solutionsUsed.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                Read full case study <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        headline="Want results like these for your practice?"
        subheadline="Book a free strategy call and we'll show you exactly which solutions can deliver the highest ROI for your specific situation."
        variant="dark"
      />
    </>
  );
}
