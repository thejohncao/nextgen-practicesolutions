
import React from 'react';

const CEOMessage = () => {
  return (
    <div className="p-6 border-b border-gray-100 dark:border-white/10">
      <div className="flex items-start space-x-4 justify-end">
        <div className="flex-1 max-w-[80%]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-nextgen-purple/20 flex items-center justify-center text-xs">
              <span className="text-nextgen-purple font-medium">You</span>
            </div>
            <span className="text-sm text-nextgen-dark/70 dark:text-white/70">Practice Owner</span>
          </div>
          <p className="bg-nextgen-purple/20 dark:bg-nextgen-purple/30 p-4 rounded-2xl text-nextgen-dark dark:text-white border border-nextgen-purple/30">
            "I need 10 new veneer cases this month."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CEOMessage;
