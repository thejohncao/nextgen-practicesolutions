
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Users, GraduationCap, Target } from "lucide-react";
import { BentoGrid, BentoGridItem } from '@/components/ui/bento/BentoGrid';
import SparkleText from './effects/SparkleText';
import PulseBeams from './effects/PulseBeams';
import HeroQuantumGrid from './effects/HeroQuantumGrid';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      <HeroQuantumGrid />
      <PulseBeams opacity={0.06} />
      
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-nextgen-purple/15 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-nextgen-blue/15 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-[30%] left-[20%] w-[25%] h-[25%] bg-[#E87C7C]/10 blur-[80px] rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6">
            <SparkleText delay={300}>
              <span className="text-gradient-primary font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                The Future of Dental Practice Management
              </span>
            </SparkleText>
          </div>
          
          <SparkleText>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-gradient animate-hero-fade mb-6">
              The World's First AI Team for Dental Practices
            </h1>
          </SparkleText>
        </div>

        {/* Bento Grid Section */}
        <BentoGrid className="mb-12">
          <BentoGridItem
            colSpan="col-span-2"
            icon={<Brain className="w-6 h-6 text-nextgen-purple" />}
            title="AI-Powered Operations"
            description="Deploy your Dream Team. Operate smarter. Grow faster. Lead effortlessly."
          >
            <div className="mt-4">
              <Button 
                asChild
                size="lg"
                className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg rounded-lg shadow-lg hover:shadow-nextgen-purple/25 hover:scale-[1.02] transition-all duration-300 group"
              >
                <Link to="/solutions" className="flex items-center">
                  Meet Your Dream Team
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </BentoGridItem>

          <BentoGridItem
            icon={<Users className="w-6 h-6 text-nextgen-purple" />}
            title="Team Excellence"
            description="Train and empower your staff with AI-powered role-play and certifications."
          >
            <div className="mt-4">
              <Link to="/academy" className="text-nextgen-purple hover:text-nextgen-purple/90 flex items-center text-sm font-medium">
                Explore Team Training
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </BentoGridItem>

          <BentoGridItem
            colSpan="col-span-2"
            icon={<GraduationCap className="w-6 h-6 text-nextgen-purple" />}
            title="NextGen Academy"
            description="World-class training for your entire team. From front desk to treatment coordinators."
          >
            <div className="mt-4">
              <Link to="/academy" className="text-nextgen-purple hover:text-nextgen-purple/90 flex items-center text-sm font-medium">
                View Certification Programs
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </BentoGridItem>

          <BentoGridItem
            icon={<Target className="w-6 h-6 text-nextgen-purple" />}
            title="Growth Solutions"
            description="Automate patient acquisition and optimize case acceptance rates."
          >
            <div className="mt-4">
              <Link to="/solutions" className="text-nextgen-purple hover:text-nextgen-purple/90 flex items-center text-sm font-medium">
                Discover Growth Tools
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </section>
  );
};

export default HeroSection;
