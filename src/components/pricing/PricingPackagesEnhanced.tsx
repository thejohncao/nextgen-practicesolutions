
import React, { useState, useEffect, useRef } from 'react';
import EnhancedPricingCard from './EnhancedPricingCard';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import PricingUpgradeTooltip from './PricingUpgradeTooltip';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const packages = [
  {
    name: "Spark",
    stage: "Foundation Package",
    bestFor: "Best for Startups or Small Practices",
    tagline: "Built for new practices or lean teams ready to automate operations and patient communication.",
    features: [
      "Launch your branded NextGen App with streamlined scheduling, recall, and patient tracking",
      "Activate your Practice Management AI Agent (Miles) to organize your front office and reduce chaos",
      "Automate patient scheduling, recalls, and reactivations with proven workflows built in",
      "Empower your team with ready-to-use front office SOP templates",
      "Get live setup support with a 1:1 onboarding session tailored to your practice"
    ],
    agents: [
      {
        name: "Miles",
        role: "Practice Management",
        color: "blue"
      }
    ],
    ctaText: "Talk to Miles",
    nextTier: "Ignite"
  },
  {
    name: "Ignite",
    stage: "Growth Package",
    bestFor: "Best for Growing Practices",
    tagline: "For practices ready to attract new patients, grow production, and expand faster.",
    features: [
      "Unlock advanced patient pipelines and automations inside your branded NextGen App",
      "Deploy high-converting Patient Acquisition, Nurturing, and Membership Growth Campaigns",
      "Launch smart marketing campaigns with Giselle leading your growth strategies",
      "Strengthen your team with SOPs and onboarding templates designed to drive performance",
      "Accelerate your results with a 1:1 Strategic Success Planning Session"
    ],
    agents: [
      {
        name: "Giselle",
        role: "Marketing",
        color: "green"
      },
      {
        name: "Miles",
        role: "Practice Management",
        color: "blue"
      }
    ],
    ctaText: "Talk to Miles",
    isPopular: true,
    nextTier: "Blaze"
  },
  {
    name: "Blaze",
    stage: "Development Package",
    bestFor: "Best for Scaling Practices",
    tagline: "For established practices ready to scale aggressively and maximize profitability.",
    features: [
      "Custom-build patient acquisition and retention campaigns for your market",
      "Track performance with our Executive KPI Dashboard and reporting suite",
      "Boost high-value case conversions with Devon's treatment acceptance system",
      "Maximize team performance with advanced training modules",
      "(Optional) Add a Dedicated Strategic Success Manager"
    ],
    agents: [
      {
        name: "Devon",
        role: "Sales",
        color: "purple"
      },
      {
        name: "Giselle",
        role: "Marketing",
        color: "green"
      },
      {
        name: "Miles",
        role: "Practice Management",
        color: "blue"
      }
    ],
    ctaText: "Talk to Miles",
    nextTier: "Nova"
  },
  {
    name: "Nova",
    stage: "Mastery Package",
    bestFor: "Best for Large Practices",
    tagline: "Your complete AI-powered operating system for multi-location success.",
    features: [
      "Smart Scheduling & Intelligent Recall System",
      "Growth Automations & Paid Ad Campaign Management",
      "Treatment Close Follow-Ups & Financing Integrations",
      "New Hire Onboarding & Training Automation",
      "Complete SOP Library & Staff Communication Playbooks",
      "Continuing Education Tracking & Reminders"
    ],
    agents: [
      {
        name: "Alma",
        role: "Academy Director",
        color: "gold"
      },
      {
        name: "Devon",
        role: "Sales",
        color: "purple"
      },
      {
        name: "Giselle",
        role: "Marketing",
        color: "green"
      },
      {
        name: "Miles",
        role: "Practice Management",
        color: "blue"
      }
    ],
    ctaText: "Talk to Miles",
    isMastery: true
  }
];

// Upgrade messaging options
const upgradeMessages = {
  "Spark": "Ignite Your Growth",
  "Ignite": "Your Future Growth Starts Today",
  "Blaze": "Unlock Full Practice Mastery"
};

