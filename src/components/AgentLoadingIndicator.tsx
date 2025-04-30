
import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import TypingIndicator from './TypingIndicator';

interface AgentLoadingIndicatorProps {
  agent: string;
  timeoutLevel: 'none' | 'warning' | 'error';
}

const AgentLoadingIndicator: React.FC<AgentLoadingIndicatorProps> = ({ 
  agent,
  timeoutLevel
}) => {
  const [loadingMessage, setLoadingMessage] = useState('');
  const [tooltipMessage, setTooltipMessage] = useState('');
  
  // Update loading message based on agent and timeout level
  useEffect(() => {
    if (timeoutLevel === 'none') {
      return;
    }
    
    const messages = {
      miles: {
        loading: [
          "Syncing your schedule…",
          "Checking for open consult slots…",
          "Handling that task…"
        ],
        tooltip: "I'm reorganizing your day for max efficiency. Hang tight."
      },
      giselle: {
        loading: [
          "Running campaign analytics…",
          "Targeting your ideal patients…",
          "Mapping your funnel strategy…"
        ],
        tooltip: "I'm pulling some data from our latest high-converting campaigns. Give me just a sec."
      },
      devon: {
        loading: [
          "Following up with your leads…",
          "Drafting a persuasive message…",
          "Checking your unscheduled cases…"
        ],
        tooltip: "Just pulling up the best script for that kind of case. One moment."
      },
      alma: {
        loading: [
          "Organizing your SOPs…",
          "Drafting a new checklist…",
          "Reviewing your team's playbook…"
        ],
        tooltip: "I'm just putting the final touches on your system template. Be right with you."
      }
    };
    
    const agentMessages = messages[agent as keyof typeof messages] || messages.miles;
    const randomIndex = Math.floor(Math.random() * agentMessages.loading.length);
    
    setLoadingMessage(agentMessages.loading[randomIndex]);
    setTooltipMessage(agentMessages.tooltip);
  }, [agent, timeoutLevel]);
  
  if (timeoutLevel === 'none') {
    return <TypingIndicator agent={agent} />;
  }
  
  return (
    <div className="flex flex-col space-y-1 my-3 ml-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center text-sm text-white/70 animate-pulse">
              <TypingIndicator agent={agent} />
              <span className="ml-2">{loadingMessage}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-800 text-white p-2 text-sm">
            {tooltipMessage}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AgentLoadingIndicator;
