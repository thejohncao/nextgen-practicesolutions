
import React from 'react';

const CEOMessage = () => {
  return (
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-start space-x-4 justify-end">
        <div className="flex-1 max-w-[80%]">
          <div className="flex items-center gap-2 mb-2 justify-end">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
              <span className="text-gray-600 font-medium">You</span>
            </div>
            <span className="text-sm text-gray-600">Practice Owner</span>
          </div>
          <p className="bg-gray-100 p-4 rounded-2xl text-gray-800 shadow-sm">
            "Team, I want to add 10 new veneer cases this month."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CEOMessage;
