
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare, Wand2 } from 'lucide-react';
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
  // Voice functionality is disabled for MVP
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // Add local typing state
  const [localTypingState, setLocalTypingState] = useState(false);
  
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
    selectAgent,
    useGptEnabled,
    setUseGptEnabled,
    isApiFailure,
    handleRetryAfterFailure
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
    resetTimeout
  } = useChatTimeout(isTyping || localTypingState);
  
  const isMobile = useIsMobile();

  // Initialize with Miles as the selected agent
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
      }
    };
    
    document.addEventListener('open-miles-chat', listener as EventListener);
    return () => {
      document.removeEventListener('open-miles-chat', listener as EventListener);
    };
  }, [selectAgent, setIsOpen]);

  const handleSendMessage = async (message: string) => {
    try {
      // Set local typing state to indicate we're processing
      setLocalTypingState(true);
      
      // Send the message
      await sendMessage(message);
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLocalTypingState(false);
    }
  };

  const handleContinueAnyway = () => {
    resetTimeout();
    // Let the AI continue processing
  };

  const handleSummarizeResponse = async () => {
    try {
      setLocalTypingState(true);
      resetTimeout();
      
      // Add a summary message from the agent
      await sendMessage(`Could you summarize what you know so far about ${messages[messages.length - 1]?.text?.slice(0, 30)}...`);
    } catch (err) {
      console.error("Error sending summary request:", err);
      toast.error("Failed to summarize. Please try again.");
    } finally {
      setLocalTypingState(false);
    }
  };

  // Toggle GPT responses
  const toggleGptMode = () => {
    setUseGptEnabled(prev => {
      const newState = !prev;
      toast.success(
        newState ? "AI responses enabled" : "Fallback responses enabled", 
        { description: newState ? "Using OpenAI API" : "Using pre-defined responses" }
      );
      return newState;
    });
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
        {(isTyping || localTypingState) && (
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
            
            {/* AI Mode Toggle (Dev Only) */}
            <div className="px-3 py-1.5 bg-black/20 flex justify-between items-center">
              <div className="text-xs text-white/60">
                {useGptEnabled 
                  ? "Using OpenAI API" 
                  : "Using fallback responses"}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2 text-xs border-white/10 hover:bg-white/5 flex items-center gap-1"
                onClick={toggleGptMode}
              >
                <Wand2 className="h-3.5 w-3.5 mr-1" />
                {useGptEnabled ? "Disable AI" : "Enable AI"}
              </Button>
            </div>
            
            {/* Agent selection tabs */}
            <AgentTabs 
              currentAgent={currentAgent}
              onSelectAgent={selectAgent}
            />
            
            {/* Chat messages */}
            <ChatMessages 
              messages={messages}
              isTyping={isTyping || localTypingState}
              currentAgent={currentAgent}
              showExpandedMessage={showExpandedMessage}
              toggleMessageExpansion={toggleMessageExpansion}
              isVoiceEnabled={isVoiceEnabled}
              isMuted={isMuted}
              showTimeout={showTimeout}
              isTimedOut={isTimedOut}
              isApiFailure={isApiFailure}
              sessionMessageCount={sessionMessageCount}
              showEmailDialog={showEmailDialog}
              setShowEmailDialog={setShowEmailDialog}
              onContinueAnyway={handleContinueAnyway}
              onSummarizeResponse={handleSummarizeResponse}
              onRetry={handleRetry}
              onStartOver={handleStartOver}
              onRetryWithAi={handleRetryAfterFailure}
            />
            
            {/* Chat input - Always showing suggestions and hiding voice mode for MVP */}
            <VoiceChatInput 
              isTyping={(isTyping || localTypingState || isTimedOut)}
              currentAgent={currentAgent}
              onSendMessage={handleSendMessage}
              messages={messages}
              suggestions={getAgentSuggestions()}
              isVoiceEnabled={false} // Voice disabled for MVP
              isMuted={isMuted}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedAiAssistant;
