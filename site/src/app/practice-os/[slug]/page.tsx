import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { practiceOSCategories, getCategoryBySlug } from "@/data/practice-os";
import { CTASection } from "@/components/shared/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return practiceOSCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category ? `${category.name} — Practice OS` : "Practice OS",
    description: category?.description,
  };
}

export default async function PracticeOSCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-normal">Category not found</h1>
          <Link href="/practice-os" className="mt-4 inline-block text-sm text-[var(--color-primary)]">
            &larr; Back to Practice OS
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = practiceOSCategories.findIndex((c) => c.slug === slug);
  const prevCategory = currentIndex > 0 ? practiceOSCategories[currentIndex - 1] : null;
  const nextCategory = currentIndex < practiceOSCategories.length - 1 ? practiceOSCategories[currentIndex + 1] : null;

  return (
    <>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/practice-os"
            className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-4 w-4" /> Practice OS
          </Link>

          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <span>Category {currentIndex + 1} of {practiceOSCategories.length}</span>
          </div>

          <h1 className="mt-2 text-4xl font-normal md:text-5xl">{category.name}</h1>
          <p className="mt-4 text-lg text-[var(--color-text-soft)]">{category.description}</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {category.artifacts.length} foundational artifacts
          </p>
        </div>
      </section>

      {/* Artifact Inventory */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-normal">Artifact Inventory</h2>
          <div className="space-y-4">
            {category.artifacts.map((artifact, idx) => (
              <div
                key={artifact.name}
                className="rounded-xl border border-[var(--color-border)] bg-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-background-deep)] text-xs font-medium text-[var(--color-text-muted)]">
                        {idx + 1}
                      </span>
                      <h3
                        className="text-base font-semibold"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {artifact.name}
                      </h3>
                    </div>
                    <p className="mt-2 ml-10 text-sm text-[var(--color-text-soft)]">
                      {artifact.description}
                    </p>
                  </div>
                  {artifact.nextgenOffer !== "—" && artifact.nextgenOffer !== "Consulting" && (
                    <span className="shrink-0 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                      {artifact.nextgenOffer}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Check */}
      <section className="bg-[var(--color-background-deep)] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[var(--color-primary)]" />
              <div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                  Quick self-check
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                  For each artifact above, ask yourself: <strong>Do we have it? Is it current? Do we actively use it?</strong>
                </p>
                <ul className="mt-3 space-y-1 text-sm text-[var(--color-text-soft)]">
                  <li>&bull; <strong>Have it & use it</strong> — you&apos;re in good shape</li>
                  <li>&bull; <strong>Have it, not current</strong> — needs a refresh</li>
                  <li>&bull; <strong>Don&apos;t have it</strong> — this is a gap NextGen can help you build</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nav between categories */}
      <section className="px-6 py-12">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          {prevCategory ? (
            <Link
              href={`/practice-os/${prevCategory.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-text-soft)] hover:text-[var(--color-foreground)]"
            >
              <ArrowLeft className="h-4 w-4" /> {prevCategory.name}
            </Link>
          ) : (
            <div />
          )}
          {nextCategory ? (
            <Link
              href={`/practice-os/${nextCategory.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-text-soft)] hover:text-[var(--color-foreground)]"
            >
              {nextCategory.name} <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/practice-os"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-text-soft)] hover:text-[var(--color-foreground)]"
            >
              Back to Overview <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>

      <CTASection
        headline="Need help building these artifacts?"
        subheadline="Book a strategy call and we'll identify which pieces are missing, then help you build them."
        variant="dark"
      />
    </>
  );
}
