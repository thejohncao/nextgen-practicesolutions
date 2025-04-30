
import React from 'react';
import TypingIndicator from './TypingIndicator';
import { cn } from '@/lib/utils';
import AgentChatAvatar from './AgentChatAvatar';

interface AgentLoadingIndicatorProps {
  agent: string;
  timeoutLevel?: 'none' | 'warning' | 'error';
}

const AgentLoadingIndicator: React.FC<AgentLoadingIndicatorProps> = ({ agent, timeoutLevel = 'none' }) => {
  // Messages to show while agent is "thinking"
  const agentLoadingMessages = {
    miles: [
      "Looking up your scheduling data...",
      "Analyzing your front desk workflows...",
      "Checking optimization opportunities..."
    ],
    giselle: [
      "Analyzing your marketing strategy...",
      "Reviewing your growth metrics...",
      "Checking latest lead generation trends..."
    ],
    devon: [
      "Reviewing case follow-up options...",
      "Analyzing treatment acceptance rates...",
      "Finding patient conversion opportunities..."
    ],
    alma: [
      "Checking team training resources...",
      "Preparing SOP recommendations...",
      "Finding best practices for your staff..."
    ]
  };

  // Get random message for the current agent
  const messages = agentLoadingMessages[agent as keyof typeof agentLoadingMessages] || [];
  const randomIndex = React.useMemo(() => {
    return Math.floor(Math.random() * messages.length);
  }, [messages.length]);
  const message = messages[randomIndex];

  return (
    <div 
      className={cn(
        "flex items-center mb-4 max-w-[85%] p-3 bg-nextgen-dark/60 rounded-xl mr-auto",
        timeoutLevel === 'warning' && "border border-amber-500/20",
        timeoutLevel === 'error' && "border border-red-500/20",
      )}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <AgentChatAvatar agent={agent} className="mr-2" />
          <span className="text-white font-medium">{agent.charAt(0).toUpperCase() + agent.slice(1)}</span>
        </div>
        {message && <div className="text-sm text-white/70">{message}</div>}
        <TypingIndicator agent={agent} />
      </div>
    </div>
  );
};

export default AgentLoadingIndicator;
