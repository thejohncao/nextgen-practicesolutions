
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
};
