"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const patient = {
  name: "Sarah Martinez",
  age: 42,
  concern: "Wants to improve her smile — chipped and discolored front teeth",
};

const stages = [
  {
    number: 1,
    title: "The Problem",
    subtitle: "Yes, I see the issue",
    script: `"Sarah, I can see exactly what you're concerned about. These chips on teeth #8 and #9 are causing wear on the opposing teeth, and the discoloration is from years of micro-fractures in the enamel."`,
    visual: "Tooth chart highlighting teeth #8 and #9 with chip indicators",
    keyInsight: "The patient needs to agree they have a problem before they'll accept a solution.",
  },
  {
    number: 2,
    title: "The Consequence",
    subtitle: "Yes, I understand what happens if I wait",
    script: `"If we don't address this now, those chips will continue to deepen. Within 12-18 months, you're looking at possible fractures that would require crowns instead of veneers — which is more invasive and significantly more expensive."`,
    visual: "Timeline showing progression: chips → fractures → crowns",
    keyInsight: "Urgency comes from understanding consequences, not pressure.",
  },
  {
    number: 3,
    title: "The Solution",
    subtitle: "Yes, this treatment makes sense",
    script: `"For your situation, I recommend porcelain veneers on #7, #8, #9, and #10. This gives us the most natural result with minimal prep. We'll match your existing shade for a seamless look."`,
    visual: "Before/after simulation showing veneer placement",
    keyInsight: "Present the solution as the logical answer to the problem and consequences.",
  },
  {
    number: 4,
    title: "The Timeline",
    subtitle: "Yes, I can fit this into my life",
    script: `"This is a two-visit process. Visit one: we prep and place temporaries — about 90 minutes. Visit two, two weeks later: we seat the final veneers — about 60 minutes. You'll walk out with your new smile that day."`,
    visual: "Phased timeline: Visit 1 (Prep) → 2 weeks → Visit 2 (Final)",
    keyInsight: "Reduce friction by showing it's manageable and predictable.",
  },
  {
    number: 5,
    title: "The Finances",
    subtitle: "Yes, I can afford this",
    script: `"The total investment for four veneers is $6,400. Your insurance covers $1,200 of that. With our Glow membership, you save an additional $640. And with CareCredit, that's $185/month for 24 months — less than a car payment for a smile that lasts 15+ years."`,
    visual: "Financing breakdown with insurance, membership, and monthly options",
    keyInsight: "Never end on price. End on affordable monthly payments and long-term value.",
  },
];

export function FiveYesWalkthrough() {
  const [activeStage, setActiveStage] = useState(0);

  const stage = stages[activeStage];

  return (
    <div className="space-y-6">
      {/* Patient Card */}
      <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-5 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-pillar-development)]/20 text-lg font-semibold text-[var(--color-pillar-development)]">
          S
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{patient.name}, {patient.age}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{patient.concern}</p>
        </div>
      </div>

      {/* Stage Navigation */}
      <div className="flex gap-1">
        {stages.map((s, i) => (
          <button
            key={s.number}
            onClick={() => setActiveStage(i)}
            className={`flex-1 rounded-t-lg py-2 text-center text-xs font-semibold transition-colors ${
              activeStage === i
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
            }`}
          >
            <span className="hidden sm:inline">Yes {s.number}: </span>{s.title}
          </button>
        ))}
      </div>

      {/* Stage Content */}
      <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-6 space-y-5">
        <div>
          <h3 className="text-xl font-normal text-[var(--color-text-primary)]">
            Yes #{stage.number}: {stage.title}
          </h3>
          <p className="text-sm text-[var(--color-accent)]">{stage.subtitle}</p>
        </div>

        {/* Provider Script */}
        <div className="rounded-lg bg-[var(--color-bg-tertiary)] p-4 border-l-3 border-[var(--color-accent)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-2">
            Provider Script
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] italic">{stage.script}</p>
        </div>

        {/* Visual Placeholder */}
        <div className="rounded-lg bg-[var(--color-bg-tertiary)] p-6 text-center border border-dashed border-[var(--color-border-secondary)]">
          <p className="text-sm text-[var(--color-text-tertiary)]">{stage.visual}</p>
        </div>

        {/* Key Insight */}
        <div className="rounded-lg bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10 p-4">
          <p className="text-xs font-semibold text-[var(--color-accent)] mb-1">Key Insight</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{stage.keyInsight}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-2">
          <button
            onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
            disabled={activeStage === 0}
            className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={() => setActiveStage(Math.min(stages.length - 1, activeStage + 1))}
            disabled={activeStage === stages.length - 1}
            className="flex items-center gap-1 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
