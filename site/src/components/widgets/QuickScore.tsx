"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  "Do you respond to new patient inquiries within 5 minutes?",
  "Do you have an automated recall system for overdue patients?",
  "Do you use a structured case presentation process?",
  "Do you track your marketing cost-per-acquisition?",
  "Do your team members have weekly KPI accountability?",
];

type Answer = "yes" | "partial" | "no" | null;

const scoreMap: Record<string, number> = { yes: 20, partial: 10, no: 0 };

export function QuickScore() {
  const [answers, setAnswers] = useState<Answer[]>(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const score = answers.reduce((sum, a) => sum + (a ? scoreMap[a] : 0), 0);

  const handleAnswer = (index: number, value: Answer) => {
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
  };

  const getGrade = (s: number) => {
    if (s >= 80) return { label: "Strong", color: "text-[var(--color-success)]" };
    if (s >= 60) return { label: "Solid foundation", color: "text-[var(--color-blue)]" };
    if (s >= 40) return { label: "Leaking revenue", color: "text-[var(--color-warning)]" };
    return { label: "Critical gaps", color: "text-[var(--color-error)]" };
  };

  if (submitted) {
    const grade = getGrade(score);
    return (
      <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-8 text-center">
        <p className="text-6xl font-normal text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>
          {score}
        </p>
        <p className={`mt-2 text-lg font-medium ${grade.color}`}>{grade.label}</p>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Want a deeper analysis? Take the full 100-point assessment.
        </p>
        <Link
          href={`/assessments?quick_score=${score}`}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Take the Full Assessment &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-6">
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i}>
            <p className="mb-2 text-sm text-[var(--color-text-primary)]">{q}</p>
            <div className="flex gap-2">
              {(["yes", "partial", "no"] as const).map((val) => (
                <button
                  key={val}
                  onClick={() => handleAnswer(i, val)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
                    answers[i] === val
                      ? val === "yes"
                        ? "bg-[var(--color-success)] text-white"
                        : val === "partial"
                          ? "bg-[var(--color-warning)] text-white"
                          : "bg-[var(--color-error)] text-white"
                      : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {val === "yes" ? "Yes" : val === "partial" ? "Partial" : "No"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allAnswered && (
        <button
          onClick={() => setSubmitted(true)}
          className="mt-6 w-full rounded-lg bg-[var(--color-accent)] py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          See My Score
        </button>
      )}
    </div>
  );
}
