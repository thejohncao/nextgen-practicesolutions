
import React from 'react';
import CEOMessage from './CEOMessage';
import AgentMessage from './AgentMessage';

const ChatConversation = () => {
  const agentMessages = [
    {
      agent: "miles",
      role: "Operations Lead",
      message: "Optimizing schedule: 15 new consult slots created. Front desk team notified.",
      bgColorClass: "bg-blue-500/10 dark:bg-blue-500/20"
    },
    {
      agent: "giselle",
      role: "Growth Specialist",
      message: "Launching targeted campaign. Facebook and Google Ads going live in 30 minutes.",
      bgColorClass: "bg-green-500/10 dark:bg-green-500/20"
    },
    {
      agent: "devon",
      role: "Development Lead",
      message: "Reactivating past veneer leads. 28 high-value prospects identified.",
      bgColorClass: "bg-purple-500/10 dark:bg-purple-500/20"
    },
    {
      agent: "alma",
      role: "Training Lead",
      message: "Team training scheduled: New veneer consultation script ready for tomorrow.",
      bgColorClass: "bg-amber-500/10 dark:bg-amber-500/20"
    }
  ];

  return (
    <div className="glass-card bg-white dark:bg-white/5 mb-14">
      <CEOMessage />
      <div className="divide-y divide-gray-100 dark:divide-white/10">
        {agentMessages.map((msg, index) => (
          <div 
            key={index} 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
          >
            <AgentMessage
              agent={msg.agent}
              role={msg.role}
              message={msg.message}
              bgColorClass={msg.bgColorClass}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatConversation;
