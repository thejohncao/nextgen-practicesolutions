
import { useState, useEffect } from 'react';
import { Agent } from '@/types/agent';

interface AgentPowerUpResult {
  agentsPoweredUp: { [key: string]: boolean };
  orbAnimations: { [key: string]: "none" | "low" | "medium" | "high" };
  isVisible: boolean;
}

const useAgentPowerUp = (agents: Agent[], welcomeComplete: boolean = false): AgentPowerUpResult => {
  const [isVisible, setIsVisible] = useState(false);
  const [agentsPoweredUp, setAgentsPoweredUp] = useState<{ [key: string]: boolean }>({});
  const [orbAnimations, setOrbAnimations] = useState<{ [key: string]: "none" | "low" | "medium" | "high" }>({});
  
  useEffect(() => {
    // Initial delay to start the welcome sequence
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Power up agents in sequence with cinematic timing
      const agentNames = agents.map(a => a.name);
      
      // Wake up sequence - staggered with deliberate timing
      agentNames.forEach((name, index) => {
        // First show the agent with low energy
        setTimeout(() => {
          setAgentsPoweredUp(prev => ({ ...prev, [name]: true }));
          setOrbAnimations(prev => ({ ...prev, [name]: "low" }));
        }, 400 * (index + 1));
        
        // Then increase energy to medium after a short delay
        setTimeout(() => {
          setOrbAnimations(prev => ({ ...prev, [name]: "medium" }));
        }, 400 * (index + 1) + 800);
        
        // Finally reach full energy if welcome is complete
        setTimeout(() => {
          if (welcomeComplete) {
            setOrbAnimations(prev => ({ ...prev, [name]: "high" }));
          }
        }, 400 * (index + 1) + 1600);
      });
      
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Update agent animation intensity when welcome completes
  useEffect(() => {
    if (welcomeComplete) {
      const agentNames = agents.map(a => a.name);
      agentNames.forEach((name) => {
        setOrbAnimations(prev => ({ ...prev, [name]: "high" }));
      });
    }
  }, [welcomeComplete]);

  return {
    agentsPoweredUp,
    orbAnimations,
    isVisible
  };
};

export default useAgentPowerUp;
