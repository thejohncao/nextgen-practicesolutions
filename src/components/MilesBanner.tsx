
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface MilesBannerProps {
  onOpenChat: () => void;
}

const MilesBanner = ({ onOpenChat }: MilesBannerProps) => {
  return (
    <div className="w-full h-[48px] bg-[#F0F8FF] border-b border-blue-100/50 z-[60]">
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-center h-full px-4 md:px-6">
          <div className="flex-1 text-center md:text-left">
            <span className="text-slate-800 font-semibold text-base md:text-lg">
              Your Always-On AI Concierge – {' '}
              <span className="inline-flex animate-shimmer bg-gradient-to-r from-[#a3c9f9] via-white to-[#a3c9f9] bg-[length:400%_100%] bg-clip-text text-transparent">
                Meet Miles
              </span>
            </span>
          </div>
          <Button 
            onClick={onOpenChat}
            variant="default"
            size="sm"
            className="bg-nextgen-blue hover:bg-nextgen-blue/90 text-white font-medium shadow-sm transition-all hover:shadow-md ml-4"
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
