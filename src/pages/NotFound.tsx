
import React, { useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import AgentAvatar from "../components/AgentAvatar";
import Compass from "../components/Compass";
import { Button } from "../components/ui/button";
import ScrollRevealWrapper from "../components/animation/ScrollRevealWrapper";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import CentralGlow from "../components/integrations/ConnectedTeam/CentralGlow";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-nextgen-dark relative">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/50 opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.05)_0,transparent_70%)]"></div>
        
        {/* Central glow effect */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <CentralGlow isVisible={true} pulseIntensity="low" />
        </div>
        
        {/* Content container */}
        <div 
          ref={containerRef} 
          className="container relative z-10 px-4 py-12 flex flex-col items-center justify-center"
        >
          <ScrollRevealWrapper animation="fade-in" delay={0.2} className="text-center">
            {/* Miles Avatar with floating animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="mb-6"
            >
              <AgentAvatar
                name="Miles"
                role="Practice Manager"
                color="blue"
                size="lg"
                animated={true}
                isPrimary={true}
                displayMode="initial"
              />
            </motion.div>

            {/* Spinning compass */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-2 mb-8 text-nextgen-purple"
            >
              <Compass className="w-10 h-10" />
            </motion.div>

            {/* Error message */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
              Oops. This page isn't ready yet.
            </h1>
            
            <p className="text-xl text-white/70 max-w-xl mx-auto mb-8">
              We're building the future of dental practice automation — but it looks like you found a page that's still under construction.
            </p>

            {/* Small fun text */}
            <p className="text-sm text-white/50 italic mb-10">
              Even Miles sometimes gets lost.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-nextgen-purple hover:bg-nextgen-purple/90"
              >
                <Link to="/">Return Home</Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-nextgen-purple/30 text-white hover:bg-nextgen-purple/10"
              >
                <Link to="/academy">Explore the Academy</Link>
              </Button>
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
