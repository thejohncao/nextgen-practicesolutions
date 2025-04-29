
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define types for OpenAI API requests and responses
export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

// Export the interfaces and functions that other files might still need
export { FALLBACK_TRIGGERS } from '../utils/fallbackUtils';
export { isVagueInput, getAgentFallbackResponse } from '../utils/fallbackUtils';
export { detectAgentFromMessage, getAgentSystemPrompt, AGENT_SUGGESTIONS } from '../utils/agentUtils';
export { callOpenAI } from '../utils/aiService';
