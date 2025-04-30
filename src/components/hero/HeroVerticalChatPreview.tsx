
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FadeInSection from '@/components/ui/fade-in-section';
import AgentChatAvatar from '../AgentChatAvatar';
import CEOMessage from '../boardroom/CEOMessage';
import AgentMessage from '../boardroom/AgentMessage';
import { useInView } from 'react-intersection-observer';

interface HeroVerticalChatPreviewProps {
  onTeamButtonClick: () => void;
}

const HeroVerticalChatPreview: React.FC<HeroVerticalChatPreviewProps> = ({ onTeamButtonClick }) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  // When component comes into view, begin message sequence
  useEffect(() => {
    if (inView) {
      // Reset and start the sequence
      setVisibleMessages(0);
      
      const maxMessages = 6; // Total number of messages (title + 5 messages)
      
      // Show each message with proper timing
      for (let i = 1; i <= maxMessages; i++) {
        setTimeout(() => {
          setVisibleMessages(i);
        }, i * 800); // Progressive delay for each message
      }
    }
  }, [inView]);

  return (
    <div 
      ref={ref}
      className="flex flex-col w-full max-w-md mx-auto"
    >
      {/* Title and Subtitle */}
      <FadeInSection delay={0.1} direction="up" className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2 text-gradient-primary">
          Built to Run the Full Patient Journey
        </h2>
        <p className="text-base sm:text-lg text-white/70">
          One decision. Four agents. Everything in motion — powered by AI.
        </p>
      </FadeInSection>
      
      {/* Chat Messages Container */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {/* Practice Owner Message */}
        {visibleMessages >= 1 && (
          <CEOMessage delay={0.1} />
        )}
        
        {/* Miles Response */}
        {visibleMessages >= 2 && (
          <AgentMessage 
            agent="miles" 
            role="Practice Manager" 
            message="Optimizing schedule: 15 new consult slots created. Front desk team notified."
            delay={1}
          />
        )}
        
        {/* Giselle Response */}
        {visibleMessages >= 3 && (
          <AgentMessage 
            agent="giselle" 
            role="Growth Strategist" 
            message="Launching targeted campaign. Facebook and Google Ads going live in 30 minutes."
            delay={2}
          />
        )}
        
        {/* Devon Response */}
        {visibleMessages >= 4 && (
          <AgentMessage 
            agent="devon" 
            role="Practice Development" 
            message="Reactivating past veneer leads. 28 high-value prospects identified."
            delay={3}
          />
        )}
        
        {/* Alma Response */}
        {visibleMessages >= 5 && (
          <AgentMessage 
            agent="alma" 
            role="Academy Director" 
            message="Team training scheduled: New veneer consultation script ready for tomorrow."
            delay={4}
          />
        )}
      </div>
      
      {/* CTA Button */}
      {visibleMessages >= 5 && (
        <FadeInSection delay={0.7} direction="up" className="flex justify-center">
          <Button
            onClick={onTeamButtonClick}
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white group"
            size="lg"
          >
            <span className="flex items-center">
              Meet Your AI Team
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
        </FadeInSection>
      )}
    </div>
  );
};

export default HeroVerticalChatPreview;
