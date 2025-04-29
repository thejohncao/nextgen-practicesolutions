
import React from 'react';
import TrackDetail from './TrackDetail';
import SectionTransition from '../../effects/SectionTransition';
import { TrackData } from '../../../data/curriculumData';

interface CurriculumTracksListProps {
  tracks: TrackData[];
}

const CurriculumTracksList: React.FC<CurriculumTracksListProps> = ({ tracks }) => {
  return (
    <>
      {tracks.map((track, index) => (
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
    </>
  );
};

export default CurriculumTracksList;
