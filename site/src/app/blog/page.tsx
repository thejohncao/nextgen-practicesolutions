import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts, getFeaturedPost } from "@/data/blog-posts";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Blog — Practice Growth Insights",
  description:
    "Actionable insights on case acceptance, patient acquisition, team management, revenue cycles, and data-driven practice growth.",
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const otherPosts = blogPosts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-normal tracking-tight md:text-5xl">
            Practice Growth Insights
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-soft)]">
            Actionable strategies for case acceptance, patient acquisition, team management,
            revenue cycles, and data-driven growth.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border border-[var(--color-border)] bg-white p-8 transition-shadow hover:shadow-lg md:p-12"
            >
              <span className="inline-block rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                Featured
              </span>
              <h2 className="mt-4 text-2xl font-normal group-hover:text-[var(--color-primary)] md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-3xl text-[var(--color-text-soft)]">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                <span>{featured.category}</span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime}
                </span>
                <span>&middot;</span>
                <span>{new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-normal">All Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
              >
                <span className="inline-block self-start rounded-full bg-[var(--color-background-deep)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)]">
                  {post.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold group-hover:text-[var(--color-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[var(--color-text-soft)]">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Want personalized insights for your practice?"
        subheadline="Book a free strategy call and we'll analyze your specific situation — not generic advice, but a plan tailored to your numbers."
      />
    </>
  );
}
