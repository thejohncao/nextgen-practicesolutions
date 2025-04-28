import React from 'react';
import { Button } from '@/components/ui/button';
import SectionHeader from './boardroom/SectionHeader';
import ChatConversation from './boardroom/ChatConversation';

const AIBoardroomSection = () => {
  return (
    <section id="how-it-works" className="section-padding py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader />
        <ChatConversation />
        <div className="text-center mt-12">
          <Button 
            onClick={() => {
              const teamSection = document.getElementById('ai-team');
              if (teamSection) {
                teamSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            Activate Your AI Boardroom™
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIBoardroomSection;
