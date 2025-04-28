
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import PulseBeams from './effects/PulseBeams';
import FloatingAgentAvatars from './hero/FloatingAgentAvatars';
import SparkleText from './effects/SparkleText';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <PulseBeams opacity={0.06} />
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Copy Block */}
          <div className="text-left space-y-8">
            <SparkleText>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-gradient">
                The World's First AI Team for Dental Practices
              </h1>
            </SparkleText>
            
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl animate-hero-fade animate-cinematic-delay-1">
              Deploy your Dream Team. Operate smarter. Grow faster. Lead effortlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-hero-fade-up animate-cinematic-delay-2">
              <Button 
                asChild
                size="lg"
                className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/solutions">
                  Meet Your Dream Team
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side: Floating Avatars */}
          <div className="relative h-[500px]">
            <FloatingAgentAvatars staggered={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
