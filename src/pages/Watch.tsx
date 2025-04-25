
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import VideoPlayer from '../components/VideoPlayer';
import SceneNavigation from '../components/SceneNavigation';
import AgentAvatar from '../components/AgentAvatar';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Scene data structure
const sceneData = [
  {
    id: 'problem',
    title: 'The Problem',
    timeRange: '0:00–0:10',
    description: 'Missed calls. Slow follow-up. Lost revenue.',
    voiceover: 'Most practices struggle because their front desk is overwhelmed.',
  },
  {
    id: 'shift',
    title: 'The Shift to AI',
    timeRange: '0:10–0:20',
    description: 'Meet your AI-powered operating system.',
    voiceover: 'Next Gen Practice Solutions automates your practice—with a fully staffed AI team.',
  },
  {
    id: 'spark',
    title: 'Spark Tier Demo',
    timeRange: '0:20–0:35',
    description: 'SPARK — Automate Your Front Desk',
    voiceover: 'Start with Spark. Miles and Brittany handle scheduling, confirmations, reschedules, and no-shows—automatically.',
    color: 'blue',
    agents: [
      { name: 'Miles', role: 'Operations Lead' },
      { name: 'Brittany', role: 'Front Desk Concierge' }
    ]
  },
  {
    id: 'ignite',
    title: 'Ignite Tier Demo',
    timeRange: '0:35–0:50',
    description: 'IGNITE — Scale Lead Flow',
    voiceover: 'Ignite adds growth. Giselle launches campaigns, while Lia nurtures leads and fills your calendar.',
    color: 'teal',
    agents: [
      { name: 'Giselle', role: 'Marketing Specialist' },
      { name: 'Lia', role: 'Lead Nurturing Agent' }
    ]
  },
  {
    id: 'blaze',
    title: 'Blaze Tier Demo',
    timeRange: '0:50–1:05',
    description: 'BLAZE — Multiply Your Revenue',
    voiceover: 'Blaze unlocks full ROI. Your AI team closes cases, recovers inactive patients, and shows you the results—every month.',
    color: 'gold',
    agents: [
      { name: 'Casey', role: 'Case Acceptance Specialist' },
      { name: 'Remi', role: 'Reactivation Agent' },
      { name: 'Devon', role: 'Analytics & ROI Specialist' }
    ]
  },
  {
    id: 'cta',
    title: 'Final Wrap + CTA',
    timeRange: '1:05–1:15',
    description: 'Every workflow. Every result. Fully automated.',
    voiceover: 'This is Next Gen Practice Solutions—built for modern practices like yours.',
  }
];

