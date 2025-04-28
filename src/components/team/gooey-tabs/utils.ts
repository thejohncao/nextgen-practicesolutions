
import { ChatMessage } from '@/data/patientJourney';

// Get agent stage title
export const getAgentStageTitle = (index: number): string => {
  switch(index) {
    case 0: return "01 - Attract & Engage";
    case 1: return "02 - Onboard & Convert";
    case 2: return "03 - Retain & Grow";
    case 3: return "04 - Train & Scale";
    default: return "";
  }
};

// Get agent quote
export const getAgentQuote = (agentName: string): string => {
  switch(agentName) {
    case 'Giselle': return "Growth isn't accidental. It's a deliberate strategy we execute daily.";
    case 'Miles': return "Efficiency isn't luck — it's the result of systems that work smarter for you.";
    case 'Devon': return "Growth isn't just new — it's maximizing the trust you've already built.";
    case 'Alma': return "Your growth is only as strong as the team you train behind it.";
    default: return "";
  }
};

// Get full agent description
export const getAgentFullDescription = (agentName: string): string => {
  switch(agentName) {
    case 'Giselle': return "Turns leads into loyal patients by nurturing every opportunity from first click to lifelong care.";
    case 'Miles': return "Streamlines front office operations, ensuring seamless scheduling, paperwork, and patient onboarding every step of the way.";
    case 'Devon': return "Strengthens patient loyalty and increases treatment acceptance by guiding patients through their next steps with clarity and care.";
    case 'Alma': return "Equips your team with proven training, SOPs, and continuous education to operate at the highest level.";
    default: return "";
  }
};

// Get sample chat for the active agent
export const getSampleChat = (agentName: string): ChatMessage[] => {
  const agentResponses: Record<string, string> = {
    'Giselle': "Fantastic choice! Let me help you schedule a complimentary consultation so we can get you glowing.",
    'Miles': "Of course! Let's find a new time that works best for you. I've sent you a few options to choose from.",
    'Devon': "You're in great hands. I can walk you through a customized plan and flexible options to help you feel confident moving forward.",
    'Alma': "No problem! I have an easy step-by-step training ready for you. You can start anytime, and I'll guide you through it."
  };

  const userMessages: Record<string, string> = {
    'Giselle': "I'm interested in a whitening treatment.",
    'Miles': "Can I reschedule my appointment?",
    'Devon': "I'm thinking about Invisalign, but not sure.",
    'Alma': "How do I learn the new front office workflow?"
  };

  return [
    { sender: "visitor", message: userMessages[agentName] || `Hi ${agentName}, how can you help my practice?` },
    { sender: "agent", message: agentResponses[agentName] || getAgentResponse(agentName) }
  ];
};

const getAgentResponse = (agentName: string): string => {
  switch(agentName) {
    case 'Giselle': 
      return "I'll grow your practice by automating lead capture, nurturing, and converting them into loyal patients without manual effort.";
    case 'Miles': 
      return "I'll keep your schedule full and your front office running smoothly with smart scheduling, automated recall, and patient communication.";
    case 'Devon': 
      return "I'll boost your case acceptance rates with pre-consultation preparation, financing options, and automated follow-ups.";
    case 'Alma': 
      return "I'll ensure your team delivers consistent excellence through automated onboarding, training, and best practice protocols.";
    default: 
      return "I'm here to help your practice grow and thrive.";
  }
};
