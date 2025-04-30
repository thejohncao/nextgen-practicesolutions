
import React from 'react';

const CEOMessage = () => {
  return (
    <div className="p-3 bg-[#000000] border-b border-white/10">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-nextgen-purple to-nextgen-blue flex items-center justify-center shadow-glow">
          <span className="text-xs font-bold text-white">YOU</span>
        </div>
        <div className="ml-2.5">
          <div className="text-xs font-medium text-white/80">Practice Owner</div>
          <div className="text-sm font-medium text-white">I need to grow my practice ASAP. What can you do?</div>
        </div>
      </div>
    </div>
  );
};

export default CEOMessage;
