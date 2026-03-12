import type { Metadata } from "next";
import { AssessmentEngine } from "@/components/assessments/AssessmentEngine";
import { teamConfig } from "@/data/assessment-team";

export const metadata: Metadata = {
  title: "Team Performance & Culture Assessment",
  description:
    "Assess role clarity, training, communication, and culture — the people infrastructure behind your practice — across 40 questions.",
};

export default function TeamAssessmentPage() {
  return <AssessmentEngine config={teamConfig} />;
}
