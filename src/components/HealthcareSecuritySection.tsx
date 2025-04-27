
import React from 'react';
import { Shield, LockKeyhole, Lock, Server, FileCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
  "GoHighLevel", "Google Calendar", "Meta Ads", "Typeform", 
  "Slack", "Cherry", "Stripe", "Loom", "Podium", "Notion"
];

const HealthcareSecuritySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto px-4">
        {/* Top Badge */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-in">
            <Shield className="h-5 w-5 text-nextgen-purple" />
            <span className="text-white/70 text-sm font-medium">Trusted by Practices Nationwide</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Headers */}
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient">
              Built for Healthcare. Trusted by Practices.
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              NextGen is built on HIPAA-ready architecture with seamless integrations for real clinical use.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <p className="text-lg text-white/70">
                NextGen Practice Solutions was engineered for the unique demands of healthcare providers — not generic SaaS workflows.
                With HIPAA-compliant data protocols, SOC 2 Certification, and seamless integrations with platforms like Salesforce, Meta, and Google Ads, your practice runs smarter, safer, and faster.
              </p>

              {/* Integration Names Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {trustedPlatforms.map((platform, index) => (
                  <div 
                    key={platform}
                    className={cn(
                      "px-4 py-3 glass-card rounded-lg text-center",
                      "text-white/70 hover:text-white/90 transition-all duration-300",
                      "transform hover:scale-105"
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <span className="text-sm font-medium">{platform}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Security Cards */}
            <div className="grid gap-4">
              {securityCards.map((card, index) => (
                <div 
                  key={card.title}
                  className={cn(
                    "p-6 glass-card animate-fade-in flex items-start gap-4",
                    "transform transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="rounded-full p-2 bg-white/5">
                    <card.icon className="h-6 w-6 text-nextgen-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{card.title}</h4>
                    <p className="text-sm text-white/60">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '800ms' }}>
            <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90">
              <Link to="/integrations">
                Explore Integrations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareSecuritySection;
