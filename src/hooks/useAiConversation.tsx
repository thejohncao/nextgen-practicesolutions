
import { useState, useCallback, useRef } from 'react';
import { callOpenAI } from '@/lib/openai';
import { toast } from '@/components/ui/use-toast';
import { getAgentChatData } from '@/data/agentChatData';
import { useAgentManagement } from './ai-chat/useAgentManagement';
import { useIntentDetection } from './ai-chat/useIntentDetection';
import { useResponseTimeout } from './ai-chat/useResponseTimeout';
import { Message } from '@/lib/aiTypes';

export interface AiMessage {
  text: string;
  isUser: boolean;
  agent: string;
  timestamp: Date;
}

export interface ConversationState {
  messages: AiMessage[];
  currentAgent: string;
  userIntent?: string;
}

// Number of retries before giving up
const MAX_RETRIES = 3;

export function useAiConversation() {
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>(
    () => `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  
  // Ref to track active streaming response
  const streamingResponseRef = useRef<Response | null>(null);
  const retryAttemptsRef = useRef(0);
  
  // Import sub-hooks
  const { 
    agentConversations, 
    setAgentConversations, 
    currentAgent, 
    messages, 
    changeAgent, 
    saveMessagesToSession, 
    clearAgentConversations, 
    resetCurrentAgent 
  } = useAgentManagement();
  
  const { 
    userIntent, 
    setUserIntent, 
    detectAndSaveUserIntent, 
    clearUserIntent 
  } = useIntentDetection();
  
  const { 
    isTimedOut, 
    setIsTimedOut,
    timeoutLevel,
    setTimeoutLevel, 
    startResponseTimeout, 
    clearResponseTimeout 
  } = useResponseTimeout();

  // Handle retry after timeout
  const handleRetry = useCallback(() => {
    setIsTimedOut(false);
    setTimeoutLevel('none');
    // Restart the last message exchange
    const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
    if (lastUserMessage) {
      sendMessage(lastUserMessage.text, true);
    }
  }, [messages]);
  
  // Handle start over after timeout
  const handleStartOver = useCallback(() => {
    setIsTimedOut(false);
    setTimeoutLevel('none');
    clearConversation();
  }, []);
  
  // Cancel an active streaming response
  const cancelStreamingResponse = useCallback(() => {
    if (streamingResponseRef.current) {
      // This will trigger the catch block in the fetch promise chain
      streamingResponseRef.current = null;
      clearResponseTimeout();
      setIsTyping(false);
    }
  }, []);

  // Process a streamed response chunk
  const processStreamedResponse = useCallback(async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    decoder: TextDecoder,
    agentMessages: AiMessage[]
  ) => {
    let fullResponse = '';
    let partialResponse = '';
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
        
        // Decode the chunk and add to the partial response
        const chunk = decoder.decode(value, { stream: true });
        partialResponse += chunk;
        
        // Check for complete line (OpenAI sends "data: " prefixed chunks)
        if (partialResponse.includes('\n\n')) {
          const lines = partialResponse.split('\n\n');
          partialResponse = lines.pop() || ''; // Keep the last incomplete chunk
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6); // Remove "data: " prefix
              
              if (data === '[DONE]') {
                // Stream is complete
                break;
              }
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices[0]?.delta?.content;
                
                if (content) {
                  fullResponse += content;
                  
                  // Update the AI response in the conversation
                  setAgentConversations(prev => {
                    const updatedConversations = { ...prev };
                    const currentAgentMessages = [...agentMessages];
                    
                    // Update or add the AI message
                    const lastMessageIndex = currentAgentMessages.length - 1;
                    if (lastMessageIndex >= 0 && !currentAgentMessages[lastMessageIndex].isUser) {
                      // Update existing AI message
                      currentAgentMessages[lastMessageIndex] = {
                        ...currentAgentMessages[lastMessageIndex],
                        text: fullResponse
                      };
                    } else {
                      // Add new AI message
                      currentAgentMessages.push({
                        text: fullResponse,
                        isUser: false,
                        agent: currentAgent,
                        timestamp: new Date()
                      });
                    }
                    
                    updatedConversations[currentAgent] = currentAgentMessages;
                    
                    // Save to session storage
                    saveMessagesToSession(conversationId, currentAgent, currentAgentMessages);
                    
                    return updatedConversations;
                  });
                }
              } catch (e) {
                console.error('Error parsing streaming response:', e);
              }
            }
          }
        }
      }
      
      return fullResponse;
    } catch (err) {
      console.error('Stream processing error:', err);
      return fullResponse; // Return what we've accumulated so far
    }
  }, [currentAgent, setAgentConversations, saveMessagesToSession, conversationId]);

  // Send a message to the AI
  const sendMessage = useCallback(async (userMessage: string, isRetry: boolean = false) => {
    if (!userMessage.trim()) return;

    // Increment retry attempts if this is a retry
    if (isRetry) {
      retryAttemptsRef.current += 1;
    } else {
      retryAttemptsRef.current = 0;
    }
    
    // Don't add user message again if this is a retry
    if (!isRetry) {
      // Enhanced: Detect user intent from message for better agent routing
      detectAndSaveUserIntent(userMessage);
      
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
      const systemPrompt = agentData.systemPrompt;
      
      // Use streaming for faster initial response
      const response = await callOpenAI(messageHistory, systemPrompt, true);
      
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
        const fullResponse = await processStreamedResponse(reader, decoder, currentAgentMessages);
        
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
        retryAttemptsRef.current = 0;
      } else {
        // No response returned - handle error case
        if (retryAttemptsRef.current < MAX_RETRIES) {
          console.log(`Retry attempt ${retryAttemptsRef.current + 1}/${MAX_RETRIES}`);
          sendMessage(userMessage, true);
        } else {
          setError("Failed to get response from AI. Please try again.");
          setIsTimedOut(true);
        }
      }
    } catch (err) {
      console.error("Error in AI conversation:", err);
      if (retryAttemptsRef.current < MAX_RETRIES) {
        console.log(`Retry attempt ${retryAttemptsRef.current + 1}/${MAX_RETRIES}`);
        // Exponential backoff
        const backoff = Math.min(1000 * Math.pow(2, retryAttemptsRef.current), 10000);
        setTimeout(() => {
          sendMessage(userMessage, true);
        }, backoff);
      } else {
        setError("Something went wrong. Please try again.");
        setIsTimedOut(true); 
      }
    } finally {
      setIsTyping(false);
      streamingResponseRef.current = null;
    }
  }, [
    currentAgent, 
    agentConversations,
    conversationId,
    detectAndSaveUserIntent,
    saveMessagesToSession,
    startResponseTimeout,
    clearResponseTimeout,
    processStreamedResponse
  ]);

  // Clear conversation and reset state
  const clearConversation = useCallback(() => {
    clearAgentConversations(conversationId);
    clearUserIntent();
    resetCurrentAgent();
    
    // Generate new conversation ID
    const newConversationId = `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(newConversationId);
  }, [conversationId, clearAgentConversations, clearUserIntent, resetCurrentAgent]);

  return {
    messages,
    isTyping,
    currentAgent,
    userIntent,
    error,
    isTimedOut,
    timeoutLevel,
    sendMessage,
    changeAgent,
    handleRetry,
    handleStartOver,
    clearConversation,
    cancelStreamingResponse
  };
}
