"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AssessmentPillar, AnswerValue } from "@/lib/assessment-types";

interface AssessmentQuestionsProps {
  pillars: AssessmentPillar[];
  answers: Record<string, AnswerValue>;
  currentPillarIndex: number;
  onPillarChange: (index: number) => void;
  onAnswer: (questionId: string, value: AnswerValue) => void;
  onComplete: () => void;
  totalQuestions: number;
  answeredCount: number;
}

const answerOptions: { label: string; value: AnswerValue; color: string }[] = [
  { label: "Yes", value: 2, color: "bg-[var(--color-success)] text-white border-[var(--color-success)]" },
  { label: "Partially", value: 1, color: "bg-[var(--color-accent-gold)] text-white border-[var(--color-accent-gold)]" },
  { label: "No", value: 0, color: "bg-[var(--color-error)] text-white border-[var(--color-error)]" },
];

export function AssessmentQuestions({
  pillars,
  answers,
  currentPillarIndex,
  onPillarChange,
  onAnswer,
  onComplete,
  totalQuestions,
  answeredCount,
}: AssessmentQuestionsProps) {
  const currentPillar = pillars[currentPillarIndex];
  const isLastPillar = currentPillarIndex === pillars.length - 1;
  const isFirstPillar = currentPillarIndex === 0;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const currentPillarAnswered = currentPillar.questions.every(
    (q) => answers[q.id] !== undefined && answers[q.id] !== null
  );

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
            <span>
              {answeredCount} of {totalQuestions} questions answered
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-background-deep)]">
            <div
              className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Pillar Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {pillars.map((pillar, idx) => {
            const pillarAnswered = pillar.questions.every(
              (q) => answers[q.id] !== undefined && answers[q.id] !== null
            );
            return (
              <button
                key={pillar.name}
                onClick={() => onPillarChange(idx)}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  idx === currentPillarIndex
                    ? "bg-[var(--color-primary)] text-white"
                    : pillarAnswered
                      ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                      : "bg-[var(--color-background-deep)] text-[var(--color-text-soft)] hover:bg-[var(--color-border)]"
                }`}
              >
                {pillar.name}
              </button>
            );
          })}
        </div>

        {/* Pillar Heading */}
        <h2 className="mb-6 text-2xl font-normal">
          {currentPillar.name}
        </h2>

        {/* Questions */}
        <div className="space-y-6">
          {currentPillar.questions.map((question, qIdx) => (
            <div
              key={question.id}
              className="rounded-xl border border-[var(--color-border)] bg-white p-6"
            >
              <p className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
                <span className="mr-2 text-[var(--color-text-muted)]">
                  {qIdx + 1}.
                </span>
                {question.question}
              </p>
              <div className="mt-4 flex gap-3">
                {answerOptions.map((opt) => {
                  const isSelected = answers[question.id] === opt.value;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => onAnswer(question.id, opt.value)}
                      className={`rounded-lg border px-5 py-2 text-sm font-medium transition-all ${
                        isSelected
                          ? opt.color
                          : "border-[var(--color-border)] text-[var(--color-text-soft)] hover:border-[var(--color-primary)]/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => onPillarChange(currentPillarIndex - 1)}
            disabled={isFirstPillar}
            className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-soft)] transition-colors hover:bg-[var(--color-background-deep)] disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          {isLastPillar ? (
            <button
              onClick={onComplete}
              disabled={answeredCount < totalQuestions}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)] disabled:opacity-50"
            >
              See Results
            </button>
          ) : (
            <button
              onClick={() => onPillarChange(currentPillarIndex + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
