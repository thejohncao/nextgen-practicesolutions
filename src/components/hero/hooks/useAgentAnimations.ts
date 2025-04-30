
import { useState, useEffect } from 'react';
import { Agent } from '@/types/agent';

interface AgentAnimationsResult {
  isVisible: boolean;
  agentsPoweredUp: { [key: string]: boolean };
  orbAnimations: { [key: string]: "none" | "low" | "medium" | "high" };
}

export const useAgentAnimations = (agents: Agent[]): AgentAnimationsResult => {
  const [isVisible, setIsVisible] = useState(false);
  const [agentsPoweredUp, setAgentsPoweredUp] = useState<{ [key: string]: boolean }>({});
  const [orbAnimations, setOrbAnimations] = useState<{ [key: string]: "none" | "low" | "medium" | "high" }>({});
  
  useEffect(() => {
    // Initial delay to start animation sequence
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Power up agents in sequence with cinematic timing
      const agentNames = agents.map(a => a.name);
      
      // Wake up sequence - staggered
      agentNames.forEach((name, index) => {
        // First show the agent with low energy
        setTimeout(() => {
          setAgentsPoweredUp(prev => ({ ...prev, [name]: true }));
          setOrbAnimations(prev => ({ ...prev, [name]: "low" }));
        }, 400 * (index + 1));
        
        // Then increase energy to medium
        setTimeout(() => {
          setOrbAnimations(prev => ({ ...prev, [name]: "medium" }));
        }, 400 * (index + 1) + 800);
        
        // Finally reach full energy
        setTimeout(() => {
          setOrbAnimations(prev => ({ ...prev, [name]: "high" }));
        }, 400 * (index + 1) + 1600);
      });
      
    }, 500);
    
    return () => clearTimeout(timer);
  }, [agents]);
  
  return { isVisible, agentsPoweredUp, orbAnimations };
};
