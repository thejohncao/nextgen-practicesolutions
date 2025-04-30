
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from "lucide-react";
import { agents } from '@/data/agents';
import { motion } from 'framer-motion';
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import RainbowButton from '../ui/rainbow-button';
import SparkleText from '../effects/SparkleText';
import HeroQuantumGrid from '../effects/HeroQuantumGrid';
import PulseBeams from '../effects/PulseBeams';
import BackgroundCircles from '../effects/BackgroundCircles';
import AnimatedGrainOverlay from '../effects/AnimatedGrainOverlay';
import { useAgentAnimation } from '@/hooks/useAgentAnimation';
import HeroGrid, { HeroContent, HeroVisual } from './HeroGrid';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';

// Reordering agents to match patient journey
const orderedAgents = [...agents].sort((a, b) => {
  const order = { 'Miles': 0, 'Giselle': 1, 'Devon': 2, 'Alma': 3 };
  return order[a.name] - order[b.name];
});

interface EnhancedHeroSectionProps {
  onContinue?: () => void;
}

const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({
  onContinue
}) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroRef, isHeroVisible] = useIntersectionAnimation<HTMLElement>();
  
  // Use our new unified agent animation hook
  const { isVisible, agentStates } = useAgentAnimation(orderedAgents, {
    staggered: true,
    initialDelay: 600,
    welcomeComplete: isHeroVisible
  });
  
  // Track mouse position for subtle orb movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const handleAgentSelect = (agentName: string) => {
    setSelectedAgent(prevSelected => prevSelected === agentName ? null : agentName);
  };
  
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        chatButton.click();
      } else {
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            delayedChatButton.click();
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };
  
  // Get information about the selected agent for the spotlight effect
  const spotlightAgent = selectedAgent 
    ? agents.find(a => a.name === selectedAgent) 
    : null;
    
  // Handle scroll down to continue
  const handleScrollDown = () => {
    if (onContinue) {
      onContinue();
    } else {
      // Scroll down smoothly as fallback
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[100vh] overflow-hidden flex items-center"
    >
      {/* Background effects layering with better z-index management */}
      <div className="absolute inset-0 z-0">
        <HeroQuantumGrid />
        <PulseBeams opacity={0.06} />
        <BackgroundCircles 
          variant="default" 
          primaryColor="rgba(155, 135, 245, 0.12)" 
          secondaryColor="rgba(30, 174, 219, 0.08)" 
        />
        <AnimatedGrainOverlay opacity={0.05} />
      </div>
      
      <div className="container mx-auto relative z-10">
        <HeroGrid>
          <HeroContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHeroVisible ? 1 : 0, y: isHeroVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6">
                <SparkleText delay={300}>
                  <span className="text-gradient-primary font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    The Future of Dental Practice Management
                  </span>
                </SparkleText>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight font-heading font-bold">
                The World's First AI Team for Dental Practices
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl">
                Scale without the stress. Our agents run your front desk, nurture leads, close treatment, and train your staff — while you sleep.
              </p>
              
              {/* Agent spotlight content shows when an agent is selected */}
              {spotlightAgent && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10"
                >
                  <h3 className="font-bold text-lg mb-1">{spotlightAgent.name} – {spotlightAgent.title}</h3>
                  <p className="text-white/80 text-sm">{spotlightAgent.tagline}</p>
                </motion.div>
              )}
              
              {/* CTA Buttons with improved animations */}
              <div className="flex flex-col sm:flex-row gap-4">
                <RainbowButton 
                  size="lg"
                  onClick={handleChatOpen}
                  className="h-auto group"
                >
                  <span className="flex items-center">
                    Talk to Miles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </RainbowButton>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
                  asChild
                >
                  <Link to="/solutions">
                    <span className="flex items-center">
                      See How It Works
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </HeroContent>
          
          <HeroVisual>
            <div className="relative w-full h-[400px] md:h-[500px]">
              {/* We'll enhance the orbit animations with our new animation hook in OrbitingAgentsGrid */}
              <OrbitingAgentsGrid
                agents={orderedAgents}
                agentStates={agentStates}
                isVisible={isVisible}
                mousePosition={mousePosition}
                onAgentSelect={handleAgentSelect}
                selectedAgent={selectedAgent}
              />
            </div>
          </HeroVisual>
        </HeroGrid>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHeroVisible ? 1 : 0, y: isHeroVisible ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={handleScrollDown}
        >
          <span className="text-sm text-white/60 mb-2">Scroll to explore</span>
          <div className="animate-bounce">
            <ArrowRight className="h-5 w-5 transform rotate-90 text-white/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;

// New grid-based layout for the orbiting agents
interface OrbitingAgentsGridProps {
  agents: Agent[];
  agentStates: {[key: string]: any};
  isVisible: boolean;
  mousePosition: { x: number; y: number };
  selectedAgent: string | null;
  onAgentSelect: (agentName: string) => void;
}

const OrbitingAgentsGrid: React.FC<OrbitingAgentsGridProps> = ({
  agents,
  agentStates,
  isVisible,
  mousePosition,
  selectedAgent,
  onAgentSelect
}) => {
  // Grid positions for each agent
  const getAgentPosition = (index: number) => {
    const basePositions = [
      { x: 30, y: 30 }, // Top-left
      { x: 70, y: 30 }, // Top-right
      { x: 30, y: 70 }, // Bottom-left
      { x: 70, y: 70 }  // Bottom-right
    ];
    
    // Apply subtle mouse-based movement
    const position = basePositions[index % basePositions.length];
    const mouseInfluence = 5; // How much the mouse moves the agents
    
    return {
      x: position.x + (mousePosition.x * mouseInfluence),
      y: position.y + (mousePosition.y * mouseInfluence)
    };
  };
  
  return (
    <div className="absolute inset-0">
      {/* Center glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-nextgen-purple/10 blur-3xl animate-pulse-slow"></div>
      
      {/* Agents positioned in a grid */}
      {agents.map((agent, index) => {
        const position = getAgentPosition(index);
        const agentState = agentStates[agent.name] || {
          isVisible: false,
          isPoweredUp: false,
          animationIntensity: "none"
        };
        
        return (
          <motion.div
            key={agent.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            initial={{ 
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.8,
              x: `${position.x}%`,
              y: `${position.y}%`
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              type: 'spring',
              damping: 12
            }}
          >
            {/* Use the existing AgentFloatingContent component */}
            <EnhancedAgentDisplay
              agent={agent}
              isPoweredUp={agentState.isPoweredUp}
              animationIntensity={agentState.animationIntensity}
              isSelected={selectedAgent === agent.name}
              onClick={() => onAgentSelect(agent.name)}
              index={index}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// Simplified agent display component
interface EnhancedAgentDisplayProps {
  agent: Agent;
  isPoweredUp: boolean;
  animationIntensity: "none" | "low" | "medium" | "high";
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const EnhancedAgentDisplay: React.FC<EnhancedAgentDisplayProps> = ({
  agent,
  isPoweredUp,
  animationIntensity,
  isSelected,
  onClick,
  index
}) => {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 6, 
        repeat: Infinity,
        repeatType: 'reverse',
        ease: "easeInOut",
        delay: index * 0.6,
      }}
      className="relative flex flex-col items-center"
      aria-label={`${agent.name} - ${agent.title}`}
    >
      {/* Import existing AgentOrb component */}
      <div 
        onClick={onClick}
        className="cursor-pointer relative"
      >
        <AgentOrb
          name={agent.name}
          role={agent.title}
          color={agent.color}
          tooltipText={agent.tagline}
          animated={isPoweredUp}
          animationIntensity={animationIntensity}
          isActive={isSelected}
          displayMode="initial"
          showLabel={false}
          poweredUp={isPoweredUp}
        />
      </div>
      
      {/* Name label that appears on hover or when active */}
      <motion.div 
        className="mt-3 md:mt-4 text-center"
        initial={{ opacity: 0, y: -5 }}
        animate={{ 
          opacity: isPoweredUp ? 1 : 0,
          y: isPoweredUp ? 0 : -5
        }}
        transition={{
          duration: 0.3,
          delay: isPoweredUp ? 0.5 : 0
        }}
      >
        <div className="font-medium text-sm text-white whitespace-nowrap">
          {agent.name}
        </div>
        <div className="text-white/80 text-xs">
          {agent.title}
        </div>
      </motion.div>
    </motion.div>
  );
};
