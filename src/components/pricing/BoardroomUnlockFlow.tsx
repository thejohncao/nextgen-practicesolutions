
import React from 'react';
import { Badge } from "@/components/ui/badge";
import AgentAvatar from '../AgentAvatar';

const BoardroomUnlockFlow = () => {
  const stages = [
    {
      name: "Spark",
      color: "#ea384c",
      agents: [
        { name: "Miles", role: "Practice Management", color: "red" }
      ],
      features: []
    },
    {
      name: "Ignite",
      color: "#22c55e",
      agents: [
        { name: "Miles", role: "Operations", color: "red" },
        { name: "Giselle", role: "Marketing", color: "green" },
        { name: "Devon", role: "Sales", color: "blue" },
        { name: "Alma", role: "Training", color: "gold" }
      ],
      features: ["Full AI Boardroom Unlock"]
    },
    {
      name: "Blaze",
      color: "#0FA0CE",
      agents: [
        { name: "Miles", role: "Operations", color: "red" },
        { name: "Giselle", role: "Marketing", color: "green" },
        { name: "Devon", role: "Sales", color: "blue" },
        { name: "Alma", role: "Training", color: "gold" }
      ],
      features: [
        "Advanced Custom Campaigns",
        "Executive KPI Dashboard",
        "Dedicated Success Manager (Optional)"
      ]
    }
  ];

  return (
    <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-gradient">
          Your NextGen Team Unlocks as You Grow
        </h3>
      </div>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nextgen-purple/30 to-nextgen-purple/70 hidden md:block"></div>

        {/* Timeline Stages */}
        <div className="space-y-16 md:space-y-24 relative">
          {stages.map((stage, index) => (
            <div key={index} className="relative">
              {/* Stage Circle on Timeline (desktop only) */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full hidden md:block"
                style={{ backgroundColor: stage.color, top: "-12px" }}
              ></div>
              
              {/* Stage Content */}
              <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
                {/* Stage Name */}
                <div className={`md:w-1/3 mb-6 md:mb-0 text-center ${index % 2 === 1 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <div 
                    className="inline-block text-2xl font-bold font-heading p-2 rounded-md"
                    style={{ color: stage.color }}
                  >
                    {stage.name}
                  </div>
                </div>
                
                {/* Stage Content */}
                <div className="md:w-2/3 bg-black/20 rounded-xl p-6 backdrop-blur-sm">
                  {/* Agent Avatars */}
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {stage.agents.map((agent, agentIdx) => (
                      <div key={agentIdx} className="flex flex-col items-center">
                        <AgentAvatar 
                          name={agent.name} 
                          role={agent.role} 
                          color={agent.color} 
                          size="md" 
                        />
                        <span className="text-xs text-white/70 mt-1">{agent.role}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Features */}
                  {stage.features.length > 0 && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {stage.features.map((feature, featureIdx) => (
                        <Badge 
                          key={featureIdx} 
                          className="bg-white/10 hover:bg-white/15 text-white"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-12">
        <p className="text-lg text-white/70 italic">
          "Your practice deserves more than tools — it deserves a full Executive Team to grow with you."
        </p>
      </div>
    </div>
  );
};

export default BoardroomUnlockFlow;
