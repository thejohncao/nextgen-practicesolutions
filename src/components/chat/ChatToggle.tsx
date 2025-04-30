
import React from 'react';
import ChatToggleButton from '../ChatToggleButton';

interface ChatToggleProps {
  isOpen: boolean;
  isTyping: boolean;
  currentAgent: string;
  onClick: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({
  isOpen,
  isTyping,
  currentAgent,
  onClick
}) => {
  if (isOpen) return null;
  
  return (
    <ChatToggleButton 
      isOpen={isOpen} 
      currentAgent={currentAgent} 
      isTyping={isTyping}
      onClick={onClick}
    />
  );
};

export default ChatToggle;
