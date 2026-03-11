import { Pillar } from '../types';

export const pillars: Pillar[] = [
  {
    slug: 'giselle',
    name: 'Practice Growth',
    agentName: 'Giselle',
    title: 'Giselle — Practice Growth',
    description: 'I keep quality new patients coming in and your brand working for you.',
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/20',
    icon: 'TrendingUp',
  },
  {
    slug: 'miles',
    name: 'Practice Management',
    agentName: 'Miles',
    title: 'Miles — Practice Management',
    description: 'I keep your schedule full, patients on track, and money collected.',
    accentColor: 'text-rose-400',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/20',
    icon: 'Settings',
  },
  {
    slug: 'devon',
    name: 'Practice Development',
    agentName: 'Devon',
    title: 'Devon — Practice Development',
    description: 'I help you convert more of the dentistry already in your chair.',
    accentColor: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    accentBorder: 'border-indigo-500/20',
    icon: 'GraduationCap',
  },
  {
    slug: 'alma',
    name: 'Practice Academy',
    agentName: 'Alma',
    title: 'Alma — Practice Academy',
    description: 'I help your team master the systems that run your practice.',
    accentColor: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/20',
    icon: 'BookOpen',
  },
];

export const getPillar = (slug: string) => pillars.find((p) => p.slug === slug);
