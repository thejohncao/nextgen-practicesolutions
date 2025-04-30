
import React from 'react';
import AgentAvatar from './AgentAvatar';
import { AGENT_ROLES } from '@/hooks/useAiConversation';

interface AgentChatAvatarProps {
  agent: string;
  hideDetails?: boolean;
  isTyping?: boolean;
}

const AgentChatAvatar: React.FC<AgentChatAvatarProps> = ({ agent, hideDetails = false, isTyping = false }) => {
  // Map agent names to their properties
  const getAgentProps = () => {
    switch (agent.toLowerCase()) {
      case 'miles':
        return { name: 'Miles', role: AGENT_ROLES.miles, color: 'blue' };
      case 'giselle':
        return { name: 'Giselle', role: AGENT_ROLES.giselle, color: 'green' };
      case 'devon':
        return { name: 'Devon', role: AGENT_ROLES.devon, color: 'purple' };
      case 'alma':
        return { name: 'Alma', role: AGENT_ROLES.alma, color: 'gold' };
      default:
        return { name: 'Miles', role: AGENT_ROLES.miles, color: 'blue' };
    }
  };

  const { name, role, color } = getAgentProps();

  return (
    <div className="flex items-center gap-2">
      <AgentAvatar 
        name={name} 
        role={role} 
        color={color} 
        size="sm" 
        animated={true} 
        isTyping={isTyping}
        displayMode="initial"
        showLabel={false}
      />
      {!hideDetails && (
        <div className="text-sm">
          <div className="font-medium text-white/90">{name}</div>
          <div className="text-xs text-white/60">{role}</div>
        </div>
      )}
    </div>
  );
};

export default AgentChatAvatar;
