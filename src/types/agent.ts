
import { LucideIcon } from 'lucide-react';

export type Tool = {
  name: string;
  icon: LucideIcon;
  description?: string;
};

export type Agent = {
  name: string;
  title: string;
  tagline: string;
  quote: string;
  icon: LucideIcon;
  description: string;
  activities: string[];
  features: string[];
  tools: Tool[];
  color: string;
  gradientStart?: string;
  gradientEnd?: string;
};

export type AgentColor = {
  start: string;
  end: string;
};

export const agentColors: Record<string, AgentColor> = {
  'Miles': { start: '#3A86FF', end: '#7FDBFF' },
  'Giselle': { start: '#00C896', end: '#00FFB2' },
  'Devon': { start: '#7B2CBF', end: '#B388EB' },
  'Alma': { start: '#00B4D8', end: '#90E0EF' }
};
