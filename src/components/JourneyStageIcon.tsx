
import React from 'react';
import { Activity, CalendarDays, ChartLine } from 'lucide-react';

interface JourneyStageIconProps {
  stageName: string;
  color: string;
  size?: number;
  className?: string;
}

const JourneyStageIcon = ({ stageName, color, size = 24, className = "" }: JourneyStageIconProps) => {
  const getIcon = () => {
    switch (stageName.toLowerCase()) {
      case "attract & engage":
        return <Activity size={size} className={`text-${color}-500`} />;
      case "activate & onboard":
        return <CalendarDays size={size} className={`text-${color}-500`} />;
      case "convert & retain":
        return <ChartLine size={size} className={`text-${color}-500`} />;
      default:
        return <Activity size={size} className={`text-${color}-500`} />;
    }
  };

  return (
    <div className={`rounded-full p-2 bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-glow ${className}`}>
      {getIcon()}
    </div>
  );
};

export default JourneyStageIcon;

