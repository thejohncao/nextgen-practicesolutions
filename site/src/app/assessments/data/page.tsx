import type { Metadata } from "next";
import { AssessmentComingSoon } from "@/components/assessments/AssessmentComingSoon";

export const metadata: Metadata = { title: "Data & Visibility Assessment" };

export default function DataAssessmentPage() {
  return (
    <AssessmentComingSoon
      title="Data & Visibility"
      description="Measure your KPI awareness, reporting infrastructure, marketing attribution, and data-driven decision making."
      questionCount={40}
      primaryMapping="Data & Dashboard"
    />
  );
}
