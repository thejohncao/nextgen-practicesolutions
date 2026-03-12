import Link from "next/link";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
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
        headline="AI-Powered Practice Growth for Dental & Aesthetic Practices"
        subheadline="Vertical AI SaaS + consulting that transforms how practices acquire patients, manage operations, and develop their teams."
        primaryCTA={{ label: "Take the Assessment", href: "/assessments" }}
        secondaryCTA={{ label: "Book a Strategy Call", href: "#book-a-call" }}
      />

      {/* Pillars Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal md:text-4xl">
            Three pillars. Ten solutions. One operating system.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[var(--color-text-soft)]">
            NextGen covers every dimension of practice performance — growth, management, and development.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.name}
                  className="rounded-xl border border-[var(--color-border)] bg-white p-8 transition-shadow hover:shadow-lg"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${pillar.color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: pillar.color }} />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                    {pillar.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-soft)]">{pillar.description}</p>
                  <ul className="mt-4 space-y-1">
                    {pillar.solutions.map((s) => (
                      <li key={s} className="text-sm text-[var(--color-text-muted)]">
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
              href="/solutions"
              className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)]"
            >
              Explore all solutions &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Agent Personas */}
      <section className="bg-[var(--color-navy)] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-[var(--color-accent-gold)]" />
              <span className="text-sm font-medium text-[var(--color-accent-gold)]">AI-Powered</span>
            </div>
            <h2 className="text-3xl font-normal text-white md:text-4xl">
              Meet your practice&apos;s AI team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Four specialized AI agents that work across every dimension of your practice.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-white"
                  style={{ backgroundColor: agent.color }}
                >
                  {agent.name[0]}
                </div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-body)" }}>
                  {agent.name}
                </h3>
                <p className="text-sm text-white/50">{agent.role}</p>
                <p className="mt-3 text-sm italic text-white/70">&ldquo;{agent.tagline}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal md:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-soft)]">
            Take the Practice Health Assessment — 100 questions, 15 minutes, and you&apos;ll know exactly
            where your practice stands and what to fix first.
          </p>
          <div className="mt-8">
            <Link
              href="/assessments"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to build a practice that runs like a system?"
        subheadline="Book a free 30-minute strategy call. We'll walk through your biggest gaps and show you exactly how NextGen closes them."
        variant="dark"
      />
    </>
  );
}
