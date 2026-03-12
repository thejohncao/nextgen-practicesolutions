import type { Metadata } from "next";
import { AssessmentEngine } from "@/components/assessments/AssessmentEngine";
import { acquisitionConfig } from "@/data/assessment-acquisition";

export const metadata: Metadata = {
  title: "Patient Acquisition Readiness Assessment",
  description:
    "Assess your marketing, online presence, paid advertising, and referral systems across 40 questions.",
};

export default function AcquisitionAssessmentPage() {
  return <AssessmentEngine config={acquisitionConfig} />;
}
