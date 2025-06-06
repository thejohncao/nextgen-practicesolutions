
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
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🔒 Enterprise Security & Integrations
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Built with healthcare-grade security and seamless integrations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Connected Services */}
          <Card className="glass-card border-green-500/20 bg-green-50/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                Connected Services
              </h3>
              <div className="space-y-3">
                {connectedServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white/80">{service.name}</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Connected
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Services */}
          <Card className="glass-card border-blue-500/20 bg-blue-50/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-blue-400" />
                Available Integrations
              </h3>
              <div className="space-y-3">
                {availableServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white/80">{service.name}</span>
                    <Badge variant="outline" className="border-white/30 text-white/60">
                      Available
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {complianceFeatures.map((feature, index) => (
            <Card key={index} className="glass-card border-nextgen-purple/20 bg-black/20 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-nextgen-purple/20 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-nextgen-purple" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JuvSecurityIntegrations;
