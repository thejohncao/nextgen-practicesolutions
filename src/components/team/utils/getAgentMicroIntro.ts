
export const getAgentMicroIntro = (agentName: string): string => {
  switch (agentName) {
    case 'Miles':
      return "Your AI Practice Manager, focused on operations and scheduling";
    case 'Giselle':
      return "Your AI Marketing Director, driving practice growth and patient acquisition";
    case 'Devon':
      return "Your AI Treatment Coordinator, maximizing case acceptance and patient value";
    case 'Alma':
      return "Your AI Training Director, ensuring consistent team excellence";
    default:
      return "";
  }
};
