
// Entry point file that re-exports all AI-related functionality
// This maintains backward compatibility with existing imports

import { callOpenAI } from "./ai/callOpenAI";
import { detectAgentFromMessage } from "./ai/detectAgent";
import { DEFAULT_SYSTEM_PROMPT } from "./ai/systemPrompt";

// Re-export all functions and constants
export {
  callOpenAI,
  detectAgentFromMessage,
  DEFAULT_SYSTEM_PROMPT as SYSTEM_PROMPT
};
