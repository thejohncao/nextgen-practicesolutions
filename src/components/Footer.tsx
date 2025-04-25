import React from 'react';
import { MessageSquare, Mail, Shield } from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-nextgen-dark/50 backdrop-blur-xl border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <Link to="/" className="inline-block">
              <div className="flex flex-col">
                <h2 className="text-white font-heading font-bold text-2xl">NextGen</h2>
                <span className="text-nextgen-purple text-sm -mt-1">Practice Solutions</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm max-w-xs mt-4">
              The world's first AI-powered operating system for dental practices, 
              built to help providers run smarter and scale faster.
            </p>
            
            <div className="mt-6 flex gap-4">
              <a href="https://twitter.com/nextgenps" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <div className="h-4 w-4 text-white/80"></div>
              </a>
              <a href="https://linkedin.com/company/nextgenps" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <div className="h-4 w-4 text-white/80"></div>
              </a>
            </div>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-white font-medium mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#ai-team" className="text-white/60 hover:text-white transition-colors">AI Team</a></li>
              <li><a href="#patient-journey" className="text-white/60 hover:text-white transition-colors">Patient Journey</a></li>
              <li><a href="#roi" className="text-white/60 hover:text-white transition-colors">ROI Calculator</a></li>
              <li><a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/integrations" className="text-white/60 hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/story" className="text-white/60 hover:text-white transition-colors">Our Story</Link></li>
              <li><a href="#resources" className="text-white/60 hover:text-white transition-colors">Practice Playbook</a></li>
              <li><a href="#support" className="text-white/60 hover:text-white transition-colors">Support & Benefits</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-white transition-colors">FAQ</a></li>
              <li><Link to="/features" className="text-white/60 hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </a>
              </li>
              <li>
                <a href="mailto:support@nextgenps.com" className="text-white/60 hover:text-white transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@nextgenps.com
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-white/60 hover:text-white transition-colors flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © 2025 NextGen Practice Solutions. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
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
