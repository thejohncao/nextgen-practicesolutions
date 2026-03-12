import type { Metadata } from "next";
import { AssessmentComingSoon } from "@/components/assessments/AssessmentComingSoon";

export const metadata: Metadata = { title: "Team Performance & Culture Assessment" };

export default function TeamAssessmentPage() {
  return (
    <AssessmentComingSoon
      title="Team Performance & Culture"
      description="Assess role clarity, training, communication, and culture — the people infrastructure behind your practice."
      questionCount={40}
      primaryMapping="Team OS + FD & TC Performance"
    />
  );
}
