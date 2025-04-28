
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar, BarChart3, Zap, Users, MessageSquare, CheckCircle2, Globe } from "lucide-react";
import PulseBeams from './effects/PulseBeams';
import FloatingAgentAvatars from './hero/FloatingAgentAvatars';
import HeroQuantumGrid from './effects/HeroQuantumGrid';
import LampEffect from './effects/LampEffect';
import SparkleText from './effects/SparkleText';
import { BentoGrid, BentoGridItem } from './bento/BentoGrid';
import { HighlightedBento } from './bento/HighlightedBento';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] py-24 flex items-center justify-center overflow-hidden">
      {/* Background effects layering */}
      <HeroQuantumGrid />
      <PulseBeams opacity={0.06} />
      
      {/* Enhanced gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-nextgen-purple/15 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-nextgen-blue/15 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-[30%] left-[20%] w-[25%] h-[25%] bg-[#E87C7C]/10 blur-[80px] rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main hero content - full width */}
        <div className="mb-12">
          <LampEffect>
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6 animate-fade-in">
                <SparkleText delay={300}>
                  <span className="text-gradient-primary font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    The Future of Dental Practice Management
                  </span>
                </SparkleText>
              </div>
              
              <SparkleText>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-gradient animate-hero-fade">
                  The World's First AI Team for Dental Practices
                </h1>
              </SparkleText>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto animate-hero-fade animate-cinematic-delay-1">
                Deploy your Dream Team. Operate smarter. Grow faster. Lead effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-hero-fade-up animate-cinematic-delay-2">
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
            </div>
          </LampEffect>
        </div>

        {/* Bento grid layout */}
        <BentoGrid className="mt-16 max-w-7xl mx-auto">
          {/* Main features highlight */}
          <HighlightedBento 
            heading="AI Executive Team" 
            subheading="Four specialized AI agents working together to run your practice" 
            colSpan={2}
            icon={<Users className="h-6 w-6 text-nextgen-purple" />}
            glowColor="after:from-nextgen-purple/20 after:to-nextgen-purple/5"
          >
            <div className="h-[180px] relative">
              <FloatingAgentAvatars staggered={true} />
            </div>
          </HighlightedBento>
          
          {/* Quick stats */}
          <BentoGridItem title="Performance Metrics" icon={<BarChart3 className="h-5 w-5 text-nextgen-blue" />}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Treatment Acceptance</span>
                <div className="flex items-center">
                  <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-nextgen-purple w-4/5"></div>
                  </div>
                  <span className="text-white font-medium text-sm">+80%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">No-show Rate</span>
                <div className="flex items-center">
                  <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-nextgen-blue w-[10%]"></div>
                  </div>
                  <span className="text-white font-medium text-sm">-90%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Team Efficiency</span>
                <div className="flex items-center">
                  <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-green-500 w-[70%]"></div>
                  </div>
                  <span className="text-white font-medium text-sm">+70%</span>
                </div>
              </div>
            </div>
          </BentoGridItem>
          
          {/* Boardroom */}
          <BentoGridItem title="AI Boardroom" icon={<MessageSquare className="h-5 w-5 text-nextgen-purple" />}>
            <div className="text-white/70 text-sm">
              <p>Your AI Team collaborates in real-time, sharing insights and making decisions to optimize practice performance.</p>
              <Link to="#ai-boardroom" className="mt-4 inline-flex items-center text-nextgen-purple hover:text-nextgen-blue transition-colors">
                See how it works <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </BentoGridItem>
          
          {/* Calendar integration */}
          <BentoGridItem title="Real-time Calendar" icon={<Calendar className="h-5 w-5 text-nextgen-blue" />}>
            <div className="text-white/70 text-sm">
              <p>Miles AI automatically schedules, confirms, and follows up with patients to maximize chair time.</p>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`h-6 w-full rounded ${Math.random() > 0.5 ? 'bg-nextgen-purple/20' : 'bg-white/5'}`}></div>
                ))}
              </div>
            </div>
          </BentoGridItem>
          
          {/* Integrations */}
          <HighlightedBento 
            heading="Seamless Integrations" 
            subheading="Works with your existing practice management software"
            colSpan={2}
            icon={<Globe className="h-6 w-6 text-nextgen-blue" />}
            glowColor="after:from-nextgen-blue/20 after:to-nextgen-blue/5"
          >
            <div className="flex flex-wrap gap-2">
              {["Dentrix", "Open Dental", "Eaglesoft", "Denticon", "Curve Dental"].map((software) => (
                <div key={software} className="px-3 py-1 rounded-full bg-white/5 text-white/80 text-sm">
                  {software}
                </div>
              ))}
            </div>
          </HighlightedBento>
          
          {/* Academy */}
          <BentoGridItem title="Practice Academy" icon={<CheckCircle2 className="h-5 w-5 text-green-500" />} colSpan={1}>
            <div className="text-white/70 text-sm">
              <p>Comprehensive training for your team, delivered by AI coach Alma.</p>
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-nextgen-purple"></div>
                  <span>Treatment Coordinator Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-nextgen-purple"></div>
                  <span>Front Desk Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-nextgen-purple"></div>
                  <span>Practice Growth Strategy</span>
                </div>
              </div>
            </div>
          </BentoGridItem>
          
          {/* Real-time notifications */}
          <BentoGridItem title="Real-time Results" icon={<Zap className="h-5 w-5 text-[#FFD700]" />}>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="text-white/90">Miles reactivated 12 patients today</p>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 text-sm">
                <div className="h-2 w-2 rounded-full bg-nextgen-purple"></div>
                <p className="text-white/90">Giselle launched 3 campaigns this week</p>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </section>
  );
};

export default HeroSection;
