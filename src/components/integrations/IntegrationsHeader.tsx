
import React from 'react';
import { Shield } from "lucide-react";

interface IntegrationsHeaderProps {
  isVisible: boolean;
}

const IntegrationsHeader = ({ isVisible }: IntegrationsHeaderProps) => {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-6 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
        <Shield className="h-4 w-4 text-nextgen-purple" />
        <span className="text-sm font-medium text-white/80">Trusted by Practices</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
        Built for Healthcare. Trusted by Practices.
      </h2>
      
      <p className="text-lg text-white/70 mb-4">
        NextGen is secure by design, and integrates with the tools you already use.
      </p>
      
      <p className="text-sm text-white/60 max-w-2xl mx-auto">
        NextGen is built on HIPAA-ready architecture with seamless integrations for real clinical use.
      </p>
    </div>
  );
};

export default IntegrationsHeader;
