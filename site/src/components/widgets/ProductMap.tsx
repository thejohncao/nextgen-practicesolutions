"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { solutions, pillars, type Pillar } from "@/data/solutions";

const filterOptions: { label: string; value: Pillar | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Growth", value: "growth" },
  { label: "Management", value: "management" },
  { label: "Development", value: "development" },
];

const pillarColors: Record<Pillar, string> = {
  growth: "#1D9E75",
  management: "#7F77DD",
  development: "#D85A30",
};

const offerDetails: Record<string, { deliverables: string[]; timeline: string; setup: string; tiers: string[] }> = {
  acquisition: {
    deliverables: ["SEO strategy & implementation", "Google Ads management", "Referral program setup", "Monthly performance reports"],
    timeline: "2-4 weeks to launch",
    setup: "We audit your current channels and build from there",
    tiers: ["Starter", "Growth", "Full"],
  },
  website: {
    deliverables: ["Custom website design", "Conversion-optimized landing pages", "Online booking integration", "Mobile-responsive build"],
    timeline: "3-6 weeks",
    setup: "Content gathering + design approval process",
    tiers: ["Starter", "Growth", "Full"],
  },
  "speed-to-lead": {
    deliverables: ["Instant SMS/email response", "Lead routing automation", "Response time tracking", "After-hours coverage"],
    timeline: "1 week",
    setup: "Connect to your CRM and phone system",
    tiers: ["Growth", "Full"],
  },
  "ai-front-desk": {
    deliverables: ["AI phone answering", "Appointment scheduling", "FAQ handling", "Call routing & escalation"],
    timeline: "1-2 weeks",
    setup: "Train AI on your practice specifics",
    tiers: ["Growth", "Full"],
  },
  recall: {
    deliverables: ["Automated recall sequences", "Overdue patient tracking", "Reactivation campaigns", "Compliance heatmap"],
    timeline: "1-2 weeks",
    setup: "Sync with your PMS patient data",
    tiers: ["Growth", "Full"],
  },
  "revenue-cycle": {
    deliverables: ["AR management dashboard", "Collections optimization", "Fee schedule analysis", "Insurance verification"],
    timeline: "2-3 weeks",
    setup: "Financial data integration",
    tiers: ["Full"],
  },
  "team-os": {
    deliverables: ["Role scorecards", "Weekly KPI tracking", "Performance reviews", "Accountability framework"],
    timeline: "2 weeks",
    setup: "Team structure mapping",
    tiers: ["Full"],
  },
  dashboard: {
    deliverables: ["Real-time KPI dashboard", "Custom report builder", "Trend analysis", "Multi-location rollup"],
    timeline: "1-2 weeks",
    setup: "Data source connections",
    tiers: ["Growth", "Full"],
  },
  narrative: {
    deliverables: ["Interactive treatment presentations", "Financing calculator", "Patient decision tools", "Membership tier comparisons"],
    timeline: "2-3 weeks",
    setup: "Fee schedule + treatment plan configuration",
    tiers: ["Full"],
  },
  "tc-performance": {
    deliverables: ["TC training modules", "Performance scorecards", "Call recording analysis", "Coaching frameworks"],
    timeline: "2 weeks",
    setup: "Baseline performance assessment",
    tiers: ["Full"],
  },
};

export function ProductMap() {
  const [filter, setFilter] = useState<Pillar | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? solutions : solutions.filter((s) => s.pillar === filter);

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`rounded-[5px] px-3 py-1.5 text-xs font-semibold transition-colors ${
              filter === opt.value
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Offer Cards */}
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((solution) => {
          const isOpen = expanded === solution.slug;
          const color = pillarColors[solution.pillar];
          const details = offerDetails[solution.slug];

          return (
            <button
              key={solution.slug}
              onClick={() => setExpanded(isOpen ? null : solution.slug)}
              className="w-full rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-5 text-left transition-all hover:border-[var(--color-border-secondary)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-[5px] px-2 py-0.5 text-[9px] font-semibold uppercase"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {pillars[solution.pillar].name}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                    {solution.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{solution.oneLiner}</p>
                </div>
                <ChevronDown
                  className={`mt-1 h-4 w-4 flex-shrink-0 text-[var(--color-text-tertiary)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>

              {isOpen && details && (
                <div className="mt-4 space-y-3 border-t border-[var(--color-border-primary)] pt-4">
                  <div>
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                      Deliverables
                    </h4>
                    <ul className="space-y-1">
                      {details.deliverables.map((d) => (
                        <li key={d} className="text-sm text-[var(--color-text-secondary)]">&bull; {d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                        Timeline
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">{details.timeline}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                        Setup
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">{details.setup}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                      Included In
                    </h4>
                    <div className="flex gap-2">
                      {["Starter", "Growth", "Full"].map((tier) => (
                        <span
                          key={tier}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            details.tiers.includes(tier)
                              ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
                              : "bg-[var(--color-bg-elevated)]/30 text-[var(--color-text-tertiary)]"
                          }`}
                        >
                          {tier}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
