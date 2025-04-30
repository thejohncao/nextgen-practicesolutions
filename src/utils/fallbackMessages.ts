
import { Clock, LineChart, PenLine, Library } from 'lucide-react';

export interface FallbackMessage {
  message: string;
  icon: React.ElementType;
  quickReplies: {
    text: string;
    action: string;
  }[];
}

// Agent-specific fallback messages with icons
export const AGENT_FALLBACK_MESSAGES: Record<string, FallbackMessage> = {
  miles: {
    message: "Still working on that... Want me to check today's schedule in the meantime?",
    icon: Clock,
    quickReplies: [
      { text: "Check Schedule", action: "check_schedule" },
      { text: "Try Again", action: "try_again" }
    ]
  },
  giselle: {
    message: "Building your campaign list... Want early leads or a summary while I work?",
    icon: LineChart,
    quickReplies: [
      { text: "Show me leads", action: "show_leads" },
      { text: "Summarize progress", action: "summarize_progress" }
    ]
  },
  devon: {
    message: "Reviewing high-converting scripts... Want my top 3 closers while I wrap this up?",
    icon: PenLine,
    quickReplies: [
      { text: "Show top scripts", action: "show_scripts" },
      { text: "Continue thinking", action: "continue" }
    ]
  },
  alma: {
    message: "Still compiling SOPs. Want a preview while I finish loading the full playbook?",
    icon: Library,
    quickReplies: [
      { text: "Preview SOPs", action: "preview_sops" },
      { text: "Keep going", action: "continue" }
    ]
  }
};

// Get fallback message for a specific agent
export const getAgentFallbackMessage = (agent: string): FallbackMessage => {
  return AGENT_FALLBACK_MESSAGES[agent.toLowerCase()] || AGENT_FALLBACK_MESSAGES.miles;
};
