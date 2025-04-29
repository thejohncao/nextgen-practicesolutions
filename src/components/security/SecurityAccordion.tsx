
import React from 'react';
import { Shield, Check, Lock, Server, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the security item type
type SecurityItem = {
  title: string;
  description: string;
  icon: React.ElementType;
}

// Security items data
const securityItems: SecurityItem[] = [
  {
    title: "HIPAA Compliant",
    description: "Enterprise-grade security and privacy protocols to protect patient health information.",
    icon: Shield
  },
  {
    title: "SOC 2 Certified",
    description: "Rigorous controls for data integrity, security, and operational transparency.",
    icon: Check
  },
  {
    title: "End-to-End Encryption",
    description: "Sensitive data is encrypted from entry to storage to protect every touchpoint in your practice.",
    icon: Lock
  },
  {
    title: "U.S. Secure Servers",
    description: "All data is hosted on secure U.S. infrastructure, never offshore.",
    icon: Server
  },
  {
    title: "HITECH & ADA Compliant",
    description: "Designed to meet healthcare accessibility and digital compliance standards under HITECH and ADA.",
    icon: FileCheck
  }
];

const SecurityAccordion = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Enterprise-Grade Security, Built for Healthcare
        </h2>
        <p className="text-white/70">
          HIPAA-ready. SOC 2 certified. End-to-end encrypted. Built for the compliance standards your practice requires.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {securityItems.map((item, index) => (
          <AccordionItem 
            key={item.title} 
            value={`item-${index}`}
            className="border-none glass-card bg-white/5 overflow-hidden rounded-xl"
          >
            <AccordionTrigger 
              className="p-4 hover:no-underline group"
              style={{ color: 'white' }}
            >
              <div className="flex items-center text-left">
                <div className="rounded-full p-2 bg-nextgen-purple/20 mr-3">
                  <item.icon className="h-5 w-5 text-nextgen-purple" />
                </div>
                <span className="text-lg font-medium text-white group-hover:text-nextgen-purple transition-colors">
                  {item.title}
                </span>
              </div>
              {/* Removed duplicate ChevronDown icon here */}
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 pl-16">
              <p className="text-white/70">{item.description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SecurityAccordion;
