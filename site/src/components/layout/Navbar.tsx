"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { solutions, getSolutionsByPillar } from "@/data/solutions";
import { assessments } from "@/data/assessments";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const growthSolutions = getSolutionsByPillar("growth");
  const managementSolutions = getSolutionsByPillar("management");
  const developmentSolutions = getSolutionsByPillar("development");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight" style={{ fontFamily: "var(--font-body)" }}>
          NextGen Practice Solutions
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("solutions")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]">
              Solutions
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === "solutions" && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                <div className="w-[640px] rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-lg">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-pillar-growth)]">
                        Growth
                      </h4>
                      <ul className="space-y-2">
                        {growthSolutions.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={s.route}
                              className="block text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-pillar-management)]">
                        Management
                      </h4>
                      <ul className="space-y-2">
                        {managementSolutions.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={s.route}
                              className="block text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-pillar-development)]">
                        Development
                      </h4>
                      <ul className="space-y-2">
                        {developmentSolutions.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={s.route}
                              className="block text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                    <Link
                      href="/solutions"
                      className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)]"
                    >
                      View all solutions &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Assessments Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("assessments")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]">
              Assessments
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === "assessments" && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                <div className="w-80 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-lg">
                  <div className="mb-3">
                    <Link
                      href="/assessments/practice-health"
                      className="block rounded-lg bg-[var(--color-background-deep)] p-3 transition-colors hover:bg-[var(--color-border)]"
                    >
                      <span className="text-sm font-medium">Practice Health Assessment</span>
                      <span className="mt-1 block text-xs text-[var(--color-text-muted)]">
                        100-point broad diagnostic
                      </span>
                    </Link>
                  </div>
                  <div className="border-t border-[var(--color-border)] pt-3">
                    <ul className="space-y-1">
                      {assessments
                        .filter((a) => !a.featured)
                        .map((a) => (
                          <li key={a.slug}>
                            <Link
                              href={`/assessments/${a.slug}`}
                              className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-soft)] transition-colors hover:bg-[var(--color-background-deep)] hover:text-[var(--color-foreground)]"
                            >
                              {a.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="mt-3 border-t border-[var(--color-border)] pt-3">
                    <Link
                      href="/practice-os"
                      className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-soft)] transition-colors hover:bg-[var(--color-background-deep)] hover:text-[var(--color-foreground)]"
                    >
                      Practice OS Completeness Audit
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/practice-os"
            className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Practice OS
          </Link>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("resources")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-foreground)]">
              Resources
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === "resources" && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                <div className="w-56 rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-lg">
                  <Link
                    href="/blog"
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-soft)] transition-colors hover:bg-[var(--color-background-deep)] hover:text-[var(--color-foreground)]"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/case-studies"
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-soft)] transition-colors hover:bg-[var(--color-background-deep)] hover:text-[var(--color-foreground)]"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/about"
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-soft)] transition-colors hover:bg-[var(--color-background-deep)] hover:text-[var(--color-foreground)]"
                  >
                    About
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="#book-a-call"
            className="hidden rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)] sm:inline-flex"
          >
            Book a Call
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-[var(--color-foreground)] transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[var(--color-foreground)] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[var(--color-foreground)] transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
