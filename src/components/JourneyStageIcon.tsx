
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
        return <Users size={size} className="text-green-400" />;
      case "activate & onboard":
        return <CalendarDays size={size} className="text-blue-400" />;
      case "convert & retain":
        return <Heart size={size} className="text-purple-400" />;
      default:
        return <Users size={size} className="text-green-400" />;
    }
  };

  const getBorderColor = () => {
    switch (stageName.toLowerCase()) {
      case "attract & engage":
        return "border-green-400/20";
      case "activate & onboard":
        return "border-blue-400/20";
      case "convert & retain":
        return "border-purple-400/20";
      default:
        return "border-green-400/20";
    }
  };

  return (
    <div className={`rounded-full p-2 bg-white/5 backdrop-blur-sm border ${getBorderColor()} ${className}`}>
      {getIcon()}
    </div>
  );
};

export default JourneyStageIcon;
