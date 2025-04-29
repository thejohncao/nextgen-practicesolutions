
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionCTAProps {
  buttonText: string;
  description: string;
  isVisible: boolean;
}

const SectionCTA: React.FC<SectionCTAProps> = ({ buttonText, description, isVisible }) => {
  return (
    <motion.div 
      className="text-center mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <p className="text-white/70 mb-4">{description}</p>
      <Button 
        asChild
        className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
      >
        <Link to="/solutions">
          {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  );
};

export default SectionCTA;
