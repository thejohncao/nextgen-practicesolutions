export type Pillar = "growth" | "management" | "development";

export interface Solution {
  slug: string;
  name: string;
  oneLiner: string;
  pillar: Pillar;
  route: string;
}

export const pillars: Record<Pillar, { name: string; color: string; bgColor: string; borderColor: string }> = {
  growth: {
    name: "Growth",
    color: "text-[var(--color-pillar-growth)]",
    bgColor: "bg-[var(--color-pillar-growth)]/10",
    borderColor: "border-[var(--color-pillar-growth)]/20",
  },
  management: {
    name: "Management",
    color: "text-[var(--color-pillar-management)]",
    bgColor: "bg-[var(--color-pillar-management)]/10",
    borderColor: "border-[var(--color-pillar-management)]/20",
  },
  development: {
    name: "Development",
    color: "text-[var(--color-pillar-development)]",
    bgColor: "bg-[var(--color-pillar-development)]/10",
    borderColor: "border-[var(--color-pillar-development)]/20",
  },
};

export const solutions: Solution[] = [
  {
    slug: "acquisition",
    name: "Patient Acquisition Engine",
    oneLiner: "Full-funnel patient growth: SEO, paid ads, and referral systems that fill your schedule",
    pillar: "growth",
    route: "/solutions/acquisition",
  },
  {
    slug: "website",
    name: "Website & Conversion Stack",
    oneLiner: "High-converting practice websites built to turn visitors into booked patients",
    pillar: "growth",
    route: "/solutions/website",
  },
  {
    slug: "speed-to-lead",
    name: "Speed-to-Lead",
    oneLiner: "Instant response systems that ensure no lead goes unanswered — day, night, or weekend",
    pillar: "management",
    route: "/solutions/speed-to-lead",
  },
  {
    slug: "ai-front-desk",
    name: "AI Front Desk",
    oneLiner: "AI-powered phone and chat that handles scheduling, FAQs, and routing 24/7",
    pillar: "management",
    route: "/solutions/ai-front-desk",
  },
  {
    slug: "recall",
    name: "Recall Engine",
    oneLiner: "Automated recare and reactivation that keeps your hygiene schedule full and patients compliant",
    pillar: "management",
    route: "/solutions/recall",
  },
  {
    slug: "revenue-cycle",
    name: "Revenue Cycle OS",
    oneLiner: "End-to-end billing optimization: collections, AR management, and fee schedule intelligence",
    pillar: "management",
    route: "/solutions/revenue-cycle",
  },
  {
    slug: "team-os",
    name: "Team OS",
    oneLiner: "Organizational infrastructure: role clarity, performance tracking, and accountability systems",
    pillar: "management",
    route: "/solutions/team-os",
  },
  {
    slug: "dashboard",
    name: "Data & Dashboard",
    oneLiner: "Real-time practice analytics that turn raw data into actionable decisions",
    pillar: "management",
    route: "/solutions/dashboard",
  },
  {
    slug: "narrative",
    name: "Narrative",
    oneLiner: "Transform treatment presentations into guided patient journeys that close",
    pillar: "development",
    route: "/narrative",
  },
  {
    slug: "tc-performance",
    name: "FD & TC Performance",
    oneLiner: "Training frameworks and performance systems for front desk and treatment coordinators",
    pillar: "development",
    route: "/solutions/tc-performance",
  },
];

export function getSolutionsByPillar(pillar: Pillar): Solution[] {
  return solutions.filter((s) => s.pillar === pillar);
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
