import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Solutions
            </h3>
            <ul className="space-y-2">
              <li><Link href="/how-it-works" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">How It Works</Link></li>
              <li><Link href="/narrative" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Narrative</Link></li>
              <li><Link href="/results" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Results</Link></li>
              <li><Link href="/pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Resources
            </h3>
            <ul className="space-y-2">
              <li><Link href="/assessments" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Assessment</Link></li>
              <li><Link href="/blog" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Blog</Link></li>
              <li><Link href="/case-studies" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Company
            </h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/book"
                  className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                >
                  Book a Strategy Call
                </Link>
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                NextGen Practice Solutions
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
                Orange County, CA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[var(--color-border-primary)] pt-8">
          <p className="text-center text-sm text-[var(--color-text-tertiary)]">
            &copy; {new Date().getFullYear()} NextGen Practice Solutions &middot; Cao Consulting LLC &middot; Orange County, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
