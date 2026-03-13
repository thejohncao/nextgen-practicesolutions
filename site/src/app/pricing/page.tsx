import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, Circle } from "lucide-react";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { PricingTierExplorer } from "@/components/widgets/PricingTierExplorer";
import { CompetitiveComparison } from "@/components/widgets/CompetitiveComparison";
import { ROICalculator } from "@/components/widgets/ROICalculator";
import { pricingTiers } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing — Starter, Growth & Full Packages",
  description: "Transparent pricing for dental practice growth. Compare tiers, see ROI, and find the right fit.",
};

function FeatureIcon({ included }: { included: boolean | "partial" }) {
  if (included === true) {
    return <Check className="h-4 w-4 text-[var(--color-success)]" />;
  }
  if (included === "partial") {
    return <Circle className="h-3 w-3 text-[var(--color-accent)]" />;
  }
  return <Minus className="h-4 w-4 text-[var(--color-text-tertiary)]" />;
}

export default function PricingPage() {
  return (
    <>
      <HeroSection
        headline="Simple, transparent tiers."
        subheadline="Three packages designed to match where your practice is today — and scale as you grow."
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-[14px] border bg-[var(--color-bg-secondary)] p-8 ${
                  tier.highlight
                    ? "border-[var(--color-accent)] shadow-lg ring-1 ring-[var(--color-accent)]/20"
                    : "border-[var(--color-border-primary)]"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-accent)] px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl font-normal text-[var(--color-text-primary)]">{tier.name}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{tier.description}</p>

                <div className="mt-6">
                  <Link
                    href="/book"
                    className={`flex h-12 w-full items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                      tier.highlight
                        ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
                        : "border border-[var(--color-border-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature.solution} className="flex items-center gap-3">
                      <FeatureIcon included={feature.included} />
                      <span
                        className={`text-sm ${
                          feature.included === true
                            ? "text-[var(--color-text-primary)]"
                            : feature.included === "partial"
                              ? "text-[var(--color-text-secondary)]"
                              : "text-[var(--color-text-tertiary)]"
                        }`}
                      >
                        {feature.solution}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--color-success)]" /> Full access
            </span>
            <span className="flex items-center gap-2">
              <Circle className="h-3 w-3 text-[var(--color-accent)]" /> Partial / Foundational
            </span>
            <span className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-[var(--color-text-tertiary)]" /> Not included
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Tier Explorer */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-normal text-[var(--color-text-primary)] md:text-3xl mb-4">
            Explore what&apos;s included
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
            Click a tier to see which of the 10 systems are included.
          </p>
          <PricingTierExplorer />
        </div>
      </section>

      {/* Competitive Comparison */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-normal text-[var(--color-text-primary)] md:text-3xl mb-4">
            How we compare
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
            DIY vs hiring vs NextGen — see the real comparison.
          </p>
          <CompetitiveComparison />
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-normal text-[var(--color-text-primary)] md:text-3xl mb-4">
            Calculate your ROI
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
            Adjust the sliders to see your estimated revenue recovery across all 10 systems.
          </p>
          <ROICalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--color-border-primary)] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-normal text-[var(--color-text-primary)] md:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-8">
            {[
              { q: "Are there long-term contracts?", a: "No, cancel anytime. We earn your business every month." },
              { q: "How fast do I see results?", a: "Week 1 for Speed-to-Lead. 30 days for the full system to be live and driving results." },
              { q: "What if I only need marketing?", a: "The Starter tier covers the essentials — patient acquisition and your web presence." },
              { q: "Do you work with DSOs?", a: "Yes, multi-location support is available. Contact us for enterprise pricing." },
              { q: "What's the onboarding process?", a: "Week 1: systems audit. Week 2: deployment. Week 3: live. Your team's time investment is minimal." },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                  {faq.q}
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Let's find the right fit for your practice."
        subheadline="Book a free strategy call — we'll assess your current state and recommend the tier that makes sense."
        variant="dark"
      />
    </>
  );
}
