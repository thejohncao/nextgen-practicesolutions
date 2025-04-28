
import React, { useState, useEffect, useRef } from 'react';
import { Sparkle, Zap } from 'lucide-react';
import AgentAvatar from './AgentAvatar';
import SparkleText from './effects/SparkleText';

interface TeamNotification {
  action: string;
  agent: string;
  role: string;
  color: string;
  timestamp?: string;
}

const notifications: TeamNotification[] = [
  { action: "Opened 15 additional consult slots.", agent: "Miles", role: "Practice Management", color: "blue" },
  { action: "Launched 3 Facebook Ads campaigns.", agent: "Giselle", role: "Practice Growth", color: "green" },
  { action: "Reactivated 12 pending treatment cases.", agent: "Devon", role: "Practice Development", color: "purple" },
  { action: "Completed SOP checklist for new hires.", agent: "Alma", role: "Practice Academy", color: "gold" },
  { action: "Reduced no-show rate by 18%.", agent: "Miles", role: "Practice Management", color: "blue" },
  { action: "Closed 5 high-ticket treatment plans.", agent: "Devon", role: "Practice Development", color: "purple" },
  { action: "Scheduled 30-day follow-up campaigns.", agent: "Giselle", role: "Practice Growth", color: "green" },
  { action: "Delivered training module for new receptionist.", agent: "Alma", role: "Practice Academy", color: "gold" },
];

const TeamResultsSection = () => {
  const [activeNotifications, setActiveNotifications] = useState<TeamNotification[]>([]);
  const [nextIndex, setNextIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  // Function to create a timestamp for a new notification
  const createTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Add a new notification to the feed
  useEffect(() => {
    const addNotification = () => {
      const notification = { 
        ...notifications[nextIndex],
        timestamp: createTimestamp()
      };
      
      setActiveNotifications(prev => {
        const newNotifications = [notification, ...prev].slice(0, 5);
        return newNotifications;
      });
      
      setNextIndex(prev => (prev + 1) % notifications.length);
    };

    // Add initial notifications
    if (activeNotifications.length === 0) {
      for (let i = 0; i < 3; i++) {
        addNotification();
      }
    }

    // Schedule addition of new notifications
    const interval = setInterval(() => {
      addNotification();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextIndex]);

  // Create notification item component
  const NotificationItem = ({ notification, index }: { notification: TeamNotification, index: number }) => {
    const iconComponent = index === 0 ? Sparkle : Zap;
    
    return (
      <div 
        className="glass-card p-4 mb-3 relative overflow-hidden backdrop-blur-md border border-white/10 hover:bg-white/5 transition-all duration-300 hover:shadow-lg animate-fade-in-up group"
        style={{ 
          animationDelay: `${index * 0.1}s`,
          animationFillMode: 'both' 
        }}
      >
        {/* Highlight glow effect for newest notification */}
        {index === 0 && (
          <div className="absolute inset-0 bg-gradient-to-r from-nextgen-purple/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        )}
        
        <div className="flex items-center gap-3">
          <AgentAvatar 
            name={notification.agent} 
            role={notification.role}
            color={notification.color}
            size="sm"
            animated={index === 0}
          />
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className="font-semibold text-white">
                {notification.agent}
              </span>
              {notification.timestamp && (
                <span className="text-white/50 text-xs">
                  {notification.timestamp}
                </span>
              )}
            </div>
            
            <p className="text-white/80 text-sm mt-1">{notification.action}</p>
          </div>
          
          {index === 0 && (
            <div className="text-nextgen-purple animate-pulse-slow">
              {React.createElement(iconComponent, { size: 16 })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-nextgen-purple/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <SparkleText>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
              Real Results from Your AI Team
            </h2>
          </SparkleText>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            While you're focusing on patient care, your team is busy growing, optimizing, and automating your practice — task by task, day by day.
          </p>
        </div>

        <div className="max-w-xl mx-auto glass-card p-6 backdrop-blur-lg border border-white/10 rounded-2xl" ref={feedRef}>
          {activeNotifications.map((notification, index) => (
            <NotificationItem 
              key={`${notification.agent}-${notification.action}-${notification.timestamp}`} 
              notification={notification} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamResultsSection;
