import { type AssessmentConfig, defaultScoreBands } from "@/lib/assessment-types";

export const revenueCycleConfig: AssessmentConfig = {
  slug: "revenue-cycle",
  title: "Revenue Cycle Health Assessment",
  subtitle:
    "Examine your billing, collections, AR management, insurance verification, and financial controls. A practice collecting 93% instead of 98% on $2M production loses $100K/year.",
  scoreBands: defaultScoreBands,
  solutionMappings: [
    { gap: "Collections Efficiency", solution: "Revenue Cycle OS", route: "/solutions/revenue-cycle" },
    { gap: "AR Management", solution: "Revenue Cycle OS", route: "/solutions/revenue-cycle" },
    { gap: "Insurance & Verification", solution: "Revenue Cycle OS", route: "/solutions/revenue-cycle" },
    { gap: "Financial Controls & Reporting", solution: "Data & Dashboard", route: "/solutions/dashboard" },
  ],
  revenueFraming: {
    headline: "What billing inefficiency is costing you",
    description:
      "A practice collecting 93% instead of 98% on $2M production loses $100K/year to billing inefficiency alone. Add in undercoded procedures, missed insurance benefits, and unworked AR, and the true cost is often 2-3x higher.",
  },
  pillars: [
    {
      name: "Collections Efficiency",
      questions: [
        { id: "rc-ce-1", pillar: "Collections Efficiency", question: "Is your collection rate consistently at or above 98% of adjusted production?" },
        { id: "rc-ce-2", pillar: "Collections Efficiency", question: "Do you have a same-day payment collection protocol at checkout?" },
        { id: "rc-ce-3", pillar: "Collections Efficiency", question: "Do you follow up on patient balances within 30 days of service?" },
        { id: "rc-ce-4", pillar: "Collections Efficiency", question: "Do you have a credit card on file policy for all patients?" },
        { id: "rc-ce-5", pillar: "Collections Efficiency", question: "Do you actively monitor patients on payment plans for missed payments?" },
        { id: "rc-ce-6", pillar: "Collections Efficiency", question: "Do you collect over-the-counter patient portions at checkout before they leave?" },
        { id: "rc-ce-7", pillar: "Collections Efficiency", question: "Are batch payments posted within 24-48 hours of receipt?" },
        { id: "rc-ce-8", pillar: "Collections Efficiency", question: "Do you categorize adjustments and write-offs for tracking and analysis?" },
        { id: "rc-ce-9", pillar: "Collections Efficiency", question: "Do you track collections KPIs (collection rate, days in AR, etc.) weekly?" },
        { id: "rc-ce-10", pillar: "Collections Efficiency", question: "Is there clear staff accountability for collections performance?" },
      ],
    },
    {
      name: "AR Management",
      questions: [
        { id: "rc-ar-1", pillar: "AR Management", question: "Do you review your AR aging report at least weekly?" },
        { id: "rc-ar-2", pillar: "AR Management", question: "Is your 60+ day AR less than 15% of total receivables?" },
        { id: "rc-ar-3", pillar: "AR Management", question: "Do you have a documented protocol for 90+ day accounts?" },
        { id: "rc-ar-4", pillar: "AR Management", question: "Do you follow up on insurance claims within 14 days of submission?" },
        { id: "rc-ar-5", pillar: "AR Management", question: "Do you have a denial management process with root cause tracking?" },
        { id: "rc-ar-6", pillar: "AR Management", question: "Do you appeal underpayments from insurance carriers?" },
        { id: "rc-ar-7", pillar: "AR Management", question: "Are aging buckets assigned to specific team members for ownership?" },
        { id: "rc-ar-8", pillar: "AR Management", question: "Do you have a documented bad debt write-off policy with approval thresholds?" },
        { id: "rc-ar-9", pillar: "AR Management", question: "Do you send patient balance statements on a regular cadence?" },
        { id: "rc-ar-10", pillar: "AR Management", question: "Do you set and track AR reduction targets monthly?" },
      ],
    },
    {
      name: "Insurance & Verification",
      questions: [
        { id: "rc-iv-1", pillar: "Insurance & Verification", question: "Are benefits verified before every scheduled appointment?" },
        { id: "rc-iv-2", pillar: "Insurance & Verification", question: "Do you use real-time eligibility checking (not just calling the carrier)?" },
        { id: "rc-iv-3", pillar: "Insurance & Verification", question: "Are fee schedules loaded per payor in your practice management system?" },
        { id: "rc-iv-4", pillar: "Insurance & Verification", question: "Do you track insurance aging separately from patient aging?" },
        { id: "rc-iv-5", pillar: "Insurance & Verification", question: "Do you have a coordination of benefits protocol for dual-coverage patients?" },
        { id: "rc-iv-6", pillar: "Insurance & Verification", question: "Do you have a preauthorization workflow for major treatment plans?" },
        { id: "rc-iv-7", pillar: "Insurance & Verification", question: "Do you analyze insurance write-offs to identify underpaying carriers?" },
        { id: "rc-iv-8", pillar: "Insurance & Verification", question: "Do you have an out-of-network strategy (if applicable to your practice)?" },
        { id: "rc-iv-9", pillar: "Insurance & Verification", question: "Do you update fee schedules annually based on UCR data?" },
        { id: "rc-iv-10", pillar: "Insurance & Verification", question: "Do you benchmark your fees against UCR for your region?" },
      ],
    },
    {
      name: "Financial Controls & Reporting",
      questions: [
        { id: "rc-fc-1", pillar: "Financial Controls & Reporting", question: "Does the practice owner review a monthly P&L statement?" },
        { id: "rc-fc-2", pillar: "Financial Controls & Reporting", question: "Do you analyze the gap between production and collections monthly?" },
        { id: "rc-fc-3", pillar: "Financial Controls & Reporting", question: "Do you track your overhead ratio and compare against benchmarks?" },
        { id: "rc-fc-4", pillar: "Financial Controls & Reporting", question: "Do you have provider-level production reports?" },
        { id: "rc-fc-5", pillar: "Financial Controls & Reporting", question: "Do you analyze profitability at the procedure level?" },
        { id: "rc-fc-6", pillar: "Financial Controls & Reporting", question: "Do you benchmark payroll as a percentage of collections?" },
        { id: "rc-fc-7", pillar: "Financial Controls & Reporting", question: "Do you monitor supply costs as a percentage of production?" },
        { id: "rc-fc-8", pillar: "Financial Controls & Reporting", question: "Do you track lab costs separately and benchmark them?" },
        { id: "rc-fc-9", pillar: "Financial Controls & Reporting", question: "Is there a financial dashboard accessible to the practice owner at any time?" },
        { id: "rc-fc-10", pillar: "Financial Controls & Reporting", question: "Do you have an annual budget and forecast process?" },
      ],
    },
  ],
};
