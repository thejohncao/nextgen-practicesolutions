
import React from 'react';
import Layout from '../components/Layout';
import CurriculumHero from '../components/academy/curriculum/CurriculumHero';
import ProgramStructure from '../components/academy/curriculum/ProgramStructure';
import LearningFeatures from '../components/academy/curriculum/LearningFeatures';
import CurriculumCTA from '../components/academy/curriculum/CurriculumCTA';
import SectionTransition from '../components/effects/SectionTransition';
import CurriculumModuleExplorer from '../components/academy/curriculum/CurriculumModuleExplorer';
import CurriculumTracksList from '../components/academy/curriculum/CurriculumTracksList';
import { curriculumTracks } from '../data/curriculumData';
import ProvenSystem from '../components/academy/curriculum/ProvenSystem';
import ClosingCTA from '../components/academy/curriculum/ClosingCTA';
import PullQuote from '../components/academy/curriculum/PullQuote';

const AcademyCurriculum = () => {
  return (
    <Layout>
      <CurriculumHero />
      
      <ProvenSystem />
      
      <ProgramStructure />
      
      <CurriculumTracksList tracks={curriculumTracks} />

      <div className="relative">
        <SectionTransition type="fade" position="top" height={20} />
        <PullQuote />
      </div>

      <div className="relative">
        <SectionTransition type="fade" position="top" height={20} />
        <CurriculumModuleExplorer tracks={curriculumTracks} />
      </div>
      
      <LearningFeatures />
      
      <ClosingCTA />
    </Layout>
  );
};

export default AcademyCurriculum;
