
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  FacebookIcon, 
  InstagramIcon, 
  Mail as GmailIcon, 
  CalendarIcon as GoogleCalendarIcon, 
  Slack, 
  FileClock as NotionIcon
} from "lucide-react";

interface IntegrationIconProps {
  name: string;
  icon: React.ElementType;
  status?: 'connected' | 'available';
}

const IntegrationIcon = ({ name, icon: Icon, status = 'available' }: IntegrationIconProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 amplify-hover",
        status === 'connected' 
          ? "bg-nextgen-purple/20 text-nextgen-purple" 
          : "bg-white/10 text-white/70 hover:text-white/90"
      )}>
        <Icon className="w-5 h-5 card-icon-glow" />
      </div>
      
      {/* Status Badge */}
      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 animate-fade-in">
          {status === 'connected' ? 'Connected' : 'Add Integration'}
        </div>
      )}
      
      {/* Icon name */}
      <div className="text-xs text-center mt-1.5 text-white/60">{name}</div>
    </div>
  );
};

const IntegrationIcons = () => {
  const integrations: IntegrationIconProps[] = [
    { name: 'Facebook', icon: FacebookIcon, status: 'connected' },
    { name: 'Instagram', icon: InstagramIcon, status: 'connected' },
    { name: 'Gmail', icon: GmailIcon, status: 'available' },
    { name: 'Calendar', icon: GoogleCalendarIcon, status: 'connected' },
    { name: 'Slack', icon: Slack, status: 'connected' },
    { name: 'Notion', icon: NotionIcon, status: 'available' },
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {integrations.map((integration, index) => (
        <div 
          key={integration.name} 
          className="staggered-card"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <IntegrationIcon {...integration} />
        </div>
      ))}
    </div>
  );
};

export default IntegrationIcons;
