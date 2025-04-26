
export const agents = {
  miles: {
    name: "Miles",
    colorClass: "miles-color",
    baseColor: "#3A86FF",
    gradientColor: "#7FDBFF",
    mood: "Calm, confident"
  },
  giselle: {
    name: "Giselle",
    colorClass: "giselle-color",
    baseColor: "#00C896",
    gradientColor: "#00FFB2",
    mood: "Energetic, strategic"
  },
  devon: {
    name: "Devon",
    colorClass: "devon-color",
    baseColor: "#7B2CBF",
    gradientColor: "#B388EB",
    mood: "Educational, warm trust"
  },
  alma: {
    name: "Alma",
    colorClass: "alma-color",
    baseColor: "#00B4D8",
    gradientColor: "#90E0EF",
    mood: "Professional, motivating"
  }
} as const;

export type AgentKey = keyof typeof agents;

export const getAgentFromMessage = (message: string): AgentKey => {
  if (message.includes("Giselle")) return "giselle";
  if (message.includes("Devon")) return "devon";
  if (message.includes("Alma")) return "alma";
  return "miles";
};
