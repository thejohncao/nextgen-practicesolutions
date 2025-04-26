
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatWindow from './ChatWindow';
import AgentAvatar from '../AgentAvatar';
import { Button } from '../ui/button';
import { agents } from '@/data/agents';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(agents[0]); // Miles by default

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-4 w-[380px] rounded-lg glass-card overflow-hidden shadow-2xl">
          <ChatWindow 
            currentAgent={currentAgent} 
            onClose={() => setIsOpen(false)}
            onAgentChange={setCurrentAgent}
          />
        </div>
      )}
      
      <Button
        onClick={toggleChat}
        className="rounded-full h-14 w-14 p-0 relative group animate-pulse-slow"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/50 opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          {isOpen ? (
            <AgentAvatar name={currentAgent.name} role={currentAgent.title} color={currentAgent.color} />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </div>
      </Button>
    </div>
  );
};

export default FloatingChat;
