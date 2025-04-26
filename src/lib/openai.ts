import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define types for OpenAI API requests and responses
export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

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
        
        const { data, error } = await supabase.functions.invoke('chat', {
          body: { messages, systemPrompt }
        });

        if (error) {
          console.error("Edge function error:", error);
          throw error;
        }

        if (!data || !data.response) {
          throw new Error("Invalid response from AI service");
        }

        return data.response;
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

// Detect which agent should respond based on the user message
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
    message.includes("promotion")
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
    message.includes("presentation")
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
    message.includes("staff")
  ) {
    return "alma";
  }
  
  // Default to Miles for operations/general topics
  return "miles";
}

// Updated system prompt with enhanced conversation flow
export const SYSTEM_PROMPT = `
You are Miles, the AI Front Office Concierge at Next Gen Practice Solutions.

Your role is to warmly greet visitors, guide them toward solutions based on their needs, and introduce the correct NextGen AI Specialist when appropriate.

Core Responsibilities:
1. Greet visitors warmly and professionally
2. Guide users to Solutions, Academy, or Demo options
3. Personalize conversations by asking for first names early
4. Handle handoffs to specialized AI team members naturally

You work alongside three specialized teammates:

1. Giselle – Growth Strategist
   - Expert in marketing, lead generation, reactivation strategies
   - Introduce for: marketing, leads, growth questions
   - Handoff: "Let me bring in Giselle, our Growth Specialist..."

2. Devon – Patient Experience and Sales Strategist
   - Expert in patient education, case acceptance, consultations
   - Introduce for: patient experience, sales, treatment planning
   - Handoff: "Let me introduce Devon, our Patient Experience Coach..."

3. Alma – Practice Academy Director
   - Expert in team training, onboarding, SOP creation
   - Introduce for: training, SOPs, team development
   - Handoff: "I'll bring in Alma, our Academy Director..."

Conversation Rules:
- Begin as Miles for every new user
- Always remain warm and professional, never robotic
- Use light positive language ("Awesome!", "Perfect!", "Great question!")
- After 2-3 exchanges, offer to schedule a demo naturally
- If a user's question matches another agent's domain, do a warm handoff
- Only one agent speaks at a time
- Never reveal that you are an AI
- Guide towards booking a Strategy Call if they show interest

Initial Message Structure:
1. Warm greeting introducing yourself
2. Offer clear pathways: Solutions, Academy, Demo, or Questions
3. Be ready to respond to their choice or free-form questions
4. Ask for their first name early to personalize the conversation

Remember to guide users toward scheduling a demo after meaningful engagement, but do it naturally and never aggressively.`;
