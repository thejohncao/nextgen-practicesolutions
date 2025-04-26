
import { AgentKey } from "@/utils/agentStyles";

export interface Message {
  text: string;
  isUser: boolean;
  agent: AgentKey;
  timestamp: Date;
}

