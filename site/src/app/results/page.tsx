import type { Metadata } from "next";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { CommandCenter } from "@/components/widgets/CommandCenter";
import { SpeedToLead } from "@/components/widgets/SpeedToLead";
import { RecallHeatmap } from "@/components/widgets/RecallHeatmap";
import { GHLCampaigns } from "@/components/widgets/GHLCampaigns";
import { TeamScorecard } from "@/components/widgets/TeamScorecard";

export const metadata: Metadata = {
  title: "Client Results — Live Practice Dashboards",
  description:
    "See the actual dashboards our clients use. Real-time metrics, campaign performance, and team accountability.",
};

const sections = [
  {
    title: "Practice Command Center",
    intro: "Your home screen. Everything that matters, one view.",
    Widget: CommandCenter,
  },
  {
    title: "Speed-to-Lead Tracker",
    intro: "38 seconds. That's how fast we respond to your leads.",
    Widget: SpeedToLead,
  },
  {
    title: "Recall Engine Heatmap",
    intro: "Every overdue patient, color-coded. Nothing falls through.",
    Widget: RecallHeatmap,
  },
  {
    title: "GHL Campaign Dashboard",
    intro: "Four pipelines running 24/7. $539K recovered and counting.",
    Widget: GHLCampaigns,
  },
  {
    title: "Team Performance Scorecard",
    intro: "Your team, accountable. Weekly KPIs with coaching notes.",
    Widget: TeamScorecard,
  },
];

export default function ResultsPage() {
  return (
    <>
      <HeroSection
        headline="These aren't mockups."
        subheadline="This is what our clients see every day. Real dashboards, real metrics, real results."
      />

      {sections.map((section, i) => (
        <section
          key={section.title}
          className={`px-6 py-16 ${i % 2 === 1 ? "bg-[var(--color-bg-secondary)]" : ""}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-2xl font-normal text-[var(--color-text-primary)] md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-2 text-lg text-[var(--color-text-secondary)]">{section.intro}</p>
            </div>
            <section.Widget />
          </div>
        </section>
      ))}

      <CTASection
        headline="See these numbers for your practice."
        subheadline="Book a free strategy call and get a custom ROI breakdown for your practice."
        ctaLabel="Book a Call &rarr;"
        variant="dark"
      />
    </>
  );
}
