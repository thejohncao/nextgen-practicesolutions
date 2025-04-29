
import React from 'react';
import Layout from '../components/Layout';
import CurriculumHero from '../components/academy/curriculum/CurriculumHero';
import ProgramStructure from '../components/academy/curriculum/ProgramStructure';
import TrackDetail from '../components/academy/curriculum/TrackDetail';
import LearningFeatures from '../components/academy/curriculum/LearningFeatures';
import CurriculumCTA from '../components/academy/curriculum/CurriculumCTA';
import SectionTransition from '../components/effects/SectionTransition';
import CurriculumModuleExplorer from '../components/academy/curriculum/CurriculumModuleExplorer';
import { curriculumTracks } from '../data/curriculumData';

const AcademyCurriculum = () => {
  return (
    <Layout>
      <CurriculumHero />
      
      <ProgramStructure />
      
      {curriculumTracks.map((track, index) => (
        <div key={track.id} className="relative">
          <SectionTransition 
            type={index === 0 ? "blur" : "fade"} 
            position="top" 
            height={20} 
          />
          <TrackDetail
            id={track.id}
            title={track.title}
            overview={track.overview}
            modules={track.modules}
            accentColor={track.accentColor}
          />
        </div>
      ))}

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
