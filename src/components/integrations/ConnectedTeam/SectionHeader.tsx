
import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  isVisible: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, isVisible }) => {
  return (
    <motion.div 
      className="text-center max-w-3xl mx-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
        {title}
      </h2>
      <p className="text-xl text-white/70">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
