
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CEOMessage from './CEOMessage';
import AgentMessage from './AgentMessage';
import PatientJourneyTimeline from '../journey/PatientJourneyTimeline';

interface BoardroomDemoProps {
  activated: boolean;
  onTeamButtonClick: () => void;
}

const BoardroomDemo: React.FC<BoardroomDemoProps> = ({ activated, onTeamButtonClick }) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  
  // When component is activated, begin message sequence
  useEffect(() => {
    if (activated) {
      // Reset message visibility
      setVisibleMessages(0);
      
      const maxMessages = 6; // Total number of messages (owner + 4 agents + button)
      
      // Show each message with proper timing
      for (let i = 1; i <= maxMessages; i++) {
        setTimeout(() => {
          setVisibleMessages(i);
        }, i * 800); // Progressive delay for each message (800ms)
      }
    } else {
      // Reset when not in view
      setVisibleMessages(0);
    }
  }, [activated]);

  // Animation variants for agents floating into position
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      {/* Chat Messages Container */}
      <motion.div 
        className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
        variants={containerVariants}
        initial="hidden"
        animate={activated ? "visible" : "hidden"}
      >
        {/* Practice Owner Message */}
        <motion.div 
          variants={messageVariants}
          initial="hidden"
          animate={visibleMessages >= 1 ? "visible" : "hidden"}
        >
          <CEOMessage delay={0} />
        </motion.div>
        
        {/* Miles Response */}
        <motion.div 
          variants={messageVariants}
          initial="hidden"
          animate={visibleMessages >= 2 ? "visible" : "hidden"}
        >
          <AgentMessage 
            agent="miles" 
            role="Practice Manager" 
            message="Optimizing schedule: 15 new consult slots created. Front desk team notified."
            delay={0}
          />
        </motion.div>
        
        {/* Giselle Response */}
        <motion.div 
          variants={messageVariants}
          initial="hidden"
          animate={visibleMessages >= 3 ? "visible" : "hidden"}
        >
          <AgentMessage 
            agent="giselle" 
            role="Growth Strategist" 
            message="Launching targeted campaign. Facebook and Google Ads going live in 30 minutes."
            delay={0}
          />
        </motion.div>
        
        {/* Devon Response */}
        <motion.div 
          variants={messageVariants}
          initial="hidden"
          animate={visibleMessages >= 4 ? "visible" : "hidden"}
        >
          <AgentMessage 
            agent="devon" 
            role="Practice Development" 
            message="Reactivating past veneer leads. 28 high-value prospects identified."
            delay={0}
          />
        </motion.div>
        
        {/* Alma Response */}
        <motion.div 
          variants={messageVariants}
          initial="hidden"
          animate={visibleMessages >= 5 ? "visible" : "hidden"}
        >
          <AgentMessage 
            agent="alma" 
            role="Academy Director" 
            message="Team training scheduled: New veneer consultation script ready for tomorrow."
            delay={0}
          />
        </motion.div>
      </motion.div>
      
      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: visibleMessages >= 6 ? 1 : 0, 
          y: visibleMessages >= 6 ? 0 : 20 
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center"
      >
        <Button
          onClick={onTeamButtonClick}
          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white group"
          size="lg"
        >
          <span className="flex items-center">
            Meet Your AI Team
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Button>
      </motion.div>
      
      {/* Patient Journey Timeline */}
      {activated && visibleMessages >= 5 && (
        <motion.div 
          className="mt-16 md:mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <PatientJourneyTimeline />
        </motion.div>
      )}
    </div>
  );
};

export default BoardroomDemo;
