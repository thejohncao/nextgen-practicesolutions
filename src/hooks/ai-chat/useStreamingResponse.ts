
import { useState, useCallback, useRef } from 'react';
import { AiMessage } from '../useAiConversation';
import { Message } from '@/lib/aiTypes';

/**
 * Hook for handling streaming responses from OpenAI
 */
export function useStreamingResponse() {
  // Ref to track active streaming response
  const streamingResponseRef = useRef<Response | null>(null);
  
  // Process a streamed response chunk
  const processStreamedResponse = useCallback(async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    decoder: TextDecoder,
    agentMessages: AiMessage[],
    currentAgent: string,
    setAgentConversations: React.Dispatch<React.SetStateAction<Record<string, AiMessage[]>>>,
    saveMessagesToSession: (conversationId: string, agent: string, messages: AiMessage[]) => void,
    conversationId: string
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
  }, []);

  // Cancel an active streaming response
  const cancelStreamingResponse = useCallback(() => {
    if (streamingResponseRef.current) {
      // This will trigger the catch block in the fetch promise chain
      streamingResponseRef.current = null;
    }
  }, []);

  return {
    streamingResponseRef,
    processStreamedResponse,
    cancelStreamingResponse
  };
}
