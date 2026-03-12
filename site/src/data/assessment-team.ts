import { type AssessmentConfig, defaultScoreBands } from "@/lib/assessment-types";

export const teamConfig: AssessmentConfig = {
  slug: "team",
  title: "Team Performance & Culture Assessment",
  subtitle:
    "Assess role clarity, training, communication, and culture — the people infrastructure behind your practice. Team turnover costs 50-200% of annual salary per position.",
  scoreBands: defaultScoreBands,
  solutionMappings: [
    { gap: "Role Clarity & Accountability", solution: "Team OS", route: "/solutions/team-os" },
    { gap: "Training & Development", solution: "FD & TC Performance", route: "/solutions/tc-performance" },
    { gap: "Communication & Alignment", solution: "Team OS", route: "/solutions/team-os" },
    { gap: "Culture & Retention", solution: "Team OS", route: "/solutions/team-os" },
  ],
  revenueFraming: {
    headline: "What team turnover is costing you",
    description:
      "Team turnover costs 50-200% of annual salary per position. A practice losing 2-3 team members per year is spending $50K-$150K on replacement — before counting the production loss during vacancies and ramp-up periods for new hires.",
  },
  pillars: [
    {
      name: "Role Clarity & Accountability",
      questions: [
        { id: "tm-ra-1", pillar: "Role Clarity & Accountability", question: "Does every team member have a written role description?" },
        { id: "tm-ra-2", pillar: "Role Clarity & Accountability", question: "Are KPIs defined for every position?" },
        { id: "tm-ra-3", pillar: "Role Clarity & Accountability", question: "Do you conduct regular performance reviews (at least quarterly)?" },
        { id: "tm-ra-4", pillar: "Role Clarity & Accountability", question: "Is there a clear reporting structure with a current org chart?" },
        { id: "tm-ra-5", pillar: "Role Clarity & Accountability", question: "Is there an accountability structure for missed KPIs?" },
        { id: "tm-ra-6", pillar: "Role Clarity & Accountability", question: "Do team members have role-specific daily checklists?" },
        { id: "tm-ra-7", pillar: "Role Clarity & Accountability", question: "Is there a cross-training plan so roles can be covered during absences?" },
        { id: "tm-ra-8", pillar: "Role Clarity & Accountability", question: "Is there a defined career growth path for each role?" },
        { id: "tm-ra-9", pillar: "Role Clarity & Accountability", question: "Is compensation tied to performance metrics?" },
        { id: "tm-ra-10", pillar: "Role Clarity & Accountability", question: "Is underperformance addressed promptly and constructively?" },
      ],
    },
    {
      name: "Training & Development",
      questions: [
        { id: "tm-td-1", pillar: "Training & Development", question: "Is there a defined onboarding program per role (not just shadowing)?" },
        { id: "tm-td-2", pillar: "Training & Development", question: "Do new hires have 30/60/90 day milestones?" },
        { id: "tm-td-3", pillar: "Training & Development", question: "Is ongoing CE provided beyond clinical requirements?" },
        { id: "tm-td-4", pillar: "Training & Development", question: "Do treatment coordinators receive specific case presentation training?" },
        { id: "tm-td-5", pillar: "Training & Development", question: "Does the front desk receive phone and booking conversion training?" },
        { id: "tm-td-6", pillar: "Training & Development", question: "Do patient-facing staff receive financial conversation training?" },
        { id: "tm-td-7", pillar: "Training & Development", question: "Is there leadership development for office managers?" },
        { id: "tm-td-8", pillar: "Training & Development", question: "Is an annual training budget allocated?" },
        { id: "tm-td-9", pillar: "Training & Development", question: "Is training effectiveness measured?" },
        { id: "tm-td-10", pillar: "Training & Development", question: "Do you utilize external coaching or consulting?" },
      ],
    },
    {
      name: "Communication & Alignment",
      questions: [
        { id: "tm-ca-1", pillar: "Communication & Alignment", question: "Do you hold a daily morning huddle?" },
        { id: "tm-ca-2", pillar: "Communication & Alignment", question: "Do you have a weekly team meeting?" },
        { id: "tm-ca-3", pillar: "Communication & Alignment", question: "Do you do an end-of-day debrief or wrap-up?" },
        { id: "tm-ca-4", pillar: "Communication & Alignment", question: "Do you review complex upcoming cases as a team?" },
        { id: "tm-ca-5", pillar: "Communication & Alignment", question: "Are monthly and quarterly goals visible to the whole team?" },
        { id: "tm-ca-6", pillar: "Communication & Alignment", question: "Is there an anonymous feedback mechanism for team members?" },
        { id: "tm-ca-7", pillar: "Communication & Alignment", question: "Do you have a conflict resolution protocol?" },
        { id: "tm-ca-8", pillar: "Communication & Alignment", question: "Do doctors and TCs have regular alignment meetings?" },
        { id: "tm-ca-9", pillar: "Communication & Alignment", question: "Is there structured communication between clinical and admin teams?" },
        { id: "tm-ca-10", pillar: "Communication & Alignment", question: "Is the practice-wide vision and goals communicated and reinforced regularly?" },
      ],
    },
    {
      name: "Culture & Retention",
      questions: [
        { id: "tm-cr-1", pillar: "Culture & Retention", question: "Do you track team turnover rate?" },
        { id: "tm-cr-2", pillar: "Culture & Retention", question: "Do you conduct exit interviews when team members leave?" },
        { id: "tm-cr-3", pillar: "Culture & Retention", question: "Do you survey employee satisfaction?" },
        { id: "tm-cr-4", pillar: "Culture & Retention", question: "Is recognition and appreciation regular and specific?" },
        { id: "tm-cr-5", pillar: "Culture & Retention", question: "Do you hold team events or culture-building activities?" },
        { id: "tm-cr-6", pillar: "Culture & Retention", question: "Is compensation benchmarked as competitive for your market?" },
        { id: "tm-cr-7", pillar: "Culture & Retention", question: "Is the benefits package reviewed annually?" },
        { id: "tm-cr-8", pillar: "Culture & Retention", question: "Is work-life balance respected (scheduling, PTO)?" },
        { id: "tm-cr-9", pillar: "Culture & Retention", question: "Is team input sought on operational changes?" },
        { id: "tm-cr-10", pillar: "Culture & Retention", question: "Is culture explicitly defined and hiring aligned to it?" },
      ],
    },
  ],
};
