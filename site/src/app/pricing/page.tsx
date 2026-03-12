import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, Circle } from "lucide-react";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { pricingTiers } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Three tiers to match where your practice is today — Starter, Growth, or Full.",
};

function FeatureIcon({ included }: { included: boolean | "partial" }) {
  if (included === true) {
    return <Check className="h-4 w-4 text-[var(--color-success)]" />;
  }
  if (included === "partial") {
    return <Circle className="h-3 w-3 text-[var(--color-accent-gold)]" />;
  }
  return <Minus className="h-4 w-4 text-[var(--color-text-muted)]" />;
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
                className={`relative rounded-2xl border bg-white p-8 ${
                  tier.highlight
                    ? "border-[var(--color-primary)] shadow-lg ring-1 ring-[var(--color-primary)]/20"
                    : "border-[var(--color-border)]"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-4 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl font-normal">{tier.name}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">{tier.description}</p>

                <div className="mt-6">
                  <Link
                    href="#book-a-call"
                    className={`flex h-12 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      tier.highlight
                        ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
                        : "border border-[var(--color-border)] hover:bg-[var(--color-background-deep)]"
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
                            ? "text-[var(--color-foreground)]"
                            : feature.included === "partial"
                              ? "text-[var(--color-text-soft)]"
                              : "text-[var(--color-text-muted)]"
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
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--color-success)]" /> Full access
            </span>
            <span className="flex items-center gap-2">
              <Circle className="h-3 w-3 text-[var(--color-accent-gold)]" /> Partial / Foundational
            </span>
            <span className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-[var(--color-text-muted)]" /> Not included
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--color-border)] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-normal md:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                How is pricing determined?
              </h3>
              <p className="mt-2 text-[var(--color-text-soft)]">
                Pricing is customized based on your practice size, the solutions you need, and your growth
                goals. Book a strategy call and we&apos;ll build a proposal that fits your budget.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                Can I start with one solution and add more later?
              </h3>
              <p className="mt-2 text-[var(--color-text-soft)]">
                Absolutely. Many practices start with Starter and upgrade as they see results. Every tier
                builds on the previous one, so there&apos;s a natural growth path.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                What&apos;s the typical implementation timeline?
              </h3>
              <p className="mt-2 text-[var(--color-text-soft)]">
                Most practices are fully onboarded within 4-8 weeks depending on the tier. We handle the
                heavy lifting — your team&apos;s time investment is minimal.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                Do you work with DSOs and multi-location practices?
              </h3>
              <p className="mt-2 text-[var(--color-text-soft)]">
                Yes. Our platform is designed to scale across locations with centralized reporting and
                location-specific customization. Contact us for enterprise pricing.
              </p>
            </div>
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
