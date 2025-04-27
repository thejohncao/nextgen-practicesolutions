
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, BarChart3, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SolutionsMegaMenu = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute left-0 right-0 w-full mt-2 z-50">
      <div className="container mx-auto px-4">
        <div 
          className="max-w-[800px] mx-auto neo-blur rounded-xl overflow-hidden animate-fade-in"
        >
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Use Cases Section */}
            <div>
              <h3 className="font-heading text-lg font-semibold mb-6 text-gradient">Use Cases</h3>
              <div className="space-y-6">
                <Link to="/solutions#practice-management" className="group block">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Briefcase className="h-5 w-5 text-nextgen-purple/70 group-hover:text-nextgen-purple transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                        Practice Management Automation
                      </h4>
                      <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                        Streamline scheduling, intake, and daily workflows
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/solutions#patient-growth" className="group block">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <TrendingUp className="h-5 w-5 text-nextgen-purple/70 group-hover:text-nextgen-purple transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                        Patient Growth Funnels
                      </h4>
                      <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                        Capture, nurture, and convert high-value patients
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/solutions#case-acceptance" className="group block">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <BarChart3 className="h-5 w-5 text-nextgen-purple/70 group-hover:text-nextgen-purple transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                        Case Acceptance Boosters
                      </h4>
                      <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                        Improve treatment plan conversions with smart financing
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Success Stories Section */}
            <div className="relative before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-white/5 before:via-white/10 before:to-white/5 md:pl-12">
              <h3 className="font-heading text-lg font-semibold mb-6 text-gradient">Success Stories</h3>
              <div className="space-y-6">
                <Link to="/solutions#case-studies" className="group block">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Users className="h-5 w-5 text-nextgen-purple/70 group-hover:text-nextgen-purple transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                        Practice Growth Case Studies
                      </h4>
                      <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                        Learn how practices doubled new patient flow with NextGen
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/solutions#reactivation" className="group block">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Users className="h-5 w-5 text-nextgen-purple/70 group-hover:text-nextgen-purple transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                        Patient Reactivation Results
                      </h4>
                      <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                        See real-world reactivation campaigns that revived lapsed patients
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsMegaMenu;
