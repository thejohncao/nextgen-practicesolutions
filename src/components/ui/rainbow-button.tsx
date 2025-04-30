
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  asChild?: boolean;
}

const RainbowButton = ({ 
  children, 
  size = "default", 
  className, 
  asChild = false, 
  ...props 
}: RainbowButtonProps) => {
  return (
    <Button
      asChild={true}
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316]",
        "font-medium text-white rounded-full shadow-lg",
        "hover:shadow-[0_0_15px_rgba(155,135,245,0.6)]",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0EA5E9] before:via-[#D946EF] before:to-[#F97316]",
        "before:animate-shimmer before:bg-[length:200%_100%]",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        "min-h-[44px]", // Mobile tap target minimum height
        size === "lg" ? "text-lg px-8 py-4" : "",
        size === "sm" ? "text-sm px-4 py-2" : "",
        size === "default" ? "px-6 py-3" : "",
        className
      )}
      {...props}
    >
      {asChild ? children : <span>{children}</span>}
    </Button>
  );
};

export default RainbowButton;
