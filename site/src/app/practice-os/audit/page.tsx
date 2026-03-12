import type { Metadata } from "next";
import { AssessmentEngine } from "@/components/assessments/AssessmentEngine";
import { practiceOSAuditConfig } from "@/data/assessment-practice-os";

export const metadata: Metadata = {
  title: "Practice OS Completeness Audit",
  description:
    "Evaluate whether your practice has the foundational documents and systems it needs across 7 categories and 52 artifacts.",
};

export default function PracticeOSAuditPage() {
  return <AssessmentEngine config={practiceOSAuditConfig} />;
}
