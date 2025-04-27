
import { Agent } from '@/types/agent';

export interface Phase {
  title: string;
  agent: string;
  story: string;
  color: string;
  borderColor: string;
  textColor: string;
}

export const phases: Phase[] = [
  { 
    title: 'Phase 1: Attract & Engage', 
    agent: 'Giselle',
    story: 'Your growth engine starts here — building your patient pipeline with precision.',
    color: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400'
  },
  { 
    title: 'Phase 2: Manage Scheduling', 
    agent: 'Miles',
    story: 'Streamline operations and create frictionless patient experiences.',
    color: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400'
  },
  { 
    title: 'Phase 3: Close Treatment', 
    agent: 'Devon',
    story: 'Convert prospects into lifelong patients with personalized care.',
    color: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400'
  },
  { 
    title: 'Phase 4: Train Your Team', 
    agent: 'Alma',
    story: 'Build a high-performing team that delivers exceptional care.',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400'
  }
];

