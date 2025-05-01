
import React from 'react';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

const ExploreMoreSection = () => {
  return (
    <footer className="py-12 bg-black/60">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-white/10 pt-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-medium mb-4">NextGen OS</h3>
                <ul className="space-y-2">
                  <li><Link to="/ai-team" className="text-white/70 hover:text-white">AI Team</Link></li>
                  <li><Link to="/academy" className="text-white/70 hover:text-white">Practice Academy</Link></li>
                  <li><Link to="/join" className="text-white/70 hover:text-white">Talent Network</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">About</h3>
                <ul className="space-y-2">
                  <li><Link to="/story" className="text-white/70 hover:text-white">Our Story</Link></li>
                  <li><Link to="/security" className="text-white/70 hover:text-white">Security</Link></li>
                  <li><Link to="/resources" className="text-white/70 hover:text-white">Resources</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/privacy" className="text-white/70 hover:text-white">Terms of Service</Link></li>
                  <li><Link to="/privacy" className="text-white/70 hover:text-white">HIPAA Statement</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/50 text-sm">© 2025 NextGen Practice Solutions. All Rights Reserved.</p>
            <p className="text-white/50 text-sm mt-2 md:mt-0">Santa Ana, California.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ExploreMoreSection;
