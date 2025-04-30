
import { useState } from 'react';

// Agent-specific welcome messages according to requirements
export const AGENT_WELCOME_MESSAGES = {
  miles: "Hi, I'm Miles — I keep your schedule full and your team focused. What do you need help with today?",
  giselle: "Hey there! I'm Giselle — your go-to for leads, follow-ups, and growth strategy. Want to boost your pipeline?",
  devon: "I'm Devon — your AI closer. If you're trying to get more patients to say yes, you're in the right place.",
  alma: "Welcome! I'm Alma — here to train your team with scripts, SOPs, and support so you can scale confidently."
};

// Agent roles mapping
export const AGENT_ROLES = {
  miles: "Practice Manager",
  giselle: "Growth Strategist",
  devon: "Treatment Closer",
  alma: "Academy Director"
};

// Agent-specific prompt suggestions for immediate display
export const AGENT_SUGGESTIONS = {
  miles: [
    "What's on today's schedule?",
    "Reschedule a patient",
    "Send appointment reminders",
    "Handle incoming calls for me"
  ],
  devon: [
    "Recover unscheduled treatment",
    "Send a quote with financing",
    "Follow up with Ashley from yesterday",
    "What scripts work best for closing implants?"
  ],
  giselle: [
    "Help me get more veneer patients",
    "Show my active campaigns",
    "Follow up with leads",
    "How can I reduce no-shows?"
  ],
  alma: [
    "Train my new front desk",
    "Show me SOPs for phone calls",
    "Role-play a treatment presentation",
    "How do I train my treatment coordinator?"
  ]
};

// Get agent role based on name
export const getAgentRole = (agent: string): string => {
  return AGENT_ROLES[agent.toLowerCase() as keyof typeof AGENT_ROLES] || "Assistant";
};

// Generate suggestions based on current agent
export const getAgentSuggestionsByName = (agent: string): string[] => {
  return AGENT_SUGGESTIONS[agent.toLowerCase() as keyof typeof AGENT_SUGGESTIONS] || AGENT_SUGGESTIONS.miles;
};

export const useAgentContent = () => {
  const [currentAgent, setCurrentAgent] = useState<string>('miles');
  
  // Get agent-specific suggestions
  const getAgentSuggestions = (): string[] => {
    return getAgentSuggestionsByName(currentAgent);
  };

  return {
    currentAgent,
    setCurrentAgent,
    getAgentSuggestions,
    getAgentRole
  };
};
