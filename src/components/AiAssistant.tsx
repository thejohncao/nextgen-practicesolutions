
import React from 'react';
import { useChatVisibility } from './chat/useChatVisibility';
import ChatToggle from './chat/ChatToggle';
import ChatDialog from './chat/ChatDialog';
import EmailCollectionDialog from './EmailCollectionDialog';
import { useAiConversation } from '../hooks/useAiConversation';

interface AiAssistantProps {
  showPaths?: string[];
}

const AiAssistant = ({ showPaths = ['/', '/solutions', '/academy', '/features'] }: AiAssistantProps) => {
  const { 
    isOpen, setIsOpen,
    isMinimized, setIsMinimized,
    showEmailDialog, setShowEmailDialog,
    shouldShow, checkAndShowEmailDialog
  } = useChatVisibility({ showPaths });
  
  const { 
    messages, 
    sendMessage, 
    isTyping, 
    currentAgent,
    timeoutLevel,
    isTimedOut,
    handleRetry,
    handleStartOver,
    changeAgent,
    clearConversation
  } = useAiConversation();
  
  // Return null if we shouldn't show on this path
  if (!shouldShow) return null;
  
  // Handle agent change
  const handleAgentChange = (agentName: string) => {
    changeAgent(agentName);
  };

  // Handle sending messages with potential email prompt
  const handleSendMessage = (message: string) => {
    checkAndShowEmailDialog(message);
    sendMessage(message);
  };

  return (
    <>
      <ChatToggle 
        isOpen={isOpen} 
        currentAgent={currentAgent} 
        onClick={() => setIsOpen(!isOpen)} 
        isTyping={isTyping}
      />
      
      <ChatDialog
        isOpen={isOpen}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        onOpenChange={setIsOpen}
        messages={messages}
        isTyping={isTyping}
        isTimedOut={isTimedOut}
        timeoutLevel={timeoutLevel}
        currentAgent={currentAgent}
        handleRetry={handleRetry}
        handleStartOver={handleStartOver}
        onChangeAgent={handleAgentChange}
        onSendMessage={handleSendMessage}
      />
      
      <EmailCollectionDialog
        triggerText=""
        buttonClassName="hidden"
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
      />
    </>
  );
};

export default AiAssistant;
