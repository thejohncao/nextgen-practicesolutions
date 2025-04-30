
import React from 'react';
import AgentChatAvatar from '../AgentChatAvatar';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface AgentMessageProps {
  agent: string;
  role: string;
  message: string;
  bgColorClass?: string;
  delay?: number;
}

const AgentMessage = ({ 
  agent, 
  role, 
  message, 
  bgColorClass,
  delay = 0
}: AgentMessageProps) => {
  // Use Intersection Observer to trigger animations when scrolled into view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
    rootMargin: '-50px 0px'
  });
  
  // Get shimmer effect class based on agent
  const getTextShimmerClass = () => {
    switch(agent.toLowerCase()) {
      case 'miles': return 'text-shimmer text-shimmer-blue';
      case 'giselle': return 'text-shimmer text-shimmer-green';
      case 'devon': return 'text-shimmer text-shimmer-purple';
      case 'alma': return 'text-shimmer text-shimmer-amber';
      default: return 'text-shimmer text-shimmer-blue';
    }
  };
  
  // Get subtle glow effect based on agent color
  const getGlowColor = () => {
    switch(agent.toLowerCase()) {
      case 'miles': return 'border border-blue-900/20 shadow-[0_0_6px_rgba(59,130,246,0.2)]';
      case 'giselle': return 'border border-green-900/20 shadow-[0_0_6px_rgba(34,197,94,0.2)]';
      case 'devon': return 'border border-purple-900/20 shadow-[0_0_6px_rgba(168,85,247,0.2)]';
      case 'alma': return 'border border-amber-900/20 shadow-[0_0_6px_rgba(251,191,36,0.2)]';
      default: return 'border border-blue-900/20 shadow-[0_0_6px_rgba(59,130,246,0.2)]';
    }
  };
  
  // Animation variants for the message bubble
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      ref={ref}
      variants={messageVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay * 0.2 + 0.3
      }}
      className={`p-2 sm:p-2.5 md:p-3 rounded-lg backdrop-blur-md bg-[#000000] ${getGlowColor()}`}
    >
      <div className="flex items-start sm:items-center">
        <div className="flex-shrink-0">
          <AgentChatAvatar agent={agent} hideDetails={false} />
        </div>
        <div className="ml-2 md:ml-3">
          <div className="text-xs font-medium text-white/90">{role}</div>
          <div className={`text-sm font-medium ${getTextShimmerClass()}`}>{message}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentMessage;
