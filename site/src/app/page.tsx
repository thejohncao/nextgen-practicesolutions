import Link from "next/link";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { QuickScore } from "@/components/widgets/QuickScore";
import { ROITeaser } from "@/components/widgets/ROITeaser";
import { TrendingUp, Settings, GraduationCap, Sparkles } from "lucide-react";

const pillars = [
  {
    name: "Growth",
    description: "Patient acquisition, marketing, and online presence systems that fill your schedule predictably.",
    icon: TrendingUp,
    color: "var(--color-pillar-growth)",
    solutions: ["Patient Acquisition Engine", "Website & Conversion Stack"],
  },
  {
    name: "Management",
    description: "Operational infrastructure — from speed-to-lead to revenue cycle to team accountability.",
    icon: Settings,
    color: "var(--color-pillar-management)",
    solutions: ["Speed-to-Lead", "AI Front Desk", "Recall Engine", "Revenue Cycle OS", "Team OS", "Data & Dashboard"],
  },
  {
    name: "Development",
    description: "Case acceptance, treatment presentation, and team performance training that converts.",
    icon: GraduationCap,
    color: "var(--color-pillar-development)",
    solutions: ["Narrative (Case Acceptance)", "FD & TC Performance"],
  },
];

const agents = [
  { name: "Giselle", role: "Marketing & Growth", color: "var(--color-giselle)", tagline: "I keep quality new patients coming in and your brand working for you." },
  { name: "Miles", role: "Operations & Management", color: "var(--color-miles)", tagline: "I keep your schedule full, patients on track, and money collected." },
  { name: "Devon", role: "Sales & Development", color: "var(--color-devon)", tagline: "I help you convert more of the dentistry already in your chair." },
  { name: "Alma", role: "Practice Academy", color: "var(--color-alma)", tagline: "I help your team master the systems that run your practice." },
];

export default function HomePage() {
  return (
    <>
      <HeroSection
        headline="Your practice is leaking revenue. Find out where."
        subheadline="Take the 30-second practice health check. No email required."
        primaryCTA={{ label: "Take the Assessment", href: "/assessments" }}
        secondaryCTA={{ label: "Book a Strategy Call", href: "/book" }}
      />

      {/* Quick Score Widget */}
      <section className="px-6 pb-20 -mt-8">
        <div className="mx-auto max-w-2xl">
          <QuickScore />
          <p className="mt-3 text-center text-sm text-[var(--color-text-tertiary)]">
            2,400+ practices assessed
          </p>
        </div>
      </section>

      {/* ROI Teaser */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <ROITeaser />
        </div>
      </section>

      {/* Pillars Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            Three pillars. Ten solutions. One operating system.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[var(--color-text-secondary)]">
            NextGen covers every dimension of practice performance — growth, management, and development.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.name}
                  className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-8 transition-all hover:border-[var(--color-border-secondary)]"
                  style={{ borderTopWidth: "3px", borderTopColor: pillar.color }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${pillar.color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: pillar.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                    {pillar.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{pillar.description}</p>
                  <ul className="mt-4 space-y-1">
                    {pillar.solutions.map((s) => (
                      <li key={s} className="text-sm text-[var(--color-text-tertiary)]">
                        &bull; {s}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              Explore all solutions &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Agent Personas */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
              <span className="text-sm font-medium text-[var(--color-accent)]">AI-Powered</span>
            </div>
            <h2 className="text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
              Meet your practice&apos;s AI team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-secondary)]">
              Four specialized AI agents that work across every dimension of your practice.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <Link
                key={agent.name}
                href="/how-it-works"
                className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] p-6 transition-all hover:border-[var(--color-border-secondary)]"
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-white"
                  style={{ backgroundColor: agent.color }}
                >
                  {agent.name[0]}
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                  {agent.name}
                </h3>
                <p className="text-sm text-[var(--color-text-tertiary)]">{agent.role}</p>
                <p className="mt-3 text-sm italic text-[var(--color-text-secondary)]">&ldquo;{agent.tagline}&rdquo;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            Results from practices like yours
          </p>
          <h2 className="mt-4 text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            2,400+ practices assessed
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Practices using NextGen recover an average of $147K in revenue their first year.
          </p>
          <div className="mt-8">
            <Link
              href="/results"
              className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              See client results &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Take the Practice Health Assessment — 100 questions, 15 minutes, and you&apos;ll know exactly
            where your practice stands and what to fix first.
          </p>
          <div className="mt-8">
            <Link
              href="/assessments"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-accent)] px-8 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to stop the revenue leak?"
        subheadline="Book a free 30-minute strategy call. We'll walk through your biggest gaps and show you exactly how NextGen closes them."
        ctaLabel="Book a Free Strategy Call &rarr;"
        variant="dark"
      />
    </>
  );
}
