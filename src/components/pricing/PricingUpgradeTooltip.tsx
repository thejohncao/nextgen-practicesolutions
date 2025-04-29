
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TooltipPosition {
  x: number;
  y: number;
}

interface PricingUpgradeTooltipProps {
  visible: boolean;
  position: TooltipPosition;
  message: string;
  active: boolean;
  packageName: string;
}

const PricingUpgradeTooltip: React.FC<PricingUpgradeTooltipProps> = ({ 
  visible, 
  position, 
  message,
  active,
  packageName
}) => {
  // Different background colors based on package
  const getBgClass = () => {
    switch(packageName) {
      case 'Spark': return 'bg-gradient-to-r from-nextgen-purple/90 to-blue-500/90';
      case 'Ignite': return 'bg-gradient-to-r from-green-500/90 to-nextgen-purple/90';
      case 'Blaze': return 'bg-gradient-to-r from-purple-600/90 to-pink-500/90';
      default: return 'bg-gradient-to-r from-nextgen-purple/90 to-blue-500/90';
    }
  };
  
  // The specific cubic-bezier requested for premium motion feel
  const premiumEasing = [0.25, 1, 0.5, 1];
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ 
            opacity: active ? [0.9, 1] : 1,
            scale: active ? [1, 1.02, 1] : 1,
            y: 0
          }}
          exit={{ opacity: 0, scale: 0.98, y: 5 }}
          transition={{ 
            duration: active ? 1 : 0.25,
            repeat: active ? Infinity : 0,
            repeatType: "reverse",
            ease: premiumEasing
          }}
          className={`fixed py-2 px-3 rounded-md shadow-xl backdrop-blur-sm z-50 ${getBgClass()}`}
          style={{
            left: position.x,
            top: position.y,
            transform: 'translateY(-50%)',
            maxWidth: '200px'
          }}
        >
          <div className="flex items-center gap-2 text-white">
            <span className="font-medium text-sm">{message}</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
          
          {/* Triangle pointer with matching gradient */}
          <div 
            className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2" 
            style={{
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '6px solid rgba(139, 92, 246, 0.9)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PricingUpgradeTooltip;
