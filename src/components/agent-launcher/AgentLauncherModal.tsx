
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { agents } from '@/data/agents';
import AgentCard from './AgentCard';

interface AgentLauncherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAgent: (agentName: string) => void;
}

const AgentLauncherModal = ({ open, onOpenChange, onSelectAgent }: AgentLauncherModalProps) => {
  const handleSelectAgent = (agentName: string) => {
    onSelectAgent(agentName);
    onOpenChange(false); // Close the modal after selection
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-nextgen-dark border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Who would you like to speak with?</DialogTitle>
          <DialogDescription className="text-white/70">
            Choose the right agent based on your needs
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {agents.map(agent => (
            <AgentCard 
              key={agent.name} 
              agent={agent} 
              onSelect={handleSelectAgent} 
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentLauncherModal;
