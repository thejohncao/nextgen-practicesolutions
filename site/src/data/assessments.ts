export type AssessmentStatus = "built" | "planned";

export interface Assessment {
  slug: string;
  name: string;
  description: string;
  questionCount: number;
  status: AssessmentStatus;
  primaryMapping: string;
  pillars?: string[];
  revenueFraming?: string;
  featured?: boolean;
}

export const assessments: Assessment[] = [
  {
    slug: "practice-health",
    name: "Practice Health Assessment",
    description:
      "Broad 100-point assessment covering your entire practice. Identifies your weakest areas and recommends specific deep dives.",
    questionCount: 100,
    status: "built",
    primaryMapping: "All 10 NextGen offers",
    featured: true,
  },
  {
    slug: "case-acceptance",
    name: "Case Acceptance Readiness",
    description:
      "Deep diagnostic of your treatment presentation and acceptance workflow — from clinical handoff to follow-up.",
    questionCount: 50,
    status: "built",
    primaryMapping: "Narrative",
    pillars: [
      "Clinical Diagnosis & Handoff",
      "Treatment Presentation",
      "Financial Presentation",
      "Team Readiness",
      "Follow-Up & Re-Engagement",
    ],
  },
  {
    slug: "speed-to-lead",
    name: "Speed-to-Lead & Front Desk",
    description:
      "Evaluates your inbound lead handling, call response times, multi-channel coverage, and booking conversion.",
    questionCount: 40,
    status: "planned",
    primaryMapping: "Speed-to-Lead + AI Front Desk",
    pillars: [
      "Call Handling & Availability",
      "Lead Response Speed",
      "Multi-Channel Coverage",
      "Booking Conversion & Recovery",
    ],
    revenueFraming:
      "The average practice misses 30% of inbound calls. At $300-500 LTV per new patient, 10 missed calls/week = $150K-$250K/year in lost revenue.",
  },
  {
    slug: "acquisition",
    name: "Patient Acquisition Readiness",
    description:
      "Assesses your marketing, online presence, paid advertising, and referral systems for new patient generation.",
    questionCount: 40,
    status: "planned",
    primaryMapping: "Patient Acquisition Engine + Website Stack",
    pillars: [
      "Online Presence & SEO",
      "Website & Conversion",
      "Paid Advertising & Campaigns",
      "Referral & Reputation",
    ],
    revenueFraming:
      "Practices investing in marketing without a conversion-optimized website and tracking are burning 40-60% of their spend.",
  },
  {
    slug: "revenue-cycle",
    name: "Revenue Cycle Health",
    description:
      "Examines your billing, collections, AR management, insurance verification, and financial controls.",
    questionCount: 40,
    status: "planned",
    primaryMapping: "Revenue Cycle OS",
    pillars: [
      "Collections Efficiency",
      "AR Management",
      "Insurance & Verification",
      "Financial Controls & Reporting",
    ],
    revenueFraming:
      "A practice collecting 93% instead of 98% on $2M production loses $100K/year to billing inefficiency alone.",
  },
  {
    slug: "retention",
    name: "Patient Retention & Recall",
    description:
      "Evaluates your hygiene compliance, reactivation systems, schedule optimization, and patient experience.",
    questionCount: 40,
    status: "planned",
    primaryMapping: "Recall Engine",
    pillars: [
      "Recall Compliance",
      "Reactivation Systems",
      "Schedule Optimization",
      "Patient Experience & Loyalty",
    ],
    revenueFraming:
      "Practices lose 15-20% of their patient base annually. Replacing a lost patient costs 5-7x more than retaining one.",
  },
  {
    slug: "data",
    name: "Data & Visibility",
    description:
      "Measures your KPI awareness, reporting infrastructure, marketing attribution, and data-driven decision making.",
    questionCount: 40,
    status: "planned",
    primaryMapping: "Data & Dashboard",
    pillars: [
      "KPI Awareness & Tracking",
      "Reporting Infrastructure",
      "Marketing Attribution",
      "Data-Driven Decision Making",
    ],
    revenueFraming:
      "You can't improve what you don't measure. Practices with real-time KPI dashboards grow 2-3x faster than those flying blind.",
  },
  {
    slug: "team",
    name: "Team Performance & Culture",
    description:
      "Assesses role clarity, training, communication, and culture — the people infrastructure behind your practice.",
    questionCount: 40,
    status: "planned",
    primaryMapping: "Team OS + FD & TC Performance",
    pillars: [
      "Role Clarity & Accountability",
      "Training & Development",
      "Communication & Alignment",
      "Culture & Retention",
    ],
    revenueFraming:
      "Team turnover costs 50-200% of annual salary per position. Losing 2-3 members/year costs $50K-$150K before counting production loss.",
  },
];

export function getAssessmentBySlug(slug: string): Assessment | undefined {
  return assessments.find((a) => a.slug === slug);
}

export function getFeaturedAssessment(): Assessment | undefined {
  return assessments.find((a) => a.featured);
}

export function getDeepDiveAssessments(): Assessment[] {
  return assessments.filter((a) => !a.featured);
}
