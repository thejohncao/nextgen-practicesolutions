export interface Artifact {
  name: string;
  description: string;
  nextgenOffer: string;
}

export interface PracticeOSCategory {
  slug: string;
  name: string;
  icon: string;
  description: string;
  artifacts: Artifact[];
}

export const practiceOSCategories: PracticeOSCategory[] = [
  {
    slug: "identity",
    name: "Identity & Strategy",
    icon: "Target",
    description: "The foundational documents that define who you are, where you're going, and how you compete.",
    artifacts: [
      { name: "Mission / Vision / Values", description: "Why the practice exists, where it's going, what it stands for", nextgenOffer: "Consulting" },
      { name: "Practice Positioning Statement", description: "Who you serve, what makes you different, your clinical philosophy", nextgenOffer: "Patient Acquisition Engine" },
      { name: "Ideal Patient Profile", description: "Demographics, case types, insurance mix, psychographic profile", nextgenOffer: "Patient Acquisition Engine" },
      { name: "1-Year Growth Targets", description: "Production, collections, new patients, case acceptance, hygiene targets", nextgenOffer: "Data & Dashboard" },
      { name: "3-Year Strategic Plan", description: "Expansion, provider additions, service line growth, technology roadmap", nextgenOffer: "Consulting" },
      { name: "Competitive Positioning", description: "How you differentiate vs. 3-5 nearest competitors", nextgenOffer: "Website & Conversion Stack" },
      { name: "Brand Guidelines", description: "Logo, colors, voice, photography style, messaging dos/don'ts", nextgenOffer: "Website & Conversion Stack" },
    ],
  },
  {
    slug: "organization",
    name: "Organizational Structure",
    icon: "Users",
    description: "The people infrastructure — roles, accountability, compensation, and team development.",
    artifacts: [
      { name: "Org Chart", description: "Every role, reporting lines, filled vs. open positions", nextgenOffer: "Team OS" },
      { name: "Role Descriptions + KPIs", description: "One per position: responsibilities, metrics, success criteria", nextgenOffer: "Team OS" },
      { name: "Compensation Structure", description: "Base, bonus triggers, benefits, review cadence per role", nextgenOffer: "Team OS" },
      { name: "Onboarding Checklist (per role)", description: "Week 1 / 30-day / 60-day / 90-day milestones and deliverables", nextgenOffer: "FD & TC Performance" },
      { name: "Team Directory", description: "Contact info, certifications, CE tracking, license renewal dates", nextgenOffer: "Team OS" },
      { name: "Cross-Training Matrix", description: "Who can cover what roles, training gaps, backup assignments", nextgenOffer: "Team OS" },
      { name: "Annual Review Template", description: "Structured performance review tied to role KPIs", nextgenOffer: "Team OS" },
    ],
  },
  {
    slug: "clinical",
    name: "Clinical Operations",
    icon: "Stethoscope",
    description: "The clinical workflows, schedules, and protocols that drive production and patient care.",
    artifacts: [
      { name: "Production Calendar", description: "Daily/weekly/monthly targets by provider, tracked against actual", nextgenOffer: "Data & Dashboard" },
      { name: "Schedule Templates", description: "Ideal day blocks — hygiene, restorative, surgical, consult", nextgenOffer: "Recall Engine" },
      { name: "Case Presentation SOP", description: "Diagnosis → warm handoff → TC presentation → acceptance workflow", nextgenOffer: "Narrative" },
      { name: "Clinical Protocols (by procedure)", description: "Step-by-step for crown prep, implant placement, SRP, etc.", nextgenOffer: "—" },
      { name: "Morning Huddle Template", description: "What to review: schedule, high-value cases, flags, goals", nextgenOffer: "Team OS" },
      { name: "Emergency / Urgent Protocol", description: "Triage criteria, scheduling priority, after-hours escalation", nextgenOffer: "—" },
      { name: "Lab & Supply Management", description: "Vendor list, order cadence, cost tracking, quality benchmarks", nextgenOffer: "Revenue Cycle OS" },
      { name: "Equipment Maintenance Schedule", description: "PM schedule, service contracts, replacement planning", nextgenOffer: "—" },
    ],
  },
  {
    slug: "financial",
    name: "Financial Operations",
    icon: "DollarSign",
    description: "The financial systems that ensure you collect what you produce and manage costs effectively.",
    artifacts: [
      { name: "Fee Schedule (current, benchmarked)", description: "All procedure fees, last update date, UCR comparison", nextgenOffer: "Revenue Cycle OS" },
      { name: "Insurance Participation List", description: "Active payors, fee schedules per payor, credentialing status", nextgenOffer: "Revenue Cycle OS" },
      { name: "Collections Protocol", description: "AR aging workflow, who works which buckets, escalation steps", nextgenOffer: "Revenue Cycle OS" },
      { name: "Membership Plan Structure", description: "Tiers, pricing, included services, discount structure, terms", nextgenOffer: "Narrative" },
      { name: "Financing Partner Agreements", description: "CareCredit, Cherry, Affirm, Proceed — terms, integration, training", nextgenOffer: "Narrative" },
      { name: "Monthly P&L Review Cadence", description: "When reviewed, by whom, what actions taken, variance thresholds", nextgenOffer: "Data & Dashboard" },
      { name: "Overhead Benchmarks", description: "Rent, payroll, supplies, lab, marketing — tracked against targets", nextgenOffer: "Data & Dashboard" },
      { name: "Write-Off & Adjustment Policy", description: "Categories, approval thresholds, tracking, quarterly review", nextgenOffer: "Revenue Cycle OS" },
    ],
  },
  {
    slug: "patient-experience",
    name: "Patient Experience",
    icon: "Heart",
    description: "The patient-facing workflows from first contact to ongoing care and reactivation.",
    artifacts: [
      { name: "New Patient Intake Flow", description: "First contact → scheduling → pre-visit → arrival → exam → follow-up", nextgenOffer: "Speed-to-Lead" },
      { name: "Treatment Presentation SOP", description: "The Narrative workflow — Five Yes's, phased care, financial options", nextgenOffer: "Narrative" },
      { name: "Financial Presentation SOP", description: "When/how to present cost, financing scripts, objection handling", nextgenOffer: "Narrative" },
      { name: "Follow-Up & Reactivation Protocols", description: "Unaccepted TX, recall, reactivation at 30/60/90 days", nextgenOffer: "Recall Engine" },
      { name: "Patient Communication Templates", description: "Confirmation, recall, post-op, reactivation, birthday, referral", nextgenOffer: "Recall Engine" },
      { name: "Review & Referral Generation", description: "When to ask, how to ask, which platforms, response protocol", nextgenOffer: "Patient Acquisition Engine" },
      { name: "Complaint / Service Recovery", description: "Escalation path, resolution authority, documentation, follow-up", nextgenOffer: "Team OS" },
      { name: "Patient Satisfaction Survey", description: "What to ask, when to send, how to act on results", nextgenOffer: "Data & Dashboard" },
    ],
  },
  {
    slug: "marketing",
    name: "Marketing & Growth",
    icon: "Megaphone",
    description: "The marketing infrastructure that drives new patient acquisition and brand visibility.",
    artifacts: [
      { name: "Annual Marketing Plan", description: "Channels, budget, targets, seasonal campaigns, accountability", nextgenOffer: "Patient Acquisition Engine" },
      { name: "Content Calendar", description: "Blog, social, email — topics, cadence, ownership", nextgenOffer: "Patient Acquisition Engine" },
      { name: "Campaign Playbooks", description: "Reusable templates: seasonal promo, new service launch, reactivation", nextgenOffer: "Patient Acquisition Engine" },
      { name: "Website & SEO Checklist", description: "Monthly audit: rankings, speed, content updates, conversion rate", nextgenOffer: "Website & Conversion Stack" },
      { name: "Social Media Strategy", description: "Platforms, posting cadence, content mix, engagement protocol", nextgenOffer: "Patient Acquisition Engine" },
      { name: "Tracking & Attribution Framework", description: "Call tracking, UTMs, form attribution, cost per lead/booking", nextgenOffer: "Data & Dashboard" },
      { name: "Referral Program Documentation", description: "Patient referral incentives, professional referral network, tracking", nextgenOffer: "Patient Acquisition Engine" },
    ],
  },
  {
    slug: "compliance",
    name: "Compliance & Risk",
    icon: "Shield",
    description: "The regulatory, legal, and risk management infrastructure that protects your practice.",
    artifacts: [
      { name: "HIPAA Compliance Checklist", description: "Annual audit, training log, BAAs, breach protocol", nextgenOffer: "—" },
      { name: "OSHA Protocols", description: "Infection control, exposure plan, training documentation", nextgenOffer: "—" },
      { name: "Employee Handbook", description: "Policies, PTO, conduct, social media, termination procedures", nextgenOffer: "Team OS" },
      { name: "Incident Reporting Procedure", description: "Clinical incidents, patient complaints, near-misses", nextgenOffer: "—" },
      { name: "Business Insurance Documentation", description: "Malpractice, general liability, property, cyber, workers' comp", nextgenOffer: "—" },
      { name: "Business Continuity Plan", description: "Disaster recovery, data backup, emergency operations", nextgenOffer: "—" },
      { name: "Credentialing & License Tracker", description: "Provider licenses, DEA, state registrations, renewal dates", nextgenOffer: "Team OS" },
    ],
  },
];

export function getCategoryBySlug(slug: string): PracticeOSCategory | undefined {
  return practiceOSCategories.find((c) => c.slug === slug);
}
