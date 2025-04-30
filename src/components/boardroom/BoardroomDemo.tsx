
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { agents } from '@/data/agents';
import { Button } from '../ui/button';
import { Users } from 'lucide-react';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import ChatConversation from './ChatConversation';
import SectionHeader from './SectionHeader';
import { cn } from '@/lib/utils';

interface BoardroomDemoProps {
  activated?: boolean;
  onTeamButtonClick?: () => void;
}

const BoardroomDemo: React.FC<BoardroomDemoProps> = ({
  activated = false,
  onTeamButtonClick
}) => {
  const [isActive, setIsActive] = useState(false);
  const [elementRef, isVisible] = useIntersectionAnimation<HTMLDivElement>({ 
    threshold: 0.3,
    triggerOnce: false
  });
  
  // Update active state based on prop and visibility
  useEffect(() => {
    if (activated && isVisible) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activated, isVisible]);
  
  // Variants for container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  // Variants for item animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <div ref={elementRef} className="py-10 md:py-16">
      <AnimatePresence>
        {isActive ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <SectionHeader 
                title="What Happens When You Ask for Growth"
                subtitle="One command. Four agents. Everything in motion."
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8 md:mt-12">
              <ChatConversation />
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className="mt-8 text-center"
            >
              <Button 
                onClick={onTeamButtonClick}
                className={cn(
                  "bg-nextgen-dark border border-white/10",
                  "hover:bg-white/10 transition-all duration-300"
                )}
                size="lg"
              >
                <Users className="mr-2 h-4 w-4" />
                Meet Your AI Team
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="h-24 md:h-40"></div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardroomDemo;
