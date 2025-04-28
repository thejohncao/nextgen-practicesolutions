
import React from 'react';
import { ChatMessage } from '@/data/patientJourney';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import AgentAvatar from '../AgentAvatar';

interface ChatSimulationProps {
  agentName: string;
  agentRole: string;
  messages: ChatMessage[];
  onClose: () => void;
}

const ChatSimulation = ({ agentName, agentRole, messages, onClose }: ChatSimulationProps) => {
  return (
    <Card className="glass-card absolute z-10 w-[300px] p-4 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AgentAvatar name={agentName} role={agentRole} size="sm" />
        </div>
        <button 
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={`flex ${msg.sender === 'agent' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.sender === 'agent' 
                ? 'bg-white/5 text-white' 
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
