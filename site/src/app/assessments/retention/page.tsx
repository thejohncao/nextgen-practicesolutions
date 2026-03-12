import type { Metadata } from "next";
import { AssessmentComingSoon } from "@/components/assessments/AssessmentComingSoon";

export const metadata: Metadata = { title: "Patient Retention & Recall Assessment" };

export default function RetentionPage() {
  return (
    <AssessmentComingSoon
      title="Patient Retention & Recall"
      description="Evaluate your hygiene compliance, reactivation systems, schedule optimization, and patient experience."
      questionCount={40}
      primaryMapping="Recall Engine"
    />
  );
}
