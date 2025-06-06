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
  return;
};
export default JuvSecurityIntegrations;