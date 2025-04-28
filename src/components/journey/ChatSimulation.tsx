
import React from 'react';
import { ChatMessage } from '@/data/patientJourney';
import { Card } from '@/components/ui/card';
import AgentChatAvatar from '../AgentChatAvatar';

interface ChatSimulationProps {
  agentName: string;
  agentRole: string;
  messages: ChatMessage[];
  onClose: () => void;
}

const ChatSimulation = ({ agentName, agentRole, messages, onClose }: ChatSimulationProps) => {
  return (
    <Card className="glass-card p-4 animate-fade-in-up shadow-lg backdrop-blur-xl bg-black/40">
      <div className="flex items-center gap-2 mb-4">
        <AgentChatAvatar agent={agentName} hideDetails={false} />
      </div>
      
      <div className="space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={`flex ${msg.sender === 'agent' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.sender === 'agent' 
                ? 'bg-white/10 text-white' 
                : 'bg-nextgen-purple/20 text-white'
            }`}>
              <p className="text-sm">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ChatSimulation;
