
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface MilesBannerProps {
  onOpenChat: () => void;
}

const MilesBanner = ({ onOpenChat }: MilesBannerProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[50px] bg-gradient-to-r from-slate-50 to-blue-50 border-b border-blue-100/50 z-[60] backdrop-blur-sm">
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-between h-full px-4">
          <div className="text-slate-700 font-medium">
            Your Always-On AI Concierge – Meet Miles
          </div>
          <Button 
            onClick={onOpenChat}
            variant="ghost" 
            className="bg-white/50 hover:bg-white/80 text-slate-700"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Talk to Miles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MilesBanner;
