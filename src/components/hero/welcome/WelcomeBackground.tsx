
import React from 'react';
import ConnectingLines from '../../integrations/ConnectedTeam/ConnectingLines';
import CentralGlow from '../../integrations/ConnectedTeam/CentralGlow';

interface WelcomeBackgroundProps {
  isVisible: boolean;
  welcomeComplete?: boolean;
}

const WelcomeBackground: React.FC<WelcomeBackgroundProps> = ({ 
  isVisible, 
  welcomeComplete = false 
}) => {
  return (
    <>
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 rounded-full"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
      
      {/* Connecting diamond lines - now with animated drawing */}
      <ConnectingLines isVisible={isVisible} animated={true} />
      
      {/* Central glow effect - enhanced with pulse */}
      <CentralGlow 
        isVisible={isVisible} 
        pulseIntensity={welcomeComplete ? "high" : "low"} 
      />
    </>
  );
};

export default WelcomeBackground;
