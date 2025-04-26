
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Agent } from '@/types/agent';
import AgentAvatar from '../AgentAvatar';
import { Check } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) chatButton.click();
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <Card className="glass-card border-white/10 overflow-hidden group transition-all duration-300 hover:shadow-glow animate-fade-in">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <AgentAvatar 
              name={agent.name}
              role={agent.title}
              color={agent.color}
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
            <p className="text-white/60">{agent.title}</p>
          </div>
        </div>
        <p className="text-lg text-white/80">{agent.tagline}</p>
        
        {agent.activities && (
          <div className="flex flex-wrap gap-2 mt-2">
            {agent.activities.map((activity, index) => (
              <span 
                key={index}
                className={`px-3 py-1 rounded-full text-sm bg-${agent.color}-500/10 text-${agent.color}-500 border border-${agent.color}-500/20`}
              >
                {activity}
              </span>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm text-white/60 uppercase tracking-wider">Key Features</h4>
          <ul className="grid gap-3">
            {agent.features.map((feature, index) => {
              const [title, description] = feature.split(" - ");
              return (
                <li key={index} className="flex items-start gap-2">
                  <Check className={`h-4 w-4 mt-1 text-${agent.color}-500 flex-shrink-0`} />
                  <div>
                    <span className="text-white font-medium">{title}</span>
                    {description && (
                      <span className="text-white/70 ml-1">— {description}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        
        {agent.tools && (
          <div className="space-y-3">
            <h4 className="text-sm text-white/60 uppercase tracking-wider">Tools & Integrations</h4>
            <div className="flex flex-wrap gap-3">
              {agent.tools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-${agent.color}-500/5 border border-${agent.color}-500/10`}
                  >
                    <IconComponent className={`h-4 w-4 text-${agent.color}-500`} />
                    <span className="text-sm text-white/80">{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleChatOpen}
          variant="outline" 
          className={`w-full border-${agent.color}-500/20 hover:bg-${agent.color}-500/20 transition-all duration-300`}
        >
          Chat with {agent.name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
