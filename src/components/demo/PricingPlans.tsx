import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RainbowButton from '@/components/ui/rainbow-button';
import { Link } from 'react-router-dom';
const PricingPlans = () => {
  const plans = [{
    name: "Spark",
    agents: "Alma (Academy Only)",
    tcAccess: "LMS Only",
    support: "Email",
    idealFor: "Solo Docs",
    features: ["Academy access", "Email support", "Basic training materials", "Community access"],
    cta: "Get Started",
    popular: false
  }, {
    name: "Ignite",
    agents: "+ Miles",
    tcAccess: "+ Job Placement",
    support: "Priority Chat",
    idealFor: "Growing Teams",
    features: ["Everything in Spark", "Miles AI assistant", "Job placement network", "Priority chat support", "Advanced training"],
    cta: "Get Started",
    popular: true
  }, {
    name: "Blaze",
    agents: "All Agents",
    tcAccess: "+ Real-Time AI Integration",
    support: "Dedicated Success Lead",
    idealFor: "DSOs",
    features: ["Everything in Ignite", "All AI agents", "Real-time integrations", "Dedicated success manager", "Custom implementation"],
    cta: "Book a Demo",
    popular: false
  }];
  return;
};
export default PricingPlans;