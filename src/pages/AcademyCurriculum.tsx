
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

const AcademyCurriculum = () => {
  return (
    <Layout>
      <CurriculumHero />
      
      <ProgramStructure />
      
      <CurriculumTracksList tracks={curriculumTracks} />

      <div className="relative">
        <SectionTransition type="fade" position="top" height={20} />
        <CurriculumModuleExplorer tracks={curriculumTracks} />
      </div>
      
      <LearningFeatures />
      
      <CurriculumCTA />
    </Layout>
  );
};

export default AcademyCurriculum;
