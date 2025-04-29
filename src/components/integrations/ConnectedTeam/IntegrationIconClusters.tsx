
import React from 'react';
import { motion } from 'framer-motion';
import IntegrationIcons from '@/components/integrations/IntegrationIcons';

interface IntegrationIconClustersProps {
  isVisible: boolean;
}

const IntegrationIconClusters: React.FC<IntegrationIconClustersProps> = ({ isVisible }) => {
  return (
    <>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <IntegrationIcons />
        </motion.div>
      </div>
      
      <div className="absolute bottom-1/4 left-3/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <IntegrationIcons />
        </motion.div>
      </div>
      
      <div className="absolute bottom-1/3 left-1/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          <IntegrationIcons />
        </motion.div>
      </div>
    </>
  );
};

export default IntegrationIconClusters;
