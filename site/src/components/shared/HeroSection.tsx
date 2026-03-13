import Link from "next/link";

interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCTA?: {
    label: string;
    href: string;
    external?: boolean;
  };
  centered?: boolean;
}

export function HeroSection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  centered = true,
}: HeroSectionProps) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div
        className={`mx-auto max-w-4xl ${centered ? "text-center" : ""}`}
      >
        <h1 className="text-4xl font-normal tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] md:text-xl max-w-2xl mx-auto">
            {subheadline}
          </p>
        )}
        {(primaryCTA || secondaryCTA) && (
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {primaryCTA && (
              <Link
                href={primaryCTA.href}
                target={primaryCTA.external ? "_blank" : undefined}
                rel={primaryCTA.external ? "noopener noreferrer" : undefined}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-accent)] px-8 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
              >
                {primaryCTA.label}
              </Link>
            )}
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                target={secondaryCTA.external ? "_blank" : undefined}
                rel={secondaryCTA.external ? "noopener noreferrer" : undefined}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--color-border-secondary)] px-8 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
