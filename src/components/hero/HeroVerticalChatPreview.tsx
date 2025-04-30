
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FadeInSection from '@/components/ui/fade-in-section';
import AgentChatAvatar from '../AgentChatAvatar';
import CEOMessage from '../boardroom/CEOMessage';
import AgentMessage from '../boardroom/AgentMessage';

interface HeroVerticalChatPreviewProps {
  onTeamButtonClick: () => void;
}

const HeroVerticalChatPreview: React.FC<HeroVerticalChatPreviewProps> = ({ onTeamButtonClick }) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  
  // Simulate typing effect by progressively revealing messages
  useEffect(() => {
    const maxMessages = 6; // Total number of messages (title + 5 messages)
    
    if (visibleMessages < maxMessages) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
      }, 1000); // Show a new message every second
      
      return () => clearTimeout(timer);
    }
  }, [visibleMessages]);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      {/* Title and Subtitle */}
      <FadeInSection delay={0.1} direction="up" className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-gradient-primary">
          Built to Run the Full Patient Journey
        </h2>
        <p className="text-lg text-white/70">
          One decision. Four agents. Everything in motion — powered by AI.
        </p>
      </FadeInSection>
      
      {/* Chat Messages Container */}
      <div className="space-y-4 mb-8">
        {/* Practice Owner Message */}
        {visibleMessages >= 1 && (
          <FadeInSection delay={0.2} direction="up">
            <CEOMessage />
          </FadeInSection>
        )}
        
        {/* Miles Response */}
        {visibleMessages >= 2 && (
          <FadeInSection delay={0.3} direction="up">
            <AgentMessage 
              agent="miles" 
              role="Practice Manager" 
              message="Optimizing schedule: 15 new consult slots created. Front desk team notified."
              bgColorClass="bg-blue-500/10"
            />
          </FadeInSection>
        )}
        
        {/* Giselle Response */}
        {visibleMessages >= 3 && (
          <FadeInSection delay={0.4} direction="up">
            <AgentMessage 
              agent="giselle" 
              role="Growth Strategist" 
              message="Launching targeted campaign. Facebook and Google Ads going live in 30 minutes."
              bgColorClass="bg-green-500/10"
            />
          </FadeInSection>
        )}
        
        {/* Devon Response */}
        {visibleMessages >= 4 && (
          <FadeInSection delay={0.5} direction="up">
            <AgentMessage 
              agent="devon" 
              role="Practice Development" 
              message="Reactivating past veneer leads. 28 high-value prospects identified."
              bgColorClass="bg-purple-500/10"
            />
          </FadeInSection>
        )}
        
        {/* Alma Response */}
        {visibleMessages >= 5 && (
          <FadeInSection delay={0.6} direction="up">
            <AgentMessage 
              agent="alma" 
              role="Academy Director" 
              message="Team training scheduled: New veneer consultation script ready for tomorrow."
              bgColorClass="bg-amber-500/10"
            />
          </FadeInSection>
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
