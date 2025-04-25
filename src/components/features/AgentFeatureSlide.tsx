
import React from 'react';
import AgentAvatar from '../AgentAvatar';
import { FeatureSlide } from '@/types/features';

const AgentFeatureSlide = ({ agent, role, title, features }: FeatureSlide) => {
  return (
    <div className="space-y-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <AgentAvatar name={agent} role={role} color={getAgentColor(agent)} />
        <div>
          <h2 className="text-2xl font-bold text-white">{agent}</h2>
          <p className="text-white/70">{role}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="glass-card p-6 rounded-xl hover:shadow-glow transition-shadow duration-300"
          >
            <h4 className="text-lg font-semibold mb-2 text-white">
              {feature.title}
            </h4>
            <p className="text-white/90 font-medium mb-3">
              {feature.subtitle}
            </p>
            <p className="text-white/70 text-sm mb-4">
              {feature.description}
            </p>
            <div className="aspect-video rounded-lg bg-white/5 overflow-hidden">
              {/* Placeholder for feature demo/image */}
              <div className="w-full h-full flex items-center justify-center text-white/30">
                Feature Demo
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getAgentColor = (name: string): string => {
  switch (name) {
    case 'Miles': return 'red';
    case 'Giselle': return 'green';
    case 'Devon': return 'blue';
    case 'Alma': return 'gold';
    default: return 'purple';
  }
};

export default AgentFeatureSlide;
