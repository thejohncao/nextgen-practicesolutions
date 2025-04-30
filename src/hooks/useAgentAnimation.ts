
import { useState, useEffect } from 'react';
import { Agent } from '@/types/agent';
import { useReducedMotion } from './use-reduced-motion';

interface UseAgentAnimationOptions {
  staggered?: boolean;
  initialDelay?: number;
  welcomeComplete?: boolean;
  orbitDelay?: number;
}

/**
 * Unified hook for agent animations that handles:
 * - Visibility state
 * - Power up sequences
 * - Animation intensity based on user preferences
 * - Different animation patterns (staggered, simultaneous)
 */
export function useAgentAnimation(agents: Agent[], options: UseAgentAnimationOptions = {}) {
  const {
    staggered = true,
    initialDelay = 500,
    welcomeComplete = false,
    orbitDelay = 200
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [agentStates, setAgentStates] = useState<{ [key: string]: {
    isVisible: boolean;
    isPoweredUp: boolean;
    animationIntensity: "none" | "low" | "medium" | "high";
  } }>({});
  
  const prefersReducedMotion = useReducedMotion();
  
  // Initial agent appearance and power up sequence
  useEffect(() => {
    // Initial delay before starting animations
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Get all agent names for the sequence
      const agentNames = agents.map(a => a.name);
      
      // For each agent in sequence
      agentNames.forEach((name, index) => {
        // Calculate delay based on whether staggered or not
        const appearDelay = staggered ? initialDelay + (orbitDelay * index) : initialDelay;
        
        // First appearance - low energy
        setTimeout(() => {
          setAgentStates(prev => ({
            ...prev,
            [name]: {
              isVisible: true,
              isPoweredUp: true,
              animationIntensity: prefersReducedMotion ? "none" : "low"
            }
          }));
        }, appearDelay);
        
        // Second phase - medium energy after short delay
        setTimeout(() => {
          setAgentStates(prev => ({
            ...prev,
            [name]: {
              ...prev[name],
              animationIntensity: prefersReducedMotion ? "none" : "medium"
            }
          }));
        }, appearDelay + 600);
      });
      
    }, initialDelay);
    
    return () => clearTimeout(visibilityTimer);
  }, [agents, staggered, initialDelay, orbitDelay, prefersReducedMotion]);
  
  // Handle welcome completion - bring agents to full power
  useEffect(() => {
    if (welcomeComplete) {
      const agentNames = agents.map(a => a.name);
      
      agentNames.forEach((name, index) => {
        // Stagger the full power up
        const powerUpDelay = staggered ? 100 * index : 0;
        
        setTimeout(() => {
          setAgentStates(prev => ({
            ...prev,
            [name]: {
              ...prev[name],
              animationIntensity: prefersReducedMotion ? "low" : "high"
            }
          }));
        }, powerUpDelay);
      });
    }
  }, [welcomeComplete, agents, staggered, prefersReducedMotion]);
  
  return { isVisible, agentStates };
}
