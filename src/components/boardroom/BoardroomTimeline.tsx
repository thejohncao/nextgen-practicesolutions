
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AgentMessage from './AgentMessage';
import PracticeOwnerMessage from './PracticeOwnerMessage';
import { agents } from '@/data/agents';

// Define message structure
interface TimelineMessage {
  sender: 'owner' | 'agent';
  agentName?: string;
  role?: string;
  content: string;
  delay: number;
}

const BoardroomTimeline: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true
  });
  
  const [visibleMessages, setVisibleMessages] = useState<TimelineMessage[]>([]);
  
  // Define the conversation timeline
  const conversationTimeline: TimelineMessage[] = [
    {
      sender: 'owner',
      content: 'I need to grow my practice ASAP. What can you do?',
      delay: 0
    },
    {
      sender: 'agent',
      agentName: 'miles',
      role: 'Practice Management',
      content: 'Optimizing schedule: 15 new consult slots created. Front desk team notified.',
      delay: 1
    },
    {
      sender: 'agent',
      agentName: 'giselle',
      role: 'Practice Growth',
      content: 'Launching targeted campaign. Facebook and Google Ads going live in 30 minutes.',
      delay: 2
    },
    {
      sender: 'agent',
      agentName: 'devon',
      role: 'Practice Development',
      content: 'Reactivating past veneer leads. 28 high-value prospects identified.',
      delay: 3
    },
    {
      sender: 'agent',
      agentName: 'alma',
      role: 'Practice Academy',
      content: 'Team training scheduled: New veneer consultation script ready for tomorrow.',
      delay: 4
    },
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // Reveal messages with a delay
      const timers: ReturnType<typeof setTimeout>[] = [];
      
      conversationTimeline.forEach((message, index) => {
        const timer = setTimeout(() => {
          setVisibleMessages(prev => [...prev, message]);
        }, message.delay * 800); // 800ms between messages
        
        timers.push(timer);
      });
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [inView, controls]);

  return (
    <section 
      id="boardroom-section" 
      ref={ref} 
      className="py-16 md:py-24 bg-nextgen-dark overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2 
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient"
          >
            Built to Run the Full Patient Journey
          </motion.h2>
          
          <motion.p
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.6, delay: 0.2 } 
              }
            }}
            className="text-lg text-white/70"
          >
            One decision. Four agents. Everything in motion — powered by AI.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Messages Timeline */}
            <div className="space-y-4">
              <AnimatePresence>
                {visibleMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="message-container"
                  >
                    {message.sender === 'owner' ? (
                      <PracticeOwnerMessage />
                    ) : (
                      <AgentMessage 
                        agent={message.agentName || ''}
                        role={message.role || ''}
                        message={message.content}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Timeline visualization */}
            <div className="absolute top-0 left-8 md:left-12 h-full w-0.5 bg-white/10">
              {visibleMessages.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.8, duration: 0.4 }}
                  className="absolute w-3 h-3 rounded-full bg-white/30 -left-[5px]"
                  style={{ top: `${(index * 25) + (index * 8)}%` }}
                />
              ))}
            </div>
          </div>
          
          {/* Agent Phases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5, delay: 0.2 + (index * 0.2) } 
                  }
                }}
                className={`
                  p-5 rounded-xl backdrop-blur-sm border
                  ${agent.color === 'blue' ? 'bg-blue-900/10 border-blue-500/20' : ''}
                  ${agent.color === 'green' ? 'bg-green-900/10 border-green-500/20' : ''}
                  ${agent.color === 'purple' ? 'bg-purple-900/10 border-purple-500/20' : ''}
                  ${agent.color === 'gold' ? 'bg-amber-900/10 border-amber-500/20' : ''}
                `}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${agent.color === 'blue' ? 'bg-blue-500' : ''}
                    ${agent.color === 'green' ? 'bg-green-500' : ''}
                    ${agent.color === 'purple' ? 'bg-purple-500' : ''}
                    ${agent.color === 'gold' ? 'bg-amber-500' : ''}
                  `}>
                    <span className="text-lg font-bold text-white">{agent.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{agent.name}</h3>
                    <p className="text-xs text-white/70">{agent.title}</p>
                  </div>
                </div>
                <p className="text-sm text-white/80">{agent.tagline}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardroomTimeline;
