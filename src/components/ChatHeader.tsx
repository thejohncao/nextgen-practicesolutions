
import React from 'react';
import { ArrowLeft, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentChatAvatar from './AgentChatAvatar';

interface ChatHeaderProps {
  isMinimized: boolean;
  currentAgent: string;
  onMinimize: (e: React.MouseEvent) => void;
  onClose: () => void;
  onGoBack?: () => void;
}

const ChatHeader = ({ isMinimized, currentAgent, onMinimize, onClose, onGoBack }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-[#1a1d21] border-b border-gray-800 relative z-10">
      <div className="flex items-center">
        {onGoBack && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mr-1 text-white/70 hover:text-white hover:bg-white/10"
            onClick={onGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <AgentChatAvatar agent={currentAgent} hideDetails={isMinimized} />
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
          onClick={onMinimize}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
