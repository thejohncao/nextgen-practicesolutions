
import React from 'react';
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';

const ToolsWeReplace = () => {
  const tools = [
    "Mailchimp", 
    "Weave", 
    "Calendly", 
    "Salesforce", 
    "Monday.com", 
    "Solutionreach", 
    "RevenueWell", 
    "Lighthouse 360"
  ];

  return (
    <section className="py-24 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Tools We Replace
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Stop paying for multiple platforms. NextGen consolidates your entire tech stack.
            </p>
          </div>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {tools.map((tool, index) => (
            <ScrollRevealWrapper 
              key={index} 
              animation="fade-up" 
              delay={0.1 * index}
              className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-white font-medium">{tool}</span>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsWeReplace;
