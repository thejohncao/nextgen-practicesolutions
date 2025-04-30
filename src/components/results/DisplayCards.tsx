
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';

export interface DisplayCardItem {
  title: string;
  subtitle: string;
  description: string;
  agentName: string;
  agentRole: string;
  agentColor: string;
}

export interface DisplayCardsProps {
  cards: DisplayCardItem[];
  title?: string;
  description?: string;
  className?: string;
  cardClassName?: string;
}

const DisplayCards: React.FC<DisplayCardsProps> = ({
  cards,
  title,
  description,
  className,
  cardClassName
}) => {
  return (
    <section className={cn("py-20", className)}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gradient">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((item, idx) => (
            <ScrollRevealWrapper
              key={idx}
              animation="fade-up"
              delay={idx * 0.1}
            >
              <motion.div 
                className={cn(
                  "relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6",
                  "hover:shadow-lg transition-all duration-300 group",
                  cardClassName
                )}
                whileHover={{ 
                  y: -5, 
                  boxShadow: `0 10px 30px -10px rgba(var(--${item.agentColor || 'nextgen-purple'}-color-rgb), 0.3)` 
                }}
              >
                {/* Agent indicator in corner */}
                {item.agentName && (
                  <div className={`absolute top-4 right-4 h-6 w-6 rounded-full bg-${item.agentColor || 'purple'}-500/20 flex items-center justify-center`}>
                    <span className={`text-${item.agentColor || 'purple'}-500 text-xs font-medium`}>
                      {item.agentName[0]}
                    </span>
                  </div>
                )}
                
                {/* Stat */}
                <h3 className={`text-3xl md:text-4xl font-bold mb-2 text-${item.agentColor || 'white'} group-hover:text-gradient-${item.agentColor || 'primary'}`}>
                  {item.title}
                </h3>
                
                {/* Subtitle */}
                <p className={`font-medium text-white mb-3`}>
                  {item.subtitle}
                </p>
                
                {/* Description */}
                <p className="text-white/70">
                  {item.description}
                </p>
                
                {/* Card glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500 blur-xl">
                  <div 
                    className={`absolute inset-0 bg-${item.agentColor || 'nextgen-purple'}-500/10 rounded-xl`}
                  ></div>
                </div>
              </motion.div>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DisplayCards;
