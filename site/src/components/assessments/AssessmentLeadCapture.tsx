"use client";

import { type FormEvent, useState, useRef } from "react";
import { submitToGHL, type AssessmentLeadData } from "@/lib/ghl";
import { getUTMParams } from "@/lib/utm";

interface AssessmentLeadCaptureProps {
  onSubmit: () => void;
  onSkip: () => void;
  assessmentData?: {
    score: number;
    grade: string;
    revenue_leak_estimate: number;
    recommended_package: string;
    category_scores: Record<string, number>;
    weakest_category: string;
  };
}

export function AssessmentLeadCapture({ onSubmit, onSkip, assessmentData }: AssessmentLeadCaptureProps) {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const practiceRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    if (assessmentData && nameRef.current && emailRef.current && practiceRef.current) {
      const utm = getUTMParams();
      const payload: AssessmentLeadData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        practice_name: practiceRef.current.value,
        ...assessmentData,
        ...utm,
      };
      submitToGHL(payload);
    }

    onSubmit();
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-2xl font-normal text-[var(--color-text-primary)] md:text-3xl">
          Your results are ready.
        </h2>
        <p className="mt-4 text-[var(--color-text-secondary)]">
          Enter your info to see your full score breakdown, gap analysis, and personalized recommendations.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
          <div>
            <label htmlFor="lc-name" className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              id="lc-name"
              required
              className="h-11 w-full rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] px-4 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div>
            <label htmlFor="lc-practice" className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
              Practice Name
            </label>
            <input
              ref={practiceRef}
              type="text"
              id="lc-practice"
              required
              className="h-11 w-full rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] px-4 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div>
            <label htmlFor="lc-email" className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="lc-email"
              required
              className="h-11 w-full rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] px-4 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>
          <button
            type="submit"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-[var(--color-accent)] text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            See My Results
          </button>
        </form>

        <button
          onClick={onSkip}
          className="mt-4 text-sm text-[var(--color-text-tertiary)] underline hover:text-[var(--color-text-secondary)]"
        >
          Skip for now
        </button>
      </div>
    </section>
  );
}
