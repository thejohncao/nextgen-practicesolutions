
import React from 'react';
import AgentAvatar from './AgentAvatar';

interface AgentChatAvatarProps {
  agent: string;
  hideDetails?: boolean;
  isTyping?: boolean;
  className?: string; // Added className prop to the interface
}

const AgentChatAvatar: React.FC<AgentChatAvatarProps> = ({ agent, hideDetails = false, isTyping = false, className = '' }) => {
  // Map agent names to their properties
  const getAgentProps = () => {
    switch (agent.toLowerCase()) {
      case 'miles':
        return { name: 'Miles', role: 'Practice Manager', color: 'blue' };
      case 'giselle':
        return { name: 'Giselle', role: 'Growth Strategist', color: 'green' };
      case 'devon':
        return { name: 'Devon', role: 'Patient Experience Coach', color: 'purple' };
      case 'alma':
        return { name: 'Alma', role: 'Academy Director', color: 'gold' };
      default:
        return { name: 'Miles', role: 'Practice Manager', color: 'blue' };
    }
  };

  const { name, role, color } = getAgentProps();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
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
