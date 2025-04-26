
import React, { useState } from 'react';
import FloatingChatButton from './FloatingChatButton';
import FloatingChatPanel from './FloatingChatPanel';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState('Miles');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleAgentChange = (agentName: string) => {
    setCurrentAgent(agentName);
  };

  return (
    <>
      <FloatingChatButton 
        isOpen={isOpen}
        onClick={toggleChat}
        currentAgent={currentAgent}
      />
      <FloatingChatPanel 
        isOpen={isOpen}
        onAgentChange={handleAgentChange}
      />
    </>
  );
};

export default FloatingChat;
