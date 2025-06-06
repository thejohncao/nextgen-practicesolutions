
import React from 'react';

const JuvClosingStatement = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-transparent relative">
      {/* Subtle background fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-nextgen-purple/5 to-transparent" />
      
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-nextgen-purple/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="space-y-4">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              🎯 JUV is the vision.
            </div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-nextgen-purple leading-tight">
              NextGen is the engine.
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom divider line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-nextgen-purple/50 to-transparent" />
    </section>
  );
};

export default JuvClosingStatement;
