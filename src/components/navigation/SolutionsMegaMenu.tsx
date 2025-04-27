
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, BarChart3, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SolutionsMegaMenu = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed left-0 right-0 top-16 z-50 animate-fade-in-up">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-xl bg-[rgba(17,19,33,0.98)] backdrop-blur-md shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] border border-white/[0.03]">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.04]">
            {/* Use Cases Column */}
            <div className="p-8">
              <h3 className="font-heading text-lg font-semibold mb-6 text-white/90">Use Cases</h3>
              <div className="space-y-5">
                <Link 
                  to="/solutions#practice-management" 
                  className="group flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
                >
                  <div className="mt-1 rounded-lg bg-nextgen-purple/10 p-2 transition-colors group-hover:bg-nextgen-purple/20">
                    <Briefcase className="h-5 w-5 text-nextgen-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Practice Management
                    </h4>
                    <p className="mt-1 text-sm text-white/60 group-hover:text-white/70 transition-colors">
                      Streamline scheduling, intake, and daily workflows
                    </p>
                  </div>
                </Link>

                <Link 
                  to="/solutions#patient-growth" 
                  className="group flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
                >
                  <div className="mt-1 rounded-lg bg-blue-500/10 p-2 transition-colors group-hover:bg-blue-500/20">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Patient Growth
                    </h4>
                    <p className="mt-1 text-sm text-white/60 group-hover:text-white/70 transition-colors">
                      Capture, nurture, and convert high-value patients
                    </p>
                  </div>
                </Link>

                <Link 
                  to="/solutions#case-acceptance" 
                  className="group flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
                >
                  <div className="mt-1 rounded-lg bg-green-500/10 p-2 transition-colors group-hover:bg-green-500/20">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Case Acceptance
                    </h4>
                    <p className="mt-1 text-sm text-white/60 group-hover:text-white/70 transition-colors">
                      Improve treatment plan conversions with smart financing
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Success Stories Column */}
            <div className="p-8">
              <h3 className="font-heading text-lg font-semibold mb-6 text-white/90">Success Stories</h3>
              <div className="space-y-5">
                <Link 
                  to="/solutions#case-studies" 
                  className="group flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
                >
                  <div className="mt-1 rounded-lg bg-purple-500/10 p-2 transition-colors group-hover:bg-purple-500/20">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Case Studies
                    </h4>
                    <p className="mt-1 text-sm text-white/60 group-hover:text-white/70 transition-colors">
                      Learn how practices doubled new patient flow with NextGen
                    </p>
                  </div>
                </Link>

                <Link 
                  to="/solutions#reactivation" 
                  className="group flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
                >
                  <div className="mt-1 rounded-lg bg-red-500/10 p-2 transition-colors group-hover:bg-red-500/20">
                    <Users className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Patient Reactivation
                    </h4>
                    <p className="mt-1 text-sm text-white/60 group-hover:text-white/70 transition-colors">
                      See real-world reactivation campaigns that revived lapsed patients
                    </p>
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
