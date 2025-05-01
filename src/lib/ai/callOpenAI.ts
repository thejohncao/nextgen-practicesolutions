
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "../aiTypes";

/**
 * Call OpenAI API with intelligent error handling and retry logic
 */
export async function callOpenAI(
  messages: Message[],
  systemPrompt: string,
  stream: boolean = false
): Promise<Response | string | null> {
  try {
    console.log(`Calling OpenAI API with ${messages.length} messages, streaming: ${stream}`);
    console.log("Full messages payload size:", JSON.stringify(messages).length);
    console.log("System prompt length:", systemPrompt.length);
    
    // Input validation
    if (!messages || messages.length === 0) {
      console.error("No messages provided to OpenAI");
      throw new Error("Invalid input: No messages provided");
    }

    if (!systemPrompt || systemPrompt.trim() === '') {
      console.error("Missing system prompt — applying default");
      systemPrompt = "You are Miles, the helpful AI assistant for NextGen Practice Solutions.";
    }
    
    // Log the last user message for debugging
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (lastUserMessage) {
      console.log(`Last user message: "${lastUserMessage.content.substring(0, 50)}${lastUserMessage.content.length > 50 ? '...' : ''}"`);
    }
    
    // For streaming responses, we need to return the response object directly
    if (stream) {
      try {
        // Create the body for the Edge Function
        const body = { messages, systemPrompt, stream: true };
        
        // Call our Edge Function, which will handle streaming
        const response = await supabase.functions.invoke('chat', {
          body
        });
        
        // If we got an error response, throw it
        if (response.error) {
          console.error("Edge function error in streaming mode:", response.error);
          throw response.error;
        }
        
        // In streaming mode, we return the Response object
        if (!response.data) {
          throw new Error("No response data received");
        }
        
        const blob = new Blob([response.data], { type: 'text/event-stream' });
        return new Response(blob, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          }
        });
      } catch (err) {
        console.error("Streaming error:", err);
        throw err;
      }
    } 
    
    // Non-streaming mode (legacy)
    const maxRetries = 3;
    let attempt = 0;
    let lastError: any = null;

    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1} of ${maxRetries + 1} to call OpenAI`);
        
        // Create a timeout promise that rejects after 25 seconds (increased from 8 seconds)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timed out")), 25000);
        });
        
        // Create the actual API call promise
        const apiCallPromise = supabase.functions.invoke('chat', {
          body: { messages, systemPrompt }
        });
        
        // Race the API call against the timeout
        const result = await Promise.race([apiCallPromise, timeoutPromise]) as any;
        
        if (result.error) {
          console.error("Edge function error:", result.error);
          throw result.error;
        }

        if (!result.data || !result.data.response) {
          throw new Error("Invalid response from AI service");
        }

        // Check for empty response content and retry if empty
        const response = result.data.response;
        if (!response || response.trim() === '') {
          console.warn("Empty response received, will retry");
          throw new Error("Empty response received");
        }

        return response;
      } catch (err) {
        lastError = err;
        console.error(`AI call attempt ${attempt + 1} failed:`, err);
        attempt++;
        
        if (attempt <= maxRetries) {
          // Exponential backoff with jitter
          const delay = Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 10000);
          console.log(`Retrying in ${Math.round(delay)}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // All retries failed - provide specific error feedback
    let errorMessage = "Unable to connect to AI services after multiple attempts.";
    if (lastError?.message?.includes("API key")) {
      errorMessage = "AI service configuration error. Please check the API key setup.";
    } else if (lastError?.message?.includes("OpenAI")) {
      errorMessage = "OpenAI service error. Please try again later.";
    } else if (lastError?.message?.includes("timed out")) {
      errorMessage = "Request timed out. The AI service is taking too long to respond.";
    } else if (lastError?.message?.includes("Empty response")) {
      errorMessage = "The AI service returned an empty response. Please try again.";
    }

    toast({
      title: "Connection Error",
      description: errorMessage,
      variant: "destructive",
    });
    
    return null;
  } catch (error) {
    console.error("Fatal error in OpenAI call:", error);
    toast({
      title: "Connection Error",
      description: "Unable to connect to AI services. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
}
