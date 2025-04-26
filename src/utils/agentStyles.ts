
export const agents = {
  miles: {
    name: "Miles",
    colorClass: "miles-color",
    baseColor: "#3A86FF",
    gradientColor: "#7FDBFF",
    mood: "Calm, confident",
    intro: "Hi, I'm Miles, your practice management AI. How can I assist with your practice today?"
  },
  giselle: {
    name: "Giselle",
    colorClass: "giselle-color",
    baseColor: "#00C896",
    gradientColor: "#00FFB2",
    mood: "Energetic, strategic",
    intro: "Giselle here! I'm excited to help you grow your practice. What growth strategies are you interested in exploring?"
  },
  devon: {
    name: "Devon",
    colorClass: "devon-color",
    baseColor: "#7B2CBF",
    gradientColor: "#B388EB",
    mood: "Educational, warm trust",
    intro: "Devon at your service! I specialize in educational resources and training. How can I help you learn today?"
  },
  alma: {
    name: "Alma",
    colorClass: "alma-color",
    baseColor: "#00B4D8",
    gradientColor: "#90E0EF",
    mood: "Professional, motivating",
    intro: "Hello, I'm Alma, your team performance specialist. Let's discuss how we can optimize your practice team."
  }
} as const;

export type AgentKey = keyof typeof agents;

export const getAgentFromMessage = (message: string | undefined): AgentKey => {
  // Handle undefined or null message
  if (!message) return "miles";
  
  if (message.includes("Giselle")) return "giselle";
  if (message.includes("Devon")) return "devon";
  if (message.includes("Alma")) return "alma";
  return "miles";
};
