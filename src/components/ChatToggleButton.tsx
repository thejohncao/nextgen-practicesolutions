
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  currentAgent: string;
  onClick: () => void;
}

// Define the AI agents with their color properties
const agentColors = {
  miles: "from-[#3A86FF] to-[#7FDBFF]",
  giselle: "from-[#00C896] to-[#00FFB2]",
  devon: "from-[#7B2CBF] to-[#B388EB]",
  alma: "from-[#00B4D8] to-[#90E0EF]",
};

type AgentKey = keyof typeof agentColors;

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ isOpen, currentAgent, onClick }) => {
  if (isOpen) return null;

  return (
    <div className="relative" onClick={onClick}>
      <div 
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg
          bg-gradient-radial ${agentColors[currentAgent as AgentKey]} animate-pulse-glow`}
      >
        <MessageSquare className="text-white h-6 w-6" />
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-radial blur-sm opacity-50 animate-pulse-slow"></div>
      <div className="absolute -inset-1 rounded-full bg-gradient-radial blur-md opacity-30 animate-pulse-slow"></div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full">
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_3s_ease-out_infinite]"></div>
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_3s_ease-out_1.5s_infinite]"></div>
      </div>
    </div>
  );
};

export default ChatToggleButton;
