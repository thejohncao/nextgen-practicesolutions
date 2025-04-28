
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Briefcase, Users, Settings, Award, Book } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const MobileNav = () => {
  const handleChatOpen = () => {
    const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
    if (chatButton) chatButton.click();
  };

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
      <SheetContent 
        side="right" 
        className="w-[85vw] sm:w-80 bg-nextgen-dark/95 backdrop-blur-xl border-white/10"
      >
        <AnimatePresence>
          <motion.nav 
            className="flex flex-col gap-4 mt-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="solutions" className="border-none">
                <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                  Solutions
                </AccordionTrigger>
                <AccordionContent className="pl-4 space-y-4">
                  <Link to="/solutions" className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all group">
                    <Briefcase className="h-5 w-5 text-nextgen-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Practice Management (Miles)</h3>
                      <p className="text-sm text-white/60 mt-1">Run your scheduling, check-in, and front office systems.</p>
                    </div>
                  </Link>
                  <Link to="/solutions" className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all group">
                    <Users className="h-5 w-5 text-nextgen-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Practice Growth (Giselle)</h3>
                      <p className="text-sm text-white/60 mt-1">Capture new leads and reactivate lapsed patients.</p>
                    </div>
                  </Link>
                  <Link to="/solutions" className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all group">
                    <Settings className="h-5 w-5 text-nextgen-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Practice Development (Devon)</h3>
                      <p className="text-sm text-white/60 mt-1">Automate consultations, financing offers, and follow-ups.</p>
                    </div>
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="features" className="border-none">
                <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                  Features
                </AccordionTrigger>
                <AccordionContent className="pl-4 space-y-4">
                  <Link to="/features" className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all group">
                    <Settings className="h-5 w-5 text-nextgen-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Automation Features</h3>
                      <p className="text-sm text-white/60 mt-1">Streamline tasks with smart AI automations.</p>
                    </div>
                  </Link>
                  <Link to="/features" className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all group">
                    <Award className="h-5 w-5 text-nextgen-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Growth Tools</h3>
                      <p className="text-sm text-white/60 mt-1">Fuel your practice's new patient pipeline.</p>
                    </div>
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="integrations" className="border-none">
                <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                  Integrations
                </AccordionTrigger>
                <AccordionContent className="pl-4">
                  <Link to="/integrations" className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all group">
                    <Settings className="h-5 w-5 text-nextgen-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Platform Integrations</h3>
                      <p className="text-sm text-white/60 mt-1">Connect seamlessly to Salesforce, CareCredit, and more.</p>
                    </div>
                  </Link>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="academy" className="border-none">
                <AccordionTrigger className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors py-2">
                  Academy
                </AccordionTrigger>
                <AccordionContent className="pl-4 space-y-4">
                  <Link to="/academy" className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all group">
                    <Book className="h-5 w-5 text-nextgen-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Training Programs</h3>
                      <p className="text-sm text-white/60 mt-1">Master practice management and patient communication.</p>
                    </div>
                  </Link>
                  <Link to="/academy" className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all group">
                    <Award className="h-5 w-5 text-nextgen-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Certifications & Tools</h3>
                      <p className="text-sm text-white/60 mt-1">Earn your NextGen Practice Certification.</p>
                    </div>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-auto pt-4 border-t border-white/10">
              <button
                onClick={handleChatOpen}
                className="w-full px-4 py-3 bg-nextgen-dark border border-nextgen-purple/20 rounded-lg text-white font-medium hover:bg-white/5 transition-colors group"
              >
                <span className="inline-flex animate-shimmer bg-gradient-to-r from-[#a3c9f9] via-white to-[#a3c9f9] bg-[length:400%_100%] bg-clip-text text-transparent">
                  Talk to Miles — Your AI Practice Concierge
                </span>
              </button>
            </div>
          </motion.nav>
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
