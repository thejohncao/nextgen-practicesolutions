
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AgentAvatar from '../AgentAvatar';
import { agents } from '@/data/agents';

interface FloatingAgentAvatarsProps {
  staggered?: boolean;
}

const FloatingAgentAvatars = ({ staggered = false }: FloatingAgentAvatarsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Reorder agents to match patient journey
  const orderedAgents = [...agents].sort((a, b) => {
    const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
    return order[a.name] - order[b.name];
  });
  
  // Define positions for each agent
  const positions = [
    { x: '10%', y: '20%', delay: 0.2 },
    { x: '70%', y: '15%', delay: 0.4 },
    { x: '65%', y: '70%', delay: 0.6 },
    { x: '20%', y: '65%', delay: 0.8 },
  ];
  
  return (
    <div className="relative w-full h-full">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 rounded-full"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
      
      {/* Floating agents */}
      {orderedAgents.map((agent, index) => (
        <motion.div
          key={agent.name}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          initial={{ 
            x: positions[index].x, 
            y: positions[index].y, 
            opacity: 0,
            scale: 0.8
          }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            x: positions[index].x, 
            y: positions[index].y
          }}
          transition={{ 
            duration: 0.8, 
            delay: staggered ? positions[index].delay : 0,
            type: 'spring',
            damping: 12
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.5,
            }}
            className="relative"
          >
            <AgentAvatar 
              name={agent.name}
              role={agent.title}
              color={agent.color}
              size="lg"
              animated={true}
              displayMode="initial"
              showLabel={true}
            />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Central connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: isVisible ? 0.3 : 0 }}>
        <motion.line 
          x1="30%" y1="30%" x2="70%" y2="30%" 
          stroke="white" strokeWidth="1" strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: isVisible ? 0.5 : 0 }}
          transition={{ delay: staggered ? 1 : 0.2, duration: 1.5 }}
        />
        <motion.line 
          x1="70%" y1="30%" x2="70%" y2="70%" 
          stroke="white" strokeWidth="1" strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: isVisible ? 0.5 : 0 }}
          transition={{ delay: staggered ? 1.2 : 0.4, duration: 1.5 }}
        />
        <motion.line 
          x1="70%" y1="70%" x2="30%" y2="70%" 
          stroke="white" strokeWidth="1" strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: isVisible ? 0.5 : 0 }}
          transition={{ delay: staggered ? 1.4 : 0.6, duration: 1.5 }}
        />
        <motion.line 
          x1="30%" y1="70%" x2="30%" y2="30%" 
          stroke="white" strokeWidth="1" strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: isVisible ? 0.5 : 0 }}
          transition={{ delay: staggered ? 1.6 : 0.8, duration: 1.5 }}
        />
      </svg>
      
      {/* Central glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-nextgen-purple/20 blur-xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isVisible ? 0.6 : 0,
          scale: isVisible ? 1 : 0.5
        }}
        transition={{ delay: staggered ? 1.8 : 1, duration: 1 }}
      />
    </div>
  );
};

export default FloatingAgentAvatars;
