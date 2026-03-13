"use client";

import { useState } from "react";

const stages = [
  {
    number: 1,
    title: "Self-Diagnosis",
    description: "You take the Practice Health Assessment and see exactly where revenue is leaking.",
    widget: "Quick Score + Full Assessment",
    action: "Score your practice in under 15 minutes",
  },
  {
    number: 2,
    title: "Discovery Call",
    description: "We review your scores together, identify the highest-impact gaps, and recommend a tier.",
    widget: "ROI Calculator",
    action: "30-minute strategy call, zero pressure",
  },
  {
    number: 3,
    title: "Systems Audit",
    description: "We map your existing tools, workflows, and data sources to plan the deployment.",
    widget: "Practice OS Audit",
    action: "Week 1 of onboarding",
  },
  {
    number: 4,
    title: "Deployment",
    description: "Your AI agents go live. Speed-to-Lead, Recall, and core systems are activated.",
    widget: "Command Center",
    action: "Week 2-3 of onboarding",
  },
  {
    number: 5,
    title: "Optimization",
    description: "We monitor performance, tune campaigns, and train your team on new workflows.",
    widget: "Dashboard + Team Scorecard",
    action: "Month 1-2 active management",
  },
  {
    number: 6,
    title: "Growth",
    description: "Results compound. You see recovered revenue, higher case acceptance, and a full schedule.",
    widget: "GHL Campaign Dashboard",
    action: "Ongoing — results compound monthly",
  },
  {
    number: 7,
    title: "Retained Client",
    description: "You're running on the full operating system. We continue optimizing and scaling.",
    widget: "Full Practice OS",
    action: "Long-term partnership",
  },
];

export function OwnerJourneyMap() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Stage List */}
      <div className="lg:col-span-2">
        <div className="space-y-1">
          {stages.map((stage, i) => (
            <button
              key={stage.number}
              onClick={() => setActiveStage(i)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                activeStage === i
                  ? "bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30"
                  : "hover:bg-[var(--color-bg-tertiary)] border border-transparent"
              }`}
            >
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  activeStage === i
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-bg-elevated)] text-[var(--color-text-tertiary)]"
                }`}
              >
                {stage.number}
              </span>
              <span
                className={`text-sm font-medium ${
                  activeStage === i
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                {stage.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stage Detail */}
      <div className="lg:col-span-3">
        <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg font-semibold text-white">
              {stages[activeStage].number}
            </span>
            <h3 className="text-2xl font-normal text-[var(--color-text-primary)]">
              {stages[activeStage].title}
            </h3>
          </div>
          <p className="text-[var(--color-text-secondary)]">{stages[activeStage].description}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-[var(--color-bg-tertiary)] p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                Key Tool
              </h4>
              <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                {stages[activeStage].widget}
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-bg-tertiary)] p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                What Happens
              </h4>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {stages[activeStage].action}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
