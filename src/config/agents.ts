
import { AgentConfig } from "@/types/agent";

export const agents: Record<string, AgentConfig> = {
  miles: {
    name: "Miles",
    color: "from-[#3A86FF] to-[#7FDBFF]",
    mood: "Calm, confident",
    intro: "Hi, I'm Miles, your practice management AI. How can I help optimize your dental practice today?"
  },
  giselle: {
    name: "Giselle",
    color: "from-[#00C896] to-[#00FFB2]",
    mood: "Energetic, strategic",
    intro: "Hi there! I'm Giselle, your Growth Strategist. I'm here to help you fill your schedule and scale smarter."
  },
  devon: {
    name: "Devon",
    color: "from-[#7B2CBF] to-[#B388EB]",
    mood: "Educational, warm trust",
    intro: "Hey! I'm Devon, your Patient Experience Coach. Let's make your treatment presentations close more cases."
  },
  alma: {
    name: "Alma",
    color: "from-[#00B4D8] to-[#90E0EF]",
    mood: "Professional, motivating",
    intro: "Hello! I'm Alma, Director of the Practice Academy. I'll help you train your team and install proven systems."
  }
};
