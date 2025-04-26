
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Agent } from '@/types/agent';
import AgentAvatar from '../AgentAvatar';
import { Button } from '../ui/button';

interface ChatWindowProps {
  currentAgent: Agent;
  onClose: () => void;
  onAgentChange: (agent: Agent) => void;
}

const ChatWindow = ({ currentAgent, onClose, onAgentChange }: ChatWindowProps) => {
  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <AgentAvatar 
            name={currentAgent.name} 
            role={currentAgent.title}
            color={currentAgent.color}
          />
          <div>
            <h3 className="font-semibold text-white">{currentAgent.name}</h3>
            <p className="text-sm text-white/70">{currentAgent.title}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          <p className="text-white/70">
            I'm sorry, but I cannot directly embed the Custom GPT here. When you're ready to integrate with the OpenAI API, this interface will be fully functional.
          </p>
          <p className="text-white/70">
            For now, you can access Miles directly at:
            <a 
              href="https://chatgpt.com/g/g-680c4224fdcc8191b710d8c5f371f825-miles-practice-manager-nextgen" 
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-primary hover:underline"
            >
              Chat with Miles →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
