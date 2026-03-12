import type { Metadata } from "next";
import { AssessmentEngine } from "@/components/assessments/AssessmentEngine";
import { dataConfig } from "@/data/assessment-data";

export const metadata: Metadata = {
  title: "Data & Visibility Assessment",
  description:
    "Measure your KPI awareness, reporting infrastructure, marketing attribution, and data-driven decision making across 40 questions.",
};

export default function DataAssessmentPage() {
  return <AssessmentEngine config={dataConfig} />;
}
