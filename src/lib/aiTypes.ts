
/**
 * Shared types for AI conversation functionality
 */

// Define types for OpenAI API requests and responses
export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

// Define agent names for type safety
export type AgentName = "miles" | "giselle" | "devon" | "alma";

