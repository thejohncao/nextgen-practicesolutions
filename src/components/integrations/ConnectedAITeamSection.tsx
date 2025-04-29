
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { agents } from '@/data/agents';
import AgentOrb from '@/components/team/agent/AgentOrb';
import { getTooltipText } from '@/components/team/utils/getTooltipText';
import IntegrationIcons from '@/components/integrations/IntegrationIcons';
import { motion } from 'framer-motion';

const ConnectedAITeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('connected-team');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Reorder agents to match patient journey
  const orderedAgents = [...agents].sort((a, b) => {
    const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
    return order[a.name] - order[b.name];
  });

  // Define positions for each agent in the diamond layout
  const positions = [
    { top: '10%', left: '65%' }, // Giselle - top right
    { top: '65%', left: '75%' }, // Miles - bottom right
    { top: '65%', left: '25%' }, // Devon - bottom left
    { top: '10%', left: '35%' }, // Alma - top left 
  ];

  return (
    <section id="connected-team" className="py-20 bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
            Your AI Team, Connected to Everything You Use
          </h2>
          <p className="text-xl text-white/70">
            NextGen integrates with your favorite tools — powered by a full AI executive team that doesn't just sync… they act. 
            From scheduling and growth to follow-ups and training, every integration fuels smarter execution.
          </p>
        </div>

        <div className={`relative h-[600px] mx-auto max-w-5xl transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Background effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
          
          {/* SVG connecting lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: isVisible ? 0.3 : 0 }}>
            <motion.line 
              x1="35%" y1="15%" x2="65%" y2="15%" 
              stroke="white" strokeWidth="1" strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
              transition={{ delay: 0.2, duration: 1.5 }}
            />
            <motion.line 
              x1="75%" y1="25%" x2="75%" y2="65%" 
              stroke="white" strokeWidth="1" strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
              transition={{ delay: 0.4, duration: 1.5 }}
            />
            <motion.line 
              x1="65%" y1="75%" x2="35%" y2="75%" 
              stroke="white" strokeWidth="1" strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
              transition={{ delay: 0.6, duration: 1.5 }}
            />
            <motion.line 
              x1="25%" y1="65%" x2="25%" y2="25%" 
              stroke="white" strokeWidth="1" strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
              transition={{ delay: 0.8, duration: 1.5 }}
            />
            
            {/* Diagonal lines connecting the diamond */}
            <motion.line 
              x1="35%" y1="15%" x2="75%" y2="65%" 
              stroke="white" strokeWidth="1" strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
              transition={{ delay: 1.0, duration: 1.5 }}
            />
            <motion.line 
              x1="65%" y1="15%" x2="25%" y2="65%" 
              stroke="white" strokeWidth="1" strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
              transition={{ delay: 1.2, duration: 1.5 }}
            />
          </svg>

          {/* Central glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-nextgen-purple/20 blur-xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: isVisible ? 0.6 : 0,
              scale: isVisible ? 1 : 0.5
            }}
            transition={{ delay: 1.4, duration: 1 }}
          />

          {/* Agent Orbs */}
          {orderedAgents.map((agent, index) => (
            <motion.div
              key={agent.name}
              className="absolute"
              style={{ 
                top: positions[index].top,
                left: positions[index].left,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20
              }}
              transition={{ 
                delay: 0.3 * index,
                duration: 0.8,
                type: 'spring',
                damping: 12
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: index * 0.5,
                }}
              >
                <AgentOrb
                  name={agent.name}
                  role={agent.title}
                  color={agent.color}
                  tooltipText={getTooltipText(agent.name)}
                  displayMode="fullName"
                  showLabel={true}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Integration Icon Clusters */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <IntegrationIcons />
            </motion.div>
          </div>
          
          <div className="absolute bottom-1/4 left-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <IntegrationIcons />
            </motion.div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 2.0, duration: 0.8 }}
            >
              <IntegrationIcons />
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <Button 
            asChild
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
          >
            <Link to="/integrations">
              Explore All Integrations <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConnectedAITeamSection;
