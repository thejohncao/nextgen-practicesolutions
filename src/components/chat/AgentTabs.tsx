
import React, { useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgentAvatar from '../AgentAvatar';
import { cn } from '@/lib/utils';
import { AGENT_ROLES } from '@/hooks/useAiConversation';

interface AgentTabsProps {
  currentAgent: string;
  onSelectAgent: (agent: string) => void;
}

const AgentTabs: React.FC<AgentTabsProps> = ({ currentAgent, onSelectAgent }) => {
  const agents = [
    { id: 'miles', name: 'Miles', role: AGENT_ROLES.miles, color: 'blue' },
    { id: 'giselle', name: 'Giselle', role: AGENT_ROLES.giselle, color: 'green' },
    { id: 'devon', name: 'Devon', role: AGENT_ROLES.devon, color: 'purple' },
    { id: 'alma', name: 'Alma', role: AGENT_ROLES.alma, color: 'gold' }
  ];
  
  const handleAgentChange = useCallback((agentId: string) => {
    // Prevent redundant state updates if clicking the current agent
    if (agentId === currentAgent) return;
    
    // Pass the agent ID to the parent handler
    onSelectAgent(agentId);
  }, [currentAgent, onSelectAgent]);

  return (
    <Tabs value={currentAgent} onValueChange={handleAgentChange} className="w-full">
      <TabsList className="w-full grid grid-cols-4 bg-black/20 p-1">
        {agents.map((agent) => (
          <TabsTrigger
            key={agent.id}
            value={agent.id}
            className={cn(
              "flex items-center gap-2 py-2 data-[state=active]:bg-white/10",
              "transition-all duration-200 relative overflow-hidden"
            )}
          >
            <div className="flex items-center gap-1.5">
              <AgentAvatar
                name={agent.name}
                role={agent.role}
                color={agent.color}
                size="sm"
                animated={true}
                isTyping={false}
                displayMode="initial"
                showLabel={false}
                isCompactView={true}
              />
              <span className="text-xs hidden sm:inline">{agent.name}</span>
            </div>
            {currentAgent === agent.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default AgentTabs;
