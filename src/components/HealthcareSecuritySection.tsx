
import React from 'react';
import { Shield, LockKeyhole, Lock, Server, FileCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SparkleText from './effects/SparkleText';

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
    <section className="py-24 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-nextgen-purple/8 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-nextgen-blue/8 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]"
        style={{
          opacity: 0.25,
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 110%)'
        }}
      ></div>

      {/* Top Badge */}
      <div className="flex items-center justify-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-in relative">
          <Shield className="h-5 w-5 text-nextgen-purple" />
          <span className="text-white/70 text-sm font-medium">Trusted by Practices Nationwide</span>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 -z-10 bg-nextgen-purple/10 blur-xl rounded-full opacity-50"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Headers */}
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <SparkleText>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient">
                Built for Healthcare. Trusted by Practices.
              </h2>
            </SparkleText>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              NextGen is built on HIPAA-ready architecture with seamless integrations for real clinical use.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="glass-card p-8 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:shadow-lg">
                <p className="text-lg text-white/70">
                  NextGen Practice Solutions was engineered for the unique demands of healthcare providers — not generic SaaS workflows.
                  With HIPAA-compliant data protocols, SOC 2 Certification, and seamless integrations with platforms like Salesforce, Meta, and Google Ads, your practice runs smarter, safer, and faster.
                </p>

                {/* Integration Names Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                  {trustedPlatforms.map((platform, index) => (
                    <div 
                      key={platform}
                      className={cn(
                        "px-4 py-3 glass-card rounded-lg text-center",
                        "text-white/70 hover:text-white/90 transition-all duration-300",
                        "transform hover:scale-105 backdrop-blur-md border border-white/10"
                      )}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <span className="text-sm font-medium">{platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Security Cards */}
            <div className="space-y-4">
              {securityCards.map((card, index) => (
                <div 
                  key={card.title}
                  className={cn(
                    "p-6 glass-card animate-fade-in flex items-start gap-4",
                    "transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                    "backdrop-blur-lg border border-white/10 hover:bg-white/5 group"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="rounded-xl p-3 bg-nextgen-purple/20 relative group-hover:scale-110 transition-transform duration-300">
                    <card.icon className="h-6 w-6 text-nextgen-purple" />
                    <div className="absolute inset-0 bg-nextgen-purple/20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
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
            <Button 
              asChild 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 shadow-lg hover:shadow-nextgen-purple/25 hover:scale-[1.02] transition-all duration-300"
            >
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
