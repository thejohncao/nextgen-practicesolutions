
import React from 'react';

const PracticeOwnerMessage = () => {
  return (
    <div className="flex items-start gap-3 pl-12 md:pl-16 pr-4 py-3">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-nextgen-purple to-nextgen-blue flex items-center justify-center shadow-glow flex-shrink-0">
        <span className="text-sm font-bold text-white">YOU</span>
      </div>
      
      <div className="relative p-3 rounded-lg border bg-nextgen-purple/10 border-nextgen-purple/30">
        <div className="text-xs font-medium text-white/70 mb-1">Practice Owner</div>
        <div className="text-sm font-medium text-white">I need to grow my practice ASAP. What can you do?</div>
      </div>
    </div>
  );
};

export default PracticeOwnerMessage;
