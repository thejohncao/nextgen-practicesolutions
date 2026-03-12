import { type AssessmentConfig, defaultScoreBands } from "@/lib/assessment-types";

export const retentionConfig: AssessmentConfig = {
  slug: "retention",
  title: "Patient Retention & Recall Assessment",
  subtitle:
    "Evaluate your hygiene compliance, reactivation systems, schedule optimization, and patient experience. Practices lose 15-20% of their patient base annually.",
  scoreBands: defaultScoreBands,
  solutionMappings: [
    { gap: "Recall Compliance", solution: "Recall Engine", route: "/solutions/recall" },
    { gap: "Reactivation Systems", solution: "Recall Engine", route: "/solutions/recall" },
    { gap: "Schedule Optimization", solution: "Recall Engine", route: "/solutions/recall" },
    { gap: "Patient Experience & Loyalty", solution: "Patient Acquisition Engine", route: "/solutions/acquisition" },
  ],
  revenueFraming: {
    headline: "What patient attrition is costing you",
    description:
      "Practices lose 15-20% of their patient base annually. Replacing a lost patient costs 5-7x more than retaining one. If your practice has 2,000 active patients and loses 15% per year, that's 300 patients — at $500 average annual value, that's $150K in lost recurring revenue.",
  },
  pillars: [
    {
      name: "Recall Compliance",
      questions: [
        { id: "ret-rc-1", pillar: "Recall Compliance", question: "Do you track your recall compliance rate as a KPI?" },
        { id: "ret-rc-2", pillar: "Recall Compliance", question: "Do you schedule the next hygiene appointment before the patient leaves?" },
        { id: "ret-rc-3", pillar: "Recall Compliance", question: "Do you customize recall intervals by patient risk level?" },
        { id: "ret-rc-4", pillar: "Recall Compliance", question: "Do you maintain and actively work an overdue recall list?" },
        { id: "ret-rc-5", pillar: "Recall Compliance", question: "Do you benchmark recall compliance against targets (e.g., 85%+)?" },
        { id: "ret-rc-6", pillar: "Recall Compliance", question: "Do you track hygiene production by provider?" },
        { id: "ret-rc-7", pillar: "Recall Compliance", question: "Do you track perio maintenance compliance separately from prophy?" },
        { id: "ret-rc-8", pillar: "Recall Compliance", question: "Is continuing care percentage tracked as a KPI?" },
        { id: "ret-rc-9", pillar: "Recall Compliance", question: "Do you track same-day reappointment rate for hygiene?" },
        { id: "ret-rc-10", pillar: "Recall Compliance", question: "Do you measure recall effectiveness by communication channel (text, email, call)?" },
      ],
    },
    {
      name: "Reactivation Systems",
      questions: [
        { id: "ret-rs-1", pillar: "Reactivation Systems", question: "Do you have defined reactivation campaigns at 30/60/90+ day intervals?" },
        { id: "ret-rs-2", pillar: "Reactivation Systems", question: "Do you use multi-channel reactivation (email, text, call, mail)?" },
        { id: "ret-rs-3", pillar: "Reactivation Systems", question: "Does your reactivation messaging include specific treatment context?" },
        { id: "ret-rs-4", pillar: "Reactivation Systems", question: "Do you segment lapsed patients by time since last visit and treatment value?" },
        { id: "ret-rs-5", pillar: "Reactivation Systems", question: "Do you do personal outreach for high-value lapsed patients?" },
        { id: "ret-rs-6", pillar: "Reactivation Systems", question: "Do you track reactivation conversion rate?" },
        { id: "ret-rs-7", pillar: "Reactivation Systems", question: "Do you offer win-back incentives for lapsed patients?" },
        { id: "ret-rs-8", pillar: "Reactivation Systems", question: "Can you attribute reactivated patients to specific campaigns?" },
        { id: "ret-rs-9", pillar: "Reactivation Systems", question: "Do you know your annual patient attrition rate?" },
        { id: "ret-rs-10", pillar: "Reactivation Systems", question: "Have you calculated the cost of replacing a lost patient vs. retaining one?" },
      ],
    },
    {
      name: "Schedule Optimization",
      questions: [
        { id: "ret-so-1", pillar: "Schedule Optimization", question: "Do you track your hygiene schedule utilization rate?" },
        { id: "ret-so-2", pillar: "Schedule Optimization", question: "Do you have a same-day fill protocol for cancellations?" },
        { id: "ret-so-3", pillar: "Schedule Optimization", question: "Do you have a waitlist management system?" },
        { id: "ret-so-4", pillar: "Schedule Optimization", question: "Do you use ideal day scheduling templates?" },
        { id: "ret-so-5", pillar: "Schedule Optimization", question: "Do you optimize provider schedules for production per hour?" },
        { id: "ret-so-6", pillar: "Schedule Optimization", question: "Do you use block scheduling for high-value procedures?" },
        { id: "ret-so-7", pillar: "Schedule Optimization", question: "Do you reserve new patient slots in your schedule?" },
        { id: "ret-so-8", pillar: "Schedule Optimization", question: "Do you have an emergency/urgent slot management protocol?" },
        { id: "ret-so-9", pillar: "Schedule Optimization", question: "Do you send appointment confirmations at 48hr, 24hr, and day-of?" },
        { id: "ret-so-10", pillar: "Schedule Optimization", question: "Do you enforce your late cancellation and no-show policy?" },
      ],
    },
    {
      name: "Patient Experience & Loyalty",
      questions: [
        { id: "ret-pe-1", pillar: "Patient Experience & Loyalty", question: "Do you follow up with patients after visits (call, text, or email)?" },
        { id: "ret-pe-2", pillar: "Patient Experience & Loyalty", question: "Do you send patient satisfaction surveys?" },
        { id: "ret-pe-3", pillar: "Patient Experience & Loyalty", question: "Do you have a complaint/service recovery protocol?" },
        { id: "ret-pe-4", pillar: "Patient Experience & Loyalty", question: "Do you send birthday or milestone communications?" },
        { id: "ret-pe-5", pillar: "Patient Experience & Loyalty", question: "Do you have a loyalty or membership program?" },
        { id: "ret-pe-6", pillar: "Patient Experience & Loyalty", question: "Do you actively promote your referral program to existing patients?" },
        { id: "ret-pe-7", pillar: "Patient Experience & Loyalty", question: "Do you track patient communication preferences (text vs. email vs. call)?" },
        { id: "ret-pe-8", pillar: "Patient Experience & Loyalty", question: "Do you personalize recall messaging based on patient history?" },
        { id: "ret-pe-9", pillar: "Patient Experience & Loyalty", question: "Do you engage with patients on social media?" },
        { id: "ret-pe-10", pillar: "Patient Experience & Loyalty", question: "Do you have a patient advisory board or formal feedback loop?" },
      ],
    },
  ],
};
