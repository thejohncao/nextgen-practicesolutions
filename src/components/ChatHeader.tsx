
import React from 'react';
import { cn } from '@/lib/utils';
import { X, MinusIcon } from 'lucide-react';

interface ChatHeaderProps {
  isMinimized: boolean;
  currentAgent: string;
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

const ChatHeader: React.FC<ChatHeaderProps> = ({ isMinimized, currentAgent, onMinimize, onClose }) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-t-xl bg-gradient-to-r",
        `${agents[currentAgent as AgentKey].color}`,
        isMinimized && "rounded-full"
      )}
    >
      {!isMinimized && (
        <>
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-full bg-gradient-radial ${agents[currentAgent as AgentKey].color} animate-pulse-slow`}>
              <div className="h-full w-full flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
              </div>
            </div>
            <div className="text-white font-medium">{agents[currentAgent as AgentKey].name}</div>
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
  );
};

export default ChatHeader;
