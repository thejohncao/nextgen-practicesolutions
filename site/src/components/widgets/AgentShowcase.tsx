"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

const agents = [
  {
    name: "Giselle",
    role: "Marketing & Growth",
    color: "#1D9E75",
    tagline: "I keep quality new patients coming in and your brand working for you.",
    capabilities: [
      "Manages SEO, paid ads, and referral campaigns",
      "Monitors lead flow and conversion rates",
      "Optimizes Google Business Profile and reviews",
      "Tracks cost-per-acquisition across channels",
    ],
    offers: ["Patient Acquisition Engine", "Website & Conversion Stack"],
    sampleOutput: "New patient lead volume is up 34% this month. Your Google Ads CPA dropped from $87 to $52. I recommend shifting $200/mo from Facebook to Google — the conversion rate is 3x higher.",
  },
  {
    name: "Miles",
    role: "Operations & Management",
    color: "#378ADD",
    tagline: "I keep your schedule full, patients on track, and money collected.",
    capabilities: [
      "Speed-to-Lead response under 60 seconds",
      "AI Front Desk handles calls and scheduling 24/7",
      "Recall engine tracks every overdue patient",
      "Revenue cycle optimization and AR management",
    ],
    offers: ["Speed-to-Lead", "AI Front Desk", "Recall Engine", "Revenue Cycle OS", "Team OS", "Data & Dashboard"],
    sampleOutput: "3 patients are 90+ days overdue for hygiene. I've queued personalized recall messages for tomorrow morning. Your AR over 60 days dropped 12% this week.",
  },
  {
    name: "Devon",
    role: "Sales & Development",
    color: "#7F77DD",
    tagline: "I help you convert more of the dentistry already in your chair.",
    capabilities: [
      "Narrative case presentation framework",
      "Treatment coordinator performance tracking",
      "Case acceptance rate optimization",
      "Financial presentation and financing options",
    ],
    offers: ["Narrative (Case Acceptance)", "FD & TC Performance"],
    sampleOutput: "Case acceptance is at 62% this month, up from 48%. Sarah's veneer case closed after the Narrative walkthrough. The phased payment option was the deciding factor.",
  },
  {
    name: "Alma",
    role: "Practice Academy",
    color: "#D4537E",
    tagline: "I help your team master the systems that run your practice.",
    capabilities: [
      "Onboarding playbooks for every role",
      "Weekly training modules and assessments",
      "SOP library and knowledge base",
      "Culture and engagement tracking",
    ],
    offers: ["Team Training", "SOP Management", "Onboarding Systems"],
    sampleOutput: "Your new front desk coordinator completed 4 of 6 onboarding modules this week. She's scoring 89% on phone skills assessments. Recommend scheduling her first live observation by Friday.",
  },
];

export function AgentShowcase() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {agents.map((agent) => {
        const isOpen = expanded === agent.name;
        return (
          <button
            key={agent.name}
            onClick={() => setExpanded(isOpen ? null : agent.name)}
            className="w-full rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-6 text-left transition-all hover:border-[var(--color-border-secondary)]"
            style={{ borderTopWidth: "3px", borderTopColor: agent.color }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-white"
                  style={{ backgroundColor: agent.color }}
                >
                  {agent.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                    {agent.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-tertiary)]">{agent.role}</p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-[var(--color-text-tertiary)] transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>

            <p className="mt-3 text-sm italic text-[var(--color-text-secondary)]">
              &ldquo;{agent.tagline}&rdquo;
            </p>

            {isOpen && (
              <div className="mt-5 space-y-4 border-t border-[var(--color-border-primary)] pt-5">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                    Capabilities
                  </h4>
                  <ul className="space-y-1">
                    {agent.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                        <Sparkles className="mt-0.5 h-3 w-3 flex-shrink-0" style={{ color: agent.color }} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                    Owns
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.offers.map((offer) => (
                      <span
                        key={offer}
                        className="rounded-[5px] px-2 py-1 text-[9px] font-semibold"
                        style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                      >
                        {offer}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                    Sample Output
                  </h4>
                  <div className="rounded-lg bg-[var(--color-bg-tertiary)] p-3">
                    <p className="text-sm text-[var(--color-text-secondary)]">{agent.sampleOutput}</p>
                  </div>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
