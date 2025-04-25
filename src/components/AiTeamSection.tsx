
import React, { useState } from 'react';
import { Users, Calendar, Mail, MessageSquare, Shield, ChartBar } from "lucide-react";

type Agent = {
  name: string;
  title: string;
  quote: string;
  icon: React.ElementType;
  description: string;
  activities: string[];
  tools: string[];
  color: string;
};

const agents: Agent[] = [
  {
    name: "Miles",
    title: "Front Office AI",
    quote: "I handle scheduling, reminders, and administrative work",
    icon: Calendar,
    color: "from-blue-500 to-blue-600",
    description: "Your AI front desk assistant who manages scheduling, reminders, and administrative tasks.",
    activities: ["Appointment scheduling", "Patient reminders", "Insurance verification"],
    tools: ["Digital scheduling", "SMS system", "Insurance database"]
  },
  {
    name: "Giselle",
    title: "Marketing AI",
    quote: "I bring new patients and grow your practice",
    icon: Mail,
    color: "from-green-500 to-green-600",
    description: "Your AI marketing specialist who attracts new patients and grows your practice.",
    activities: ["Lead generation", "Review management", "Social media", "SEO"],
    tools: ["Social media suite", "Review platform", "Email marketing"]
  },
  {
    name: "Devon",
    title: "Patient Engagement AI",
    quote: "I nurture relationships and build patient trust",
    icon: MessageSquare,
    color: "from-purple-500 to-purple-600",
    description: "Your AI engagement specialist who nurtures relationships and builds patient trust.",
    activities: ["Follow-up sequences", "Educational content", "Birthday messages"],
    tools: ["CRM system", "Content library", "Automated sequences"]
  },
  {
    name: "Ava",
    title: "Operations AI",
    quote: "I analyze your practice data to optimize performance",
    icon: ChartBar,
    color: "from-amber-500 to-amber-600",
    description: "Your AI analyst who processes practice data to optimize business performance.",
    activities: ["Performance tracking", "Revenue analysis", "Operational insights"],
    tools: ["Analytics platform", "Financial dashboard", "Forecasting tools"]
  }
];

const AITeamSection = () => {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);

  return (
    <section id="ai-team" className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Users className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">AI Team</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your New AI Team Members
          </h2>
          
          <p className="text-lg text-white/70">
            Our AI agents work together to handle critical aspects of your practice operations,
            freeing your staff to focus on what matters most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <div 
                key={agent.name}
                className="glass-card rounded-xl p-6 transition-all duration-300 hover:bg-white/10 cursor-pointer group"
                onMouseEnter={() => setActiveAgent(agent)}
                onMouseLeave={() => setActiveAgent(null)}
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 bg-gradient-to-br ${agent.color} flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-semibold text-white flex items-center">
                      {agent.name}
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/60">
                        {agent.title}
                      </span>
                    </h3>
                    
                    <p className="text-white/70">{agent.quote}</p>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${activeAgent?.name === agent.name ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pt-4 space-y-4">
                        <p className="text-sm text-white/70">{agent.description}</p>
                        
                        <div>
                          <h4 className="text-sm font-medium text-white/80 mb-1">Key Activities:</h4>
                          <ul className="text-sm text-white/60 grid grid-cols-2 gap-1">
                            {agent.activities.map((activity, i) => (
                              <li key={i} className="flex items-center">
                                <div className="w-1 h-1 bg-nextgen-purple rounded-full mr-2"></div>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-white/80 mb-1">Tools Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {agent.tools.map((tool, i) => (
                              <span key={i} className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-md">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`text-xs text-nextgen-purple ${activeAgent?.name === agent.name ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                      Click to explore more
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-block glass-card px-6 py-3 rounded-full">
            <p className="text-sm text-white/60">
              <span className="text-nextgen-purple font-medium">All four AI agents</span> are included in our Elite and Blaze plans
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITeamSection;
