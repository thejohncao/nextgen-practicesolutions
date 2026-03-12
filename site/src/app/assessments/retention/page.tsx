import type { Metadata } from "next";
import { AssessmentEngine } from "@/components/assessments/AssessmentEngine";
import { retentionConfig } from "@/data/assessment-retention";

export const metadata: Metadata = {
  title: "Patient Retention & Recall Assessment",
  description:
    "Evaluate your hygiene compliance, reactivation systems, schedule optimization, and patient experience across 40 questions.",
};

export default function RetentionPage() {
  return <AssessmentEngine config={retentionConfig} />;
}
