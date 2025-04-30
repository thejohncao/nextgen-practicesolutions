
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChatToggleButton from './ChatToggleButton';
import ChatHeader from './ChatHeader';
import VoiceChatInput from './VoiceChatInput';
import VoiceMessageBubble from './VoiceMessageBubble';
import { useAiConversation } from '../hooks/useAiConversation';
import { Dialog, DialogContent } from './ui/dialog';
import { useIsMobile } from "../hooks/use-mobile";
import TypingIndicator from './TypingIndicator';
import { Button } from './ui/button';
import { RefreshCw, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { AiMessage } from '@/types/conversation';

interface VoiceAiAssistantProps {
  showPaths?: string[];
  initialAgent?: string;
  initialVoiceMode?: boolean;
}

const VoiceAiAssistant = ({ 
  showPaths = ['/', '/solutions', '/academy', '/features'],
  initialAgent = 'miles',
  initialVoiceMode = false
}: VoiceAiAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(initialVoiceMode);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionMessageCount, setSessionMessageCount] = useState(0);
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
    getAgentSuggestions
  } = useAiConversation();
  
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Determine if we should show the assistant based on current path
  const shouldShow = showPaths.includes(location.pathname);

  // Initialize with the selected agent if provided
  useEffect(() => {
    if (initialAgent && initialAgent !== currentAgent && messages.length === 0) {
      // Send an empty message to trigger the agent's welcome message
      console.log('Initializing with agent:', initialAgent);
      // Logic to select the agent will be in the useAiConversation hook
    }
  }, [initialAgent]);

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      setIsOpen(true);
      if (e.detail?.agent) {
        // Logic to select the agent will be in the useAiConversation hook
        console.log('Opening chat with agent:', e.detail.agent);
      }
      
      if (e.detail?.voiceMode !== undefined) {
        setIsVoiceEnabled(e.detail.voiceMode);
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

  // Track message count but don't show email dialog
  useEffect(() => {
    setSessionMessageCount(messages.filter(m => m.isUser).length);
    // Removed the email dialog display logic
  }, [messages]);

  const handleSendMessage = (message: string) => {
    // If this is the first user message or the second with the first being from the assistant
    const isFirstUserMessage = 
      messages.length === 0 || 
      (messages.length === 1 && !messages[0].isUser);
      
    // No longer show email dialog after the first message
    if (isFirstUserMessage) {
      console.log('First user message received');
    }
    
    sendMessage(message);
  };

  const toggleVoiceMode = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Return null if we shouldn't show on this path
  if (!shouldShow) return null;

  return (
    <>
      <ChatToggleButton 
        isOpen={isOpen} 
        currentAgent={currentAgent} 
        onClick={() => setIsOpen(!isOpen)} 
        isTyping={isTyping}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`p-0 gap-0 border-none ${isMobile ? 'w-[95vw] max-w-[95vw] h-[80vh] max-h-[85vh] rounded-lg' : 'w-[450px] max-w-[450px] h-[75vh] max-h-[75vh] rounded-xl'}`}>
          <div className="flex flex-col h-full bg-[#151719] text-gray-50 rounded-lg overflow-hidden">
            <ChatHeader 
              isMinimized={isMinimized} 
              currentAgent={currentAgent} 
              onMinimize={(e) => setIsMinimized(!isMinimized)}
              onClose={() => setIsOpen(false)} 
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
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Yes, continue
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-white/20 hover:bg-white/5"
                      onClick={handleStartOver}
                    >
                      <ArrowRight className="h-3.5 w-3.5 mr-1" />
                      Start over
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Removed the session limit notification */}
              
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
      
      {/* Removed EmailCollectionDialog component */}
    </>
  );
};

export default VoiceAiAssistant;
