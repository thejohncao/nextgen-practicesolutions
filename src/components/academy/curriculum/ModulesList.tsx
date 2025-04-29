
import React from 'react';
import { type Module } from './TrackDetail';
import ScrollRevealWrapper from '../../animation/ScrollRevealWrapper';

interface ModulesListProps {
  modules: Module[];
}

export const ModulesList: React.FC<ModulesListProps> = ({ modules }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-heading font-medium text-white mb-4">Modules</h3>
      
      <div className="space-y-4">
        {modules.map((module, index) => (
          <ScrollRevealWrapper 
            key={index} 
            animation="fade-up" 
            delay={0.05 * (index + 1)}
            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-nextgen-purple/20 text-nextgen-purple text-sm font-medium flex-shrink-0">
                {module.number || index + 1}
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
          </ScrollRevealWrapper>
        ))}
      </div>
    </div>
  );
};
