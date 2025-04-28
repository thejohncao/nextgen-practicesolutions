
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SparkleText from '@/components/effects/SparkleText';

const AnimationPlayground = () => {
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = (animationClass: string) => {
    setCurrentAnimation(null);
    // Force a reflow by accessing offsetHeight
    setTimeout(() => {
      setCurrentAnimation(animationClass);
      setIsAnimating(true);
      
      const animationDuration = animationClass.includes('pulse') ? 6000 : 
                              animationClass.includes('hero') ? 1000 : 
                              animationClass.includes('delayed') ? 1200 : 800;
      
      // Reset animation after it completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
      
      return () => clearTimeout(timer);
    }, 10);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gradient">Animation Playground</h1>
      <p className="text-white/70 mb-8">
        Explore and test NextGen Practice Solutions animation system. Click on any animation to see it in action.
      </p>

      <Tabs defaultValue="base">
        <TabsList className="mb-6">
          <TabsTrigger value="base">Base</TabsTrigger>
          <TabsTrigger value="hover">Hover</TabsTrigger>
          <TabsTrigger value="gooey">Gooey</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="sparkle">Sparkle</TabsTrigger>
          <TabsTrigger value="movement">Movement</TabsTrigger>
        </TabsList>
        
        {/* Base Animations */}
        <TabsContent value="base" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <Button onClick={() => triggerAnimation('animate-fade-in-up')} variant="outline" className="mb-6">
                Fade In Up
              </Button>
              <div className={`w-32 h-32 bg-nextgen-purple/30 rounded-lg flex items-center justify-center ${currentAnimation === 'animate-fade-in-up' ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <span className="text-white">Fade In Up</span>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <Button onClick={() => triggerAnimation('animate-pulse-glow')} variant="outline" className="mb-6">
                Pulse Glow
              </Button>
              <div className={`w-32 h-32 bg-nextgen-purple/30 rounded-lg flex items-center justify-center ${currentAnimation === 'animate-pulse-glow' ? 'animate-pulse-glow' : ''}`}>
                <span className="text-white">Pulse Glow</span>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <Button onClick={() => triggerAnimation('animate-pulse-slow')} variant="outline" className="mb-6">
                Pulse Slow
              </Button>
              <div className={`w-32 h-32 bg-nextgen-purple/30 rounded-lg flex items-center justify-center ${currentAnimation === 'animate-pulse-slow' ? 'animate-pulse-slow' : ''}`}>
                <span className="text-white">Pulse Slow</span>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <Button onClick={() => triggerAnimation('animate-beam')} variant="outline" className="mb-6">
                Beam
              </Button>
              <div className={`w-32 h-32 bg-nextgen-purple/30 rounded-lg flex items-center justify-center ${currentAnimation === 'animate-beam' ? 'animate-beam' : ''}`}>
                <span className="text-white">Beam</span>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        {/* Hover Effects */}
        <TabsContent value="hover" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <h3 className="mb-4 text-white/80">Folder Tab</h3>
              <div 
                className="folder-tab px-6 py-3 bg-white/5 border border-white/10 rounded-tl-lg rounded-tr-lg text-white"
                style={{cursor: 'pointer'}}
              >
                Hover Me
              </div>
              <p className="mt-4 text-xs text-white/70 text-center">
                Hover over the tab to see the lifting effect
              </p>
            </Card>
            
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <h3 className="mb-4 text-white/80">Lamp Gradient</h3>
              <div 
                className="lamp-gradient px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white w-48 h-48 flex items-center justify-center relative"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
                style={{cursor: 'pointer'}}
              >
                Move Cursor Here
              </div>
              <p className="mt-4 text-xs text-white/70 text-center">
                Move your cursor over the box to see the lamp effect
              </p>
            </Card>
            
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <h3 className="mb-4 text-white/80">Tab Highlight</h3>
              <div className="flex">
                <div className="tab-highlight px-4 py-2 bg-white/5 border-b-2 border-transparent hover:border-nextgen-purple text-white">
                  Tab One
                </div>
                <div className="tab-highlight px-4 py-2 bg-white/5 border-b-2 border-transparent hover:border-nextgen-purple text-white">
                  Tab Two
                </div>
              </div>
              <p className="mt-4 text-xs text-white/70 text-center">
                Hover over the tabs to see the highlight effect
              </p>
            </Card>
          </div>
        </TabsContent>
        
        {/* Gooey Effects */}
        <TabsContent value="gooey" className="space-y-6">
          <Card className="p-6 bg-white/5 flex flex-col items-center">
            <h3 className="mb-4 text-white/80">Gooey Effect</h3>
            <div className="relative">
              {/* SVG Filter for Gooey Effect */}
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <filter id="gooey">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="gooey"
                  />
                </filter>
              </svg>
              
              {/* Gooey container */}
              <div className="filter-gooey flex justify-center items-center h-48 w-96" style={{filter: 'url(#gooey)'}}>
                <div className="blob-move w-24 h-24 bg-blue-500/40 rounded-full mx-2"></div>
                <div className="blob-move w-24 h-24 bg-green-500/40 rounded-full mx-2" style={{animationDelay: '0.5s'}}></div>
                <div className="blob-move w-24 h-24 bg-purple-500/40 rounded-full mx-2" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/70 text-center">
              Observe the organic movement and merging of the colored circles
            </p>
          </Card>
        </TabsContent>
        
        {/* Chat Animations */}
        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Card className="p-6 bg-white/5">
              <Button onClick={() => triggerAnimation('message-chat')} variant="outline" className="mb-6">
                Trigger Chat Sequence
              </Button>
              <div className="max-w-md mx-auto bg-nextgen-dark/30 rounded-lg p-4">
                <div className={`mb-3 px-4 py-3 bg-nextgen-dark/60 rounded-lg w-3/4 ml-auto ${currentAnimation === 'message-chat' ? 'message-appear' : 'opacity-0'}`}>
                  <p className="text-white">Can you schedule a consultation for me?</p>
                </div>
                <div className={`px-4 py-3 bg-nextgen-purple/20 rounded-lg w-3/4 ${currentAnimation === 'message-chat' ? 'message-appear-delayed' : 'opacity-0'}`}>
                  <p className="text-white">Of course! I'd be happy to schedule a consultation for you. What days work best for you?</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        {/* Hero Animations */}
        <TabsContent value="hero" className="space-y-6">
          <Card className="p-6 bg-white/5">
            <Button onClick={() => triggerAnimation('hero-animation')} variant="outline" className="mb-6">
              Trigger Hero Animation
            </Button>
            <div className="max-w-md mx-auto">
              <div className={`mb-4 ${currentAnimation === 'hero-animation' ? 'animate-hero-fade' : 'opacity-0'}`}>
                <h2 className="text-2xl font-bold text-white">Transform Your Practice</h2>
              </div>
              <div className={`mb-4 ${currentAnimation === 'hero-animation' ? 'animate-hero-fade-up animate-cinematic-delay-1' : 'opacity-0'}`}>
                <p className="text-white/80">Meet your new AI executive team, ready to grow your practice.</p>
              </div>
              <div className={`${currentAnimation === 'hero-animation' ? 'animate-hero-fade-up animate-cinematic-delay-2' : 'opacity-0'}`}>
                <Button variant="default" className="bg-nextgen-purple">Talk to Miles</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Sparkle Effects */}
        <TabsContent value="sparkle" className="space-y-6">
          <Card className="p-6 bg-white/5 flex flex-col items-center">
            <Button onClick={() => triggerAnimation('sparkle')} variant="outline" className="mb-6">
              Trigger Sparkle
            </Button>
            {currentAnimation === 'sparkle' ? (
              <SparkleText>
                <h2 className="text-2xl font-bold text-white">Meet Your AI Team</h2>
              </SparkleText>
            ) : (
              <h2 className="text-2xl font-bold text-white">Meet Your AI Team</h2>
            )}
            <p className="mt-4 text-xs text-white/70 text-center">
              The sparkle effect sweeps across important text elements
            </p>
          </Card>
        </TabsContent>
        
        {/* Movement Animations */}
        <TabsContent value="movement" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <h3 className="mb-4 text-white/80">Float</h3>
              <div className="relative h-48 w-48 flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-nextgen-purple/30 rounded-lg flex items-center justify-center" style={{animation: 'float 3s ease-in-out infinite'}}>
                  <span className="text-white">Float</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <h3 className="mb-4 text-white/80">Quantum Float</h3>
              <div className="relative h-48 w-48 flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-nextgen-purple/30 rounded-lg flex items-center justify-center" style={{animation: 'quantum-float 4s ease-in-out infinite'}}>
                  <span className="text-white">Quantum</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <h3 className="mb-4 text-white/80">Ripple</h3>
              <div className="relative h-48 w-48 flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-nextgen-purple rounded-full opacity-30" style={{animation: 'ripple 2s linear infinite'}}></div>
                <div className="absolute w-16 h-16 bg-nextgen-purple/60 rounded-full flex items-center justify-center">
                  <span className="text-white">Ripple</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/5 flex flex-col items-center">
              <h3 className="mb-4 text-white/80">Rotate</h3>
              <div className="relative h-48 w-48 flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-nextgen-purple/30 rounded-lg flex items-center justify-center" style={{animation: 'rotate 6s linear infinite'}}>
                  <span className="text-white">Rotate</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 px-4 py-6 bg-white/5 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-white">Animation Code Reference</h2>
        <pre className="bg-black/40 p-4 rounded-md overflow-x-auto text-white/80 text-sm">
          {currentAnimation ? `className="${currentAnimation}"` : 'Select an animation to see its code...'}
        </pre>
      </div>
    </div>
  );
};

export default AnimationPlayground;
