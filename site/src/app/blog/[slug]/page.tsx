import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { blogPosts, getBlogPost } from "@/data/blog-posts";
import { CTASection } from "@/components/shared/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return {
    title: post?.title ?? "Blog Post",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-normal">Post not found</h1>
          <Link href="/blog" className="mt-4 inline-block text-sm text-[var(--color-primary)]">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  return (
    <>
      <article className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All Articles
          </Link>

          <span className="inline-block rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
            {post.category}
          </span>

          <h1 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span>{post.author}</span>
            <span>&middot;</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <div className="mt-12 space-y-6">
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-10 text-2xl font-normal">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={i}
                    className="mt-8 text-xl font-semibold"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              // Handle blocks with markdown-style bold and lists
              const parts = block.split(/(\*\*.*?\*\*)/g);
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

          {/* Prev/Next Navigation */}
          <div className="mt-16 grid gap-4 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group rounded-lg border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-primary)]/30"
              >
                <span className="text-xs text-[var(--color-text-muted)]">&larr; Previous</span>
                <p className="mt-1 text-sm font-medium group-hover:text-[var(--color-primary)]">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group rounded-lg border border-[var(--color-border)] p-4 text-right transition-colors hover:border-[var(--color-primary)]/30"
              >
                <span className="text-xs text-[var(--color-text-muted)]">Next &rarr;</span>
                <p className="mt-1 text-sm font-medium group-hover:text-[var(--color-primary)]">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </article>

      <CTASection
        headline="Ready to put these insights into action?"
        subheadline="Book a free strategy call to discuss how these strategies apply to your specific practice."
      />
    </>
  );
}
