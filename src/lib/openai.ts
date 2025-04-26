
import { toast } from "@/components/ui/use-toast";

// Will be provided securely by the user
const API_KEY = ""; 

// Define types for OpenAI API requests and responses
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callOpenAI(
  messages: Message[],
  systemPrompt: string
): Promise<string | null> {
  try {
    // Prepend the system prompt
    const fullMessages = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...messages,
    ];

    // Try the API call with retries
    let retries = 3;
    let response: Response | null = null;
    
    while (retries > 0) {
      try {
        response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
            // Only allow calls from nextgenpractice.org
            "Origin": "https://nextgenpractice.org"
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: fullMessages,
            temperature: 0.7,
            max_tokens: 800,
          }),
        });
        
        if (response.ok) break;
        
        // If rate limited, wait before retrying
        if (response.status === 429) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          break; // For other errors, don't retry
        }
      } catch (error) {
        console.error("OpenAI API request failed:", error);
      }
      retries--;
    }

    if (!response || !response.ok) {
      const errorData = response ? await response.json() : { error: { message: "Network error" } };
      console.error("OpenAI API Error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || response?.statusText || "Failed to connect"}`);
    }

    const data = await response.json() as OpenAIResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
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
