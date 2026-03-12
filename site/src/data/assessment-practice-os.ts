import { type AssessmentConfig, defaultScoreBands } from "@/lib/assessment-types";
import { practiceOSCategories } from "./practice-os";

// Generate assessment questions from the Practice OS artifact inventory
// Each artifact becomes a question: "Do you have [artifact] that is current and actively used?"
const pillars = practiceOSCategories.map((category) => ({
  name: category.name,
  questions: category.artifacts.map((artifact, idx) => ({
    id: `pos-${category.slug}-${idx + 1}`,
    pillar: category.name,
    question: `Do you have a ${artifact.name.toLowerCase()}? (${artifact.description})`,
  })),
}));

export const practiceOSAuditConfig: AssessmentConfig = {
  slug: "practice-os-audit",
  title: "Practice OS Completeness Audit",
  subtitle:
    "Evaluate whether your practice has the foundational documents and systems it needs. Score each artifact: Have it & use it (Yes), Have it but outdated (Partially), or Don't have it (No).",
  pillars,
  scoreBands: [
    { min: 90, max: 100, label: "Operationally Excellent", color: "var(--color-success)", description: "Your practice infrastructure is comprehensive and well-maintained. Focus on keeping it current." },
    { min: 70, max: 89, label: "Well-Structured", color: "var(--color-accent-teal)", description: "Strong foundation with some gaps. A few targeted builds will complete your operating system." },
    { min: 50, max: 69, label: "Partially Built", color: "var(--color-accent-gold)", description: "Key infrastructure exists but significant pieces are missing. Prioritize the highest-impact gaps." },
    { min: 25, max: 49, label: "Major Gaps", color: "var(--color-warning)", description: "Most foundational systems are missing or outdated. A structured buildout will transform your operations." },
    { min: 0, max: 24, label: "Starting Fresh", color: "var(--color-error)", description: "The practice is running on improvisation. Building even basic infrastructure will have immediate impact." },
  ],
  solutionMappings: [
    { gap: "Identity & Strategy", solution: "Patient Acquisition Engine", route: "/solutions/acquisition" },
    { gap: "Organizational Structure", solution: "Team OS", route: "/solutions/team-os" },
    { gap: "Clinical Operations", solution: "Narrative", route: "/narrative" },
    { gap: "Financial Operations", solution: "Revenue Cycle OS", route: "/solutions/revenue-cycle" },
    { gap: "Patient Experience", solution: "Speed-to-Lead", route: "/solutions/speed-to-lead" },
    { gap: "Marketing & Growth", solution: "Patient Acquisition Engine", route: "/solutions/acquisition" },
    { gap: "Compliance & Risk", solution: "Team OS", route: "/solutions/team-os" },
  ],
  revenueFraming: {
    headline: "The cost of operating without a system",
    description:
      "Practices without documented systems spend 20-30% more time on operational firefighting, experience 2-3x higher staff turnover, and leave significant revenue on the table through inconsistent processes. Building your Practice OS isn't overhead — it's the foundation that makes everything else work.",
  },
};
