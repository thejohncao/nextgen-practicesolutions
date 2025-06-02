import React from 'react';
import { Shield, LockKeyhole, Lock, Server, FileCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
const securityCards = [{
  title: "HIPAA Compliant",
  description: "Enterprise-grade security and privacy protocols",
  icon: Shield
}, {
  title: "SOC 2 Certified",
  description: "Rigorous security controls and data protection",
  icon: LockKeyhole
}, {
  title: "End-to-End Encryption",
  description: "Patient data protected at every touchpoint",
  icon: Lock
}, {
  title: "U.S. Secure Servers",
  description: "Data hosted exclusively on secure U.S. infrastructure",
  icon: Server
}, {
  title: "HITECH & ADA Compliant",
  description: "Built following latest healthcare guidelines",
  icon: FileCheck
}];
const trustedPlatforms = ["GoHighLevel", "Google Calendar", "Meta Ads", "Typeform", "Slack", "Cherry", "Stripe", "Loom", "Podium", "Notion"];
const HealthcareSecuritySection = () => {
  return;
};
export default HealthcareSecuritySection;