
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Shield, Check, Lock, Server, FileCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const JuvSecurityIntegrations = () => {
  const connectedServices = [
    { name: "Google Calendar", connected: true },
    { name: "Slack", connected: true },
    { name: "Notion", connected: true },
    { name: "Zoom", connected: true }
  ];

  const availableServices = [
    { name: "Meta Ads", connected: false },
    { name: "Cherry", connected: false },
    { name: "Stripe", connected: false },
    { name: "Weave", connected: false },
    { name: "NexHealth", connected: false }
  ];

  const complianceFeatures = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Built for safe handling of sensitive patient data and treatment photos."
    },
    {
      icon: Check,
      title: "SOC 2 Certified", 
      description: "Enterprise-level protections and access control across all locations."
    },
    {
      icon: Lock,
      title: "End-to-End Encrypted",
      description: "Every message, image, and chart is protected at rest and in transit."
    },
    {
      icon: Server,
      title: "U.S. Secure Servers",
      description: "No offshore storage. All data remains on U.S.-based secure servers."
    },
    {
      icon: FileCheck,
      title: "HITECH & ADA Ready",
      description: "Accessible, inclusive, and future-proofed to meet modern patient needs."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🔒 Secure & Connected
          </h2>
          <p className="text-xl text-white/70 mb-2">
            Built for Medspas. Compliant for Healthcare.
          </p>
          <p className="text-lg text-white/60 max-w-4xl mx-auto">
            NextGen OS powers JUV with enterprise-grade security, HIPAA-ready infrastructure, and seamless integrations.
            Whether you're booking appointments, running ads, or storing patient photos — every workflow is protected and connected.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Card - Connected Services */}
          <Card className="glass-card border-nextgen-purple/20 bg-black/20 backdrop-blur-xl overflow-hidden group hover:border-nextgen-purple/40 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                📲 Connected Services
              </h3>
              
              {/* Phone Mockup */}
              <div className="relative flex justify-center mb-6">
                <div className="relative w-64 h-[480px] rounded-[32px] bg-black border-[6px] border-nextgen-dark shadow-2xl">
                  {/* Inner Screen */}
                  <div className="absolute inset-0 rounded-[26px] overflow-hidden bg-gradient-to-b from-gray-900 to-nextgen-dark">
                    <div className="w-full h-full p-3 flex flex-col">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-3 py-2">
                        <div className="text-xs text-white/80">9:41</div>
                        <div className="w-16 h-5 bg-black rounded-full"></div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-white/80"></div>
                          <div className="w-2 h-2 rounded-full bg-white/80"></div>
                          <div className="w-2 h-2 rounded-full bg-white/80"></div>
                        </div>
                      </div>
                      
                      {/* App Header */}
                      <div className="px-3 py-2 flex justify-between items-center">
                        <div className="text-white text-sm font-bold">NextGen</div>
                        <div className="text-nextgen-purple text-xs">Integrations</div>
                      </div>
                      
                      {/* Connected Services */}
                      <div className="px-3 py-2">
                        <div className="text-white/70 text-xs mb-2">CONNECTED</div>
                        <div className="space-y-2">
                          {connectedServices.map((service, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white/10 p-2 rounded-lg">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-nextgen-purple/20 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-nextgen-purple"></div>
                                </div>
                                <span className="text-xs text-white/80">{service.name}</span>
                              </div>
                              <Badge variant="outline" className="text-[9px] bg-nextgen-purple/20 text-nextgen-purple border-nextgen-purple/30 px-1">
                                <Check className="h-2 w-2 mr-1" /> Live
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Available Services */}
                      <div className="px-3 py-2 mt-2">
                        <div className="text-white/70 text-xs mb-2">AVAILABLE</div>
                        <div className="grid grid-cols-2 gap-1">
                          {availableServices.slice(0, 4).map((service, idx) => (
                            <div key={idx} className="flex items-center gap-1 bg-white/5 p-1.5 rounded-lg">
                              <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                              </div>
                              <span className="text-xs text-white/60 truncate">{service.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-[12px]"></div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/50 rounded-full"></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-3 bg-nextgen-purple/10 rounded-[40px] filter blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Card - Compliance Stack */}
          <Card className="glass-card border-nextgen-purple/20 bg-black/20 backdrop-blur-xl overflow-hidden group hover:border-nextgen-purple/40 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                ✅ Compliance Stack
              </h3>
              
              <div className="space-y-4">
                {complianceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-nextgen-purple/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-nextgen-purple/30 transition-colors duration-200">
                      <feature.icon className="h-5 w-5 text-nextgen-purple" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Button asChild variant="outline" size="lg" className="w-full bg-white/5 border-nextgen-purple/30 text-white hover:bg-nextgen-purple/20 hover:border-nextgen-purple/50 transition-all duration-200">
                  <Link to="/integrations" className="flex items-center gap-2">
                    Explore All Integrations
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JuvSecurityIntegrations;
