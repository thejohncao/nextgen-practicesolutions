
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Video, LineChart, GraduationCap, Clipboard, Play, ListCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AcademyMegaMenu = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 animate-mega-menu">
      <div className="w-[700px] max-w-[90vw] mx-auto rounded-xl bg-nextgen-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
        <div className="mb-6">
          <p className="text-white/60 text-sm text-center">
            Master the skills to run a future-ready, AI-powered practice.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Academy Programs Column */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-white/90">Academy Programs</h3>
            <div className="space-y-6">
              <Link to="/academy/treatment-coordinator" className="group block">
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-white/60 group-hover:text-white/90" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Treatment Coordinator Academy
                    </h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70">
                      Master treatment presentation and case acceptance
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/academy/front-office" className="group block">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-white/60 group-hover:text-white/90" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Front Office Excellence Program
                    </h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70">
                      Enhance patient experience and office efficiency
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/academy/practice-manager" className="group block">
                <div className="flex items-center gap-3">
                  <LineChart className="h-4 w-4 text-white/60 group-hover:text-white/90" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Practice Manager Leadership Program
                    </h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70">
                      Lead your practice to peak performance
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/academy/communication" className="group block">
                <div className="flex items-center gap-3">
                  <Video className="h-4 w-4 text-white/60 group-hover:text-white/90" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Patient Communication Mastery
                    </h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70">
                      Build lasting patient relationships
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-white/90">Certifications & Tools</h3>
            <div className="space-y-6">
              <Link to="/academy/certification" className="group block">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-white/60 group-hover:text-white/90" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      NextGen Practice Certification
                    </h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70">
                      Become a certified AI-enhanced practice
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/academy/sop-library" className="group block">
                <div className="flex items-center gap-3">
                  <Clipboard className="h-4 w-4 text-white/60 group-hover:text-white/90" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Downloadable SOP Library
                    </h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70">
                      Standard operating procedures and templates
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/academy/video-portal" className="group block">
                <div className="flex items-center gap-3">
                  <Play className="h-4 w-4 text-white/60 group-hover:text-white/90" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Training Video Portal
                    </h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70">
                      On-demand learning resources
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/academy/ce-tracker" className="group block">
                <div className="flex items-center gap-3">
                  <ListCheck className="h-4 w-4 text-white/60 group-hover:text-white/90" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                      Continuing Education Tracker
                    </h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70">
                      Monitor your team's professional development
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyMegaMenu;
