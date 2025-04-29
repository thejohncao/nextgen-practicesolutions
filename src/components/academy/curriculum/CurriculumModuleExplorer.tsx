
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import ScrollRevealWrapper from '../../animation/ScrollRevealWrapper';
import { type Module } from './TrackDetail';

interface Track {
  id: string;
  title: string;
  modules: Module[];
  accentColor?: string;
}

interface CurriculumModuleExplorerProps {
  tracks: Track[];
}

const CurriculumModuleExplorer: React.FC<CurriculumModuleExplorerProps> = ({ tracks }) => {
  return (
    <section className="py-24 relative bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Explore the Modules
          </h2>
          <p className="text-lg text-white/80">
            Dive into each training track below. Click to explore modules and quizzes inside each category.
          </p>
        </ScrollRevealWrapper>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {tracks.map((track, trackIndex) => (
              <ScrollRevealWrapper 
                key={track.id} 
                animation="fade-up" 
                delay={0.1 * (trackIndex + 1)}
              >
                <AccordionItem 
                  value={track.id} 
                  className={`glass-card overflow-hidden border-0 ${track.accentColor || 'border-nextgen-purple/30'}`}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <h3 className="text-xl font-heading font-semibold text-white text-left">
                      {track.title}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="space-y-4">
                      {track.modules.map((module, moduleIndex) => (
                        <div 
                          key={moduleIndex}
                          className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-nextgen-purple/20 text-nextgen-purple text-sm font-medium flex-shrink-0">
                              {module.number || moduleIndex + 1}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-lg font-medium text-white">
                                  {module.title}
                                </h4>
                                <span className="text-xs px-2 py-1 rounded-full bg-nextgen-purple/20 text-nextgen-purple font-medium">
                                  {module.type || "Lesson"}
                                </span>
                              </div>
                              <p className="text-white/70">
                                {module.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </ScrollRevealWrapper>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CurriculumModuleExplorer;
