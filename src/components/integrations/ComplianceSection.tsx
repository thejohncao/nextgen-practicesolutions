
import React from 'react';
import { Shield, Check, Lock, Server, FileCheck } from "lucide-react";
import EnhancedSecurityCard from './EnhancedSecurityCard';

const securityBadges = [
  {
    title: "HIPAA Compliant",
    description: "Enterprise-grade security and privacy protocols",
    icon: Shield
  },
  {
    title: "SOC 2 Certified",
    description: "Rigorous security controls and data protection",
    icon: Check
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

interface ComplianceSectionProps {
  complianceChecklist: string[];
}

const ComplianceSection = ({ complianceChecklist }: ComplianceSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-4">
        {securityBadges.map((badge, index) => (
          <EnhancedSecurityCard
            key={badge.title}
            title={badge.title}
            description={badge.description}
            icon={badge.icon}
            className="staggered-card"
          />
        ))}
      </div>
    </div>
  );
};

export default ComplianceSection;
