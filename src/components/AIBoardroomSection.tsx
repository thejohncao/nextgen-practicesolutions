
import React from 'react';
import { Button } from '@/components/ui/button';
import SectionHeader from './boardroom/SectionHeader';
import ChatConversation from './boardroom/ChatConversation';

const AIBoardroomSection = () => {
  const scrollToTeam = () => {
    const teamSection = document.getElementById('ai-team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="ai-boardroom" 
      className="section-padding py-20 bg-[#F1F3F6] dark:bg-nextgen-dark/70"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader />
        <ChatConversation />
        <div className="text-center mt-12">
          <Button 
            onClick={scrollToTeam}
            className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            Meet Your Executive Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIBoardroomSection;
