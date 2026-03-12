import type { Metadata } from "next";
import { AssessmentEngine } from "@/components/assessments/AssessmentEngine";
import { revenueCycleConfig } from "@/data/assessment-revenue-cycle";

export const metadata: Metadata = {
  title: "Revenue Cycle Health Assessment",
  description:
    "Examine your billing, collections, AR management, insurance verification, and financial controls across 40 questions.",
};

export default function RevenueCyclePage() {
  return <AssessmentEngine config={revenueCycleConfig} />;
}
