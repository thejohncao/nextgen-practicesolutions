import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { solutions, getSolutionBySlug } from "@/data/solutions";
import { CTASection } from "@/components/shared/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutions
    .filter((s) => s.slug !== "narrative")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  return {
    title: solution?.name ?? "Solution",
    description: solution?.oneLiner,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-normal">Solution not found</h1>
          <Link href="/solutions" className="mt-4 inline-block text-sm text-[var(--color-primary)]">
            &larr; Back to Solutions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/solutions"
            className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All Solutions
          </Link>
          <h1 className="text-4xl font-normal md:text-5xl">{solution.name}</h1>
          <p className="mt-6 text-lg text-[var(--color-text-soft)]">{solution.oneLiner}</p>

          <div className="mx-auto mt-16 max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-[var(--color-accent-gold)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent-gold)]">
                Coming Soon
              </span>
              <p className="mt-4 text-[var(--color-text-soft)]">
                The full product page for {solution.name} is coming soon. In the meantime, book a strategy
                call to learn how this solution can transform your practice.
              </p>
              <Link
                href="#book-a-call"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Want to see how this fits your practice?"
        subheadline="Book a free strategy call and we'll show you exactly how this solution addresses your specific challenges."
      />
    </>
  );
}
