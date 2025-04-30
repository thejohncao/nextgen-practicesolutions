
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/conversation";
import { SYSTEM_PROMPTS } from "./systemPrompts";

// Add timeout for OpenAI API calls with automatic retry
export async function callOpenAI(
  messages: Message[],
  systemPrompt: string
): Promise<string | null> {
  try {
    // Call the Supabase edge function with retry logic
    const maxRetries = 3;
    let attempt = 0;
    let lastError: any = null;

    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1} of ${maxRetries + 1} to call OpenAI`);
        
        // Create a timeout promise that rejects after 15 seconds
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timed out")), 15000);
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

        return result.data.response;
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

// New function to fetch agent replies using the GPT model
export async function fetchAgentReply(userMessage: string, agent: string, useGpt = true): Promise<string> {
  try {
    // If GPT is disabled, return null to trigger fallback response
    if (!useGpt) {
      return "";
    }

    const systemPrompt = SYSTEM_PROMPTS[agent.toLowerCase()];
    
    if (!systemPrompt) {
      console.error(`No system prompt found for agent: ${agent}`);
      return "";
    }
    
    console.log(`Fetching GPT reply for ${agent} with message: ${userMessage.substring(0, 50)}...`);
    
    // Call the Supabase edge function with retry logic
    const maxRetries = 2;
    let attempt = 0;
    let lastError: any = null;

    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1} to call agent-chat function`);
        
        // Create a timeout promise that rejects after 10 seconds
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timed out")), 10000);
        });
        
        // Create the actual API call promise
        const apiCallPromise = supabase.functions.invoke('agent-chat', {
          body: { 
            model: "gpt-4o-mini", 
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userMessage }
            ]
          }
        });
        
        // Race the API call against the timeout
        const result = await Promise.race([apiCallPromise, timeoutPromise]) as any;
        
        if (result.error) {
          console.error("Edge function error:", result.error);
          throw result.error;
        }

        if (!result.data || !result.data.reply) {
          throw new Error("Invalid response from agent-chat function");
        }

        console.log("GPT response received:", result.data.reply.substring(0, 50) + "...");
        
        // Log usage information for monitoring
        if (result.data.usage) {
          console.log("Token usage:", result.data.usage);
        }

        return result.data.reply;
      } catch (err) {
        lastError = err;
        console.error(`AI call attempt ${attempt + 1} failed:`, err);
        attempt++;
        
        if (attempt <= maxRetries) {
          // Exponential backoff with jitter
          const delay = Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 5000);
          console.log(`Retrying in ${Math.round(delay)}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    console.error("All attempts to call GPT failed, using fallback");
    return "";  // Return empty to trigger fallback
  } catch (error) {
    console.error("Fatal error in fetchAgentReply:", error);
    return "";  // Return empty to trigger fallback
  }
}
