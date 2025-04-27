
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Shield, BookOpen, Briefcase, GraduationCap, Users } from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-nextgen-dark border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <div className="flex flex-col">
                <h2 className="text-white font-heading font-bold text-2xl">NextGen</h2>
                <span className="text-nextgen-purple text-sm -mt-1">Practice Solutions</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm max-w-xs mt-4">
              The world's first AI-powered operating system for dental practices, helping providers run smarter and scale faster.
            </p>
            
            <button
              onClick={() => {
                const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
                if (chatButton) chatButton.click();
              }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-nextgen-purple/90 rounded-lg hover:bg-nextgen-purple transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Talk to Miles
            </button>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-nextgen-purple" />
              Solutions
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions/ai-team" className="text-white/60 hover:text-white transition-colors">AI Team</Link></li>
              <li><Link to="/solutions/patient-journey" className="text-white/60 hover:text-white transition-colors">Patient Journey</Link></li>
              <li><Link to="/solutions/roi" className="text-white/60 hover:text-white transition-colors">ROI Calculator</Link></li>
              <li><Link to="/solutions/pricing" className="text-white/60 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="text-white/60 hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          {/* Features */}
          <div>
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <BriefCase className="h-4 w-4 text-nextgen-purple" />
              Features
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features/automation" className="text-white/60 hover:text-white transition-colors">Automation</Link></li>
              <li><Link to="/features/analytics" className="text-white/60 hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to="/features/communication" className="text-white/60 hover:text-white transition-colors">Communication</Link></li>
              <li><Link to="/features/security" className="text-white/60 hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
          
          {/* Academy & Resources */}
          <div>
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-nextgen-purple" />
              Learn
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/academy" className="text-white/60 hover:text-white transition-colors">Academy</Link></li>
              <li><Link to="/resources" className="text-white/60 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/blog" className="text-white/60 hover:text-white transition-colors">Blog</Link></li>
              <li><a href="#support" className="text-white/60 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © 2025 NextGen Practice Solutions. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="text-white/40 hover:text-white/60 text-sm flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              Privacy
            </Link>
            <Link to="/terms" className="text-white/40 hover:text-white/60 text-sm">
              Terms
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">HIPAA Compliant</span>
              <div className="h-3 w-px bg-white/20"></div>
              <span className="text-white/40 text-xs">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
