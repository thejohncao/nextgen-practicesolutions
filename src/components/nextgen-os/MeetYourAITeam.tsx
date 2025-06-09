
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AgentAvatar from '@/components/AgentAvatar';

const MeetYourAITeam = () => {
  const agents = [
    {
      name: "Miles",
      role: "Practice Management", 
      function: "🟦 Miles",
      description: "Scheduling, insurance, operations",
      details: "Your AI practice manager handling day-to-day operations seamlessly",
      color: "blue",
      auraClass: "agent-aura-miles",
      bgClass: "bg-miles-mist"
    },
    {
      name: "Giselle",
      role: "Practice Growth",
      function: "🟩 Giselle", 
      description: "Marketing funnels, lead nurture, SEO",
      details: "Your AI marketing director driving consistent new patient acquisition",
      color: "green",
      auraClass: "agent-aura-giselle",
      bgClass: "bg-giselle-mist"
    },
    {
      name: "Devon",
      role: "Practice Development",
      function: "🟪 Devon",
      description: "Case acceptance, sales automation", 
      details: "Your AI sales expert maximizing treatment acceptance and revenue",
      color: "purple",
      auraClass: "agent-aura-devon",
      bgClass: "bg-devon-mist"
    },
    {
      name: "Alma",
      role: "Team Training",
      function: "🟨 Alma",
      description: "SOP delivery, onboarding, AI-guided checklists",
      details: "Your AI training coordinator ensuring team excellence and consistency",
      color: "amber",
      auraClass: "agent-aura-alma",
      bgClass: "bg-alma-mist"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-black/95 to-nextgen-dark">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <h2 className="text-headline-lg font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
            👤 Meet Your AI Agent Suite
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto mb-4">
            Optional but Recommended
          </p>
          <p className="text-body text-white/60 max-w-3xl mx-auto">
            Four specialized AI agents working 24/7 to grow your practice. Each agent has a color-coded avatar and handles specific executive functions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {agents.map((agent, index) => (
            <Card key={index} className={`bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-350 group hover:scale-105`}>
              <CardContent className="p-8 relative overflow-hidden">
                
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
                      <h3 className="text-headline font-bold text-white">{agent.function}</h3>
                      <p className="text-body text-nextgen-purple font-semibold">{agent.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-body-lg font-semibold text-white mb-3">Function</h4>
                    <p className="text-body text-nextgen-purple font-medium">{agent.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-body-lg font-semibold text-white mb-3">Description</h4>
                    <p className="text-body text-white/70">{agent.details}</p>
                  </div>
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
