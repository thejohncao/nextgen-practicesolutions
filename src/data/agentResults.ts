import { AgentResult } from "@/types/agentResults";

// Result data organized by agent
export const agentResults: AgentResult[] = [
  {
    agent: "Giselle",
    role: "Growth Specialist",
    color: "green",
    results: [
      {
        title: "+124% Increase in New Patient Leads",
        description: "Giselle's AI Growth Engine nurtured inbound leads and booked more consultations without adding marketing budget."
      },
      {
        title: "3x Faster Lead Follow-Up",
        description: "Automated workflows replied to patient inquiries within minutes, capturing more opportunities before competitors could."
      },
      {
        title: "68% Boost in Google Reviews",
        description: "Giselle's automated review collection system helped increase positive reviews and online reputation significantly."
      }
    ]
  },
  {
    agent: "Miles",
    role: "Front Office Concierge",
    color: "blue",
    results: [
      {
        title: "95% Reduction in No-Show Appointments",
        description: "With personalized AI reminders, practices saw no-shows drop drastically — protecting their daily production schedule."
      },
      {
        title: "48% Increase in Same-Week Scheduling",
        description: "Miles optimized calendar availability, filling last-minute openings and keeping operatories booked consistently."
      },
      {
        title: "+27% Higher Insurance Collections",
        description: "Miles' automated insurance verification and claim tracking resulted in significant revenue increases for practices."
      }
    ]
  },
  {
    agent: "Devon",
    role: "Treatment Coordinator",
    color: "purple",
    results: [
      {
        title: "72% Case Acceptance Rate Improvement",
        description: "Devon's patient follow-up and education flows helped patients feel confident and move forward with high-value treatment plans."
      },
      {
        title: "$120K Average Annual Revenue Growth",
        description: "Practices leveraging Devon's AI systems converted larger cases and maximized patient lifetime value."
      },
      {
        title: "9x ROI on Treatment Plan Follow-Ups",
        description: "Devon's automated communication sequences recovered lost revenue from previously declined treatment plans."
      }
    ]
  },
  {
    agent: "Alma",
    role: "Practice Trainer", 
    color: "gold",
    results: [
      {
        title: "80% Faster Team Onboarding",
        description: "Alma created customized AI training flows for new hires — building confident, revenue-generating teams in record time."
      },
      {
        title: "10+ Hours Saved Weekly on Staff Management",
        description: "Automated SOPs and feedback loops freed leadership teams to focus on growth, not micromanagement."
      },
      {
        title: "43% Reduction in Staff Turnover",
        description: "Consistent training and professional development opportunities increased job satisfaction and team stability."
      }
    ]
  }
];

// Flatten the agent results for grid display
export const getFlattenedResults = () => {
  return agentResults.flatMap((agentData) => 
    agentData.results.map((result) => ({
      agent: agentData.agent,
      role: agentData.role,
      color: agentData.color,
      title: result.title,
      description: result.description
    }))
  );
};

// Duplicate cards to ensure seamless looping 
// (keeping function for backwards compatibility)
export const getDuplicatedResults = () => {
  const flattenedResults = getFlattenedResults();
  return [...flattenedResults, ...flattenedResults, ...flattenedResults];
};
