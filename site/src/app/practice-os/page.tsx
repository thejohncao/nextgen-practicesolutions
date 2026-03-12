import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Users,
  Stethoscope,
  DollarSign,
  Heart,
  Megaphone,
  Shield,
  ArrowRight,
} from "lucide-react";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Practice OS",
  description:
    "The complete infrastructure blueprint — documents, structures, and workflows that turn a collection of talented people into a scalable, repeatable machine.",
};

const categories = [
  {
    slug: "identity",
    name: "Identity & Strategy",
    icon: Target,
    description: "Mission, vision, positioning, growth targets, and competitive differentiation.",
    artifactCount: 7,
  },
  {
    slug: "organization",
    name: "Organizational Structure",
    icon: Users,
    description: "Org chart, role descriptions, compensation, onboarding, and team accountability.",
    artifactCount: 7,
  },
  {
    slug: "clinical",
    name: "Clinical Operations",
    icon: Stethoscope,
    description: "Production calendar, schedule templates, case presentation SOPs, and protocols.",
    artifactCount: 8,
  },
  {
    slug: "financial",
    name: "Financial Operations",
    icon: DollarSign,
    description: "Fee schedules, collections protocol, membership plans, P&L cadence, and benchmarks.",
    artifactCount: 8,
  },
  {
    slug: "patient-experience",
    name: "Patient Experience",
    icon: Heart,
    description: "Intake flow, treatment presentation, follow-up protocols, and review generation.",
    artifactCount: 8,
  },
  {
    slug: "marketing",
    name: "Marketing & Growth",
    icon: Megaphone,
    description: "Marketing plan, content calendar, campaign playbooks, and attribution framework.",
    artifactCount: 7,
  },
  {
    slug: "compliance",
    name: "Compliance & Risk",
    icon: Shield,
    description: "HIPAA, OSHA, employee handbook, incident reporting, and business continuity.",
    artifactCount: 7,
  },
];

export default function PracticeOSPage() {
  return (
    <>
      <HeroSection
        headline="Every high-performing practice runs on a system. Most don't have one."
        subheadline="The Practice Operating System is the complete infrastructure blueprint — the documents, structures, and workflows that turn a collection of talented people into a scalable, repeatable machine."
      />

      {/* Categories Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-normal md:text-3xl">The 7 Categories</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--color-text-soft)]">
            52 foundational artifacts across 7 categories that define how a well-run practice operates.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.slug}
                  className="rounded-xl border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                    {category.description}
                  </p>
                  <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                    {category.artifactCount} artifacts
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Completeness Audit */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[var(--color-accent-gold)]/20 bg-[var(--color-accent-gold)]/5 p-8 md:p-12 text-center">
            <h2 className="text-2xl font-normal md:text-3xl">
              Practice OS Completeness Audit
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-soft)]">
              Do you have the foundational documents and systems your practice needs? Take the
              completeness audit to find out — and see which pieces are missing, outdated, or unused.
            </p>
            <div className="mt-2 text-sm text-[var(--color-text-muted)]">
              ~50 questions &middot; Scoring: Have it &amp; use it / Have it, not current / Don&apos;t have it
            </div>
            <div className="mt-6">
              <span className="inline-block rounded-full bg-[var(--color-accent-gold)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent-gold)]">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How NextGen Helps */}
      <section className="bg-[var(--color-background-deep)] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-normal md:text-3xl">
            We don&apos;t just diagnose — we help you build the system.
          </h2>
          <p className="mt-4 text-[var(--color-text-soft)]">
            Every gap in your Practice OS maps directly to a NextGen solution. We help you create the
            missing documents, implement the workflows, and train your team to use them.
          </p>
          <div className="mt-8">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)]"
            >
              See all solutions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="Let's build your Practice OS together."
        subheadline="Book a strategy call and we'll walk through your infrastructure gaps — then build a plan to close them."
        variant="dark"
      />
    </>
  );
}
