
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { patientJourney } from '@/data/patientJourney';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SparkleText from '../effects/SparkleText';
import AgentProfile from './AgentProfile';
import TypingIndicator from './TypingIndicator';
import ChatSimulation from './ChatSimulation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sprout, Calendar, Handshake, Sprout as GrowthIcon } from 'lucide-react';
import JourneyStageIcon from '../JourneyStageIcon';

const TabbedAgentSection = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const isMobile = useIsMobile();

  // Reset and show typing animation when tab changes
  useEffect(() => {
    setShowChat(false);
    setIsTyping(true);
    
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setShowChat(true);
    }, 2000);
    
    return () => clearTimeout(typingTimer);
  }, [activeTab]);

  // Map stages to their appropriate icons
  const getStageIcon = (index: number) => {
    switch(index) {
      case 0: return <Sprout size={18} className="text-green-500" />;
      case 1: return <Calendar size={18} className="text-blue-500" />;
      case 2: return <Handshake size={18} className="text-purple-500" />;
      case 3: return <GrowthIcon size={18} className="text-amber-400" />;
      default: return null;
    }
  };

  // Get color class based on agent
  const getGradientClass = (index: number) => {
    switch(index) {
      case 0: return "from-green-500/10 to-green-500/5"; // Giselle - Green
      case 1: return "from-blue-500/10 to-blue-500/5"; // Miles - Blue
      case 2: return "from-purple-500/10 to-purple-500/5"; // Devon - Purple
      case 3: return "from-amber-500/10 to-amber-500/5"; // Alma - Gold
      default: return "from-white/5 to-white/5";
    }
  };

  // Get accent color for border
  const getBorderAccentClass = (index: number) => {
    switch(index) {
      case 0: return "border-green-500/20"; // Giselle
      case 1: return "border-blue-500/20"; // Miles
      case 2: return "border-purple-500/20"; // Devon
      case 3: return "border-amber-500/20"; // Alma
      default: return "border-white/10";
    }
  };

  return (
    <section className="bg-nextgen-dark py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Team
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">
            Experience how our AI agents work together to grow your practice at every stage
            of the patient journey.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mx-auto max-w-4xl animate-fade-in"
        >
          {/* Agent Tabs (Horizontal Selector) */}
          <TabsList 
            className={`w-full mb-6 sm:mb-8 bg-transparent gap-1 p-1 ${
              isMobile 
                ? 'overflow-x-auto flex-nowrap justify-start scrollbar-none' 
                : 'justify-center'
            }`}
          >
            {patientJourney.map((stage, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className={`
                  flex-1 min-w-[120px] rounded-lg py-3 px-3 sm:px-4 data-[state=active]:bg-white/10 
                  data-[state=active]:shadow-glow border border-transparent 
                  data-[state=active]:border-white/20
                  transition-all duration-300
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${stage.gradientClass} bg-opacity-20`}>
                    <span className="font-bold text-white">{stage.number}</span>
                  </div>
                  <span className="font-medium text-white text-sm sm:text-base">{stage.agent.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Agent Content (Dynamic Content Block) */}
          {patientJourney.map((stage, index) => (
            <TabsContent 
              key={index} 
              value={index.toString()}
              className="animate-fade-in-up"
            >
              <div className={`glass-card rounded-xl p-5 md:p-6 bg-gradient-to-br ${getGradientClass(index)} border ${getBorderAccentClass(index)}`}>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {/* Left Column: Agent Profile */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 mb-2 sm:mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stage.gradientClass}`}>
                        <span className="font-bold text-white">{stage.number}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        {stage.name}
                        <span className="ml-1">{getStageIcon(index)}</span>
                      </h3>
                    </div>
                    
                    <AgentProfile agent={stage.agent} />
                  </div>
                  
                  {/* Right Column: Chat Preview */}
                  <div className="flex flex-col justify-center">
                    {isTyping && activeTab === index.toString() && (
                      <TypingIndicator agent={stage.agent.name} />
                    )}
                    
                    {showChat && activeTab === index.toString() && (
                      <ChatSimulation
                        agentName={stage.agent.name}
                        agentRole={stage.agent.title}
                        messages={stage.sampleChat}
                        onClose={() => {}}
                      />
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Final CTA Section */}
        <div className="py-10 sm:py-14 text-center">
          <div className="max-w-2xl mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <SparkleText className="mb-5">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Your AI Team is Ready. Are You?
              </h3>
            </SparkleText>
            
            <p className="text-lg text-white/70 mb-6">
              Discover how NextGen's AI transforms your practice growth journey.
            </p>
            
            <Button 
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-bold"
            >
              <Link to="/join">Book Your Free Strategy Call</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedAgentSection;
