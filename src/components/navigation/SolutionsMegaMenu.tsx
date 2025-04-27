
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp } from 'lucide-react';

const SolutionsMegaMenu = () => {
  return (
    <div className="absolute left-0 w-full pt-2 z-50">
      <div className="container mx-auto">
        <div className="glass-card p-8 grid grid-cols-2 gap-12">
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
            </div>
          </div>

          {/* Success Stories Section */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-gradient">Success Stories</h3>
            <div className="space-y-6">
              <Link to="/solutions#case-studies" className="group block">
                <div>
                  <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                    Practice Growth Case Studies
                  </h4>
                  <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                    Learn how practices doubled new patient flow with NextGen
                  </p>
                </div>
              </Link>
              <Link to="/solutions#reactivation" className="group block">
                <div>
                  <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                    Patient Reactivation Results
                  </h4>
                  <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                    See real-world reactivation campaigns that revived lapsed patients
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsMegaMenu;
