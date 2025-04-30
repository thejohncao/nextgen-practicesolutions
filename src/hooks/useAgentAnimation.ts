
import { useState, useEffect } from 'react';
import { Agent } from '@/types/agent';

export type AnimationIntensity = "none" | "low" | "medium" | "high";

export interface AgentAnimationState {
  isVisible: boolean;
  isPoweredUp: boolean;
  animationIntensity: AnimationIntensity;
}

export interface AgentAnimationOptions {
  staggered?: boolean;
  initialDelay?: number;
  staggerDelay?: number;
  welcomeComplete?: boolean;
  reduceMotion?: boolean;
}

/**
 * Unified hook for handling agent animations throughout the application
 */
export const useAgentAnimation = (
  agents: Agent[], 
  options: AgentAnimationOptions = {}
) => {
  const { 
    staggered = true,
    initialDelay = 500,
    staggerDelay = 400,
    welcomeComplete = false,
    reduceMotion = false,
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [agentStates, setAgentStates] = useState<{[key: string]: AgentAnimationState}>({});
  
  // Initialize agent states
  useEffect(() => {
    const initialStates: {[key: string]: AgentAnimationState} = {};
    
    agents.forEach(agent => {
      initialStates[agent.name] = {
        isVisible: false,
        isPoweredUp: false,
        animationIntensity: "none"
      };
    });
    
    setAgentStates(initialStates);
  }, [agents]);
  
  // Handle animation sequence
  useEffect(() => {
    if (reduceMotion) {
      // For users who prefer reduced motion, skip animations
      const finalStates: {[key: string]: AgentAnimationState} = {};
      agents.forEach(agent => {
        finalStates[agent.name] = {
          isVisible: true,
          isPoweredUp: true,
          animationIntensity: "low"
        };
      });
      
      // Short timeout to ensure component has mounted
      const timer = setTimeout(() => {
        setIsVisible(true);
        setAgentStates(finalStates);
      }, 100);
      
      return () => clearTimeout(timer);
    }
    
    // Normal animation sequence
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Wake up sequence for each agent
      agents.forEach((agent, index) => {
        const delay = staggered ? (staggerDelay * (index + 1)) : staggerDelay;
        
        // First show the agent with low energy
        setTimeout(() => {
          setAgentStates(prev => ({
            ...prev,
            [agent.name]: {
              ...prev[agent.name],
              isVisible: true,
              isPoweredUp: true,
              animationIntensity: "low"
            }
          }));
        }, delay);
        
        // Then increase energy to medium
        setTimeout(() => {
          setAgentStates(prev => ({
            ...prev,
            [agent.name]: {
              ...prev[agent.name],
              animationIntensity: "medium"
            }
          }));
        }, delay + 800);
        
        // Finally reach full energy if welcome is complete
        setTimeout(() => {
          if (welcomeComplete) {
            setAgentStates(prev => ({
              ...prev,
              [agent.name]: {
                ...prev[agent.name],
                animationIntensity: "high"
              }
            }));
          }
        }, delay + 1600);
      });
      
    }, initialDelay);
    
    return () => clearTimeout(visibilityTimer);
  }, [agents, initialDelay, staggerDelay, staggered, welcomeComplete, reduceMotion]);
  
  // Update agent animation intensity when welcome completes
  useEffect(() => {
    if (welcomeComplete) {
      agents.forEach(agent => {
        setAgentStates(prev => ({
          ...prev,
          [agent.name]: {
            ...prev[agent.name],
            animationIntensity: "high"
          }
        }));
      });
    }
  }, [welcomeComplete, agents]);
  
  return {
    isVisible,
    agentStates,
    getAgentState: (agentName: string): AgentAnimationState => 
      agentStates[agentName] || { isVisible: false, isPoweredUp: false, animationIntensity: "none" }
  };
};
