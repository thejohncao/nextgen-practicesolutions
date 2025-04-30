
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmailNotificationProps {
  sessionMessageCount: number;
  showEmailDialog: boolean;
  onRequestEmail: () => void;
}

const EmailNotification: React.FC<EmailNotificationProps> = ({
  sessionMessageCount,
  showEmailDialog,
  onRequestEmail
}) => {
  // Only show this notification if we've reached message threshold and email dialog isn't shown yet
  if (sessionMessageCount < 7 || showEmailDialog) return null;
  
  return (
    <div className="p-3 mb-4 animate-fade-in bg-black/30 border border-white/10 rounded-lg">
      <p className="text-white/80 text-sm">
        You're approaching the end of your chat preview. 
        Would you like to receive a full resource pack?
      </p>
      <Button
        variant="default"
        size="sm"
        className={cn(
          "mt-2 bg-gradient-to-r from-blue-500 to-purple-500",
          "transition-all duration-300 hover:scale-105"
        )}
        onClick={onRequestEmail}
      >
        Get Resource Pack
      </Button>
    </div>
  );
};

export default EmailNotification;
