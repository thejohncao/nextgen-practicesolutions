
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AgentAvatar from '../AgentAvatar';
import { Sparkle } from 'lucide-react';

// Define the structure for result data
interface AgentResult {
  agent: string;
  role: string;
  color: string;
  results: {
    title: string;
    description: string;
  }[];
}

// Result data organized by agent
const agentResults: AgentResult[] = [
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
      }
    ]
  }
];

// Get background color class for cards based on agent
const getAgentCardColor = (color: string) => {
  switch (color) {
    case 'blue': return 'bg-blue-50/5';
    case 'green': return 'bg-green-50/5';
    case 'purple': return 'bg-purple-50/5';
    case 'gold': return 'bg-amber-50/5';
    default: return 'bg-white/5';
  }
};

// Get border color class for cards based on agent
const getAgentBorderColor = (color: string) => {
  switch (color) {
    case 'blue': return 'border-blue-200/10';
    case 'green': return 'border-green-200/10';
    case 'purple': return 'border-purple-200/10'; 
    case 'gold': return 'border-amber-200/10';
    default: return 'border-white/10';
  }
};

const AgentResultsSection = () => {
  return (
    <section className="py-24 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in mb-4">
            Real Results from Your AI Team
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in" 
             style={{ animationDelay: '200ms' }}>
            While you focus on patient care, your team delivers measurable wins across your practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agentResults.flatMap((agentData, agentIndex) => 
            agentData.results.map((result, resultIndex) => {
              const delay = (agentIndex * 2 + resultIndex) * 0.1;
              
              return (
                <div 
                  key={`${agentData.agent}-${resultIndex}`}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
                >
                  <Card 
                    className={`
                      h-full transition-all duration-300 hover:scale-[1.02] 
                      ${getAgentCardColor(agentData.color)} 
                      ${getAgentBorderColor(agentData.color)}
                      overflow-hidden relative
                    `}
                  >
                    <CardContent className="p-6">
                      {/* Agent info row */}
                      <div className="flex items-center mb-4">
                        <AgentAvatar 
                          name={agentData.agent} 
                          role={agentData.role}
                          color={agentData.color}
                          size="sm"
                        />
                        <div className="ml-3">
                          <h4 className="font-semibold text-white">{agentData.agent}</h4>
                          <p className="text-sm text-white/70">{agentData.role}</p>
                        </div>
                      </div>
                      
                      {/* Result content */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center text-white">
                          <Sparkle className="w-4 h-4 mr-2 text-white/60" />
                          {result.title}
                        </h3>
                        <p className="text-white/80">{result.description}</p>
                      </div>

                      {/* Subtle decoration */}
                      <div className={`absolute top-0 right-0 w-24 h-24 opacity-5 rounded-full blur-xl bg-${agentData.color}-500 -translate-y-1/2 translate-x-1/2`} />
                    </CardContent>
                  </Card>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default AgentResultsSection;
