
import React from 'react';
import { Button } from '@/components/ui/button';

interface ChatNotificationsProps {
  showTimeout: boolean;
  isTyping: boolean;
  isTimedOut: boolean;
  onContinueAnyway: () => void;
  onSummarizeResponse: () => void;
  onRetry: () => void;
  onStartOver: () => void;
}

const ChatNotifications: React.FC<ChatNotificationsProps> = ({
  showTimeout,
  isTyping,
  isTimedOut,
  onContinueAnyway,
  onSummarizeResponse,
  onRetry,
  onStartOver
}) => {
  return (
    <>
      {/* Timeout notification */}
      {showTimeout && isTyping && (
        <div className="p-4 mb-4 bg-[#000000] border border-amber-700/30 rounded-lg">
          <p className="text-white/90 mb-3">Still working on your request. Would you like me to:</p>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 border-white/20 hover:bg-white/5"
              onClick={onContinueAnyway}
            >
              Continue processing
            </Button>
            <Button 
              variant="default"
              size="sm"
              className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500"
              onClick={onSummarizeResponse}
            >
              Summarize what you know so far
            </Button>
          </div>
        </div>
      )}
      
      {/* Connection error notification */}
      {isTimedOut && (
        <div className="p-4 mb-4 bg-[#000000] border border-red-900/30 rounded-lg">
          <p className="text-white/90 mb-3">Sorry about that — I may have lost connection for a moment. Want to continue where we left off or start over?</p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 border-white/20 hover:bg-white/5"
              onClick={onRetry}
            >
              Yes, continue
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-white/20 hover:bg-white/5"
              onClick={onStartOver}
            >
              Start over
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatNotifications;
