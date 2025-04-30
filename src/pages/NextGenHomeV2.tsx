
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import AnimatedGrainOverlay from '../components/effects/AnimatedGrainOverlay';
import SectionTransition from '../components/effects/SectionTransition';
import ParallaxSection from '../components/effects/ParallaxSection';
import AnimatedHeading from '../components/ui/animated-heading';
import FadeInSection from '../components/ui/fade-in-section';
import FloatingAgentAvatars from '../components/hero/FloatingAgentAvatars';
import LampEffect from '../components/effects/LampEffect';
import PulseBeams from '../components/effects/PulseBeams';
import BackgroundCircles from '../components/effects/BackgroundCircles';
import HeroQuantumGrid from '../components/effects/HeroQuantumGrid';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AgentSectionGrid from '../components/nextgen-home-v2/AgentSectionGrid';
import ResultsCards from '../components/nextgen-home-v2/ResultsCards';
import SegmentationGrid from '../components/nextgen-home-v2/SegmentationGrid';

const NextGenHomeV2 = () => {
  return (
    <Layout>
      <div className="relative">
        {/* Global grain overlay with minimal opacity */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatedGrainOverlay opacity={0.03} />
        </div>
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background effects layering */}
          <HeroQuantumGrid />
          <PulseBeams opacity={0.06} />
          <BackgroundCircles 
            variant="default" 
            primaryColor="rgba(155, 135, 245, 0.12)" 
            secondaryColor="rgba(30, 174, 219, 0.08)" 
          />
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Copy Block */}
              <LampEffect>
                <div className="text-left space-y-8">
                  <FadeInSection delay={0.1} direction="up">
                    <AnimatedHeading 
                      text="The Operating System for Modern Dental Teams"
                      as="h1"
                      className="text-4xl md:text-6xl lg:text-7xl leading-tight"
                      type="word"
                      staggerChildren={0.03}
                      delay={0.3}
                    />
                  </FadeInSection>
                  
                  <FadeInSection delay={0.7} direction="up">
                    <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl">
                      Train your staff. Automate your operations. Scale your practice — all with one AI-powered platform.
                    </p>
                  </FadeInSection>
                  
                  {/* CTA Buttons */}
                  <FadeInSection delay={0.9} direction="up">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        asChild
                        size="lg"
                        className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
                      >
                        <Link to="/academy">
                          Explore the Academy
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
                      >
                        <Link to="/solutions">
                          Meet Your AI Team
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
                      >
                        <a href="#contact">
                          Book a Demo
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </FadeInSection>
                </div>
              </LampEffect>

              {/* Right Side: Enhanced Floating Avatars with higher z-index */}
              <div className="relative h-[500px] bg-transparent z-30">
                <FloatingAgentAvatars staggered={true} />
              </div>
            </div>
          </div>
        </section>
        
        {/* What Is NextGen Practice Solutions Section */}
        <div className="relative">
          <SectionTransition type="gradient" position="top" height={24} color="nextgen-dark" />
          <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <ScrollRevealWrapper animation="fade-up">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gradient">
                    What Is NextGen Practice Solutions?
                  </h2>
                  
                  <div className="space-y-6 text-xl text-white/80 leading-relaxed">
                    <p>
                      Most practices are buried in admin, losing treatment opportunities, and constantly retraining new staff — with no systems to scale.
                    </p>
                    
                    <p className="text-2xl font-semibold text-white">
                      NextGen fixes that.
                    </p>
                    
                    <p>
                      We combine AI automation, staff training, and smart systems to help dental teams grow without burnout.
                    </p>
                    
                    <p className="text-2xl font-semibold text-nextgen-purple">
                      You don't need more people.<br />
                      You need a better operating system.
                    </p>
                  </div>
                </div>
              </ScrollRevealWrapper>
            </div>
          </section>
        </div>
        
        {/* The 3 Pillars Section */}
        <div className="relative">
          <SectionTransition type="parallax" position="both" height={24} />
          <ParallaxSection>
            <section className="py-20 relative overflow-hidden bg-gradient-to-b from-nextgen-dark to-black/70">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <ScrollRevealWrapper animation="fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient">
                      The 3 Pillars of the NextGen OS
                    </h2>
                  </ScrollRevealWrapper>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <FadeInSection delay={0.1} direction="up">
                      <Card className="bg-black/30 border-white/10 backdrop-blur-sm h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-2xl text-white">Train Your Team</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-white/80">
                            Certify your front office and treatment coordinators with proven scripts, workflows, and SOPs — all inside the NextGen Academy.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="mt-4 border-nextgen-purple/30 text-nextgen-purple hover:bg-nextgen-purple/10">
                            <Link to="/academy">
                              Enroll in Academy
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </FadeInSection>
                    
                    {/* Card 2 */}
                    <FadeInSection delay={0.2} direction="up">
                      <Card className="bg-black/30 border-white/10 backdrop-blur-sm h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-2xl text-white">Automate with AI</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-white/80 mb-4">
                            Once your team is trained, deploy our AI Agents to handle the busywork.
                          </p>
                          
                          <AgentSectionGrid />
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="mt-4 border-nextgen-purple/30 text-nextgen-purple hover:bg-nextgen-purple/10">
                            <Link to="/solutions">
                              Meet the AI Team
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </FadeInSection>
                    
                    {/* Card 3 */}
                    <FadeInSection delay={0.3} direction="up">
                      <Card className="bg-black/30 border-white/10 backdrop-blur-sm h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-2xl text-white">Run It All from the Boardroom</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-white/80">
                            Your command center for daily operations.
                            See your KPIs, control your workflows, and lead like a CEO — without micromanaging.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="mt-4 border-nextgen-purple/30 text-nextgen-purple hover:bg-nextgen-purple/10">
                            <a href="#contact">
                              Request a Demo
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    </FadeInSection>
                  </div>
                </div>
              </div>
            </section>
          </ParallaxSection>
        </div>
        
        {/* Who It's For Section */}
        <div className="relative">
          <SectionTransition type="gradient" position="both" height={24} color="nextgen-dark" />
          <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <ScrollRevealWrapper animation="fade-up">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
                    Who It's For
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-xl text-white/80 mb-8">
                      Whether you're:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <h3 className="text-xl font-medium text-white mb-2">A solo owner tired of doing everything</h3>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <h3 className="text-xl font-medium text-white mb-2">A growing group practice with no clear training</h3>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <h3 className="text-xl font-medium text-white mb-2">A DSO looking to scale consistently</h3>
                      </div>
                    </div>
                    
                    <p className="text-xl text-white/80 mt-8">
                      NextGen gives you the people, processes, and platform to grow — without adding overhead.
                    </p>
                  </div>
                </div>
              </ScrollRevealWrapper>
            </div>
          </section>
        </div>
        
        {/* Results You Can Expect Section */}
        <div className="relative">
          <SectionTransition type="parallax" position="both" height={24} />
          <ParallaxSection>
            <section className="py-20 relative overflow-hidden bg-gradient-to-b from-nextgen-dark to-black/70">
              <div className="container mx-auto px-4">
                <ScrollRevealWrapper animation="fade-up">
                  <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient">
                    Results You Can Expect
                  </h2>
                </ScrollRevealWrapper>
                
                <ResultsCards />
                
                <div className="text-center mt-12">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
                  >
                    <Link to="/features">
                      See Real Results
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </ParallaxSection>
        </div>
        
        {/* Start Where You Are Section */}
        <div className="relative">
          <SectionTransition type="gradient" position="both" height={24} color="nextgen-dark" />
          <section className="py-24 relative overflow-hidden" id="contact">
            <div className="container mx-auto px-4">
              <ScrollRevealWrapper animation="fade-up">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient">
                  Start Where You Are
                </h2>
              </ScrollRevealWrapper>
              
              <SegmentationGrid />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default NextGenHomeV2;
