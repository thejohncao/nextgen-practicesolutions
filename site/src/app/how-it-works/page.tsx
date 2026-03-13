import type { Metadata } from "next";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { AgentShowcase } from "@/components/widgets/AgentShowcase";
import { ProductMap } from "@/components/widgets/ProductMap";
import { OwnerJourneyMap } from "@/components/widgets/OwnerJourneyMap";

export const metadata: Metadata = {
  title: "How It Works — 10 AI-Powered Practice Growth Systems",
  description:
    "Four AI agents. Ten specialized offers. One system that scales your practice without adding headcount.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HeroSection
        headline="How NextGen works"
        subheadline="Four AI agents. Ten specialized systems. One operating system that scales your practice without adding headcount."
      />

      {/* AI Agent Showcase */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            Meet your AI team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[var(--color-text-secondary)]">
            Four specialized agents that manage every dimension of your practice.
          </p>
          <div className="mt-12">
            <AgentShowcase />
          </div>
        </div>
      </section>

      {/* 10-Offer Product Map */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            10 systems. 3 pillars. Complete coverage.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[var(--color-text-secondary)]">
            Every offer is a fully deployed system — not a one-time deliverable.
          </p>
          <div className="mt-12">
            <ProductMap />
          </div>
        </div>
      </section>

      {/* Owner Journey Map */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            Your journey with NextGen
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[var(--color-text-secondary)]">
            From self-diagnosis to retained client — here&apos;s what working with us looks like.
          </p>
          <div className="mt-12">
            <OwnerJourneyMap />
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            We don&apos;t sell services. We install systems.
          </h2>
          <div className="mt-12 grid gap-8 text-left md:grid-cols-3">
            {[
              {
                title: "AI-powered",
                desc: "Not just people. Our four AI agents automate the work that used to require full-time hires.",
              },
              {
                title: "All 10 levers",
                desc: "Not just marketing. We cover acquisition, operations, case acceptance, team training, and revenue recovery.",
              },
              {
                title: "Systems that scale",
                desc: "Not headcount that doesn't. Deploy once, run forever. No additional staff needed as you grow.",
              },
            ].map((d) => (
              <div
                key={d.title}
                className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] p-6"
              >
                <h3
                  className="text-lg font-semibold text-[var(--color-accent)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {d.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to see the system in action?"
        subheadline="Book a free strategy call — we'll map your practice gaps and show you exactly which systems close them."
        variant="dark"
      />
    </>
  );
}
