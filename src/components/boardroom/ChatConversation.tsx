
import React from 'react';
import CEOMessage from './CEOMessage';
import AgentMessage from './AgentMessage';

const ChatConversation = () => {
  const agentMessages = [
    {
      agent: "miles",
      role: "Practice Management",
      message: "Opening 15 additional consult slots. Front desk team prepared.",
      bgColorClass: "bg-[#D3E4FD] dark:bg-blue-500/20"
    },
    {
      agent: "giselle",
      role: "Practice Growth",
      message: "Launching rapid Facebook and Google Ads campaigns. Activating lead nurturing sequences.",
      bgColorClass: "bg-[#F2FCE2] dark:bg-green-500/20"
    },
    {
      agent: "devon",
      role: "Practice Development",
      message: "Optimizing closing scripts for Smile Preview consultations. Reactivating abandoned veneer leads.",
      bgColorClass: "bg-[#E5DEFF] dark:bg-purple-500/20"
    },
    {
      agent: "alma",
      role: "Practice Mastery",
      message: "Mini-training scheduled tomorrow to coach front desk on the Smile Preview pitch.",
      bgColorClass: "bg-[#FDE1D3] dark:bg-amber-500/20"
    }
  ];

  return (
    <div className="glass-card bg-white/90 dark:bg-white/5 mb-14">
      <CEOMessage />
      <div className="divide-y divide-gray-100 dark:divide-white/10 space-y-8 sm:space-y-4 mobile:space-y-6">
        {agentMessages.map((msg, index) => (
          <AgentMessage
            key={index}
            agent={msg.agent}
            role={msg.role}
            message={msg.message}
            bgColorClass={msg.bgColorClass}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatConversation;
