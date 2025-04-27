
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
                <Link to="/solutions" className="block text-white/70 hover:text-white transition-colors py-1">Use Cases</Link>
                <Link to="/solutions" className="block text-white/70 hover:text-white transition-colors py-1">Success Stories</Link>
                <Link to="/solutions" className="block text-white/70 hover:text-white transition-colors py-1">Automation Solutions</Link>
                <Link to="/solutions" className="block text-white/70 hover:text-white transition-colors py-1">ROI Calculator</Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features" className="border-none">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                Features
              </AccordionTrigger>
              <AccordionContent className="pl-4 space-y-2">
                <Link to="/features" className="block text-white/70 hover:text-white transition-colors py-1">Smart Automation</Link>
                <Link to="/features" className="block text-white/70 hover:text-white transition-colors py-1">Patient Communication</Link>
                <Link to="/features" className="block text-white/70 hover:text-white transition-colors py-1">Team Collaboration</Link>
                <Link to="/features" className="block text-white/70 hover:text-white transition-colors py-1">Analytics Dashboard</Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="integrations" className="border-none">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                Integrations
              </AccordionTrigger>
              <AccordionContent className="pl-4 space-y-2">
                <Link to="/integrations" className="block text-white/70 hover:text-white transition-colors py-1">Practice Management</Link>
                <Link to="/integrations" className="block text-white/70 hover:text-white transition-colors py-1">Patient Records</Link>
                <Link to="/integrations" className="block text-white/70 hover:text-white transition-colors py-1">Billing Systems</Link>
                <Link to="/integrations" className="block text-white/70 hover:text-white transition-colors py-1">Communication Tools</Link>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="academy" className="border-none">
              <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                Academy
              </AccordionTrigger>
              <AccordionContent className="pl-4 space-y-2">
                <Link to="/academy" className="block text-white/70 hover:text-white transition-colors py-1">Training Programs</Link>
                <Link to="/academy" className="block text-white/70 hover:text-white transition-colors py-1">Certification</Link>
                <Link to="/academy" className="block text-white/70 hover:text-white transition-colors py-1">Resources</Link>
                <Link to="/academy" className="block text-white/70 hover:text-white transition-colors py-1">Support</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link to="/#pricing" className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors">
            Pricing
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
