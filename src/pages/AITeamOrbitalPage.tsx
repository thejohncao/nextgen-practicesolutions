
import React from 'react';
import Layout from '@/components/Layout';
import AITeamOrbital from '@/components/orbital/AITeamOrbital';
import { Card } from '@/components/ui/card';
import FadeInSection from '@/components/ui/fade-in-section';

const AITeamOrbitalPage = () => {
  const handleAgentSelect = (agentName: string) => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found, clicking...');
        chatButton.click();
        
        // Store the selected agent in sessionStorage
        sessionStorage.setItem('nextgen_selected_agent', agentName);
      } else {
        console.warn('Chat toggle button not found');
      }
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <FadeInSection>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Your AI Executive Team</h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Four AI specialists, each focused on a different area of your practice growth.
              Click an agent to start chatting directly with your new executive team.
            </p>
          </div>
        </FadeInSection>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden p-6 relative">
            <AITeamOrbital onAgentSelect={handleAgentSelect} />
          </Card>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-white/10 bg-black/20 backdrop-blur-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-white">How it works</h2>
              <p className="text-white/70">
                Each agent is specialized to handle specific aspects of your practice. 
                Click on an agent orb to start a conversation focused on that area of expertise.
                Your AI team works together to provide comprehensive support for your practice growth.
              </p>
            </Card>
            
            <Card className="border-white/10 bg-black/20 backdrop-blur-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-white">The AI Advantage</h2>
              <p className="text-white/70">
                Unlike traditional practice management solutions, NextGen's AI executive team
                provides 24/7 support, learns from your preferences, and continuously improves
                over time. No waiting for humans to respond — your AI team is always available.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AITeamOrbitalPage;
