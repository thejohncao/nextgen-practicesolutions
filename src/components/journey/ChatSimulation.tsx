
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
  // Get agent-specific gradient and border classes
  const getGradientClass = () => {
    switch(agentName.toLowerCase()) {
      case 'giselle': return 'from-green-500/5 to-transparent';
      case 'miles': return 'from-blue-500/5 to-transparent';
      case 'devon': return 'from-purple-500/5 to-transparent';
      case 'alma': return 'from-amber-500/5 to-transparent';
      default: return 'from-white/5 to-transparent';
    }
  };
  
  const getBubbleClass = (sender: string) => {
    if (sender === 'user') {
      return 'bg-nextgen-purple/20 text-white';
    }
    
    switch(agentName.toLowerCase()) {
      case 'giselle': return 'bg-green-500/10 text-white border border-green-500/20';
      case 'miles': return 'bg-blue-500/10 text-white border border-blue-500/20';
      case 'devon': return 'bg-purple-500/10 text-white border border-purple-500/20';
      case 'alma': return 'bg-amber-500/10 text-white border border-amber-500/20';
      default: return 'bg-white/10 text-white';
    }
  };

  return (
    <Card className={`glass-card p-3 sm:p-4 animate-fade-in shadow-lg backdrop-blur-xl bg-gradient-to-b ${getGradientClass()} bg-black/30`}>
      <div className="flex items-center gap-2 mb-3">
        <AgentChatAvatar agent={agentName} hideDetails={false} />
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={`flex ${msg.sender === 'agent' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] p-2 sm:p-3 rounded-lg ${getBubbleClass(msg.sender)}`}>
              <p className="text-sm">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ChatSimulation;
