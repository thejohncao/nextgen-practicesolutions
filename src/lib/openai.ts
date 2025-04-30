
// This file serves as the main entry point for AI-related functionality
// It centralizes imports/exports to provide a clean API for components

import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/conversation";

// Re-export the necessary types and functions from utility modules
export type { Message };

// Re-export agent utilities
export { 
  detectAgentFromMessage, 
  getAgentSystemPrompt, 
  AGENT_SUGGESTIONS 
} from '../utils/agentUtils';

// Re-export fallback utilities
export { 
  isVagueInput, 
  getAgentFallbackResponse,
  FALLBACK_TRIGGERS 
} from '../utils/fallbackUtils';

// Re-export AI service functions
export { fetchAgentReply as callOpenAI } from '../utils/aiService';
