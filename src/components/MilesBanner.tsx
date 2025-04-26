
import React from 'react';
import { cn } from "@/lib/utils";

interface MilesBannerProps {
  onOpenChat: () => void;
}

const MilesBanner = ({ onOpenChat }: MilesBannerProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Banner clicked, attempting to open chat...');
    onOpenChat();
  };

  return (
    <button 
      onClick={handleClick}
      className="w-full h-[50px] bg-[#F0F8FF] border-b border-blue-100/50 z-[60] cursor-pointer transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in"
    >
      <div className="container mx-auto h-full max-w-[1200px]">
        <div className="flex items-center justify-center h-full px-4">
          <p className="text-slate-800 font-semibold text-base md:text-lg text-center">
            Your Always-On AI Concierge — {' '}
            <span className="inline-flex animate-shimmer bg-gradient-to-r from-[#a3c9f9] via-white to-[#a3c9f9] bg-[length:400%_100%] bg-clip-text text-transparent">
              Meet Miles
            </span>
          </p>
        </div>
      </div>
    </button>
  );
};

export default MilesBanner;
