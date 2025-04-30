import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AiMessage } from '@/types/conversation';
import VoiceMessageBubble from '../VoiceMessageBubble';
import TypingIndicator from '../TypingIndicator';
import EmailNotification from './EmailNotification';

interface ChatMessagesProps {
  messages: AiMessage[];
  isTyping: boolean;
  currentAgent: string;
  showExpandedMessage: number | null;
  toggleMessageExpansion: (index: number) => void;
  isVoiceEnabled: boolean;
  isMuted: boolean;
  showTimeout: boolean;
  isTimedOut: boolean;
  sessionMessageCount: number;
  showEmailDialog: boolean;
  setShowEmailDialog: (show: boolean) => void;
  onContinueAnyway: () => void;
  onSummarizeResponse: () => void;
  onRetry: () => void;
  onStartOver: () => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  currentAgent,
  showExpandedMessage,
  toggleMessageExpansion,
  isVoiceEnabled,
  isMuted,
  showTimeout,
  isTimedOut,
  sessionMessageCount,
  showEmailDialog,
  setShowEmailDialog,
  onContinueAnyway,
  onSummarizeResponse,
  onRetry,
  onStartOver
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, showExpandedMessage]);
  
  return (
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
      
      {/* Show the timeout message after 4 seconds of typing */}
      {showTimeout && isTyping && (
        <div className="p-4 mb-4 bg-[#000000] border border-blue-900/30 rounded-lg animate-fade-in">
          <p className="text-white/90 mb-3">Let me pull that up for you... one moment.</p>
        </div>
      )}
      
      {/* Connection error notification - keeping this per requirements */}
      {isTimedOut && (
        <div className="p-4 mb-4 bg-[#000000] border border-red-900/30 rounded-lg">
          <p className="text-white/90 mb-3">Sorry about that — I may have lost connection for a moment. Want to continue where we left off or start over?</p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 border-white/20 hover:bg-white/5"
              onClick={onRetry}
            >
              Yes, continue
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-white/20 hover:bg-white/5"
              onClick={onStartOver}
            >
              Start over
            </Button>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
