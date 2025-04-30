
import React from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Agent } from '@/types/agent';
import { agents } from '@/data/agents';

interface HeroSpotlightProps {
  selectedAgent: string | null;
}

const HeroSpotlight = ({ selectedAgent }: HeroSpotlightProps) => {
  // Get information about the selected agent for the spotlight effect
  const spotlightAgent = selectedAgent 
    ? agents.find(a => a.name === selectedAgent) 
    : null;
    
  return (
    <AnimatePresence mode="wait">
      {spotlightAgent && (
        <motion.div
          key={spotlightAgent.name}
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30, 
            duration: 0.4 
          }}
          className={`mt-6 overflow-hidden`}
        >
          <div className={`
            glass-morphism rounded-lg p-5 border overflow-hidden relative
            ${spotlightAgent.color === 'blue' ? 'border-blue-500/30' : ''}
            ${spotlightAgent.color === 'green' ? 'border-green-500/30' : ''}
            ${spotlightAgent.color === 'purple' ? 'border-purple-500/30' : ''}
            ${spotlightAgent.color === 'gold' ? 'border-amber-500/30' : ''}
          `}>
            {/* Background glow effect */}
            <div className={`
              absolute -inset-1 blur-xl opacity-30
              ${spotlightAgent.color === 'blue' ? 'bg-blue-500/20' : ''}
              ${spotlightAgent.color === 'green' ? 'bg-green-500/20' : ''}
              ${spotlightAgent.color === 'purple' ? 'bg-purple-500/20' : ''}
              ${spotlightAgent.color === 'gold' ? 'bg-amber-500/20' : ''}
              z-0
            `}></div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className={`
                  font-bold text-xl mb-1 flex items-center
                  ${spotlightAgent.color === 'blue' ? 'text-blue-300' : ''}
                  ${spotlightAgent.color === 'green' ? 'text-green-300' : ''}
                  ${spotlightAgent.color === 'purple' ? 'text-purple-300' : ''}
                  ${spotlightAgent.color === 'gold' ? 'text-amber-300' : ''}
                `}>
                  {spotlightAgent.name} – {spotlightAgent.title}
                </h3>
              </motion.div>
              
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white/90 text-sm leading-relaxed">{spotlightAgent.tagline}</p>
              </motion.div>
              
              {/* Feature highlight */}
              {spotlightAgent.features && spotlightAgent.features.length > 0 && (
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3"
                >
                  <div className={`
                    text-xs font-medium inline-block px-2 py-1 rounded-full
                    ${spotlightAgent.color === 'blue' ? 'bg-blue-500/10 text-blue-200' : ''}
                    ${spotlightAgent.color === 'green' ? 'bg-green-500/10 text-green-200' : ''}
                    ${spotlightAgent.color === 'purple' ? 'bg-purple-500/10 text-purple-200' : ''}
                    ${spotlightAgent.color === 'gold' ? 'bg-amber-500/10 text-amber-200' : ''}
                  `}>
                    Featured Capability
                  </div>
                  <p className="text-xs text-white/70 mt-2">
                    {spotlightAgent.features[0].split(' - ')[0]}
                  </p>
                </motion.div>
              )}
              
              {/* Learn more link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-right"
              >
                <Link 
                  to="#boardroom-section" 
                  className={`
                    text-xs font-medium flex items-center justify-end gap-1 hover:gap-2 transition-all duration-300
                    ${spotlightAgent.color === 'blue' ? 'text-blue-300' : ''}
                    ${spotlightAgent.color === 'green' ? 'text-green-300' : ''}
                    ${spotlightAgent.color === 'purple' ? 'text-purple-300' : ''}
                    ${spotlightAgent.color === 'gold' ? 'text-amber-300' : ''}
                  `}
                >
                  Learn more 
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroSpotlight;
