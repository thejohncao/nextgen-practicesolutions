"use client";

import { type FormEvent, useState } from "react";

interface AssessmentLeadCaptureProps {
  onSubmit: () => void;
  onSkip: () => void;
}

export function AssessmentLeadCapture({ onSubmit, onSkip }: AssessmentLeadCaptureProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    onSubmit();
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-2xl font-normal md:text-3xl">
          Your results are ready.
        </h2>
        <p className="mt-4 text-[var(--color-text-soft)]">
          Enter your info to see your full score breakdown, gap analysis, and personalized recommendations.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
          <div>
            <label htmlFor="lc-name" className="mb-1.5 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="lc-name"
              required
              className="h-11 w-full rounded-lg border border-[var(--color-border)] px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label htmlFor="lc-practice" className="mb-1.5 block text-sm font-medium">
              Practice Name
            </label>
            <input
              type="text"
              id="lc-practice"
              required
              className="h-11 w-full rounded-lg border border-[var(--color-border)] px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label htmlFor="lc-email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="lc-email"
              required
              className="h-11 w-full rounded-lg border border-[var(--color-border)] px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>
          <button
            type="submit"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-[var(--color-primary)] text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
          >
            See My Results
          </button>
        </form>

        <button
          onClick={onSkip}
          className="mt-4 text-sm text-[var(--color-text-muted)] underline hover:text-[var(--color-text-soft)]"
        >
          Skip for now
        </button>
      </div>
    </section>
  );
}
