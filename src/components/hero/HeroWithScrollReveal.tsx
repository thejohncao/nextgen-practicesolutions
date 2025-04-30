
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { agents } from '@/data/agents';
import FloatingAgentAvatarsWithWelcome from './FloatingAgentAvatarsWithWelcome';
import { useIsMobile } from '@/hooks/use-mobile';
import BoardroomDemo from '../boardroom/BoardroomDemo';
import HeroContent from './HeroContent';
import ScrollDownIndicator from './ScrollDownIndicator';

const HeroWithScrollReveal = () => {
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [showBoardroom, setShowBoardroom] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrollDownVisible, setIsScrollDownVisible] = useState(true);
  
  // Refs for scroll detection
  const heroRef = useRef<HTMLDivElement>(null);
  const boardroomRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for interactive effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    setMousePosition({ x, y });
  };
  
  // Handle scroll to detect when to show boardroom experience
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      
      // Show boardroom when scrolled 30% of hero height
      const shouldShowBoardroom = scrollY > heroHeight * 0.3;
      setShowBoardroom(shouldShowBoardroom);
      
      // Hide scroll indicator after scrolling starts
      if (scrollY > 100 && isScrollDownVisible) {
        setIsScrollDownVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollDownVisible]);
  
  // Complete the welcome sequence after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeComplete(true);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle agent selection
  const handleAgentSelect = (agentName: string) => {
    setSelectedAgent(agentName === selectedAgent ? null : agentName);
  };
  
  // Handle click on the "Meet Your Team" button
  const handleTeamButtonClick = () => {
    // Find the team section in the document and scroll to it
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      className="relative min-h-[150vh] bg-nextgen-dark overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={heroRef}
    >
      {/* Main hero content - initial state */}
      <div className={`min-h-screen sticky top-0 flex items-center transition-opacity duration-700 ${showBoardroom ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="container mx-auto px-4 pt-16 pb-4 relative z-10">
          <HeroContent 
            welcomeComplete={welcomeComplete}
            isVisible={!showBoardroom}
          />
          
          {/* Floating agents with welcome animation */}
          <div className="w-full aspect-square max-w-3xl mx-auto mt-8">
            <FloatingAgentAvatarsWithWelcome
              staggered={true}
              onAgentSelect={handleAgentSelect}
              mousePosition={mousePosition}
              welcomeComplete={welcomeComplete}
            />
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <ScrollDownIndicator isVisible={isScrollDownVisible} />
      </div>
      
      {/* Boardroom experience - revealed on scroll */}
      <div 
        ref={boardroomRef}
        className={`min-h-screen sticky top-0 flex items-center transition-opacity duration-700 ${showBoardroom ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="container mx-auto px-4 pt-16 pb-4 relative z-10">
          <BoardroomDemo 
            activated={showBoardroom} 
            onTeamButtonClick={handleTeamButtonClick}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroWithScrollReveal;
