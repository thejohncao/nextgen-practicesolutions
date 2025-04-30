
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { AiMessage } from '@/types/conversation';
import { useIsMobile } from "@/hooks/use-mobile";
import { useAiConversation } from '@/hooks/useAiConversation';
import { useChatTimeout } from '@/hooks/useChatTimeout';
import { useChatVisibility } from '@/hooks/useChatVisibility';
import { useEmailCollection } from '@/hooks/useEmailCollection';
import { toast } from 'sonner';
import ChatHeader from '../ChatHeader';
import AgentTabs from '../chat/AgentTabs';
import VoiceChatInput from '../VoiceChatInput';
import VoiceToggle from './VoiceToggle';
import ChatMessages from './ChatMessages';

interface EnhancedAiAssistantProps {
  showPaths?: string[];
  initialAgent?: string;
  initialVoiceMode?: boolean;
}

const EnhancedAiAssistant = ({
  showPaths = ['/', '/solutions', '/academy', '/features'],
  initialAgent = 'miles',
  initialVoiceMode = false
}: EnhancedAiAssistantProps) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(initialVoiceMode);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceAvailable, setIsVoiceAvailable] = useState(false); // Set to false to show "Coming Soon"
  
  const { 
    messages, 
    sendMessage, 
    isTyping, 
    currentAgent, 
    isTimedOut,
    handleRetry,
    handleStartOver,
    showExpandedMessage,
    toggleMessageExpansion,
    getAgentSuggestions,
    selectAgent
  } = useAiConversation();
  
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    shouldShow
  } = useChatVisibility(showPaths);
  
  const {
    showEmailDialog,
    setShowEmailDialog,
    sessionMessageCount,
    handleFirstUserMessage
  } = useEmailCollection(messages);
  
  const { 
    showTimeout, 
    resetTimeout, 
    handleQuickReply 
  } = useChatTimeout(isTyping);
  
  const isMobile = useIsMobile();

  // Initialize with the selected agent if provided
  useEffect(() => {
    if (initialAgent && messages.length === 0) {
      selectAgent(initialAgent);
    }
  }, [initialAgent, selectAgent, messages.length]);

  // Listen for custom events with agent selection
  useEffect(() => {
    const listener = (e: Event) => {
      setIsOpen(true);
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.agent) {
        selectAgent(customEvent.detail.agent);
        
        // Show toast message when switching agents
        if (messages.length > 0) {
          toast.success(`Switched to ${customEvent.detail.agent}`, {
            description: "Let me know if you'd like to pick up where we left off."
          });
        }
      }
      
      if (customEvent.detail?.voiceMode !== undefined) {
        setIsVoiceEnabled(customEvent.detail.voiceMode);
      }
    };
    
    document.addEventListener('open-miles-chat', listener as EventListener);
    return () => {
      document.removeEventListener('open-miles-chat', listener as EventListener);
    };
  }, [selectAgent, setIsOpen, messages.length]);

  const handleSendMessage = (message: string) => {
    handleFirstUserMessage();
    sendMessage(message);
  };

  const toggleVoiceMode = () => {
    if (!isVoiceAvailable) {
      toast.info("Voice Mode Coming Soon", {
        description: "We're working on voice capabilities for a future update!"
      });
      return;
    }
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleContinueAnyway = () => {
    resetTimeout();
    // Let the AI continue processing
  };

  const handleQuickReplyAction = (action: string) => {
    resetTimeout();
    
    // Handle different quick reply actions based on agent
    switch(action) {
      case 'check_schedule':
        sendMessage("Please check today's schedule");
        break;
      case 'show_leads':
        sendMessage("Show me early leads");
        break;
      case 'show_scripts':
        sendMessage("Show me your top 3 scripts");
        break;
      case 'preview_sops':
        sendMessage("Preview SOPs");
        break;
      case 'summarize_progress':
        handleSummarizeResponse();
        break;
      case 'try_again':
      case 'continue':
        handleContinueAnyway();
        break;
      default:
        handleContinueAnyway();
    }
  };

  const handleSummarizeResponse = () => {
    resetTimeout();
    
    // Add a summary message from the agent
    sendMessage(`Could you summarize what you know so far about ${messages[messages.length - 1]?.text?.slice(0, 30)}...`);
  };

  // Return null if we shouldn't show on this path
  if (!shouldShow) return null;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 z-50 flex items-center justify-center"
        data-testid="chat-toggle"
      >
        <MessageSquare className="h-6 w-6 text-white" />
        {isTyping && (
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
        )}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`p-0 gap-0 border-none ${isMobile ? 'w-[95vw] max-w-[95vw] h-[80vh] max-h-[85vh] rounded-lg' : 'w-[450px] max-w-[450px] h-[75vh] max-h-[75vh] rounded-xl'}`}>
          <div className="flex flex-col h-full bg-[#151719] text-gray-50 rounded-lg overflow-hidden">
            <ChatHeader 
              isMinimized={isMinimized} 
              currentAgent={currentAgent} 
              onMinimize={() => setIsMinimized(!isMinimized)}
              onClose={() => setIsOpen(false)} 
            />
            
            {/* Agent selection tabs */}
            <AgentTabs 
              currentAgent={currentAgent}
              onSelectAgent={(agent) => {
                const prevAgent = currentAgent;
                selectAgent(agent);
                
                // Show toast when switching agents if we have messages
                if (messages.length > 0 && prevAgent !== agent) {
                  toast.success(`Switched to ${agent}`, {
                    description: "Let me know if you'd like to pick up where we left off."
                  });
                }
              }}
            />
            
            {/* Voice mode toggle */}
            <VoiceToggle 
              isVoiceEnabled={isVoiceEnabled}
              isMuted={isMuted}
              onToggleVoice={toggleVoiceMode}
              onToggleMute={toggleMute}
              isVoiceAvailable={isVoiceAvailable}
            />
            
            <ChatMessages 
              messages={messages}
              isTyping={isTyping}
              currentAgent={currentAgent}
              showExpandedMessage={showExpandedMessage}
              toggleMessageExpansion={toggleMessageExpansion}
              isVoiceEnabled={isVoiceEnabled}
              isMuted={isMuted}
              showTimeout={showTimeout}
              isTimedOut={isTimedOut}
              sessionMessageCount={sessionMessageCount}
              onContinueAnyway={handleContinueAnyway}
              onRetry={handleRetry}
              onStartOver={handleStartOver}
              onQuickReply={handleQuickReplyAction}
            />
            
            <VoiceChatInput 
              isTyping={isTyping || isTimedOut}
              currentAgent={currentAgent}
              onSendMessage={handleSendMessage}
              messages={messages}
              suggestions={getAgentSuggestions()}
              isVoiceEnabled={isVoiceEnabled}
              onToggleVoice={toggleVoiceMode}
              isMuted={isMuted}
              onToggleMute={toggleMute}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedAiAssistant;
