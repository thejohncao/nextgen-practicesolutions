
import { LucideIcon } from 'lucide-react';

export type Tool = {
  name: string;
  icon: LucideIcon;
  description?: string;
};

export type Agent = {
  name: string;
  title: string;
  quote: string;
  icon: LucideIcon;
  description: string;
  activities: string[];
  tools: Tool[];
  color: string;
};
