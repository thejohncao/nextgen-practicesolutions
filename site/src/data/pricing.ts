export interface PricingTier {
  name: string;
  description: string;
  highlight?: boolean;
  features: {
    solution: string;
    included: boolean | "partial";
  }[];
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Essential systems to stop the biggest revenue leaks and build a foundation for growth.",
    features: [
      { solution: "Patient Acquisition Engine", included: "partial" },
      { solution: "Website & Conversion Stack", included: true },
      { solution: "Speed-to-Lead", included: true },
      { solution: "AI Front Desk", included: false },
      { solution: "Recall Engine", included: "partial" },
      { solution: "Revenue Cycle OS", included: false },
      { solution: "Team OS", included: false },
      { solution: "Data & Dashboard", included: "partial" },
      { solution: "Narrative", included: false },
      { solution: "FD & TC Performance", included: false },
    ],
    cta: "Book a Strategy Call",
  },
  {
    name: "Growth",
    description: "Full marketing engine, operational systems, and team infrastructure to scale predictably.",
    highlight: true,
    features: [
      { solution: "Patient Acquisition Engine", included: true },
      { solution: "Website & Conversion Stack", included: true },
      { solution: "Speed-to-Lead", included: true },
      { solution: "AI Front Desk", included: true },
      { solution: "Recall Engine", included: true },
      { solution: "Revenue Cycle OS", included: true },
      { solution: "Team OS", included: "partial" },
      { solution: "Data & Dashboard", included: true },
      { solution: "Narrative", included: false },
      { solution: "FD & TC Performance", included: "partial" },
    ],
    cta: "Book a Strategy Call",
  },
  {
    name: "Full",
    description: "Everything — the complete NextGen Practice Operating System with all 10 solutions deployed.",
    features: [
      { solution: "Patient Acquisition Engine", included: true },
      { solution: "Website & Conversion Stack", included: true },
      { solution: "Speed-to-Lead", included: true },
      { solution: "AI Front Desk", included: true },
      { solution: "Recall Engine", included: true },
      { solution: "Revenue Cycle OS", included: true },
      { solution: "Team OS", included: true },
      { solution: "Data & Dashboard", included: true },
      { solution: "Narrative", included: true },
      { solution: "FD & TC Performance", included: true },
    ],
    cta: "Book a Strategy Call",
  },
];
