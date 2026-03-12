import Link from "next/link";
import { solutions } from "@/data/solutions";
import { assessments } from "@/data/assessments";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Solutions
            </h3>
            <ul className="space-y-2">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.route}
                    className="text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Assessments */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Assessments
            </h3>
            <ul className="space-y-2">
              {assessments.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/assessments/${a.slug}`}
                    className="text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-os"
                  className="text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  Practice OS
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#book-a-call"
                  className="text-sm font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-light)]"
                >
                  Book a Strategy Call
                </Link>
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                NextGen Practice Solutions
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Orange County, CA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <p className="text-center text-sm text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} NextGen Practice Solutions &middot; Cao Consulting LLC &middot; Orange County, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
