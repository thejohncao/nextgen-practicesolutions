
import { LucideIcon } from 'lucide-react';

export interface Agent {
  name: string;
  title: string;
  tagline: string;
  color: 'blue' | 'green' | 'purple' | 'red' | 'gold';
  features: string[];
  quote?: string;
  description?: string;
  icon?: LucideIcon;
  activities?: string[];
  tools?: {
    name: string;
    icon: LucideIcon;
    description: string;
  }[];
}
