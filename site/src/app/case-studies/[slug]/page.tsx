import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { CTASection } from "@/components/shared/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return {
    title: cs ? `Case Study: ${cs.title}` : "Case Study",
    description: cs?.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-normal">Case study not found</h1>
          <Link href="/case-studies" className="mt-4 inline-block text-sm text-[var(--color-primary)]">
            &larr; Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/case-studies"
            className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All Case Studies
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
            <span className="rounded-full bg-[var(--color-background-deep)] px-3 py-1 font-medium">
              {cs.practiceType}
            </span>
            <span>{cs.location}</span>
          </div>

          <h1 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl">
            {cs.title}
          </h1>

          <p className="mt-6 text-lg text-[var(--color-text-soft)]">{cs.challenge}</p>

          {/* Solutions Used */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[var(--color-text-muted)]">Solutions used:</span>
            {cs.solutionsUsed.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Results Banner */}
      <section className="bg-[var(--color-navy)] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-normal text-white">Results at a Glance</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cs.results.map((result) => (
              <div
                key={result.metric}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <p className="text-sm text-white/60">{result.metric}</p>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <span className="text-lg text-white/40 line-through">{result.before}</span>
                  <ArrowRight className="h-4 w-4 text-[var(--color-success)]" />
                  <span className="text-3xl font-normal text-white">{result.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          {cs.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-10 text-2xl font-normal">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            const hasListItems = block.includes("\n-");
            if (hasListItems) {
              const lines = block.split("\n");
              return (
                <div key={i}>
                  {lines.map((line, j) => {
                    if (line.startsWith("- ")) {
                      const content = line.replace("- ", "");
                      const formatted = content.split(/(\*\*.*?\*\*)/g).map((part, k) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={k}>{part.slice(2, -2)}</strong>
                        ) : (
                          <span key={k}>{part}</span>
                        )
                      );
                      return (
                        <li key={j} className="ml-6 list-disc text-[var(--color-text-soft)] leading-relaxed">
                          {formatted}
                        </li>
                      );
                    }
                    if (line.trim()) {
                      const formatted = line.split(/(\*\*.*?\*\*)/g).map((part, k) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={k}>{part.slice(2, -2)}</strong>
                        ) : (
                          <span key={k}>{part}</span>
                        )
                      );
                      return (
                        <p key={j} className="text-[var(--color-text-soft)] leading-relaxed">
                          {formatted}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            }
            const parts = block.split(/(\*\*.*?\*\*)/g);
            return (
              <p key={i} className="text-[var(--color-text-soft)] leading-relaxed">
                {parts.map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="text-[var(--color-foreground)]">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            );
          })}
        </div>
      </section>

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="bg-[var(--color-background-deep)] px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-10 w-10 text-[var(--color-primary)]/30" />
            <blockquote className="mt-6 text-xl font-normal italic leading-relaxed text-[var(--color-foreground)]">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                {cs.testimonial.name}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">{cs.testimonial.role}</p>
            </div>
          </div>
        </section>
      )}

      <CTASection
        headline="Want results like these for your practice?"
        subheadline="Book a free strategy call and we'll show you exactly which solutions can deliver the highest ROI for your specific situation."
        variant="dark"
      />
    </>
  );
}
