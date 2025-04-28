
import React from 'react';
import { Button } from '@/components/ui/button';
import SectionHeader from './boardroom/SectionHeader';
import ChatConversation from './boardroom/ChatConversation';
import SparkleText from './effects/SparkleText';

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
      className="section-padding py-20 bg-gradient-to-b from-nextgen-dark/80 to-nextgen-dark/95 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-nextgen-purple/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#1EAEDB]/5 blur-[120px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <SparkleText>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-6">
              Your AI Boardroom
            </h2>
          </SparkleText>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience seamless collaboration between you and your AI executive team.
          </p>
        </div>
        
        <div className="glass-card p-1 md:p-2 rounded-3xl shadow-lg backdrop-blur-xl border border-white/10 mb-12">
          <SectionHeader />
          <ChatConversation />
        </div>
        
        <div className="text-center mt-12">
          <Button 
            onClick={scrollToTeam}
            className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-xl hover:shadow-[#6C63FF]/25 hover:scale-[1.02] transition-all duration-300"
          >
            Meet Your Executive Team
          </Button>
        </div>
      </div>
      
      {/* Grid overlay for aesthetics */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)'
        }}
      ></div>
    </section>
  );
};

export default AIBoardroomSection;
