
import { AgentResult } from "@/types/agentResults";

// Result data organized by agent
export const agentResults: AgentResult[] = [
  {
    agent: "Giselle",
    agentName: "Giselle",
    title: "+124% Increase in New Patient Leads",
    value: "+124%",
    role: "Growth Specialist",
    color: "green",
    description: "Giselle's AI Growth Engine nurtured inbound leads and booked more consultations without adding marketing budget."
  },
  {
    agent: "Giselle",
    agentName: "Giselle",
    title: "3x Faster Lead Follow-Up",
    value: "3x",
    role: "Growth Specialist",
    color: "green",
    description: "Automated workflows replied to patient inquiries within minutes, capturing more opportunities before competitors could."
  },
  {
    agent: "Giselle",
    agentName: "Giselle",
    title: "68% Boost in Google Reviews",
    value: "68%",
    role: "Growth Specialist",
    color: "green",
    description: "Giselle's automated review collection system helped increase positive reviews and online reputation significantly."
  },
  {
    agent: "Miles",
    agentName: "Miles",
    title: "95% Reduction in No-Show Appointments",
    value: "95%",
    role: "Front Office Concierge",
    color: "blue",
    description: "With personalized AI reminders, practices saw no-shows drop drastically — protecting their daily production schedule."
  },
  {
    agent: "Miles",
    agentName: "Miles",
    title: "48% Increase in Same-Week Scheduling",
    value: "48%",
    role: "Front Office Concierge",
    color: "blue",
    description: "Miles optimized calendar availability, filling last-minute openings and keeping operatories booked consistently."
  },
  {
    agent: "Miles",
    agentName: "Miles",
    title: "+27% Higher Insurance Collections",
    value: "+27%",
    role: "Front Office Concierge",
    color: "blue",
    description: "Miles' automated insurance verification and claim tracking resulted in significant revenue increases for practices."
  },
  {
    agent: "Devon",
    agentName: "Devon",
    title: "72% Case Acceptance Rate Improvement",
    value: "72%",
    role: "Treatment Coordinator",
    color: "purple",
    description: "Devon's patient follow-up and education flows helped patients feel confident and move forward with high-value treatment plans."
  },
  {
    agent: "Devon",
    agentName: "Devon",
    title: "$120K Average Annual Revenue Growth",
    value: "$120K",
    role: "Treatment Coordinator",
    color: "purple",
    description: "Practices leveraging Devon's AI systems converted larger cases and maximized patient lifetime value."
  },
  {
    agent: "Devon",
    agentName: "Devon",
    title: "9x ROI on Treatment Plan Follow-Ups",
    value: "9x",
    role: "Treatment Coordinator",
    color: "purple",
    description: "Devon's automated communication sequences recovered lost revenue from previously declined treatment plans."
  },
  {
    agent: "Alma",
    agentName: "Alma",
    title: "80% Faster Team Onboarding",
    value: "80%",
    role: "Practice Trainer", 
    color: "gold",
    description: "Alma created customized AI training flows for new hires — building confident, revenue-generating teams in record time."
  },
  {
    agent: "Alma",
    agentName: "Alma",
    title: "10+ Hours Saved Weekly on Staff Management",
    value: "10+",
    role: "Practice Trainer",
    color: "gold",
    description: "Automated SOPs and feedback loops freed leadership teams to focus on growth, not micromanagement."
  },
  {
    agent: "Alma",
    agentName: "Alma",
    title: "43% Reduction in Staff Turnover",
    value: "43%",
    role: "Practice Trainer",
    color: "gold",
    description: "Consistent training and professional development opportunities increased job satisfaction and team stability."
  }
];

// Flatten the agent results for carousel display
export const getFlattenedResults = () => {
  return agentResults;
};

// Duplicate cards to ensure seamless looping
export const getDuplicatedResults = () => {
  const flattenedResults = getFlattenedResults();
  // Create a larger set of duplicated results for the dual-row carousel
  return [...flattenedResults, ...flattenedResults, ...flattenedResults];
};
