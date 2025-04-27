
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white hover:bg-white/10"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-nextgen-dark/95 backdrop-blur-xl border-white/10">
        <nav className="flex flex-col gap-4 mt-8">
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="solutions" className="border-none">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                Solutions
              </AccordionTrigger>
              <AccordionContent className="pl-4 space-y-2">
                <Link to="/solutions/ai-team" className="block text-white/70 hover:text-white transition-colors py-1">AI Team</Link>
                <Link to="/solutions/patient-journey" className="block text-white/70 hover:text-white transition-colors py-1">Patient Journey</Link>
                <Link to="/solutions/roi" className="block text-white/70 hover:text-white transition-colors py-1">ROI Calculator</Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features" className="border-none">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                Features
              </AccordionTrigger>
              <AccordionContent className="pl-4 space-y-2">
                <Link to="/features/automation" className="block text-white/70 hover:text-white transition-colors py-1">Automation</Link>
                <Link to="/features/analytics" className="block text-white/70 hover:text-white transition-colors py-1">Analytics</Link>
                <Link to="/features/communication" className="block text-white/70 hover:text-white transition-colors py-1">Communication</Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="integrations" className="border-none">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                Integrations
              </AccordionTrigger>
              <AccordionContent className="pl-4 space-y-2">
                <Link to="/integrations/crm" className="block text-white/70 hover:text-white transition-colors py-1">CRM & Patient Management</Link>
                <Link to="/integrations/billing" className="block text-white/70 hover:text-white transition-colors py-1">Billing & Payments</Link>
                <Link to="/integrations/scheduling" className="block text-white/70 hover:text-white transition-colors py-1">Scheduling</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link to="/academy" className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors">
            Academy
          </Link>
          <Link to="/resources" className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors">
            Resources
          </Link>
          <a href="/#pricing" className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors">
            Pricing
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
