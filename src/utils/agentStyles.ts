
export const agents = {
  miles: {
    name: "Miles",
    colorClass: "miles-color",
    baseColor: "#3A86FF",
    gradientColor: "#7FDBFF",
    mood: "Calm, confident",
    intro: "Hi, I'm Miles, your practice management AI. How can I help optimize your dental practice today?"
  },
  giselle: {
    name: "Giselle",
    colorClass: "giselle-color",
    baseColor: "#00C896",
    gradientColor: "#00FFB2",
    mood: "Energetic, strategic",
    intro: "Giselle here! I'm your growth specialist. Ready to discuss strategies to attract more patients and grow your practice?"
  },
  devon: {
    name: "Devon",
    colorClass: "devon-color",
    baseColor: "#7B2CBF",
    gradientColor: "#B388EB",
    mood: "Educational, warm trust",
    intro: "Hi, I'm Devon, your education expert. I'd be happy to discuss training resources and clinical education for your practice."
  },
  alma: {
    name: "Alma",
    colorClass: "alma-color",
    baseColor: "#00B4D8",
    gradientColor: "#90E0EF",
    mood: "Professional, motivating",
    intro: "Hello, I'm Alma, your team performance specialist. Let's talk about building an amazing practice culture and team."
  }
} as const;

export type AgentKey = keyof typeof agents;

export const getAgentFromMessage = (message: string): AgentKey => {
  if (message.includes("Giselle")) return "giselle";
  if (message.includes("Devon")) return "devon";
  if (message.includes("Alma")) return "alma";
  return "miles";
};
