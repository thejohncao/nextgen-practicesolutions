"use client";

import { ClipboardCheck, ArrowRight } from "lucide-react";

interface AssessmentIntroProps {
  title: string;
  subtitle: string;
  pillarNames: string[];
  totalQuestions: number;
  onStart: () => void;
}

export function AssessmentIntro({
  title,
  subtitle,
  pillarNames,
  totalQuestions,
  onStart,
}: AssessmentIntroProps) {
  const estimatedMinutes = Math.ceil(totalQuestions * 0.4);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
          <ClipboardCheck className="h-7 w-7 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-3xl font-normal md:text-4xl">{title}</h1>
        <p className="mt-4 text-lg text-[var(--color-text-soft)]">{subtitle}</p>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
          <span>{totalQuestions} questions</span>
          <span>&middot;</span>
          <span>~{estimatedMinutes} minutes</span>
          <span>&middot;</span>
          <span>Free</span>
        </div>

        <div className="mt-8">
          <h3
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            What you&apos;ll be assessed on
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {pillarNames.map((name) => (
              <span
                key={name}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-soft)]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 text-sm text-[var(--color-text-muted)]">
          Score each question: <strong>Yes</strong> (2 pts) &middot; <strong>Partially</strong> (1 pt) &middot; <strong>No</strong> (0 pts)
        </div>

        <button
          onClick={onStart}
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
        >
          Start Assessment <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
