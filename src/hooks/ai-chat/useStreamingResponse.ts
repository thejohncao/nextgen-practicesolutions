
import { useState, useRef, useCallback } from 'react';
import { AiMessage } from '../useAiConversation';
import { toast } from '@/components/ui/use-toast';

/**
 * Hook for handling streaming responses from the OpenAI API
 */
export function useStreamingResponse() {
  const streamingResponseRef = useRef<Response | null>(null);
  const [streamedText, setStreamedText] = useState<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

  // Process the streamed response from the OpenAI API
  const processStreamedResponse = useCallback(async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    decoder: TextDecoder,
    currentAgentMessages: AiMessage[],
    currentAgent: string,
    setAgentConversations: (callback: (prev: Record<string, AiMessage[]>) => Record<string, AiMessage[]>) => void,
    saveMessagesToSession: (conversationId: string, agentName: string, messages: AiMessage[]) => void,
    conversationId: string,
  ) => {
    let fullResponse = '';
    let isEmptyResponse = true;

    try {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      while (true) {
        if (signal.aborted) {
          console.log("Streaming response aborted");
          break;
        }
        
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunkValue = decoder.decode(value, { stream: true });
        
        // Try to parse the chunk as a Server-Sent Event
        const lines = chunkValue.trim().split('\n');
        let textChunk = '';
        
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const jsonData = line.slice(5).trim();
              if (jsonData === '[DONE]') continue;
              
              const data = JSON.parse(jsonData);
              const content = data.choices?.[0]?.delta?.content || '';
              if (content) {
                textChunk += content;
                isEmptyResponse = false;
              }
            } catch (e) {
              // Ignore parsing errors, just try to extract text
              const content = line.slice(5).trim();
              if (content && content !== '[DONE]') {
                textChunk += content;
                isEmptyResponse = false;
              }
            }
          }
        }

        // Update the fullResponse with the new chunk
        fullResponse += textChunk;
        
        // Update the UI with the new text immediately
        setStreamedText(fullResponse);
        
        // Update the agent conversations with the current streaming response
        if (textChunk.length > 0) {
          setAgentConversations(prev => {
            const updatedMessages = [...currentAgentMessages];
            
            // Check if we already have an AI response message at the end
            const lastMsg = updatedMessages[updatedMessages.length - 1];
            
            if (!lastMsg || lastMsg.isUser) {
              // Add a new AI message if the last message was from the user
              updatedMessages.push({
                text: fullResponse,
                isUser: false,
                agent: currentAgent,
                timestamp: new Date()
              });
            } else {
              // Update the existing AI message
              lastMsg.text = fullResponse;
              lastMsg.timestamp = new Date();
            }
            
            const updatedConversations = {
              ...prev,
              [currentAgent]: updatedMessages
            };
            
            // Save to session storage
            saveMessagesToSession(conversationId, currentAgent, updatedMessages);
            
            return updatedConversations;
          });
        }
      }
      
      // Check for empty responses and log warning
      if (isEmptyResponse || fullResponse.trim() === '') {
        console.warn("Empty or invalid response received from OpenAI");
        
        // If empty, trigger an alert
        if (fullResponse.trim() === '') {
          toast({
            title: "Empty Response",
            description: `The AI responded with an empty message. This could be due to content filtering or a server issue.`,
            variant: "destructive", // Changed from "warning" to "destructive" to match allowed variants
          });
        }
      }
      
      return fullResponse;
    } catch (err) {
      console.error("Error processing streaming response:", err);
      return fullResponse || "An error occurred while processing the response.";
    }
  }, []);

  // Cancel the streaming response if needed
  const cancelStreamingResponse = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    if (streamingResponseRef.current && streamingResponseRef.current.body) {
      try {
        streamingResponseRef.current.body.cancel();
      } catch (e) {
        console.error("Error cancelling streaming response:", e);
      }
    }
    
    streamingResponseRef.current = null;
    setStreamedText("");
  }, []);

  return {
    streamingResponseRef,
    streamedText,
    setStreamedText,
    processStreamedResponse,
    cancelStreamingResponse
  };
}
