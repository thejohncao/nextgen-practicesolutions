import type { Metadata } from "next";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { Target, Cpu, Users, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "NextGen Practice Solutions — vertical AI SaaS + consulting for dental and aesthetic practices.",
};

const values = [
  {
    icon: Target,
    title: "Vertical Focus",
    description:
      "We only serve dental and aesthetic practices. Every solution, assessment, and system is purpose-built for your world.",
  },
  {
    icon: Cpu,
    title: "AI-First Approach",
    description:
      "We don't bolt AI onto legacy workflows. We redesign how practices operate with intelligence at the core.",
  },
  {
    icon: Users,
    title: "Systems Over Tactics",
    description:
      "Tactics are temporary. We build operating systems — repeatable infrastructure that compounds over time.",
  },
  {
    icon: Lightbulb,
    title: "Data-Driven Decisions",
    description:
      "Every recommendation is grounded in practice performance data, industry benchmarks, and measurable outcomes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        headline="We build the operating system behind high-performing practices."
        subheadline="NextGen Practice Solutions is a vertical AI SaaS + consulting company focused exclusively on dental and aesthetic practices."
      />

      {/* Story */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-normal md:text-3xl">Our Story</h2>
          <div className="mt-6 space-y-4 text-[var(--color-text-soft)]">
            <p>
              Most practice owners didn&apos;t go to dental school to become business operators. But that&apos;s
              exactly what running a practice demands — marketing, hiring, billing, case acceptance,
              compliance, analytics, and more. All on top of clinical care.
            </p>
            <p>
              NextGen Practice Solutions was founded to solve that gap. We combine AI-powered technology
              with hands-on consulting to build the systems, workflows, and infrastructure that let
              practice owners focus on what they do best: patient care.
            </p>
            <p>
              We don&apos;t sell templates or generic advice. We diagnose your specific gaps through rigorous
              assessments, then deploy tailored solutions across growth, management, and development —
              backed by data, powered by AI, and managed by people who understand your business.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--color-background-deep)] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-normal md:text-3xl">What We Believe</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-xl bg-white p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-soft)]">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-normal md:text-3xl">The Team</h2>
          <p className="mt-4 text-[var(--color-text-soft)]">
            A small, focused team of practice consultants, AI engineers, and growth strategists —
            all dedicated to building the future of practice operations.
          </p>
          <p className="mt-8 text-sm text-[var(--color-text-muted)]">
            Team profiles coming soon.
          </p>
        </div>
      </section>

      <CTASection
        headline="Let's talk about your practice."
        subheadline="Book a free strategy call to see how NextGen can transform your operations."
        variant="dark"
      />
    </>
  );
}
