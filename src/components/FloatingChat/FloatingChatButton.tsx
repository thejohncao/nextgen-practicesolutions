
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingChatButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 rounded-full w-16 h-16
        flex items-center justify-center shadow-lg
        bg-nextgen-purple text-white
        transition-all duration-300
        hover:scale-110
        animate-pulse-glow
        z-50
      `}
      aria-label="Chat with Miles"
    >
      <MessageCircle className="h-8 w-8" />
    </Button>
  );
};

export default FloatingChatButton;
