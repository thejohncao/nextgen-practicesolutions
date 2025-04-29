
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import AgentSelectionDialog from './AgentSelectionDialog';

interface MeetYourTeamButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const MeetYourTeamButton: React.FC<MeetYourTeamButtonProps> = ({
  className = '',
  variant = 'default'
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleSelectAgent = (agent: string) => {
    // Dispatch event to open chat with selected agent
    const event = new CustomEvent('open-miles-chat', {
      detail: {
        agent: agent,
        voiceMode: true // Set voice mode to true by default
      }
    });
    document.dispatchEvent(event);
    setShowDialog(false); // Close the dialog after selection
  };

  const handleSelectMode = (useVoice: boolean) => {
    // This will be included in the event above now, no need for separate handling
    console.log('Voice mode selected:', useVoice);
  };

  return (
    <>
      <Button 
        variant={variant}
        className={`${className}`}
        onClick={() => setShowDialog(true)}
      >
        <Users className="h-4 w-4 mr-2" />
        Meet Your AI Team
      </Button>
      
      <AgentSelectionDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSelectAgent={handleSelectAgent}
        onSelectMode={handleSelectMode}
      />
    </>
  );
};

export default MeetYourTeamButton;
