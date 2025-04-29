
import React from 'react';
import ScrollRevealWrapper from '../../animation/ScrollRevealWrapper';
import { ModulesList } from './ModulesList';

export interface Module {
  title: string;
  description: string;
}

interface TrackDetailProps {
  id: string;
  title: string;
  overview: string;
  modules: Module[];
  accentColor?: string;
}

const TrackDetail: React.FC<TrackDetailProps> = ({ 
  id, 
  title, 
  overview, 
  modules, 
  accentColor = "bg-nextgen-purple/10 border-nextgen-purple/30" 
}) => {
  return (
    <section id={id} className="py-20 relative bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="max-w-4xl mx-auto">
          <div className={`glass-card p-8 md:p-10 ${accentColor}`}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">
              {title}
            </h2>
            
            <p className="text-lg text-white/80 mb-8">
              {overview}
            </p>
            
            <ModulesList modules={modules} />
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default TrackDetail;
