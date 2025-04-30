
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Agent } from '@/types/agent';
import AgentChatAvatar from '@/components/AgentChatAvatar';
import { getAgentCardColor, getAgentBorderColor } from '@/utils/colorUtils';

interface AgentDemoVideoProps {
  agent: Agent;
  script: string;
}

const AgentDemoVideo = ({ agent, script }: AgentDemoVideoProps) => {
  const cardColorClass = getAgentCardColor(agent.color);
  const borderColorClass = getAgentBorderColor(agent.color);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="md:col-span-3">
        <div className="aspect-w-16 aspect-h-9 w-full h-full rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            {/* Placeholder for video - in production would use an actual video player */}
            <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-4xl">▶️</span>
            </div>
            <p className="mt-4 text-white/60">Agent demo video coming soon</p>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2">
        <FadeInSection direction="up">
          <div className={`p-6 rounded-xl backdrop-blur-sm ${cardColorClass} ${borderColorClass} h-full`}>
            <div className="flex items-center mb-6">
              <AgentChatAvatar 
                agent={agent.name} 
                hideDetails={false}
              />
            </div>
            
            <div className="prose prose-invert">
              <blockquote className="text-white/90 border-l-4 border-white/20 pl-4 italic">
                "{script}"
              </blockquote>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default AgentDemoVideo;
