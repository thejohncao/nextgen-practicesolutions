
import React from 'react';
import CEOMessage from './CEOMessage';
import AgentMessage from './AgentMessage';

const ChatConversation = () => {
  const agentMessages = [
    {
      agent: "miles",
      role: "Practice Management",
      message: "Opening 15 additional consult slots. Front desk team prepared.",
      bgColorClass: "bg-blue-500/10 dark:bg-blue-500/20"
    },
    {
      agent: "giselle",
      role: "Patient Acquisition",
      message: "Launching rapid Facebook and Google Ads campaigns. Activating lead nurturing sequences.",
      bgColorClass: "bg-green-500/10 dark:bg-green-500/20"
    },
    {
      agent: "devon",
      role: "Treatment Acceptance",
      message: "Optimizing closing scripts for Smile Preview consultations. Reactivating abandoned veneer leads.",
      bgColorClass: "bg-purple-500/10 dark:bg-purple-500/20"
    },
    {
      agent: "alma",
      role: "Training & SOP Management",
      message: "Mini-training scheduled tomorrow to coach front desk on the Smile Preview pitch.",
      bgColorClass: "bg-amber-500/10 dark:bg-amber-500/20"
    }
  ];

  return (
    <div className="glass-card bg-white dark:bg-white/5 mb-14">
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
