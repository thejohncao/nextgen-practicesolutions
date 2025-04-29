
import React from 'react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PhoneDeviceMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PhoneDeviceMockup = ({ className, ...props }: PhoneDeviceMockupProps) => {
  return (
    <div className={cn("relative flex justify-center", className)} {...props}>
      {/* Phone Frame */}
      <div className="relative w-64 h-[500px] rounded-[40px] bg-black border-[8px] border-nextgen-dark shadow-2xl animate-float">
        {/* Inner Screen */}
        <div className="absolute inset-0 rounded-[32px] overflow-hidden bg-gradient-to-b from-gray-900 to-nextgen-dark">
          {/* Screen Content - Integration App UI */}
          <div className="w-full h-full p-2 flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 py-2">
              <div className="text-xs text-white/80">9:41</div>
              <div className="w-20 h-6 bg-black rounded-full mx-auto"></div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-white/80"></div>
                <div className="w-3 h-3 rounded-full bg-white/80"></div>
                <div className="w-3 h-3 rounded-full bg-white/80"></div>
              </div>
            </div>
            
            {/* App Header */}
            <div className="w-full px-4 py-3 flex justify-between items-center">
              <div className="text-white text-sm font-bold">NextGen</div>
              <div className="text-nextgen-purple text-xs">Integrations</div>
            </div>
            
            {/* Connected Integrations Section */}
            <div className="px-4 py-2">
              <div className="text-white/70 text-xs mb-2">CONNECTED SERVICES</div>
              
              {/* Connected Services List */}
              <div className="space-y-2">
                {["Google Calendar", "Slack", "Notion", "Zoom"].map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between bg-white/10 p-2 rounded-lg"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-nextgen-purple/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-nextgen-purple"></div>
                      </div>
                      <span className="text-xs text-white/80">{service}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-[10px] bg-nextgen-purple/20 text-nextgen-purple border-nextgen-purple/30 px-1.5"
                    >
                      <Check className="h-2.5 w-2.5 mr-1" /> Connected
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Available Integrations */}
            <div className="px-4 py-2 mt-2">
              <div className="text-white/70 text-xs mb-2">AVAILABLE TO CONNECT</div>
              
              <div className="grid grid-cols-2 gap-2">
                {["Meta Ads", "Cherry", "Stripe", "Weave"].map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 bg-white/5 p-2 rounded-lg"
                    style={{ animationDelay: `${(idx + 4) * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white/30"></div>
                    </div>
                    <span className="text-xs text-white/60">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-[14px]"></div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/50 rounded-full"></div>
        
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-nextgen-purple/10 rounded-[50px] filter blur-xl opacity-60 animate-pulse-slow"></div>
      </div>
    </div>
  );
};

export default PhoneDeviceMockup;
