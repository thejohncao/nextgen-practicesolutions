"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    description: "Essential systems to start filling your schedule.",
    highlight: false,
    offers: ["acquisition", "website", "speed-to-lead", "dashboard"],
  },
  {
    name: "Growth",
    description: "Complete growth engine with operational backbone.",
    highlight: true,
    offers: ["acquisition", "website", "speed-to-lead", "ai-front-desk", "recall", "dashboard", "revenue-cycle", "team-os"],
  },
  {
    name: "Full",
    description: "Every system. The complete operating system.",
    highlight: false,
    offers: ["acquisition", "website", "speed-to-lead", "ai-front-desk", "recall", "dashboard", "revenue-cycle", "team-os", "narrative", "tc-performance"],
  },
];

const allOffers = [
  { slug: "acquisition", name: "Patient Acquisition Engine", pillar: "growth", color: "#1D9E75" },
  { slug: "website", name: "Website & Conversion Stack", pillar: "growth", color: "#1D9E75" },
  { slug: "speed-to-lead", name: "Speed-to-Lead", pillar: "management", color: "#7F77DD" },
  { slug: "ai-front-desk", name: "AI Front Desk", pillar: "management", color: "#7F77DD" },
  { slug: "recall", name: "Recall Engine", pillar: "management", color: "#7F77DD" },
  { slug: "dashboard", name: "Data & Dashboard", pillar: "management", color: "#7F77DD" },
  { slug: "revenue-cycle", name: "Revenue Cycle OS", pillar: "management", color: "#7F77DD" },
  { slug: "team-os", name: "Team OS", pillar: "management", color: "#7F77DD" },
  { slug: "narrative", name: "Narrative", pillar: "development", color: "#D85A30" },
  { slug: "tc-performance", name: "FD & TC Performance", pillar: "development", color: "#D85A30" },
];

export function PricingTierExplorer() {
  const [activeTier, setActiveTier] = useState(1); // Growth by default

  const includedOffers = tiers[activeTier].offers;

  return (
    <div className="space-y-8">
      {/* Tier Selector */}
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setActiveTier(i)}
            className={`rounded-[14px] border p-6 text-left transition-all ${
              activeTier === i
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 ring-1 ring-[var(--color-accent)]/20"
                : "border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-secondary)]"
            }`}
          >
            {tier.highlight && (
              <span className="mb-2 inline-block rounded-[5px] bg-[var(--color-accent)] px-2 py-0.5 text-[9px] font-semibold text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-normal text-[var(--color-text-primary)]">{tier.name}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{tier.description}</p>
            <p className="mt-3 text-xs text-[var(--color-text-tertiary)]">
              {tier.offers.length} of 10 systems included
            </p>
          </button>
        ))}
      </div>

      {/* Offer Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {allOffers.map((offer) => {
          const included = includedOffers.includes(offer.slug);
          return (
            <div
              key={offer.slug}
              className={`flex items-center gap-3 rounded-[10px] border p-4 transition-all ${
                included
                  ? "border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)]"
                  : "border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] opacity-40"
              }`}
            >
              {included ? (
                <Check className="h-4 w-4 flex-shrink-0 text-[var(--color-success)]" />
              ) : (
                <X className="h-4 w-4 flex-shrink-0 text-[var(--color-text-tertiary)]" />
              )}
              <div className="min-w-0">
                <p className={`text-sm font-medium ${included ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)]"}`}>
                  {offer.name}
                </p>
                <span
                  className="text-[9px] font-semibold uppercase"
                  style={{ color: included ? offer.color : "var(--color-text-tertiary)" }}
                >
                  {offer.pillar}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Link
          href="/book"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-accent)] px-8 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Book a Call to Get Pricing &rarr;
        </Link>
      </div>
    </div>
  );
}
