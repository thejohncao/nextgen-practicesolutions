import Link from "next/link";

interface CTASectionProps {
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  external?: boolean;
  variant?: "default" | "dark";
}

export function CTASection({
  headline,
  subheadline,
  ctaLabel = "Book a Free 30-Minute Strategy Call",
  ctaHref = "/book",
  external = false,
  variant = "default",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`px-6 py-20 ${isDark ? "bg-[var(--color-bg-primary)]" : "bg-[var(--color-bg-secondary)]"}`}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-normal text-[var(--color-text-primary)] md:text-4xl">
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            {subheadline}
          </p>
        )}
        <div className="mt-8">
          <Link
            href={ctaHref}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`inline-flex h-12 items-center justify-center rounded-lg px-8 text-sm font-semibold transition-colors ${
              isDark
                ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
                : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
            }`}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
