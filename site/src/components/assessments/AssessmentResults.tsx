"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw, Printer, AlertCircle, CheckCircle2 } from "lucide-react";
import type {
  AssessmentConfig,
  ScoreBand,
  AssessmentQuestion,
  AnswerValue,
} from "@/lib/assessment-types";

interface AssessmentResultsProps {
  config: AssessmentConfig;
  totalScore: { score: number; maxScore: number; percent: number };
  pillarScores: { pillar: string; score: number; maxScore: number; percent: number }[];
  band: ScoreBand;
  gaps: { question: AssessmentQuestion; answer: AnswerValue }[];
  onRetake: () => void;
}

export function AssessmentResults({
  config,
  totalScore,
  pillarScores,
  band,
  gaps,
  onRetake,
}: AssessmentResultsProps) {
  const noGaps = gaps.filter((g) => g.answer === 0);
  const partialGaps = gaps.filter((g) => g.answer === 1);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Score Header */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center md:p-12">
          <h1 className="text-2xl font-normal md:text-3xl">{config.title}</h1>
          <div className="mt-8">
            <p
              className="text-7xl font-normal md:text-8xl"
              style={{ color: band.color }}
            >
              {totalScore.percent}
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              out of 100
            </p>
          </div>
          <div className="mt-4">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold text-white"
              style={{ backgroundColor: band.color }}
            >
              {band.label}
            </span>
          </div>
          <p className="mx-auto mt-4 max-w-lg text-[var(--color-text-soft)]">
            {band.description}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-soft)] hover:bg-[var(--color-background-deep)]"
            >
              <Printer className="h-4 w-4" /> Print Report
            </button>
            <button
              onClick={onRetake}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-soft)] hover:bg-[var(--color-background-deep)]"
            >
              <RotateCcw className="h-4 w-4" /> Retake
            </button>
          </div>
        </div>

        {/* Pillar Breakdown */}
        <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-8">
          <h2 className="text-xl font-normal md:text-2xl">Score by Pillar</h2>
          <div className="mt-6 space-y-4">
            {pillarScores.map((ps) => (
              <div key={ps.pillar}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    {ps.pillar}
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    {ps.score}/{ps.maxScore} ({ps.percent}%)
                  </span>
                </div>
                <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-[var(--color-background-deep)]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${ps.percent}%`,
                      backgroundColor:
                        ps.percent >= 80
                          ? "var(--color-success)"
                          : ps.percent >= 50
                            ? "var(--color-accent-gold)"
                            : "var(--color-error)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Framing */}
        {config.revenueFraming && (
          <div className="mt-8 rounded-2xl border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/5 p-8">
            <h2 className="text-xl font-normal md:text-2xl">
              {config.revenueFraming.headline}
            </h2>
            <p className="mt-3 text-[var(--color-text-soft)]">
              {config.revenueFraming.description}
            </p>
          </div>
        )}

        {/* Gap Analysis */}
        {noGaps.length > 0 && (
          <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-8">
            <h2 className="flex items-center gap-2 text-xl font-normal md:text-2xl">
              <AlertCircle className="h-5 w-5 text-[var(--color-error)]" />
              Critical Gaps ({noGaps.length})
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              You answered &quot;No&quot; to these — highest priority to address.
            </p>
            <ul className="mt-4 space-y-2">
              {noGaps.map((g) => (
                <li
                  key={g.question.id}
                  className="flex items-start gap-3 rounded-lg bg-[var(--color-error)]/5 p-3 text-sm"
                >
                  <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--color-error)]" />
                  <span>
                    <span className="text-xs text-[var(--color-text-muted)]">{g.question.pillar}:</span>{" "}
                    {g.question.question}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {partialGaps.length > 0 && (
          <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-8">
            <h2 className="flex items-center gap-2 text-xl font-normal md:text-2xl">
              <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-gold)]" />
              Partial — Room to Improve ({partialGaps.length})
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              You answered &quot;Partially&quot; — these are close but need attention.
            </p>
            <ul className="mt-4 space-y-2">
              {partialGaps.map((g) => (
                <li
                  key={g.question.id}
                  className="flex items-start gap-3 rounded-lg bg-[var(--color-accent-gold)]/5 p-3 text-sm"
                >
                  <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
                  <span>
                    <span className="text-xs text-[var(--color-text-muted)]">{g.question.pillar}:</span>{" "}
                    {g.question.question}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Solution Mapping */}
        {config.solutionMappings.length > 0 && (
          <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-8">
            <h2 className="text-xl font-normal md:text-2xl">
              Recommended Solutions
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Based on your gaps, here&apos;s how NextGen can help.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {config.solutionMappings.map((mapping) => (
                <Link
                  key={mapping.solution}
                  href={mapping.route}
                  className="group flex items-center justify-between rounded-xl border border-[var(--color-border)] p-4 transition-all hover:border-[var(--color-primary)]/30 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                      {mapping.solution}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                      Addresses: {mapping.gap}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[var(--color-navy)] p-8 text-center text-white md:p-12">
          <h2 className="text-2xl font-normal text-white md:text-3xl">
            Want us to walk through these results with you?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            Book a free 30-minute strategy call. We&apos;ll review your scores, prioritize your gaps,
            and build a custom action plan for your practice.
          </p>
          <Link
            href="#book-a-call"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-medium text-[var(--color-navy)] transition-colors hover:bg-white/90"
          >
            Book a Free Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}
