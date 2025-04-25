import React from 'react';
import { MessageSquare, Mail, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-nextgen-dark border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex flex-col">
              <h2 className="text-white font-heading font-bold text-2xl">NextGen</h2>
              <span className="text-nextgen-purple text-sm -mt-1">Practice Solutions</span>
            </div>
            <p className="text-white/60 text-sm max-w-xs">
              The world's first AI-powered operating system for dental practices, 
              built to help providers run smarter and scale faster.
            </p>
            
            <div className="mt-6 flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <div className="h-4 w-4 text-white/80"></div>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <div className="h-4 w-4 text-white/80"></div>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <div className="h-4 w-4 text-white/80"></div>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#ai-team" className="text-white/60 hover:text-white">AI Team</a></li>
              <li><a href="#patient-journey" className="text-white/60 hover:text-white">Patient Journey</a></li>
              <li><a href="#roi" className="text-white/60 hover:text-white">ROI</a></li>
              <li><a href="#pricing" className="text-white/60 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-white/60 hover:text-white">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#resources" className="text-white/60 hover:text-white">Practice Playbook</a></li>
              <li><a href="#resources" className="text-white/60 hover:text-white">Practice Audit</a></li>
              <li><a href="#resources" className="text-white/60 hover:text-white">ROI Calculator</a></li>
              <li><a href="#" className="text-white/60 hover:text-white">Blog</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="text-white/60 hover:text-white flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@nextgenps.com
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white flex items-center">
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
