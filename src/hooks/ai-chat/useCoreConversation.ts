
import { useState, useCallback, useRef } from 'react';
import { callOpenAI } from '@/lib/openai';
import { toast } from '@/components/ui/use-toast';
import { getAgentChatData } from '@/data/agentChatData';
import { useAgentManagement } from './useAgentManagement';
import { useResponseTimeout } from './useResponseTimeout';
import { useStreamingResponse } from './useStreamingResponse';
import { useRetryLogic } from './useRetryLogic';
import { AiMessage } from './types';
import { Message } from '@/lib/aiTypes';

export function useCoreConversation(
  currentAgent: string,
  agentConversations: Record<string, AiMessage[]>,
  setAgentConversations: (callback: (prev: Record<string, AiMessage[]>) => Record<string, AiMessage[]>) => void,
  saveMessagesToSession: (conversationId: string, agentName: string, messages: AiMessage[]) => void,
  conversationId: string,
  resetRetries: () => void
) {
  const [isTyping, setIsTyping] = useState(false);
  
  const {
    streamingResponseRef,
    processStreamedResponse,
    cancelStreamingResponse
  } = useStreamingResponse();
  
  const {
    isTimedOut,
    setIsTimedOut,
    timeoutLevel,
    setTimeoutLevel,
    startResponseTimeout,
    clearResponseTimeout
  } = useResponseTimeout();

  const {
    error,
    setError,
    handleRetryWithBackoff,
    resetRetries: resetRetryLogic
  } = useRetryLogic();

  // Send a message to the AI
  const sendMessage = useCallback(async (userMessage: string, isRetry: boolean = false) => {
    if (!userMessage.trim()) return;

    // Reset retries if this is not a retry
    if (!isRetry) {
      resetRetries();
      resetRetryLogic();
    }
    
    // Don't add user message again if this is a retry
    if (!isRetry) {
      // Add user message to current agent's conversation
      setAgentConversations(prev => {
        const agentMessages = [...(prev[currentAgent] || [])];
        agentMessages.push({
          text: userMessage,
          isUser: true,
          agent: currentAgent,
          timestamp: new Date()
        });
        const updatedConversations = {
          ...prev,
          [currentAgent]: agentMessages
        };
        
        // Save to session storage
        saveMessagesToSession(conversationId, currentAgent, agentMessages);
        
        return updatedConversations;
      });
    }
    
    setIsTimedOut(false); // Reset timeout status
    setIsTyping(true);
    setError(null);
    startResponseTimeout(); // Start timeout tracking

    try {
      // Get current agent's messages - ensure we send full history for context
      const agentMessages = agentConversations[currentAgent] || [];
      
      // Transform to OpenAI message format, preserving all conversation history
      const messageHistory: Message[] = agentMessages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      }));

      // For retry, we find the last user message and use that
      if (isRetry) {
        const lastUserMessage = [...agentMessages].reverse().find(msg => msg.isUser);
        if (lastUserMessage) {
          // We add it explicitly to make sure it's the last message
          messageHistory.push({
            role: "user",
            content: lastUserMessage.text,
          });
        }
      } else {
        // Not a retry, so we add the new user message
        messageHistory.push({
          role: "user",
          content: userMessage,
        });
      }
      
      // Use agent-specific system prompt with the enhanced prompts
      const agentData = getAgentChatData(currentAgent);
      console.log(`Using agent: ${currentAgent}, prompt length: ${agentData.systemPrompt?.length || 0}`);
      
      if (!agentData.systemPrompt) {
        console.error(`Missing system prompt for agent: ${currentAgent}`);
        // Apply a fallback prompt
        agentData.systemPrompt = "You are a helpful assistant for NextGen Practice Solutions.";
      }
      
      const systemPrompt = agentData.systemPrompt;
      
      // Use streaming for faster initial response
      const response = await callOpenAI(messageHistory, systemPrompt, true) as Response;
      
      if (response) {
        clearResponseTimeout(); // Clear timeout since we received a response
        streamingResponseRef.current = response;
        
        // Set up streaming
        const reader = response.body!.getReader();
        const decoder = new TextDecoder('utf-8');
          
        // If retry, don't add user message again
        const currentAgentMessages = isRetry 
          ? [...(agentConversations[currentAgent] || [])]
          : [...(agentConversations[currentAgent] || []), {
              text: userMessage,
              isUser: true,
              agent: currentAgent,
              timestamp: new Date()
            }];
        
        // Process the streamed response
        const fullResponse = await processStreamedResponse(
          reader, 
          decoder, 
          currentAgentMessages,
          currentAgent,
          setAgentConversations,
          saveMessagesToSession,
          conversationId
        );
        
        // Final update to ensure we have the complete response
        setAgentConversations(prev => {
          const updatedMessages = [...currentAgentMessages];
          // Check if we already have an AI response at the end
          const lastMsg = updatedMessages[updatedMessages.length - 1];
          
          if (!lastMsg || lastMsg.isUser) {
            // Add the complete response as a new message
            updatedMessages.push({
              text: fullResponse,
              isUser: false,
              agent: currentAgent,
              timestamp: new Date()
            });
          }
          
          const updatedConversations = {
            ...prev,
            [currentAgent]: updatedMessages
          };
          
          // Save updated conversation to session storage
          saveMessagesToSession(conversationId, currentAgent, updatedMessages);
          
          return updatedConversations;
        });
        
        // Reset retry counter on success
        resetRetries();
        resetRetryLogic();
      } else {
        // No response returned - handle error case
        console.error("Empty or null response received from OpenAI");
        
        // If this is the first attempt, retry silently
        if (!isRetry) {
          console.log("Retrying message once silently...");
          setIsTyping(false);
          return sendMessage(userMessage, true);
        }
        
        // Show branded fallback message after retry attempt
        setAgentConversations(prev => {
          const updated = [...(prev[currentAgent] || [])];
          updated.push({
            text: `I'm having trouble accessing my tools right now — possibly due to high demand. Want to try a different approach to your question?`,
            isUser: false,
            agent: currentAgent,
            timestamp: new Date()
          });
          
          const updatedConversations = {
            ...prev,
            [currentAgent]: updated
          };
          
          // Save updated conversation to session storage
          saveMessagesToSession(conversationId, currentAgent, updated);
          
          return updatedConversations;
        });
      }
    } catch (err) {
      console.error("Error in AI conversation:", err);
      
      // If this is the first attempt, retry silently
      if (!isRetry) {
        console.log("Error occurred, retrying message once...");
        setIsTyping(false);
        return sendMessage(userMessage, true);
      }
      
      // Show branded fallback after retry attempt
      setAgentConversations(prev => {
        const updated = [...(prev[currentAgent] || [])];
        updated.push({
          text: `I'm having trouble accessing my tools right now — possibly due to high demand. Want to try a different approach to your question?`,
          isUser: false,
          agent: currentAgent,
          timestamp: new Date()
        });
        
        const updatedConversations = {
          ...prev,
          [currentAgent]: updated
        };
        
        // Save updated conversation to session storage
        saveMessagesToSession(conversationId, currentAgent, updated);
        
        return updatedConversations;
      });
    } finally {
      setIsTyping(false);
      streamingResponseRef.current = null;
    }
  }, [
    currentAgent, 
    agentConversations,
    conversationId,
    saveMessagesToSession,
    startResponseTimeout,
    clearResponseTimeout,
    processStreamedResponse,
    resetRetries,
    resetRetryLogic,
    setError,
    setIsTimedOut,
    streamingResponseRef,
    setAgentConversations
  ]);

  return {
    sendMessage,
    isTyping,
    isTimedOut,
    timeoutLevel,
    error,
    cancelStreamingResponse
  };
}
