
import React from 'react';
import { Users, CalendarDays, Heart } from 'lucide-react';

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
        return <Users size={size} className="text-purple-400" />;
      case "activate & onboard":
        return <CalendarDays size={size} className="text-purple-400" />;
      case "convert & retain":
        return <Heart size={size} className="text-purple-400" />;
      default:
        return <Users size={size} className="text-purple-400" />;
    }
  };

  return (
    <div className={`rounded-full p-2 bg-white/5 backdrop-blur-sm border border-purple-400/20 ${className}`}>
      {getIcon()}
    </div>
  );
};

export default JourneyStageIcon;
