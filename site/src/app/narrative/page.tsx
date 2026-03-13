import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  Presentation,
  DollarSign,
  RotateCcw,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";
import { FiveYesWalkthrough } from "@/components/widgets/FiveYesWalkthrough";
import { TreatmentEstimator } from "@/components/widgets/TreatmentEstimator";

export const metadata: Metadata = {
  title: "Narrative — Case Acceptance",
  description:
    "Transform treatment presentations into guided patient journeys that close. The Narrative system reimagines how practices present and accept treatment.",
};

const problems = [
  {
    icon: AlertTriangle,
    stat: "50%",
    description: "of diagnosed treatment is never accepted by patients",
  },
  {
    icon: DollarSign,
    stat: "$500K+",
    description: "in annual production sitting in unaccepted treatment plans",
  },
  {
    icon: MessageSquare,
    stat: "No system",
    description: "for what happens between diagnosis and \"yes\" — just ad-hoc conversations",
  },
];

const capabilities = [
  {
    icon: Stethoscope,
    title: "Guided Clinical Handoff",
    description:
      "Structured warm handoff from doctor to treatment coordinator. The diagnosis becomes a story the patient understands — not a code on a chart.",
  },
  {
    icon: Presentation,
    title: "Visual Treatment Presentations",
    description:
      "AI-generated patient-facing treatment summaries with visuals, phased care options, and plain-language explanations. No more pointing at x-rays and hoping for the best.",
  },
  {
    icon: DollarSign,
    title: "Financial Presentation Engine",
    description:
      "Present cost with confidence. Automatic financing options, insurance breakdowns, phased payment plans, and objection-handling scripts — all personalized per case.",
  },
  {
    icon: FileText,
    title: "Take-Home Treatment Packages",
    description:
      "Patients leave with a personalized PDF — their treatment story, timeline, financial options, and next steps. Designed to close the kitchen-table conversation.",
  },
  {
    icon: RotateCcw,
    title: "Follow-Up & Re-Engagement",
    description:
      "Automated sequences for unaccepted treatment. 7-day, 30-day, 90-day touchpoints that bring patients back without your team chasing them.",
  },
  {
    icon: BarChart3,
    title: "TC Performance Analytics",
    description:
      "Track case acceptance rates by provider, coordinator, procedure type, and case value. Coach your team with data, not guesswork.",
  },
];

const steps = [
  {
    number: "01",
    title: "Diagnose & Hand Off",
    description:
      "Doctor completes diagnosis and initiates a structured warm handoff to the treatment coordinator, using Narrative's guided template.",
  },
  {
    number: "02",
    title: "Present the Story",
    description:
      "TC uses Narrative to walk the patient through their personalized treatment journey — visual, phased, and in language they understand.",
  },
  {
    number: "03",
    title: "Make It Affordable",
    description:
      "Financial presentation with insurance, financing, and payment plan options — all pre-calculated and ready to discuss.",
  },
  {
    number: "04",
    title: "Follow Through",
    description:
      "Patient gets a take-home package. If they don't accept same-day, automated follow-up sequences re-engage them at the right intervals.",
  },
];

const metrics = [
  { value: "30-50%", label: "Increase in case acceptance rate" },
  { value: "2-3x", label: "Improvement in large case conversions" },
  { value: "$200K+", label: "Recovered annual production from unaccepted treatment" },
  { value: "70%", label: "Reduction in treatment coordinator prep time" },
];

export default function NarrativePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-[var(--color-pillar-development)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-pillar-development)]">
            Practice Development
          </span>
          <h1 className="mt-6 text-4xl font-normal tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
            Transform treatment presentations into guided patient journeys that close.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)] md:text-xl">
            Narrative reimagines case acceptance — from clinical diagnosis to financial presentation
            to follow-up. A complete system, not just a script.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/book"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-accent)] px-8 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Book a Demo
            </Link>
            <Link
              href="/assessments/case-acceptance"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--color-border-secondary)] px-8 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            The case acceptance problem is costing you hundreds of thousands a year.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-secondary)]">
            Most practices diagnose well but present poorly. The gap between what patients need and
            what they accept is where revenue disappears.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <div
                  key={problem.stat}
                  className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] p-8 text-center"
                >
                  <Icon className="mx-auto h-8 w-8 text-red-500" />
                  <p className="mt-4 text-4xl font-normal text-[var(--color-text-primary)]">{problem.stat}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{problem.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Narrative Does */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
              What Narrative does
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              Six integrated capabilities that transform how your team presents treatment and how
              patients experience the decision to say yes.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-pillar-development)]/10">
                    <Icon className="h-5 w-5 text-[var(--color-pillar-development)]" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-secondary)]">
            Four steps from diagnosis to accepted treatment — every step guided, every handoff clean.
          </p>

          <div className="mt-16 space-y-8">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-pillar-development)] text-sm font-semibold text-white">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-2 h-full w-px bg-[var(--color-border-primary)]" />
                  )}
                </div>
                <div className="pb-8">
                  <h3
                    className="text-xl font-semibold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-text-secondary)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Yes's Walkthrough */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-normal text-[var(--color-text-primary)] md:text-3xl mb-4">
            The Five Yes&apos;s Framework
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
            Walk through a real patient scenario — see exactly how each &ldquo;yes&rdquo; builds on the last to close the case.
          </p>
          <FiveYesWalkthrough />
        </div>
      </section>

      {/* Treatment Cost Estimator */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-normal text-[var(--color-text-primary)] md:text-3xl mb-4">
            Treatment Cost Estimator
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
            Select procedures to see cost breakdowns with insurance, membership discounts, and financing options.
          </p>
          <TreatmentEstimator />
        </div>
      </section>

      {/* The Impact */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
            The impact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-secondary)]">
            Practices using structured case acceptance systems see transformative results.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-4xl font-normal text-[var(--color-pillar-development)] md:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Assessment */}
      <section className="bg-[var(--color-bg-secondary)] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[14px] border border-[var(--color-pillar-development)]/20 bg-[var(--color-bg-tertiary)] p-8 md:p-12">
            <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--color-pillar-development)]/10">
                <CheckCircle2 className="h-7 w-7 text-[var(--color-pillar-development)]" />
              </div>
              <div>
                <h2 className="mt-4 text-2xl font-normal text-[var(--color-text-primary)] md:mt-0 md:text-3xl">
                  Find out how you score.
                </h2>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                  The Case Acceptance Readiness Assessment evaluates your practice across 50 questions
                  and 5 pillars — from clinical handoff to financial presentation to follow-up.
                  See exactly where you&apos;re losing cases and what to fix first.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/assessments/case-acceptance"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-pillar-development)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  >
                    Take the Assessment <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/assessments"
                    className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-secondary)] px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                  >
                    View All Assessments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to stop losing cases you've already diagnosed?"
        subheadline="Book a demo to see Narrative in action. We'll walk through the system and show you exactly how it fits your team's workflow."
        variant="dark"
      />
    </>
  );
}
