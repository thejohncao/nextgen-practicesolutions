
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AgentChatAvatar from './AgentChatAvatar';
import { AiMessage } from '@/types/conversation';
import { ChevronDown, ChevronUp, Volume2, VolumeX } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { Button } from './ui/button';

// Define the AI agents with their properties
const agents = {
  miles: {
    name: "Miles",
    color: "from-[#3A86FF] to-[#7FDBFF]",
  },
  giselle: {
    name: "Giselle",
    color: "from-[#00D26A] to-[#00FFB2]",
  },
  devon: {
    name: "Devon",
    color: "from-[#A259FF] to-[#C299FF]",
  },
  alma: {
    name: "Alma", 
    color: "from-[#FFA928] to-[#FFCC80]",
  }
};

type AgentKey = keyof typeof agents;

interface VoiceMessageBubbleProps {
  message: AiMessage;
  isTyping?: boolean;
  isExpanded?: boolean;
  onToggleExpansion?: () => void;
  isVoiceEnabled?: boolean;
  isMuted?: boolean;
}

const VoiceMessageBubble: React.FC<VoiceMessageBubbleProps> = ({ 
  message, 
  isTyping = false,
  isExpanded = false,
  onToggleExpansion,
  isVoiceEnabled = false,
  isMuted = false
}) => {
  const [shouldShowExpandButton, setShouldShowExpandButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  
  const {
    speak,
    isSpeaking,
    isLoading,
    stop
  } = useTextToSpeech({
    onEnd: () => {
      console.log('Speech ended');
    },
    onError: (error) => {
      console.error('Text-to-speech error:', error);
    }
  });
  
  const MAX_HEIGHT = 300; // Maximum height before showing "Read More" button
  
  useEffect(() => {
    // Check if content exceeds max height and should show expand button
    if (contentRef.current) {
      const shouldExpand = contentRef.current.scrollHeight > MAX_HEIGHT;
      setShouldShowExpandButton(shouldExpand);
    }
  }, [message.text]);

  // Auto-play speech for new AI messages
  useEffect(() => {
    if (
      isVoiceEnabled && 
      !message.isUser && 
      !isMuted && 
      !hasSpoken
    ) {
      speakMessage();
      setHasSpoken(true);
    }
  }, [message.text, isVoiceEnabled, isMuted]);

  // Stop speaking when muted
  useEffect(() => {
    if (isMuted && isSpeaking) {
      stop();
    }
  }, [isMuted]);

  const speakMessage = () => {
    if (!message.isUser && message.text) {
      speak(message.text, message.agent);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stop();
    } else {
      speakMessage();
    }
  };
  
  return (
    <div 
      className={cn(
        "mb-4 max-w-[85%] rounded-xl p-3",
        message.isUser ? "bg-nextgen-dark/60 ml-auto" : 
        `bg-gradient-to-br ${agents[message.agent as AgentKey]?.color || agents.miles.color}/10 mr-auto`
      )}
    >
      {!message.isUser && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AgentChatAvatar agent={message.agent} hideDetails={false} isTyping={isSpeaking} />
            <div className="font-semibold text-sm text-white/90">
              {agents[message.agent as AgentKey]?.name || "Assistant"}
            </div>
          </div>
          
          {/* Voice controls for AI messages - hidden for MVP */}
          {false && isVoiceEnabled && !message.isUser && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full h-8 w-8 p-0 flex items-center justify-center",
                isSpeaking ? "text-white bg-white/10" : "text-white/60"
              )}
              onClick={toggleSpeech}
              disabled={isLoading || isMuted}
            >
              {isSpeaking ? (
                <div className="relative">
                  <Volume2 className="h-4 w-4" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* Voice wave animation */}
                    <span className="block w-[3px] h-[3px] bg-white rounded-full animate-ping" />
                  </div>
                </div>
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      )}
      
      <div 
        ref={contentRef}
        className={cn(
          "whitespace-pre-wrap text-white/90 overflow-hidden",
          !isExpanded && shouldShowExpandButton && "max-h-[300px]",
          isExpanded ? "max-h-full" : "",
          isSpeaking && !message.isUser && "border-l-2 border-white/20 pl-2"
        )}
      >
        {message.text}
      </div>
      
      {shouldShowExpandButton && onToggleExpansion && (
        <button 
          onClick={onToggleExpansion}
          className="flex items-center gap-1 mt-2 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Read more
            </>
          )}
        </button>
      )}
      
      {/* Audio loading indicator - hidden for MVP */}
      {false && isLoading && !message.isUser && isVoiceEnabled && !isMuted && (
        <div className="mt-2 text-xs text-white/50 flex items-center gap-1">
          <span className="block w-2 h-2 bg-white/50 rounded-full animate-pulse"></span>
          Generating audio...
        </div>
      )}
    </div>
  );
};

export default VoiceMessageBubble;
