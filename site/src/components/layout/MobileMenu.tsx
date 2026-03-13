"use client";

import Link from "next/link";

interface MobileMenuProps {
  onClose: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Assessment", href: "/assessments" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Narrative", href: "/narrative" },
  { label: "Results", href: "/results" },
];

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="border-t border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] lg:hidden">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-4 border-t border-[var(--color-border-primary)] pt-4">
          <Link
            href="/book"
            onClick={onClose}
            className="block w-full rounded-lg bg-[var(--color-accent)] py-3 text-center text-sm font-semibold text-white"
          >
            Book a Call &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
