
import { Agent } from '@/types/agent';
import { agents } from './agents';

export interface ChatMessage {
  sender: 'visitor' | 'agent';
  message: string;
}

export interface JourneyStage {
  number: string;
  name: string;
  gradientClass: string;
  agent: Agent;
  sampleChat: ChatMessage[];
}

export const patientJourney: JourneyStage[] = [
  {
    number: '01',
    name: 'Attract & Engage',
    gradientClass: 'from-green-50/5 to-green-100/10',
    agent: agents.find(a => a.name === 'Giselle')!,
    sampleChat: [
      { sender: 'visitor', message: "I'm interested in a whitening treatment." },
      { sender: 'agent', message: "Fantastic choice! Let me help you schedule a complimentary consultation so we can get you glowing." }
    ]
  },
  {
    number: '02',
    name: 'Convert & Schedule',
    gradientClass: 'from-blue-50/5 to-blue-100/10',
    agent: agents.find(a => a.name === 'Miles')!,
    sampleChat: [
      { sender: 'visitor', message: "Hi, I need to reschedule my appointment." },
      { sender: 'agent', message: "No problem! I found your booking. Let's get you a new time that works better. Would you prefer next Tuesday afternoon?" }
    ]
  },
  {
    number: '03',
    name: 'Accept & Onboard',
    gradientClass: 'from-purple-50/5 to-purple-100/10',
    agent: agents.find(a => a.name === 'Devon')!,
    sampleChat: [
      { sender: 'visitor', message: "I'm still thinking about the implant procedure…" },
      { sender: 'agent', message: "I completely understand! Let's walk through your options together. I'm here to answer any questions so you can feel confident moving forward." }
    ]
  },
  {
    number: '04',
    name: 'Retain & Grow',
    gradientClass: 'from-amber-50/5 to-amber-100/10',
    agent: agents.find(a => a.name === 'Alma')!,
    sampleChat: [
      { sender: 'visitor', message: "How do I train my new front desk team?" },
      { sender: 'agent', message: "I've got you covered! I'll build you a step-by-step onboarding guide and quick video lessons to help your team shine." }
    ]
  }
];
