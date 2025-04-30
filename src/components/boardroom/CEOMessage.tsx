
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface CEOMessageProps {
  delay?: number;
}

const CEOMessage = ({ delay = 0 }: CEOMessageProps) => {
  // Use Intersection Observer to trigger animations when scrolled into view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
    rootMargin: '-50px 0px'
  });
  
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
        delay
      }}
      className="p-2 sm:p-2.5 md:p-3 bg-[#000000] border border-white/10 rounded-lg backdrop-blur-md shadow-md"
    >
      <div className="flex items-start sm:items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-nextgen-purple to-nextgen-blue flex items-center justify-center shadow-glow">
          <span className="text-xs font-bold text-white">YOU</span>
        </div>
        <div className="ml-2 sm:ml-2.5">
          <div className="text-xs font-medium text-white/80">Practice Owner</div>
          <div className="text-sm font-medium text-white">I need to grow my practice ASAP. What can you do?</div>
        </div>
      </div>
    </motion.div>
  );
};

export default CEOMessage;