const Watch = () => {
  const [activeScene, setActiveScene] = useState(sceneData[0].id);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSceneChange = (sceneId: string) => {
    setActiveScene(sceneId);
    // In a real implementation, this would also seek the video to the correct timestamp
  };

  const currentScene = sceneData.find(scene => scene.id === activeScene) || sceneData[0];

  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-gradient">
            Experience the AI Operating System for Modern Practices
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            See how NextGen Practice Solutions transforms dental practices with a fully staffed AI team.
          </p>
        </div>
      </section>
      
      {/* Main Video Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Scene Navigation */}
            <div className="lg:w-1/4">
              <SceneNavigation 
                scenes={sceneData} 
                activeScene={activeScene} 
                onSceneChange={handleSceneChange} 
              />
            </div>
            
            {/* Center Column - Video Player */}
            <div className="lg:w-2/4">
              <VideoPlayer 
                scenes={sceneData} 
                activeScene={activeScene}
                onSceneChange={handleSceneChange}
              />
              
              {/* Current Scene Info */}
              <div className="mt-6 glass-card p-6 animate-fade-in">
                <h3 className="text-xl font-heading font-semibold mb-2">{currentScene.title}</h3>
                <p className="text-white/90 mb-4">{currentScene.description}</p>
                <p className="text-white/70 italic">"{currentScene.voiceover}"</p>
                
                {/* Agent Avatars for current scene */}
                {currentScene.agents && currentScene.agents.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm text-white/60 mb-3">Featured AI Team Members:</h4>
                    <div className="flex flex-wrap gap-4">
                      {currentScene.agents.map((agent) => (
                        <AgentAvatar 
                          key={agent.name} 
                          name={agent.name} 
                          role={agent.role}
                          color={currentScene.color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Package Info */}
            <div className="lg:w-1/4">
              <div className="glass-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-4">NextGen Packages</h3>
                
                <div className="space-y-4">
                  <PackageCard 
                    name="Spark" 
                    color="blue" 
                    description="Automate your front desk operations"
                    isActive={activeScene === 'spark'}
                    onClick={() => handleSceneChange('spark')}
                  />
                  
                  <PackageCard 
                    name="Ignite" 
                    color="teal" 
                    description="Scale your lead flow and marketing"
                    isActive={activeScene === 'ignite'}
                    onClick={() => handleSceneChange('ignite')}
                  />
                  
                  <PackageCard 
                    name="Blaze" 
                    color="gold" 
                    description="Multiply revenue and track ROI"
                    isActive={activeScene === 'blaze'}
                    onClick={() => handleSceneChange('blaze')}
                  />
                </div>
                
                <div className="mt-8">
                  <Button className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90" asChild>
                    <Link to="/demo">
                      Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* System Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-gradient">Complete AI Team Overview</h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              From scheduling to case acceptance, your AI team handles everything—automatically.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamOverviewCard 
              title="Front Office Team" 
              color="blue"
              agents={["Miles", "Brittany"]}
              description="Handles scheduling, confirmations, no-shows and reschedules."
            />
            
            <TeamOverviewCard 
              title="Marketing Team" 
              color="teal"
              agents={["Giselle", "Lia"]}
              description="Manages campaigns, lead nurturing, and calendar conversion."
            />
            
            <TeamOverviewCard 
              title="Revenue Team" 
              color="gold"
              agents={["Casey", "Remi", "Devon"]}
              description="Drives case acceptance, reactivates patients, and tracks ROI."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-nextgen-dark to-nextgen-dark/80">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
            Ready to Activate Your AI Team?
          </h2>
          
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
            Join the practices already transforming patient care with NextGen AI.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90" asChild>
              <Link to="/demo">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5" asChild>
              <Link to="/join">
                Join the Movement
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <Button size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90 shadow-lg" asChild>
            <Link to="/demo">
              Activate Your AI Team <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

// Helper Components
const PackageCard = ({ name, color, description, isActive, onClick }: { 
  name: string; 
  color: string; 
  description: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'from-blue-500/20 to-blue-600/10';
      case 'teal': return 'from-teal-500/20 to-teal-600/10';
      case 'gold': return 'from-amber-500/20 to-amber-600/10';
      default: return 'from-nextgen-purple/20 to-nextgen-purple/10';
    }
  };
  
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 bg-gradient-to-br ${getColorClass()} ${isActive ? 'border-white/30 shadow-glow' : 'border-white/10 hover:border-white/20'}`}
      onClick={onClick}
    >
      <h4 className="font-heading font-semibold">{name}</h4>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  );
};

const TeamOverviewCard = ({ title, color, agents, description }: { 
  title: string; 
  color: string;
  agents: string[];
  description: string;
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'from-blue-500/20 to-blue-600/10 border-blue-500/30';
      case 'teal': return 'from-teal-500/20 to-teal-600/10 border-teal-500/30';
      case 'gold': return 'from-amber-500/20 to-amber-600/10 border-amber-500/30';
      default: return 'from-nextgen-purple/20 to-nextgen-purple/10 border-nextgen-purple/30';
    }
  };
  
  return (
    <div className={`glass-card p-6 bg-gradient-to-br ${getColorClass()} animate-fade-in`}>
      <h3 className="text-xl font-heading font-semibold mb-3">{title}</h3>
      <div className="mb-4">
        {agents.map((agent, index) => (
          <span key={agent} className="inline-block mr-2 mb-2 px-3 py-1 bg-white/10 rounded-full text-sm">
            {agent}
          </span>
        ))}
      </div>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default Watch;
