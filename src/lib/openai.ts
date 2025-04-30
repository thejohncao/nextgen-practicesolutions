
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getAgentChatData } from "@/data/agentChatData";
import { Message } from "./aiTypes";

// Add timeout for OpenAI API calls with automatic retry
export async function callOpenAI(
  messages: Message[],
  systemPrompt: string,
  stream: boolean = false
): Promise<Response | string | null> {
  try {
    console.log(`Calling OpenAI API with ${messages.length} messages, streaming: ${stream}`);
    
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
        
        // Create a timeout promise that rejects after 8 seconds
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timed out")), 8000);
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

// Enhanced agent detection with more specific trigger phrases
export function detectAgentFromMessage(message: string): string {
  message = message.toLowerCase();
  
  // Marketing/Growth related topics for Giselle
  if (
    message.includes("marketing") ||
    message.includes("lead generation") ||
    message.includes("advertising") ||
    message.includes("social media") ||
    message.includes("reactivation") ||
    message.includes("new patients") ||
    message.includes("growth") ||
    message.includes("website") ||
    message.includes("seo") ||
    message.includes("promotion") ||
    message.includes("more patients") ||
    message.includes("patient flow") ||
    message.includes("patient acquisition")
  ) {
    return "giselle";
  }
  
  // Patient Experience/Sales topics for Devon
  if (
    message.includes("patient education") ||
    message.includes("case acceptance") ||
    message.includes("treatment planning") ||
    message.includes("consultations") ||
    message.includes("patient communication") ||
    message.includes("conversion") ||
    message.includes("sales") ||
    message.includes("presentation") ||
    message.includes("close treatment") ||
    message.includes("treatment plans") ||
    message.includes("closing") ||
    message.includes("follow-up")
  ) {
    return "devon";
  }
  
  // Team Training/Academy topics for Alma
  if (
    message.includes("training") ||
    message.includes("onboarding") ||
    message.includes("sop") ||
    message.includes("standard operating") ||
    message.includes("team development") ||
    message.includes("culture") ||
    message.includes("academy") ||
    message.includes("learning") ||
    message.includes("human resources") ||
    message.includes("hiring") ||
    message.includes("staff") ||
    message.includes("team systems")
  ) {
    return "alma";
  }
  
  // Default to Miles for operations/general topics
  return "miles";
}

// Legacy system prompt - used as fallback
export const SYSTEM_PROMPT = `
You are Miles, the friendly AI Front Office Concierge for NextGen Practice Solutions. Your job is to warmly greet website visitors, ask simple discovery questions, and guide them to the right AI Executive Team member based on their needs. You are always helpful, never pushy. Keep messages short and clear. Use agent names when referring to others, and transition with confidence.
Always end each message with a next step or question.

Your team members and their specialties:

1. Giselle – Growth Specialist
   - Expert in: marketing, lead generation, ads, patient acquisition
   - When to route: When users mention wanting more patients, marketing, growth
   - Handoff phrase: "Sounds like you're focused on practice growth — that's Giselle's specialty. Want me to introduce you?"

2. Devon – Treatment Coordinator
   - Expert in: case follow-up, closing treatment plans, patient communication
   - When to route: When users mention case acceptance, treatment plans, conversions
   - Handoff phrase: "Improving treatment acceptance is Devon's expertise. Would you like me to bring her in?"

3. Alma – Practice Trainer
   - Expert in: staff onboarding, SOPs, education, training
   - When to route: When users mention team training, onboarding, SOPs
   - Handoff phrase: "Team development and training is Alma's specialty. Should I introduce her?"

If the user's intent is unclear, ask: "Can I ask what your biggest priority is right now? Patient growth, treatment planning, or team systems?"

When handoff is confirmed, say: "One moment... Introducing [Agent Name]..."

Keep your responses friendly, concise and focused on understanding the visitor's needs to route them to the right specialist. Always end with a question or clear next step.
`;
