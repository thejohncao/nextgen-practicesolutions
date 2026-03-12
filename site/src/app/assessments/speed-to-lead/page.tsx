import type { Metadata } from "next";
import { AssessmentEngine } from "@/components/assessments/AssessmentEngine";
import { speedToLeadConfig } from "@/data/assessment-speed-to-lead";

export const metadata: Metadata = {
  title: "Speed-to-Lead & Front Desk Assessment",
  description:
    "Evaluate your inbound lead handling, call response times, multi-channel coverage, and booking conversion across 40 questions.",
};

export default function SpeedToLeadAssessmentPage() {
  return <AssessmentEngine config={speedToLeadConfig} />;
}
