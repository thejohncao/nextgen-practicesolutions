"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { solutions, getSolutionsByPillar } from "@/data/solutions";
import { assessments } from "@/data/assessments";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="border-t border-[var(--color-border)] bg-white lg:hidden">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-4">
        {/* Solutions */}
        <button
          onClick={() => toggleSection("solutions")}
          className="flex w-full items-center justify-between py-3 text-sm font-medium"
        >
          Solutions
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSection === "solutions" ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSection === "solutions" && (
          <div className="pb-3 pl-4">
            {(["growth", "management", "development"] as const).map((pillar) => (
              <div key={pillar} className="mb-3">
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  {pillar}
                </h4>
                {getSolutionsByPillar(pillar).map((s) => (
                  <Link
                    key={s.slug}
                    href={s.route}
                    onClick={onClose}
                    className="block py-1.5 text-sm text-[var(--color-text-soft)]"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Assessments */}
        <button
          onClick={() => toggleSection("assessments")}
          className="flex w-full items-center justify-between py-3 text-sm font-medium"
        >
          Assessments
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSection === "assessments" ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSection === "assessments" && (
          <div className="pb-3 pl-4">
            {assessments.map((a) => (
              <Link
                key={a.slug}
                href={`/assessments/${a.slug}`}
                onClick={onClose}
                className="block py-1.5 text-sm text-[var(--color-text-soft)]"
              >
                {a.name}
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/practice-os"
          onClick={onClose}
          className="block py-3 text-sm font-medium"
        >
          Practice OS
        </Link>

        <Link
          href="/blog"
          onClick={onClose}
          className="block py-3 text-sm font-medium"
        >
          Blog
        </Link>

        <Link
          href="/case-studies"
          onClick={onClose}
          className="block py-3 text-sm font-medium"
        >
          Case Studies
        </Link>

        <Link
          href="/about"
          onClick={onClose}
          className="block py-3 text-sm font-medium"
        >
          About
        </Link>

        <Link
          href="/pricing"
          onClick={onClose}
          className="block py-3 text-sm font-medium"
        >
          Pricing
        </Link>

        <Link
          href="/contact"
          onClick={onClose}
          className="block py-3 text-sm font-medium"
        >
          Contact
        </Link>

        <div className="mt-4 border-t border-[var(--color-border)] pt-4">
          <Link
            href="#book-a-call"
            onClick={onClose}
            className="block w-full rounded-lg bg-[var(--color-primary)] py-3 text-center text-sm font-medium text-white"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </div>
  );
}
