
import React from 'react';
import StoryHero from '@/components/story/StoryHero';
import TimelineSection from '@/components/story/TimelineSection';
import VisionSection from '@/components/story/VisionSection';
import StoryCTA from '@/components/story/StoryCTA';
import Navbar from '@/components/Navbar';

const Story = () => {
  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      <StoryHero />
      <TimelineSection />
      <VisionSection />
      <StoryCTA />
    </div>
  );
};

export default Story;
