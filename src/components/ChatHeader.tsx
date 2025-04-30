
import React from 'react';
import { cn } from '@/lib/utils';
import { X, MinusIcon } from 'lucide-react';
import AgentTabHeader from './agent-launcher/AgentTabHeader';

interface ChatHeaderProps {
  isMinimized: boolean;
  currentAgent: string;
  onChangeAgent: (agentName: string) => void;
  onMinimize: (e: React.MouseEvent) => void;
  onClose: () => void;
}

// Define the AI agents with their properties
const agents = {
  miles: {
    name: "Miles",
    color: "from-[#3A86FF] to-[#7FDBFF]",
  },
  giselle: {
    name: "Giselle",
    color: "from-[#00C896] to-[#00FFB2]",
  },
  devon: {
    name: "Devon",
    color: "from-[#7B2CBF] to-[#B388EB]",
  },
  alma: {
    name: "Alma", 
    color: "from-[#00B4D8] to-[#90E0EF]",
  }
};

type AgentKey = keyof typeof agents;

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isMinimized, 
  currentAgent, 
  onChangeAgent,
  onMinimize, 
  onClose 
}) => {
  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "flex items-center justify-between px-4 py-3 rounded-t-xl bg-gradient-to-r",
          `${agents[currentAgent as AgentKey]?.color || agents.miles.color}`,
          isMinimized && "rounded-full"
        )}
      >
        {!isMinimized && (
          <>
            <div className="flex flex-col">
              <div className="text-white font-medium">Your AI Team Is Here</div>
              <div className="text-white/80 text-xs">Choose an agent to get help on any part of your practice</div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={onMinimize} 
                className="text-white/80 hover:text-white transition-colors"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={onClose} 
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
      
      {!isMinimized && (
        <div className="p-2 bg-[#151719] border-b border-white/10">
          <AgentTabHeader activeAgent={currentAgent} onAgentChange={onChangeAgent} />
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
