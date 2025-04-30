
import React from 'react';
import Layout from '../components/Layout';
import BoardroomHero from '../components/boardroom/BoardroomHero';
import ProblemSection from '../components/boardroom/ProblemSection';
import WhatIsBoardroomSection from '../components/boardroom/WhatIsBoardroomSection';
import BoardroomPreviewSection from '../components/boardroom/BoardroomPreviewSection';
import BoardroomAudienceSection from '../components/boardroom/BoardroomAudienceSection';
import BoardroomWorkflowSection from '../components/boardroom/BoardroomWorkflowSection';
import BoardroomFinalCTA from '../components/boardroom/BoardroomFinalCTA';
import { FadeInSection } from '@/components/ui/fade-in-section';

const Boardroom = () => {
  return (
    <Layout>
      <BoardroomHero />
      
      <FadeInSection>
        <ProblemSection />
      </FadeInSection>
      
      <FadeInSection>
        <WhatIsBoardroomSection />
      </FadeInSection>
      
      <FadeInSection>
        <BoardroomPreviewSection />
      </FadeInSection>
      
      <FadeInSection>
        <BoardroomAudienceSection />
      </FadeInSection>
      
      <FadeInSection>
        <BoardroomWorkflowSection />
      </FadeInSection>
      
      <FadeInSection>
        <BoardroomFinalCTA />
      </FadeInSection>
    </Layout>
  );
};

export default Boardroom;
