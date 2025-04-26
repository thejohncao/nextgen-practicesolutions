
import React, { useState, useEffect } from 'react';
import AgentAvatar from '@/components/AgentAvatar';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  currentAgent: string;
}

const FloatingChatButton = ({ isOpen, onClick, currentAgent }: FloatingChatButtonProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Highlight the button occasionally to draw attention
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2000);
      }, 30000); // Every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <Button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 rounded-full w-16 h-16
        flex items-center justify-center shadow-lg
        transition-all duration-300
        ${isHighlighted ? 'scale-110' : 'scale-100'}
        ${isOpen ? 'bg-white/10 backdrop-blur-lg' : 'bg-transparent'}
        z-50
      `}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <div className="scale-90">
          <AgentAvatar 
            name={currentAgent} 
            role="AI Assistant"
            isActive={isHighlighted}
          />
        </div>
      )}
    </Button>
  );
};

export default FloatingChatButton;
