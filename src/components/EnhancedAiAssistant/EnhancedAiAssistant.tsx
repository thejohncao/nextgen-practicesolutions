
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { MessageSquare, X, Volume2, VolumeX } from 'lucide-react';
import { AiMessage } from '@/types/conversation';
import { useIsMobile } from "@/hooks/use-mobile";
import { useAiConversation } from '@/hooks/useAiConversation';
import ChatHeader from '../ChatHeader';
import VoiceMessageBubble from '../VoiceMessageBubble';
import VoiceChatInput from '../VoiceChatInput';
import AgentTabs from '../chat/AgentTabs';
import EmailCollectionDialog from '../EmailCollectionDialog';
import TypingIndicator from '../TypingIndicator';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(initialVoiceMode);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionMessageCount, setSessionMessageCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [showTimeout, setShowTimeout] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
  
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Determine if we should show the assistant based on current path
  const shouldShow = showPaths.includes(location.pathname);

  // Initialize with the selected agent if provided
  useEffect(() => {
    if (initialAgent && messages.length === 0) {
      selectAgent(initialAgent);
    }
  }, [initialAgent]);

  useEffect(() => {
    const listener = (e: Event) => {
      setIsOpen(true);
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.agent) {
        selectAgent(customEvent.detail.agent);
      }
      
      if (customEvent.detail?.voiceMode !== undefined) {
        setIsVoiceEnabled(customEvent.detail.voiceMode);
      }
    };
    
    document.addEventListener('open-miles-chat', listener as EventListener);
    return () => {
      document.removeEventListener('open-miles-chat', listener as EventListener);
    };
  }, []);
  
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, showExpandedMessage]);

  // Handle typing timeout
  useEffect(() => {
    if (isTyping) {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set a new timeout for 10 seconds
      const newTimeoutId = window.setTimeout(() => {
        setShowTimeout(true);
      }, 10000);
      
      setTimeoutId(Number(newTimeoutId));
    } else {
      // Clear timeout when not typing
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setShowTimeout(false);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTyping]);

  // Track message count to show email dialog when session limit is reached
  useEffect(() => {
    setSessionMessageCount(messages.filter(m => m.isUser).length);
    
    // Show email dialog after 8 messages (counting user messages)
    if (messages.filter(m => m.isUser).length >= 8) {
      setShowEmailDialog(true);
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    // If this is the first user message or the second with the first being from the assistant
    const isFirstUserMessage = 
      messages.length === 0 || 
      (messages.length === 1 && !messages[0].isUser);
      
    // Show email dialog after a delay for the first message
    if (isFirstUserMessage) {
      setTimeout(() => setShowEmailDialog(true), 5000);
    }
    
    sendMessage(message);
  };

  const toggleVoiceMode = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleContinueAnyway = () => {
    setShowTimeout(false);
    // Let the AI continue processing
  };

  const handleSummarizeResponse = () => {
    setShowTimeout(false);
    
    // Add a summary message from the agent
    const summaryMessage: AiMessage = {
      text: `I'm still processing your request. Here's what I understand so far: You're asking about ${messages[messages.length - 1]?.text?.slice(0, 30)}... Let me continue working on a complete response.`,
      isUser: false,
      timestamp: new Date().toISOString(),
      agent: currentAgent
    };
    
    // Manually add the summary message
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
              onSelectAgent={selectAgent}
            />
            
            {/* Voice mode toggle */}
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
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-3.5 w-3.5 mr-1" /> : <Volume2 className="h-3.5 w-3.5 mr-1" />}
                    {isMuted ? "Unmute" : "Mute"}
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 text-xs border-white/10 hover:bg-white/5"
                  onClick={toggleVoiceMode}
                >
                  {isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
              {messages.map((message: AiMessage, index) => (
                <VoiceMessageBubble
                  key={index}
                  message={message}
                  isExpanded={showExpandedMessage === index}
                  onToggleExpansion={() => toggleMessageExpansion(index)}
                  isVoiceEnabled={isVoiceEnabled}
                  isMuted={isMuted}
                />
              ))}
              
              {isTyping && (
                <TypingIndicator agent={currentAgent} />
              )}
              
              {/* Timeout notification */}
              {showTimeout && isTyping && (
                <div className="p-4 mb-4 bg-[#000000] border border-amber-700/30 rounded-lg">
                  <p className="text-white/90 mb-3">Still working on your request. Would you like me to:</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1 border-white/20 hover:bg-white/5"
                      onClick={handleContinueAnyway}
                    >
                      Continue processing
                    </Button>
                    <Button 
                      variant="default"
                      size="sm"
                      className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500"
                      onClick={handleSummarizeResponse}
                    >
                      Summarize what you know so far
                    </Button>
                  </div>
                </div>
              )}
              
              {isTimedOut && (
                <div className="p-4 mb-4 bg-[#000000] border border-red-900/30 rounded-lg">
                  <p className="text-white/90 mb-3">Sorry about that — I may have lost connection for a moment. Want to continue where we left off or start over?</p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1 border-white/20 hover:bg-white/5"
                      onClick={handleRetry}
                    >
                      Yes, continue
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-white/20 hover:bg-white/5"
                      onClick={handleStartOver}
                    >
                      Start over
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Session limit notification */}
              {sessionMessageCount >= 7 && !showEmailDialog && (
                <div className="p-3 mb-4 bg-black/30 border border-white/10 rounded-lg">
                  <p className="text-white/80 text-sm">
                    You're approaching the end of your chat preview. 
                    Would you like to receive a full resource pack?
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500"
                    onClick={() => setShowEmailDialog(true)}
                  >
                    Get Resource Pack
                  </Button>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
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
      
      <EmailCollectionDialog
        triggerText=""
        buttonClassName="hidden"
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
      />
    </>
  );
};

export default EnhancedAiAssistant;
