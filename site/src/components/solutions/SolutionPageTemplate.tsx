import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";
import type { SolutionPageData } from "@/data/solution-pages";

const pillarColors: Record<string, { accent: string; accentBg: string }> = {
  growth: {
    accent: "var(--color-pillar-growth)",
    accentBg: "var(--color-pillar-growth)",
  },
  management: {
    accent: "var(--color-pillar-management)",
    accentBg: "var(--color-pillar-management)",
  },
  development: {
    accent: "var(--color-pillar-development)",
    accentBg: "var(--color-pillar-development)",
  },
};

export function SolutionPageTemplate({ data }: { data: SolutionPageData }) {
  const colors = pillarColors[data.pillar] ?? pillarColors.management;

  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/solutions"
            className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All Solutions
          </Link>
          <span
            className="mt-2 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `color-mix(in srgb, ${colors.accent} 10%, transparent)`,
              color: colors.accent,
            }}
          >
            {data.pillarLabel}
          </span>
          <h1 className="mt-6 text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
            {data.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-soft)] md:text-xl">
            {data.subheadline}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#book-a-call"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
            >
              Book a Demo
            </Link>
            <Link
              href={`/assessments/${data.relatedAssessment.slug}`}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--color-border)] px-8 text-sm font-medium transition-colors hover:bg-[var(--color-background-deep)]"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-[var(--color-navy)] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal text-white md:text-4xl">
            {data.problemHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
            {data.problemSubheadline}
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {data.problems.map((problem) => (
              <div
                key={problem.stat}
                className="rounded-xl border border-white/10 bg-white/5 p-8 text-center"
              >
                <p className="text-4xl font-normal text-white">{problem.stat}</p>
                <p className="mt-2 text-sm text-white/60">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-normal md:text-4xl">
              {data.capabilitiesHeadline}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-soft)]">
              {data.capabilitiesSubheadline}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-[var(--color-border)] bg-white p-6"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${colors.accent} 10%, transparent)`,
                  }}
                >
                  <CheckCircle2 className="h-5 w-5" style={{ color: colors.accent }} />
                </div>
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[var(--color-background-deep)] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-normal md:text-4xl">
            {data.stepsHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
            {data.stepsSubheadline}
          </p>

          <div className="mt-16 space-y-8">
            {data.steps.map((step, i) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: colors.accent }}
                  >
                    {step.number}
                  </div>
                  {i < data.steps.length - 1 && (
                    <div className="mt-2 h-full w-px bg-[var(--color-border)]" />
                  )}
                </div>
                <div className="pb-8">
                  <h3
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-text-soft)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impact */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal md:text-4xl">
            The impact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-soft)]">
            Measurable outcomes from practices using this solution.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-4xl font-normal md:text-5xl" style={{ color: colors.accent }}>
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Assessment */}
      <section className="bg-[var(--color-background-deep)] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border bg-white p-8 md:p-12" style={{ borderColor: `color-mix(in srgb, ${colors.accent} 20%, transparent)` }}>
            <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${colors.accent} 10%, transparent)`,
                }}
              >
                <CheckCircle2 className="h-7 w-7" style={{ color: colors.accent }} />
              </div>
              <div>
                <h2 className="mt-4 text-2xl font-normal md:mt-0 md:text-3xl">
                  Find out how you score.
                </h2>
                <p className="mt-3 text-[var(--color-text-soft)]">
                  {data.relatedAssessment.description}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/assessments/${data.relatedAssessment.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
                    style={{ backgroundColor: colors.accent }}
                  >
                    Take the Assessment <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/assessments"
                    className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-background-deep)]"
                  >
                    View All Assessments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline={`Ready to transform your practice with ${data.slug === "dashboard" ? "data" : data.slug === "tc-performance" ? "team performance" : "this solution"}?`}
        subheadline="Book a free strategy call and we'll show you exactly how this solution addresses your specific challenges."
        variant="dark"
      />
    </>
  );
}
