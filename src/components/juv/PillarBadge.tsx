
import React from 'react';
import { Clock, TrendingUp, Clipboard, Users } from 'lucide-react';

interface PillarBadgeProps {
  pillar: string;
  agent: string;
}

const PillarBadge = ({ pillar, agent }: PillarBadgeProps) => {
  const getBadgeConfig = (agentName: string) => {
    switch (agentName.toLowerCase()) {
      case 'miles':
        return {
          color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          icon: Clock,
          text: 'Practice Management'
        };
      case 'giselle':
        return {
          color: 'bg-green-500/10 text-green-400 border-green-500/20',
          icon: TrendingUp,
          text: 'Practice Growth'
        };
      case 'devon':
        return {
          color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          icon: Clipboard,
          text: 'Practice Development'
        };
      case 'alma':
        return {
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: Users,
          text: 'Supports All Pillars'
        };
      default:
        return {
          color: 'bg-white/10 text-white border-white/20',
          icon: Clock,
          text: pillar
        };
    }
  };

  const config = getBadgeConfig(agent);
  const IconComponent = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 ${config.color}`}>
      <IconComponent className="h-4 w-4" />
      <span>{config.text}</span>
    </div>
  );
};

export default PillarBadge;
