
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Shield, Check, Lock, Server, FileCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const JuvSecurityIntegrations = () => {
  const connectedServices = [{
    name: "Google Calendar",
    connected: true
  }, {
    name: "Slack",
    connected: true
  }, {
    name: "Notion",
    connected: true
  }, {
    name: "Zoom",
    connected: true
  }];

  const availableServices = [{
    name: "Meta Ads",
    connected: false
  }, {
    name: "Cherry",
    connected: false
  }, {
    name: "Stripe",
    connected: false
  }, {
    name: "Weave",
    connected: false
  }, {
    name: "NexHealth",
    connected: false
  }];

  const complianceFeatures = [{
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Built for safe handling of sensitive patient data and treatment photos."
  }, {
    icon: Check,
    title: "SOC 2 Certified",
    description: "Enterprise-level protections and access control across all locations."
  }, {
    icon: Lock,
    title: "End-to-End Encrypted",
    description: "Every message, image, and chart is protected at rest and in transit."
  }, {
    icon: Server,
    title: "U.S. Secure Servers",
    description: "No offshore storage. All data remains on U.S.-based secure servers."
  }, {
    icon: FileCheck,
    title: "HITECH & ADA Ready",
    description: "Accessible, inclusive, and future-proofed to meet modern patient needs."
  }];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Enterprise Security & Seamless Integrations
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Your practice data stays secure while connecting to the tools you already use
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Security Compliance */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Security & Compliance</h3>
            <div className="space-y-6">
              {complianceFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="glass-card border-nextgen-purple/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-nextgen-purple/20 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-nextgen-purple" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                          <p className="text-white/70">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Connected Services</h3>
            
            {/* Connected Services */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Currently Connected</h4>
              <div className="grid grid-cols-2 gap-3">
                {connectedServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-white text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Services */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Available Integrations</h4>
              <div className="grid grid-cols-2 gap-3">
                {availableServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <span className="text-white/70 text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild className="w-full bg-nextgen-purple hover:bg-nextgen-purple/80">
              <Link to="/integrations">
                View All Integrations
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuvSecurityIntegrations;
