import { Pillar } from '../types';

export const pillars: Pillar[] = [
  {
    slug: 'giselle',
    name: 'Practice Growth',
    agentName: 'Giselle',
    title: 'Giselle — Practice Growth',
    description: 'I keep quality new patients coming in and your brand working for you.',
    accentColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    icon: 'TrendingUp',
  },
  {
    slug: 'miles',
    name: 'Practice Management',
    agentName: 'Miles',
    title: 'Miles — Practice Management',
    description: 'I keep your schedule full, patients on track, and money collected.',
    accentColor: 'text-blue-600',
    accentBg: 'bg-blue-50',
    accentBorder: 'border-blue-200',
    icon: 'Settings',
  },
  {
    slug: 'devon',
    name: 'Practice Development',
    agentName: 'Devon',
    title: 'Devon — Practice Development',
    description: 'I help you convert more of the dentistry already in your chair.',
    accentColor: 'text-violet-600',
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-200',
    icon: 'GraduationCap',
  },
  {
    slug: 'alma',
    name: 'Practice Academy',
    agentName: 'Alma',
    title: 'Alma — Practice Academy',
    description: 'I help your team master the systems that run your practice.',
    accentColor: 'text-amber-600',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    icon: 'BookOpen',
  },
];

export const getPillar = (slug: string) => pillars.find((p) => p.slug === slug);
