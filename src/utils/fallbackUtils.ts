
// Define fallback triggers for vague user inputs
export const FALLBACK_TRIGGERS = {
  general: [
    "i need help", "help me", "help", "not sure", "idk", "i don't know", 
    "what do you do", "what can you do", "how does this work", 
    "tell me more", "hi", "hey", "hello", "what's this"
  ]
};

// Check if user input is vague and should trigger a fallback response
export function isVagueInput(input: string): boolean {
  const normalizedInput = input.toLowerCase().trim();
  return FALLBACK_TRIGGERS.general.some(trigger => 
    normalizedInput === trigger || 
    normalizedInput.includes(trigger)
  );
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
