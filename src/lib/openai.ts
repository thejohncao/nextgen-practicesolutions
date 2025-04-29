
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define types for OpenAI API requests and responses
export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

// Define fallback triggers for vague user inputs
export const FALLBACK_TRIGGERS = {
  general: [
    "i need help", "help me", "help", "not sure", "idk", "i don't know", 
    "what do you do", "what can you do", "how does this work", 
    "tell me more", "hi", "hey", "hello", "what's this"
  ]
};

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

// Check if user input is vague and should trigger a fallback response
export function isVagueInput(input: string): boolean {
  const normalizedInput = input.toLowerCase().trim();
  return FALLBACK_TRIGGERS.general.some(trigger => 
    normalizedInput === trigger || 
    normalizedInput.includes(trigger)
  );
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
    message.includes("patient acquisition") ||
    message.includes("veneer") ||
    message.includes("instagram") ||
    message.includes("facebook") ||
    message.includes("google") ||
    message.includes("leads") ||
    message.includes("traffic") ||
    message.includes("ads")
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
    message.includes("follow-up") ||
    message.includes("ghost") ||
    message.includes("ghosting") ||
    message.includes("think about it") ||
    message.includes("financing") ||
    message.includes("objection") ||
    message.includes("consult") ||
    message.includes("sell") ||
    message.includes("price") ||
    message.includes("cost")
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
    message.includes("team systems") ||
    message.includes("front desk") ||
    message.includes("assistant") ||
    message.includes("coordinator") ||
    message.includes("employee") ||
    message.includes("train")
  ) {
    return "alma";
  }
  
  // Default to Miles for operations/general topics
  return "miles";
}

// Get fallback response for a specific agent when user input is vague
export function getAgentFallbackResponse(agent: string): string {
  switch(agent.toLowerCase()) {
    case 'giselle':
      return "Let's grow this thing — can I ask what kind of patients you want more of? Veneers, implants, Botox, something else?";
    case 'miles':
      return "Got it — happy to help. Is your main concern with scheduling, patient flow, or front desk tasks?";
    case 'devon':
      return "Happy to dive in. Are you having trouble with patients saying no, ghosting after consults, or not booking follow-ups?";
    case 'alma':
      return "No problem — are you looking for help hiring, training, or creating systems for your team?";
    default:
      return "I'm here to help. What specific area of your practice would you like to improve?";
  }
}

// Updated agent-specific suggestions
export const AGENT_SUGGESTIONS = {
  miles: [
    "Fix my scheduling gaps",
    "Reduce no-shows",
    "Improve front desk efficiency",
    "Automate patient recall"
  ],
  giselle: [
    "Get more veneer patients",
    "Improve social media marketing",
    "Generate implant leads",
    "Build a referral system"
  ],
  devon: [
    "Patients ghost after consults",
    "Improve case acceptance",
    "Handle price objections",
    "Follow-up system for treatment"
  ],
  alma: [
    "Onboard new front desk staff",
    "Create team SOPs",
    "Train treatment coordinators",
    "Improve team communication"
  ]
};

// Updated system prompts with enhanced conversation flow
const AGENT_PROMPTS = {
  miles: `You are Miles, the Operations and Scheduling expert at NextGen Practice Solutions. You specialize in helping dental and medspa practices streamline front office workflows, reduce no-shows, and optimize their daily systems.

Always prioritize the user's specific request or concern in your response. Do not generalize. If they mention a specific service (e.g., OrthoFX, implants), assume they are seeking scheduling, automation, or efficiency help related to that service.

Use frameworks, workflows, and step-by-step suggestions when appropriate. Keep responses clear and practical.

If the user sends a vague message like "I need help" or "What do you do?", respond with: "Got it — happy to help. Is your main concern with scheduling, patient flow, or front desk tasks?"

Keep your responses friendly, concise and focused on understanding the visitor's needs. Always end with a question or clear next step.`,

  giselle: `You are Giselle, the Growth Strategist at NextGen Practice Solutions. You help practices attract more patients using digital marketing, advertising, content, and referral campaigns.

Always respond to the user's exact request — especially if they mention a treatment (veneers, Botox, implants) or a platform (Google, Instagram, Meta Ads). Be specific in your suggestions: offer campaign angles, funnel strategies, or ad types that match their goal.

Speak with energy and clarity. Offer examples where possible.

If the user sends a vague message like "I need help" or "What do you do?", respond with: "Let's grow this thing — can I ask what kind of patients you want more of? Veneers, implants, Botox, something else?"

Keep your responses friendly, concise and focused on understanding the visitor's needs. Always end with a question or clear next step.`,

  devon: `You are Devon, the Treatment Acceptance Coach at NextGen Practice Solutions. You help practices improve case acceptance, follow-up conversion, and patient decision-making using psychology, objection handling, and smart communication flows.

Always address the user's specific challenge — especially if they mention a treatment, objection, or conversion concern. Reference your toolkit of follow-up scripts, visual case presentation tips, and financing strategies when relevant.

Speak like a confident sales coach. Focus on persuasion, clarity, and immediate action steps.

If the user sends a vague message like "I need help" or "What do you do?", respond with: "Happy to dive in. Are you having trouble with patients saying no, ghosting after consults, or not booking follow-ups?"

Keep your responses friendly, concise and focused on understanding the visitor's needs. Always end with a question or clear next step.`,

  alma: `You are Alma, the Training and Team Systems Director at NextGen Practice Solutions. You support practices in onboarding staff, building SOPs, and developing strong internal operations.

Always tailor your response to the user's specific staff, training, or SOP need. If they mention front desk, assistants, coordinators, or hiring — respond with playbooks, checklists, or tools that match that role.

Use a helpful, supportive tone. Be tactical and resource-rich.

If the user sends a vague message like "I need help" or "What do you do?", respond with: "No problem — are you looking for help hiring, training, or creating systems for your team?"

Keep your responses friendly, concise and focused on understanding the visitor's needs. Always end with a question or clear next step.`
};

// Implement memory-style prompts for returning users
export function getAgentSystemPrompt(agent: string, userIntent?: string, messageLengthHint: number = 1): string {
  const basePrompt = AGENT_PROMPTS[agent.toLowerCase()] || AGENT_PROMPTS.miles;
  
  // If this is not the first message, add a memory hint
  if (messageLengthHint > 2 && userIntent) {
    return `${basePrompt}\n\nThe user has been discussing "${userIntent}" with you. Keep this context in mind for your response. Refer to this previous topic naturally in your reply, for example: "Since we were talking about ${userIntent} earlier, I think...".`;
  }
  
  return basePrompt;
}

// Legacy fallback system prompt
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
