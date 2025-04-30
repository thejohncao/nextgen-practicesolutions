
import React from 'react';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import { motion } from 'framer-motion';
import DisplayCards from './DisplayCards';
import SectionHeader from './SectionHeader';
import { cn } from '@/lib/utils';

const ResultsSection: React.FC = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Define result cards data
  const resultCards = [
    {
      title: "82%",
      subtitle: "Increase in Veneer Consults",
      description: "Our AI Growth Strategist follows up with every lead, instantly.",
      agentName: "Giselle",
      agentRole: "Growth Strategist",
      agentColor: "green"
    },
    {
      title: "40",
      subtitle: "Hours Saved per Week",
      description: "Miles handles scheduling, reschedules, and reminders.",
      agentName: "Miles",
      agentRole: "Practice Manager",
      agentColor: "blue"
    },
    {
      title: "+$124K",
      subtitle: "in Treatment Accepted",
      description: "Devon reactivates unscheduled treatment cases like a closer.",
      agentName: "Devon",
      agentRole: "Treatment Closer",
      agentColor: "purple"
    },
    {
      title: "3x",
      subtitle: "Faster Team Onboarding",
      description: "Alma trains your team with scripts, roleplay, and SOPs.",
      agentName: "Alma",
      agentRole: "Academy Director",
      agentColor: "gold"
    }
  ];
  
  // Animation variants for staggered motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24 bg-gradient-to-b from-nextgen-dark to-black",
      )}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants}>
            <SectionHeader 
              title="Real Results from Your AI Team" 
              subtitle="Practices using NextGen agents scale faster, close more, and reclaim their time."
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <DisplayCards cards={resultCards} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
