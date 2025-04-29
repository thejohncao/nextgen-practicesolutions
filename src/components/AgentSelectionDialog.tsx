
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { agents } from '@/data/agents';
import AgentAvatar from './AgentAvatar';
import { Volume2, MessageSquare } from 'lucide-react';

interface AgentSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAgent: (agent: string) => void;
  onSelectMode: (useVoice: boolean) => void;
}

const AgentSelectionDialog: React.FC<AgentSelectionDialogProps> = ({
  open,
  onOpenChange,
  onSelectAgent,
  onSelectMode
}) => {
  // Filter to get only the 4 main agents in the correct order
  const mainAgents = ['miles', 'giselle', 'devon', 'alma'];
  const sortedAgents = mainAgents.map(name => 
    agents.find(a => a.name.toLowerCase() === name)
  ).filter(Boolean);

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<'voice' | 'text'>('voice');

  const handleAgentSelect = (agentName: string) => {
    setSelectedAgent(agentName);
  };

  const handleModeSelect = (mode: 'voice' | 'text') => {
    setSelectedMode(mode);
  };

  const handleStartChat = () => {
    if (selectedAgent) {
      onSelectAgent(selectedAgent);
      onSelectMode(selectedMode === 'voice');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-nextgen-dark border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Meet Your AI Team</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-center text-white/70 mb-6">
            Select an AI specialist to chat with
          </p>

          <div className="grid grid-cols-2 gap-3">
            {sortedAgents.map((agent) => (
              <Button
                key={agent.name}
                variant="outline"
                className={`
                  flex flex-col items-center p-4 h-auto border border-white/10 
                  hover:bg-white/5 transition-all duration-200
                  ${selectedAgent === agent.name.toLowerCase() ? 'bg-white/10 ring-1 ring-white/30' : 'bg-black/20'}
                `}
                onClick={() => handleAgentSelect(agent.name.toLowerCase())}
              >
                <AgentAvatar
                  name={agent.name}
                  role={agent.title}
                  color={agent.color}
                  size="md"
                  animated={selectedAgent === agent.name.toLowerCase()}
                  showLabel={true}
                />
                <div className="text-sm font-medium mt-2">{agent.name}</div>
                <div className="text-xs text-white/60 mt-1">{agent.title}</div>
              </Button>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-center text-white/70 mb-4">
              Choose your preferred interaction mode
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                className={`
                  flex flex-col items-center p-4 h-auto
                  ${selectedMode === 'voice' ? 'bg-white/10 ring-1 ring-white/30' : 'bg-black/20 border-white/10'}
                `}
                onClick={() => handleModeSelect('voice')}
              >
                <Volume2 className="h-8 w-8 mb-2 text-white/80" />
                <span className="text-sm">Voice Chat</span>
              </Button>
              
              <Button
                variant="outline"
                className={`
                  flex flex-col items-center p-4 h-auto
                  ${selectedMode === 'text' ? 'bg-white/10 ring-1 ring-white/30' : 'bg-black/20 border-white/10'}
                `}
                onClick={() => handleModeSelect('text')}
              >
                <MessageSquare className="h-8 w-8 mb-2 text-white/80" />
                <span className="text-sm">Text Chat</span>
              </Button>
            </div>
          </div>
          
          <Button
            className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
            disabled={!selectedAgent}
            onClick={handleStartChat}
          >
            Start Chatting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentSelectionDialog;
