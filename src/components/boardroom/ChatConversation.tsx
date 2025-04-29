
import React from 'react';
import CEOMessage from './CEOMessage';
import AgentMessage from './AgentMessage';

const ChatConversation = () => {
  const agentMessages = [
    {
      agent: "miles",
      role: "Practice Management",
      message: "Optimizing schedule: 15 new consult slots created. Front desk team notified.",
      bgColorClass: "bg-blue-500/30 dark:bg-blue-500/40"
    },
    {
      agent: "giselle",
      role: "Practice Growth",
      message: "Launching targeted campaign. Facebook and Google Ads going live in 30 minutes.",
      bgColorClass: "bg-green-500/30 dark:bg-green-500/40"
    },
    {
      agent: "devon",
      role: "Practice Development",
      message: "Reactivating past veneer leads. 28 high-value prospects identified.",
      bgColorClass: "bg-purple-500/30 dark:bg-purple-500/40"
    },
    {
      agent: "alma",
      role: "Practice Academy",
      message: "Team training scheduled: New veneer consultation script ready for tomorrow.",
      bgColorClass: "bg-amber-500/30 dark:bg-amber-500/40"
    }
  ];

  return (
    <div className="glass-card bg-black/80 rounded-xl shadow-lg border border-white/5 overflow-hidden">
      <CEOMessage />
      <div className="divide-y divide-white/5 space-y-0.5">
        {agentMessages.map((msg, index) => (
          <div 
            key={index} 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.15 + 0.3}s`, animationFillMode: 'forwards' }}
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
