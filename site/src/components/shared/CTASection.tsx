import Link from "next/link";

interface CTASectionProps {
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  external?: boolean;
  variant?: "default" | "dark";
}

const BOOKING_URL = "#book-a-call";

export function CTASection({
  headline,
  subheadline,
  ctaLabel = "Book a Free 30-Minute Strategy Call",
  ctaHref = BOOKING_URL,
  external = false,
  variant = "default",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`px-6 py-20 ${isDark ? "bg-[var(--color-navy)] text-white" : "bg-[var(--color-background-deep)]"}`}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={`text-3xl font-normal md:text-4xl ${isDark ? "text-white" : ""}`}
        >
          {headline}
        </h2>
        {subheadline && (
          <p
            className={`mt-4 text-lg ${isDark ? "text-white/70" : "text-[var(--color-text-soft)]"}`}
          >
            {subheadline}
          </p>
        )}
        <div className="mt-8">
          <Link
            href={ctaHref}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`inline-flex h-12 items-center justify-center rounded-lg px-8 text-sm font-medium transition-colors ${
              isDark
                ? "bg-white text-[var(--color-navy)] hover:bg-white/90"
                : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
            }`}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
