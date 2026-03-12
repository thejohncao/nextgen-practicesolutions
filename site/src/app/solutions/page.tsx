import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Settings, GraduationCap } from "lucide-react";
import { HeroSection } from "@/components/shared/HeroSection";
import { CTASection } from "@/components/shared/CTASection";
import { solutions, getSolutionsByPillar, pillars, type Pillar } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "10 AI-powered solutions across growth, management, and development — everything your dental or aesthetic practice needs.",
};

const pillarConfig: { key: Pillar; icon: typeof TrendingUp; colorVar: string }[] = [
  { key: "growth", icon: TrendingUp, colorVar: "var(--color-pillar-growth)" },
  { key: "management", icon: Settings, colorVar: "var(--color-pillar-management)" },
  { key: "development", icon: GraduationCap, colorVar: "var(--color-pillar-development)" },
];

export default function SolutionsPage() {
  return (
    <>
      <HeroSection
        headline="Everything your practice needs to grow, operate, and develop."
        subheadline="10 AI-powered solutions organized across three pillars — covering every dimension of practice performance."
      />

      {pillarConfig.map(({ key, icon: Icon, colorVar }) => {
        const pillar = pillars[key];
        const pillarSolutions = getSolutionsByPillar(key);

        return (
          <section key={key} className="px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${colorVar}15`.replace("var(", "").replace(")", "") }}
                >
                  <Icon className="h-5 w-5" style={{ color: colorVar }} />
                </div>
                <h2 className="text-2xl font-normal md:text-3xl">{pillar.name}</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pillarSolutions.map((solution) => (
                  <Link
                    key={solution.slug}
                    href={solution.route}
                    className="group rounded-xl border border-[var(--color-border)] bg-white p-6 transition-all hover:shadow-md"
                    style={{
                      borderColor: undefined,
                    }}
                  >
                    <h3
                      className="text-lg font-semibold"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {solution.name}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                      {solution.oneLiner}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        headline="Not sure which solutions you need?"
        subheadline="Take the Practice Health Assessment to identify your biggest gaps, or book a strategy call and we'll figure it out together."
        variant="dark"
      />
    </>
  );
}
