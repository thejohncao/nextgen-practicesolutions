
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface VoiceToggleProps {
  isVoiceEnabled: boolean;
  isMuted: boolean;
  onToggleVoice: () => void;
  onToggleMute: () => void;
  isVoiceAvailable?: boolean;
}

const VoiceToggle: React.FC<VoiceToggleProps> = ({
  isVoiceEnabled,
  isMuted,
  onToggleVoice,
  onToggleMute,
  isVoiceAvailable = false // Default to false to show "Coming Soon"
}) => {
  return (
    <div className="px-3 py-1.5 bg-black/20 flex justify-between items-center">
      <div className="text-xs text-white/60">
        {isVoiceEnabled 
          ? "Voice Mode: ON" 
          : "Voice Mode: OFF"}
      </div>
      <div className="flex gap-2">
        {isVoiceEnabled && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs"
            onClick={onToggleMute}
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5 mr-1" /> : <Volume2 className="h-3.5 w-3.5 mr-1" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className={`h-7 px-2 text-xs border-white/10 hover:bg-white/5 ${!isVoiceAvailable ? 'opacity-70' : ''}`}
          onClick={isVoiceAvailable ? onToggleVoice : () => {}}
        >
          {isVoiceAvailable 
            ? (isVoiceEnabled ? "Disable Voice" : "Enable Voice") 
            : "Voice Mode Coming Soon"}
        </Button>
      </div>
    </div>
  );
};

export default VoiceToggle;
