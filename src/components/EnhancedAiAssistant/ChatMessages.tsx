
import React, { useRef, useEffect } from 'react';
import { AiMessage } from '@/types/conversation';
import VoiceMessageBubble from '../VoiceMessageBubble';
import TypingIndicator from '../TypingIndicator';
import ChatNotifications from './ChatNotifications';
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
  onContinueAnyway: () => void;
  onSummarizeResponse: () => void;
  onRetry: () => void;
  onStartOver: () => void;
  onRequestEmail: () => void;
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
  onContinueAnyway,
  onSummarizeResponse,
  onRetry,
  onStartOver,
  onRequestEmail
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
      
      <ChatNotifications
        showTimeout={showTimeout}
        isTyping={isTyping}
        isTimedOut={isTimedOut}
        onContinueAnyway={onContinueAnyway}
        onSummarizeResponse={onSummarizeResponse}
        onRetry={onRetry}
        onStartOver={onStartOver}
      />
      
      <EmailNotification
        sessionMessageCount={sessionMessageCount}
        showEmailDialog={showEmailDialog}
        onRequestEmail={onRequestEmail}
      />
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
