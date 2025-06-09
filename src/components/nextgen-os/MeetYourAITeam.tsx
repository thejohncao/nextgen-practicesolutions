
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
      color: "blue"
    },
    {
      name: "Giselle",
      role: "Growth",
      power: "Lead Gen, SEO, Ads",
      description: "Your AI marketing director driving consistent new patient acquisition",
      color: "green"
    },
    {
      name: "Devon",
      role: "Development",
      power: "Sales, Case Acceptance",
      description: "Your AI sales expert maximizing treatment acceptance and revenue",
      color: "purple"
    },
    {
      name: "Alma",
      role: "Training",
      power: "SOPs, LMS, Team Ramp-Up",
      description: "Your AI training coordinator ensuring team excellence and consistency",
      color: "amber"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Meet Your AI Team
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Four specialized AI agents working 24/7 to grow your practice
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {agents.map((agent, index) => (
            <Card key={index} className="glass-card border-nextgen-purple/20 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <AgentAvatar 
                    name={agent.name} 
                    role={agent.role} 
                    color={agent.color} 
                    className="w-16 h-16"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                    <p className="text-nextgen-purple font-semibold">{agent.role}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Core Powers</h4>
                  <p className="text-white/90 font-medium">{agent.power}</p>
                </div>
                
                <p className="text-white/70">{agent.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetYourAITeam;
