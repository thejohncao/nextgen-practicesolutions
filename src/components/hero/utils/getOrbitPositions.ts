
import { useIsMobile } from '@/hooks/use-mobile';

export interface OrbitPosition {
  cx: string;
  cy: string;
  radius: string;
  angle?: number;
  delay: number;
}

export const useOrbitPositions = (arrangeVertically: boolean = false): OrbitPosition[] => {
  const isMobile = useIsMobile();
  
  if (arrangeVertically) {
    // Vertical alignment for boardroom mode
    return [
      { cx: '50%', cy: '15%', radius: '0%', delay: 0.2 },  // Miles (top)
      { cx: '50%', cy: '35%', radius: '0%', delay: 0.4 },  // Giselle (second)
      { cx: '50%', cy: '55%', radius: '0%', delay: 0.6 },  // Devon (third)
      { cx: '50%', cy: '75%', radius: '0%', delay: 0.8 },  // Alma (bottom)
    ];
  } else if (isMobile) {
    // 2x2 grid for mobile
    return [
      { cx: '25%', cy: '25%', radius: '0%', delay: 0.2 },  // Top-left (Giselle)
      { cx: '75%', cy: '25%', radius: '0%', delay: 0.4 },  // Top-right (Miles)
      { cx: '25%', cy: '75%', radius: '0%', delay: 0.6 },  // Bottom-left (Devon)
      { cx: '75%', cy: '75%', radius: '0%', delay: 0.8 },  // Bottom-right (Alma)
    ];
  } else {
    // Diamond/orbital layout for desktop
    return [
      { cx: '50%', cy: '50%', radius: '40%', angle: 45, delay: 0.2 },    // Top-right (Miles)
      { cx: '50%', cy: '50%', radius: '40%', angle: 135, delay: 0.4 },   // Top-left (Giselle)
      { cx: '50%', cy: '50%', radius: '40%', angle: 225, delay: 0.6 },   // Bottom-left (Devon)
      { cx: '50%', cy: '50%', radius: '40%', angle: 315, delay: 0.8 },   // Bottom-right (Alma)
    ];
  }
};
