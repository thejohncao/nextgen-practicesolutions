
import React from 'react';

const CEOMessage = () => {
  return (
    <div className="p-6 border-b border-white/20">
      <div className="flex items-start space-x-4 justify-end">
        <div className="flex-1 max-w-[80%]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-nextgen-purple/40 flex items-center justify-center text-xs">
              <span className="text-white font-medium">You</span>
            </div>
            <span className="text-sm text-white/80">Practice Owner</span>
          </div>
          <p className="bg-nextgen-purple/30 p-4 rounded-2xl text-white border border-nextgen-purple/40">
            "I need 10 new veneer cases this month."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CEOMessage;
