
export type MessageRole = 'user' | 'assistant' | 'system';

export interface AiMessage {
  text: string;
  isUser: boolean;
  agent?: string;
  timestamp: string;
}

export interface ConversationState {
  messages: AiMessage[];
  currentAgent: string;
  userIntent?: string;
}

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}
