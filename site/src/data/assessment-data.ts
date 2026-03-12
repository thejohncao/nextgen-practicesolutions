import { type AssessmentConfig, defaultScoreBands } from "@/lib/assessment-types";

export const dataConfig: AssessmentConfig = {
  slug: "data",
  title: "Data & Visibility Assessment",
  subtitle:
    "Measure your KPI awareness, reporting infrastructure, marketing attribution, and data-driven decision making. You can't improve what you don't measure.",
  scoreBands: defaultScoreBands,
  solutionMappings: [
    { gap: "KPI Awareness & Tracking", solution: "Data & Dashboard", route: "/solutions/dashboard" },
    { gap: "Reporting Infrastructure", solution: "Data & Dashboard", route: "/solutions/dashboard" },
    { gap: "Marketing Attribution", solution: "Patient Acquisition Engine", route: "/solutions/acquisition" },
    { gap: "Data-Driven Decision Making", solution: "Data & Dashboard", route: "/solutions/dashboard" },
  ],
  revenueFraming: {
    headline: "The cost of flying blind",
    description:
      "You can't improve what you don't measure. Practices with real-time KPI dashboards grow 2-3x faster than those flying blind. Without data, every decision — hiring, marketing spend, fee schedules, scheduling — is a guess.",
  },
  pillars: [
    {
      name: "KPI Awareness & Tracking",
      questions: [
        { id: "dat-kpi-1", pillar: "KPI Awareness & Tracking", question: "Can the practice owner name the top 5 KPIs for the practice?" },
        { id: "dat-kpi-2", pillar: "KPI Awareness & Tracking", question: "Are KPIs reviewed weekly (not just monthly or quarterly)?" },
        { id: "dat-kpi-3", pillar: "KPI Awareness & Tracking", question: "Is production tracked daily?" },
        { id: "dat-kpi-4", pillar: "KPI Awareness & Tracking", question: "Are collections tracked and compared to production regularly?" },
        { id: "dat-kpi-5", pillar: "KPI Awareness & Tracking", question: "Is new patient count tracked by source?" },
        { id: "dat-kpi-6", pillar: "KPI Awareness & Tracking", question: "Is case acceptance rate tracked?" },
        { id: "dat-kpi-7", pillar: "KPI Awareness & Tracking", question: "Is hygiene production per hour tracked?" },
        { id: "dat-kpi-8", pillar: "KPI Awareness & Tracking", question: "Are cancellation and no-show rates tracked?" },
        { id: "dat-kpi-9", pillar: "KPI Awareness & Tracking", question: "Is patient attrition rate known?" },
        { id: "dat-kpi-10", pillar: "KPI Awareness & Tracking", question: "Is overhead ratio monitored against benchmarks?" },
      ],
    },
    {
      name: "Reporting Infrastructure",
      questions: [
        { id: "dat-ri-1", pillar: "Reporting Infrastructure", question: "Does the practice have a dashboard (not just PMS reports)?" },
        { id: "dat-ri-2", pillar: "Reporting Infrastructure", question: "Is the dashboard real-time or refreshed daily?" },
        { id: "dat-ri-3", pillar: "Reporting Infrastructure", question: "Are reports accessible to team leads (not just the owner)?" },
        { id: "dat-ri-4", pillar: "Reporting Infrastructure", question: "Do you have provider-level production reports?" },
        { id: "dat-ri-5", pillar: "Reporting Infrastructure", question: "Is procedure-level reporting available?" },
        { id: "dat-ri-6", pillar: "Reporting Infrastructure", question: "Do you have marketing ROI reporting?" },
        { id: "dat-ri-7", pillar: "Reporting Infrastructure", question: "Is financial reporting separate from clinical reporting?" },
        { id: "dat-ri-8", pillar: "Reporting Infrastructure", question: "Are reports generated automatically (not manually pulled)?" },
        { id: "dat-ri-9", pillar: "Reporting Infrastructure", question: "Do you do historical trend analysis (month-over-month, year-over-year)?" },
        { id: "dat-ri-10", pillar: "Reporting Infrastructure", question: "Do you benchmark your metrics against industry standards?" },
      ],
    },
    {
      name: "Marketing Attribution",
      questions: [
        { id: "dat-ma-1", pillar: "Marketing Attribution", question: "Are new patients asked 'how did you hear about us' at every visit?" },
        { id: "dat-ma-2", pillar: "Marketing Attribution", question: "Do you use call tracking numbers by campaign/channel?" },
        { id: "dat-ma-3", pillar: "Marketing Attribution", question: "Do you track web form source attribution?" },
        { id: "dat-ma-4", pillar: "Marketing Attribution", question: "Is Google Analytics (or equivalent) installed and reviewed regularly?" },
        { id: "dat-ma-5", pillar: "Marketing Attribution", question: "Is cost per lead calculated by channel?" },
        { id: "dat-ma-6", pillar: "Marketing Attribution", question: "Is cost per booked patient calculated (not just cost per lead)?" },
        { id: "dat-ma-7", pillar: "Marketing Attribution", question: "Is marketing spend tracked as a percentage of revenue?" },
        { id: "dat-ma-8", pillar: "Marketing Attribution", question: "Do you calculate ROI by campaign type?" },
        { id: "dat-ma-9", pillar: "Marketing Attribution", question: "Is your attribution model documented?" },
        { id: "dat-ma-10", pillar: "Marketing Attribution", question: "Is marketing budget adjusted based on performance data?" },
      ],
    },
    {
      name: "Data-Driven Decision Making",
      questions: [
        { id: "dat-dd-1", pillar: "Data-Driven Decision Making", question: "Was the last major business decision made based on data (not gut feeling)?" },
        { id: "dat-dd-2", pillar: "Data-Driven Decision Making", question: "Do team meetings include KPI review?" },
        { id: "dat-dd-3", pillar: "Data-Driven Decision Making", question: "Are hiring decisions informed by production and capacity data?" },
        { id: "dat-dd-4", pillar: "Data-Driven Decision Making", question: "Are fee schedule adjustments based on UCR data?" },
        { id: "dat-dd-5", pillar: "Data-Driven Decision Making", question: "Is marketing budget allocated by channel performance data?" },
        { id: "dat-dd-6", pillar: "Data-Driven Decision Making", question: "Are schedule templates designed from production analysis?" },
        { id: "dat-dd-7", pillar: "Data-Driven Decision Making", question: "Is compensation tied to measurable KPIs?" },
        { id: "dat-dd-8", pillar: "Data-Driven Decision Making", question: "Are technology investments justified by projected ROI?" },
        { id: "dat-dd-9", pillar: "Data-Driven Decision Making", question: "Are patient experience changes driven by survey data?" },
        { id: "dat-dd-10", pillar: "Data-Driven Decision Making", question: "Does the annual planning process use prior year data analysis?" },
      ],
    },
  ],
};
