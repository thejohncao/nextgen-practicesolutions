
import React from 'react';

interface IntegrationsListProps {
  integrations: string[];
  isVisible: boolean;
}

const IntegrationsList = ({ integrations, isVisible }: IntegrationsListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-8">
      {integrations.map((integration, index) => (
        <div 
          key={index} 
          className={`px-4 py-2 bg-white/5 rounded-md text-white/70 text-sm transition-all duration-700`}
          style={{ 
            transitionDelay: `${index * 50}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          {integration}
        </div>
      ))}
    </div>
  );
};

export default IntegrationsList;
