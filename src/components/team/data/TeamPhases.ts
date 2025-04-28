
import { agents } from '@/data/agents';
import { Phase } from '../PhaseData';

// Reorder agents to match patient journey
export const orderedAgents = agents.sort((a, b) => {
  const order = { 'Miles': 1, 'Giselle': 2, 'Devon': 3, 'Alma': 4 };
  return order[a.name] - order[b.name];
});

export const teamPhases: Phase[] = [
  { 
    title: 'Phase 1: Operations Hub', 
    agent: 'Miles',
    story: 'Streamline operations and create frictionless patient experiences.',
    color: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400'
  },
  { 
    title: 'Phase 2: Growth Engine', 
    agent: 'Giselle',
    story: 'Your growth engine starts here — building your patient pipeline with precision.',
    color: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400'
  },
  { 
    title: 'Phase 3: Treatment Success', 
    agent: 'Devon',
    story: 'Convert prospects into lifelong patients with personalized care.',
    color: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400'
  },
  { 
    title: 'Phase 4: Team Excellence', 
    agent: 'Alma',
    story: 'Build a high-performing team that delivers exceptional care.',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400'
  }
];
