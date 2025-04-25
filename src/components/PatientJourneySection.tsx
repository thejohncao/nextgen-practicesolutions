import React, { useState, useEffect } from 'react';
import { ArrowRight } from "lucide-react";
import AgentAvatar from './AgentAvatar';
import JourneyStageIcon from './JourneyStageIcon';
import { agents } from '@/data/agents';

const stages = [
  {
    name: "Attract & Engage",
    agent: "Giselle",
    color: "green",
    bgColor: "bg-green-500/5",
    activities: ["Ads", "Quizzes", "Lead Follow-up", "Referrals"],
    tools: ["Meta", "Typeform", "GHL"],
    solves: "Low lead conversion"
  },
  {
    name: "Activate & Onboard",
    agent: "Miles",
    color: "blue",
    bgColor: "bg-blue-500/5",
    activities: ["Intake Forms", "Check-in", "Admin Handoff"],
    tools: ["GHL Forms", "Slack", "Google Calendar"],
    solves: "Front desk inefficiency"
  },
  {
    name: "Convert & Retain",
    agent: "Devon",
    color: "purple",
    bgColor: "bg-purple-500/5",
    activities: ["Treatment Planning", "Financing", "Recall"],
    tools: ["Loom", "Cherry", "Podium", "Stripe"],
    solves: "Lost revenue, poor retention"
  }
];

const PatientJourneySection = () => {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Show stages with staggered timing
            setTimeout(() => {
              setVisibleItems([true, false, false]);
              setTimeout(() => setVisibleItems([true, true, false]), 300);
              setTimeout(() => setVisibleItems([true, true, true]), 600);
            }, 300);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('patient-journey');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const getAgentAvatar = (agentName: string) => {
    const agent = agents.find(a => a.name === agentName);
    return agent ? agent.color : "purple";
  };

  return (
    <section id="patient-journey" className="section-padding py-20 bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <ArrowRight className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Patient Journey</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            How the System Works
          </h2>
          
          <p className="text-lg text-white/70">
            From first click to lifelong care—your AI team manages every stage of the patient lifecycle.
          </p>
        </div>
        
        <div className="relative mt-20">
          <div className="hidden md:block absolute top-20 left-0 w-full h-0.5 bg-gradient-animate rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-flow"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {stages.map((stage, index) => (
              <div 
                key={stage.name} 
                className={`relative transition-all duration-700 transform ${
                  visibleItems[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="hidden md:flex absolute -top-20 left-1/2 transform -translate-x-1/2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${stage.color}-500 to-${stage.color}-600 flex items-center justify-center shadow-glow`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div 
                  className={`glass-card h-full p-6 md:pt-14 ${stage.bgColor} backdrop-blur-xl 
                    transform transition-all duration-300 hover:scale-[1.02] hover:shadow-glow 
                    border border-white/10 hover:border-${stage.color}-500/30`}
                  onMouseEnter={() => setActiveAgent(stage.agent)}
                  onMouseLeave={() => setActiveAgent(null)}
                >
                  <div className="absolute top-4 right-4">
                    <JourneyStageIcon 
                      stageName={stage.name} 
                      color={stage.color} 
                      className="animate-pulse-slow"
                      size={20}
                    />
                  </div>
                  
                  <div className="md:hidden flex items-center mb-4">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${stage.color}-500 to-${stage.color}-600 flex items-center justify-center mr-3`}>
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gradient">{stage.name}</h3>
                  </div>
                  
                  <h3 className="hidden md:block text-xl font-heading font-semibold text-gradient mb-2">{stage.name}</h3>
                  
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-4 transition-all duration-300 hover:bg-white/10">
                    <div className="flex items-center gap-2">
                      <span>Managed by</span>
                      <span className={`text-${stage.color}-400 font-medium ${activeAgent === stage.agent ? 'animate-pulse' : ''}`}>{stage.agent}</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`transition-all duration-500 ${
                      activeAgent === stage.agent 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95 pointer-events-none'
                    } absolute -top-12 right-4 z-10`}
                  >
                    <AgentAvatar 
                      name={stage.agent} 
                      role={`AI ${stage.name} Specialist`}
                      color={getAgentAvatar(stage.agent)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-white/60 mb-1">Key Activities:</h4>
                    <ul className="space-y-1">
                      {stage.activities.map((activity, i) => (
                        <li key={i} className="flex items-center text-white/80 text-sm group">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br from-${stage.color}-500 to-${stage.color}-400 mr-2 transition-all duration-300 group-hover:scale-150`}></div>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-white/60 mb-1">Tools Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stage.tools.map((tool, i) => (
                        <span 
                          key={i} 
                          className={`text-xs px-2 py-1 bg-white/5 rounded-md text-white/70 transition-all duration-300 hover:bg-${stage.color}-500/10 hover:text-white cursor-default`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-white/60 mb-1">What It Solves:</h4>
                    <p className="text-sm text-white/80">{stage.solves}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientJourneySection;
