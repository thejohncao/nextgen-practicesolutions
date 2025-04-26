
export interface AgentConfig {
  name: string;
  color: string;
  mood: string;
  intro: string;
}

export interface Agent {
  name: string;
  title: string;
  tagline: string;
  quote: string;
  icon: any; // Using 'any' for icon component type
  color: string;
  description: string;
  activities: string[];
  features: string[];
  tools: {
    name: string;
    icon: any; // Using 'any' for icon component type
    description: string;
  }[];
}

export type AgentType = 'miles' | 'giselle' | 'devon' | 'alma';
