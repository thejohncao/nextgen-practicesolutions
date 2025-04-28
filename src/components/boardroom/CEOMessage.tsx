
import React from 'react';

const CEOMessage = () => {
  return (
    <div className="p-6 border-b border-gray-100 dark:border-white/10">
      <div className="flex items-start space-x-4 justify-end">
        <div className="flex-1 max-w-[80%]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-nextgen-purple/10 flex items-center justify-center text-xs">
              <span className="text-nextgen-purple font-medium">You</span>
            </div>
            <span className="text-sm text-nextgen-dark/60 dark:text-white/60">Practice Owner</span>
          </div>
          <p className="bg-nextgen-purple/10 dark:bg-nextgen-purple/20 p-4 rounded-2xl text-nextgen-dark dark:text-white shadow-lg">
            "Team, I want to add 10 new veneer cases this month."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CEOMessage;
