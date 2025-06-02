
import React from 'react';
import { Shield, LockKeyhole, Lock, Server, FileCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from './animation/ScrollRevealWrapper';

const securityCards = [
  {
    title: "HIPAA Compliant",
    description: "Enterprise-grade security and privacy protocols",
    icon: Shield
  },
  {
    title: "SOC 2 Certified", 
    description: "Rigorous security controls and data protection",
    icon: LockKeyhole
  },
  {
    title: "End-to-End Encryption",
    description: "Patient data protected at every touchpoint", 
    icon: Lock
  },
  {
    title: "U.S. Secure Servers",
    description: "Data hosted exclusively on secure U.S. infrastructure",
    icon: Server
  },
  {
    title: "HITECH & ADA Compliant",
    description: "Built following latest healthcare guidelines",
    icon: FileCheck
  }
];

const trustedPlatforms = [
  "GoHighLevel", "Google Calendar", "Meta Ads", "Typeform", "Slack", 
  "Cherry", "Stripe", "Loom", "Podium", "Notion"
];

const HealthcareSecuritySection = () => {
  return (
    <section className="py-24 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Healthcare Security & Compliance
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Built with the highest security standards to protect patient data and ensure compliance.
            </p>
          </div>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {securityCards.map((card, index) => (
            <ScrollRevealWrapper 
              key={index} 
              animation="fade-up" 
              delay={0.1 * index}
              className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="rounded-full bg-nextgen-purple/20 p-4 mb-4 mx-auto w-fit">
                <card.icon className="h-6 w-6 text-nextgen-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
              <p className="text-white/70 text-sm">{card.description}</p>
            </ScrollRevealWrapper>
          ))}
        </div>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.8}>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6 text-white">Trusted Integrations</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {trustedPlatforms.map((platform, index) => (
                <span 
                  key={index}
                  className="glass-card px-4 py-2 text-white/80 text-sm"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default HealthcareSecuritySection;
