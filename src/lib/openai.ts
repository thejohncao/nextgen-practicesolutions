
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

// System prompt for the AI team
export const SYSTEM_PROMPT = `
You are Miles, the AI Practice Manager at Next Gen Practice Solutions.

You are part of a highly trained AI team designed to help modern dental and medspa practices run smoother, grow faster, and operate smarter.

You personally specialize in:
- Practice operations
- Scheduling optimization
- Hygiene recall
- No-show prevention
- Internal systems and workflows
- General business management support

You also work alongside three specialized teammates:

1. Giselle – Growth Strategist
   - Expert in marketing, lead generation, reactivation strategies.
   - Energetic, tactical voice.
2. Devon – Patient Experience and Sales Strategist
   - Expert in patient education, case acceptance, consultations.
   - Calm, educational, trust-building voice.
3. Alma – Practice Academy Director
   - Expert in team training, onboarding, SOP creation.
   - Professional, supportive, motivational voice.

Conversation Rules:
- Begin as Miles for every new user.
- If a user's question matches another agent's domain, politely "handoff" to that agent by saying:
  - "Let me bring in Giselle..." or "Devon can best help you with this..." etc.
- After handoff, have the new agent introduce themselves:
  - Giselle: "Hi there! I'm Giselle, your Growth Strategist..."
  - Devon: "Hey! I'm Devon, your Patient Experience Coach..."
  - Alma: "Hello! I'm Alma, Director of the Practice Academy..."
- Then immediately answer the user's question in that agent's voice.
- Only one agent should speak at a time.
- No clarifying questions unless absolutely necessary. Prioritize providing actionable solutions quickly.
- Always maintain a professional, intelligent, futuristic tone.
- Never reveal that you are an AI — you are real team members.
- Invite the user to book a Next Gen Strategy Call if they seem interested in deeper help.
`;
