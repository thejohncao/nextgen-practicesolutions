
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AgentAvatar from '@/components/AgentAvatar';

const MeetYourAITeam = () => {
  const agents = [
    {
      name: "Miles",
      role: "Operations",
      power: "Scheduling, Recall, Insurance",
      description: "Your AI practice manager handling day-to-day operations seamlessly",
      color: "blue",
      auraClass: "agent-aura-miles",
      bgClass: "bg-miles-mist"
    },
    {
      name: "Giselle",
      role: "Growth",
      power: "Lead Gen, SEO, Ads",
      description: "Your AI marketing director driving consistent new patient acquisition",
      color: "green",
      auraClass: "agent-aura-giselle",
      bgClass: "bg-giselle-mist"
    },
    {
      name: "Devon",
      role: "Development",
      power: "Sales, Case Acceptance",
      description: "Your AI sales expert maximizing treatment acceptance and revenue",
      color: "purple",
      auraClass: "agent-aura-devon",
      bgClass: "bg-devon-mist"
    },
    {
      name: "Alma",
      role: "Training",
      power: "SOPs, LMS, Team Ramp-Up",
      description: "Your AI training coordinator ensuring team excellence and consistency",
      color: "amber",
      auraClass: "agent-aura-alma",
      bgClass: "bg-alma-mist"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-mist-blue/20 to-crystal-white">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <h2 className="text-headline-lg text-liquid-gradient mb-8">
            Meet Your AI Team
          </h2>
          <p className="text-body-lg text-liquid-slate/70 max-w-3xl mx-auto">
            Four specialized AI agents working 24/7 to grow your practice
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {agents.map((agent, index) => (
            <Card key={index} className={`liquid-glass hover-lift transition-all duration-350 group ${agent.auraClass}`}>
              <CardContent className="p-8 relative overflow-hidden">
                {/* Agent-specific background mist */}
                <div className={`absolute inset-0 ${agent.bgClass} opacity-30 group-hover:opacity-50 transition-opacity duration-350`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="animate-breathing">
                      <AgentAvatar 
                        name={agent.name} 
                        role={agent.role} 
                        color={agent.color} 
                        size="lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-headline font-bold text-liquid-slate">{agent.name}</h3>
                      <p className="text-body text-glow-indigo font-semibold">{agent.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-body-lg font-semibold text-liquid-slate mb-3">Core Powers</h4>
                    <p className="text-body text-liquid-slate font-medium">{agent.power}</p>
                  </div>
                  
                  <p className="text-body text-liquid-slate/70">{agent.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetYourAITeam;
