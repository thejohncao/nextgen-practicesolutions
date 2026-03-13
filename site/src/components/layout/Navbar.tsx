"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Assessment", href: "/assessments" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Narrative", href: "/narrative" },
  { label: "Results", href: "/results" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          NextGen
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="hidden rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] sm:inline-flex"
          >
            Book a Call &rarr;
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-transform ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-opacity ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-transform ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