const PricingPackagesEnhanced = () => {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipActive, setTooltipActive] = useState(false);
  const [highlightedFeature, setHighlightedFeature] = useState<string | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const tooltipIdleTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Clear tooltips on package change
  useEffect(() => {
    if (hoveredPackage) {
      // Find package data
      const packageData = packages.find(pkg => pkg.name === hoveredPackage);
      if (packageData && packageData.nextTier) {
        // Set tooltip message based on current package
        setTooltipMessage(upgradeMessages[hoveredPackage as keyof typeof upgradeMessages] || "Upgrade for more capabilities");
        
        // Show tooltip after a short delay
        if (tooltipTimeout.current) {
          clearTimeout(tooltipTimeout.current);
        }
        tooltipTimeout.current = setTimeout(() => {
          setTooltipVisible(true);
        }, 300);
        
        // Set idle animation after 3 seconds
        if (tooltipIdleTimeout.current) {
          clearTimeout(tooltipIdleTimeout.current);
        }
        tooltipIdleTimeout.current = setTimeout(() => {
          setTooltipActive(true);
        }, 3000);
      }
    } else {
      // Clear tooltip when not hovering
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
      if (tooltipIdleTimeout.current) {
        clearTimeout(tooltipIdleTimeout.current);
      }
      setTooltipVisible(false);
      setTooltipActive(false);
    }
    
    // Cleanup
    return () => {
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
      if (tooltipIdleTimeout.current) {
        clearTimeout(tooltipIdleTimeout.current);
      }
    };
  }, [hoveredPackage]);
  
  const handlePackageHover = (packageName: string, event: React.MouseEvent) => {
    setHoveredPackage(packageName);
    
    // Calculate position for tooltip (to right of card)
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipPosition({
      x: rect.right + 10,
      y: rect.top + rect.height / 2
    });
  };
  
  const handlePackageLeave = () => {
    setHoveredPackage(null);
  };
  
  const handleFeatureHover = (feature: string) => {
    setHighlightedFeature(feature);
  };
  
  const handleFeatureLeave = () => {
    setHighlightedFeature(null);
  };

  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) chatButton.click();
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-6 lg:space-y-0">
      {/* Heading Section */}
      <ScrollRevealWrapper animation="fade-up" className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
          Choose Your Growth Stage
        </h2>
        <p className="text-xl md:text-2xl font-medium text-white/80 mb-8 max-w-3xl mx-auto">
          NextGen grows with you — unlocking powerful AI teammates at every stage of your practice's journey.
          Start where you are. Scale into who you're meant to become.
        </p>
      </ScrollRevealWrapper>
      
      {/* Cards Section with enhanced interactive elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative">
        {packages.map((pkg, index) => {
          // Determine if this package should show connections to the next tier
          const isHovered = pkg.name === hoveredPackage;
          const hasNextTier = pkg.nextTier !== undefined;
          
          return (
            <ScrollRevealWrapper 
              key={index} 
              animation="fade-up"
              delay={0.1 * index}
              className="flex flex-col h-full relative"
            >
              <div
                onMouseEnter={(e) => handlePackageHover(pkg.name, e)}
                onMouseLeave={handlePackageLeave}
                className="h-full relative z-10"
              >
                <EnhancedPricingCard 
                  {...pkg}
                  onOpen={handleChatOpen}
                  onFeatureHover={handleFeatureHover}
                  onFeatureLeave={handleFeatureLeave}
                  highlightedFeature={highlightedFeature}
                />
              </div>
              
              {/* Connection arrow to next tier */}
              {hasNextTier && (
                <motion.div 
                  className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-nextgen-purple/90 text-white p-1 rounded-full">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </motion.div>
              )}
              
              {/* Enhanced glow effect when hovered */}
              {isHovered && hasNextTier && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-xl opacity-0 bg-nextgen-purple/5 blur-xl"
                  animate={{ opacity: [0, 0.8, 0.4] }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut" 
                  }}
                />
              )}
            </ScrollRevealWrapper>
          );
        })}
      </div>
      
      {/* Floating upgrade tooltip */}
      <PricingUpgradeTooltip
        visible={tooltipVisible}
        position={tooltipPosition}
        message={tooltipMessage}
        active={tooltipActive}
        packageName={hoveredPackage || ''}
      />
      
      {/* Popular package initial highlight */}
      <motion.div 
        className="absolute z-0 rounded-xl bg-nextgen-purple/10 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 3,
          delay: 1,
          times: [0, 0.4, 1]
        }}
        style={{
          width: '300px',
          height: '400px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

export default PricingPackagesEnhanced;
