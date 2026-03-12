import type { Metadata } from "next";
import { AssessmentComingSoon } from "@/components/assessments/AssessmentComingSoon";

export const metadata: Metadata = { title: "Revenue Cycle Health Assessment" };

export default function RevenueCyclePage() {
  return (
    <AssessmentComingSoon
      title="Revenue Cycle Health"
      description="Examine your billing, collections, AR management, insurance verification, and financial controls."
      questionCount={40}
      primaryMapping="Revenue Cycle OS"
    />
  );
}
