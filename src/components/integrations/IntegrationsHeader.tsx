import React from 'react';
import { Shield } from "lucide-react";

interface IntegrationsHeaderProps {
  isVisible: boolean;
}

const IntegrationsHeader = ({ isVisible }: IntegrationsHeaderProps) => {
  return (
    <div className="relative">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-10"
        >
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
        
        {/* Enhanced quantum-inspired overlay effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
      </div>

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
    </div>
  );
};

export default IntegrationsHeader;
