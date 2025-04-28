
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AgentAvatar from '../AgentAvatar';
import { Sparkle } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

// Define the structure for result data
interface AgentResult {
  agent: string;
  role: string;
  color: string;
  results: {
    title: string;
    description: string;
  }[];
}

// Result data organized by agent
const agentResults: AgentResult[] = [
  {
    agent: "Giselle",
    role: "Growth Specialist",
    color: "green",
    results: [
      {
        title: "+124% Increase in New Patient Leads",
        description: "Giselle's AI Growth Engine nurtured inbound leads and booked more consultations without adding marketing budget."
      },
      {
        title: "3x Faster Lead Follow-Up",
        description: "Automated workflows replied to patient inquiries within minutes, capturing more opportunities before competitors could."
      }
    ]
  },
  {
    agent: "Miles",
    role: "Front Office Concierge",
    color: "blue",
    results: [
      {
        title: "95% Reduction in No-Show Appointments",
        description: "With personalized AI reminders, practices saw no-shows drop drastically — protecting their daily production schedule."
      },
      {
        title: "48% Increase in Same-Week Scheduling",
        description: "Miles optimized calendar availability, filling last-minute openings and keeping operatories booked consistently."
      }
    ]
  },
  {
    agent: "Devon",
    role: "Treatment Coordinator",
    color: "purple",
    results: [
      {
        title: "72% Case Acceptance Rate Improvement",
        description: "Devon's patient follow-up and education flows helped patients feel confident and move forward with high-value treatment plans."
      },
      {
        title: "$120K Average Annual Revenue Growth",
        description: "Practices leveraging Devon's AI systems converted larger cases and maximized patient lifetime value."
      }
    ]
  },
  {
    agent: "Alma",
    role: "Practice Trainer", 
    color: "gold",
    results: [
      {
        title: "80% Faster Team Onboarding",
        description: "Alma created customized AI training flows for new hires — building confident, revenue-generating teams in record time."
      },
      {
        title: "10+ Hours Saved Weekly on Staff Management",
        description: "Automated SOPs and feedback loops freed leadership teams to focus on growth, not micromanagement."
      }
    ]
  }
];

// Get background color class for cards based on agent
const getAgentCardColor = (color: string) => {
  switch (color) {
    case 'blue': return 'bg-blue-50/5';
    case 'green': return 'bg-green-50/5';
    case 'purple': return 'bg-purple-50/5';
    case 'gold': return 'bg-amber-50/5';
    default: return 'bg-white/5';
  }
};

// Get border color class for cards based on agent
const getAgentBorderColor = (color: string) => {
  switch (color) {
    case 'blue': return 'border-blue-200/10';
    case 'green': return 'border-green-200/10';
    case 'purple': return 'border-purple-200/10'; 
    case 'gold': return 'border-amber-200/10';
    default: return 'border-white/10';
  }
};

// Flatten the agent results for carousel display
const flattenedResults = agentResults.flatMap((agentData) => 
  agentData.results.map((result) => ({
    agent: agentData.agent,
    role: agentData.role,
    color: agentData.color,
    title: result.title,
    description: result.description
  }))
);

// Duplicate cards to ensure seamless looping
const duplicatedResults = [...flattenedResults, ...flattenedResults];

const AgentResultsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: true,
    },
    [
      AutoPlay({ 
        playOnInit: true, 
        delay: 5000, 
        stopOnInteraction: true,
        stopOnMouseEnter: true, 
      })
    ]
  );
  
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (emblaApi) emblaApi.plugins().autoplay?.stop();
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    if (emblaApi) emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-nextgen-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in mb-4">
            Real Results from Your AI Team
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in" 
             style={{ animationDelay: '200ms' }}>
            While you focus on patient care, your team delivers measurable wins across your practice.
          </p>
        </div>

        <div 
          className="relative" 
          onMouseEnter={!isMobile ? handleMouseEnter : undefined}
          onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        >
          {/* Edge fading effect containers */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-nextgen-dark to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-nextgen-dark to-transparent pointer-events-none"></div>
          
          {/* Carousel container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 scrollbar-none">
              {duplicatedResults.map((result, index) => (
                <div 
                  key={`${result.agent}-${result.title}-${index}`}
                  className={`flex-none ${isMobile ? 'w-full sm:w-[85%]' : 'w-[350px]'}`}
                >
                  <Card 
                    className={`
                      h-full transition-all duration-300 hover:scale-[1.02] 
                      ${getAgentCardColor(result.color)} 
                      ${getAgentBorderColor(result.color)}
                      overflow-hidden relative
                    `}
                  >
                    <CardContent className="p-6">
                      {/* Agent info row */}
                      <div className="flex items-center mb-4">
                        <AgentAvatar 
                          name={result.agent} 
                          role={result.role}
                          color={result.color}
                          size="sm"
                        />
                        <div className="ml-3">
                          <h4 className="font-semibold text-white">{result.agent}</h4>
                          <p className="text-sm text-white/70">{result.role}</p>
                        </div>
                      </div>
                      
                      {/* Result content */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center text-white">
                          <Sparkle className="w-4 h-4 mr-2 text-white/60" />
                          {result.title}
                        </h3>
                        <p className="text-white/80">{result.description}</p>
                      </div>

                      {/* Subtle decoration */}
                      <div className={`absolute top-0 right-0 w-24 h-24 opacity-5 rounded-full blur-xl bg-${result.color}-500 -translate-y-1/2 translate-x-1/2`} />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Pause indicator for desktop */}
          {!isMobile && isPaused && (
            <div className="absolute top-4 right-4 bg-white/10 text-white text-xs px-2 py-1 rounded-full z-20 backdrop-blur-sm">
              Paused
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AgentResultsSection;
