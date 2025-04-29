
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
            <h4 className="text-lg font-medium text-white mb-1">
              {module.title}
            </h4>
            <p className="text-white/70">
              {module.description}
            </p>
          </ScrollRevealWrapper>
        ))}
      </div>
    </div>
  );
};
