
import React from 'react';

const VisionSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient">From Practice to Product</h2>
                <p className="text-lg text-white/70">
                  As dental professionals ourselves, we lived the daily challenges of running a modern practice. The complexity. The inefficiencies. The missed opportunities.
                </p>
                <p className="text-lg text-white/70">
                  We knew there had to be a better way—one that combined deep industry knowledge with cutting-edge AI technology.
                </p>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient">Building the Future</h2>
                <p className="text-lg text-white/70">
                  NextGen isn't just software. It's a complete reimagining of how dental practices can operate—with AI handling the complexity so you can focus on what matters: patient care.
                </p>
                <p className="text-lg text-white/70">
                  We're setting a new standard for practice management, proving that technology can transform the industry while keeping the human touch that makes dentistry special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
