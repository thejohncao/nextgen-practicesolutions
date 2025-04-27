
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, PieChart, BrainCircuit, BarChart3, Video } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ResourcesMegaMenu = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 animate-mega-menu">
      <div className="w-[500px] max-w-[90vw] mx-auto rounded-xl bg-nextgen-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
        <div className="mb-6">
          <p className="text-white/60 text-sm text-center">
            Stay at the forefront of AI-powered practice innovation.
          </p>
        </div>
        
        <div className="space-y-5">
          <Link to="/resources/blog" className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
            <div className="rounded-lg bg-nextgen-purple/10 p-2">
              <BookOpen className="h-5 w-5 text-nextgen-purple" />
            </div>
            <div>
              <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">Blog</h4>
              <p className="text-sm text-white/60 group-hover:text-white/70">Latest insights and practice tips</p>
            </div>
          </Link>

          <Link to="/resources/guides" className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">Free Guides</h4>
              <p className="text-sm text-white/60 group-hover:text-white/70">In-depth practice management resources</p>
            </div>
          </Link>

          <Link to="/resources/case-studies" className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
            <div className="rounded-lg bg-green-500/10 p-2">
              <PieChart className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">Case Studies</h4>
              <p className="text-sm text-white/60 group-hover:text-white/70">Real success stories from practices</p>
            </div>
          </Link>

          <Link to="/resources/ai-library" className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <BrainCircuit className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">AI Resource Library</h4>
              <p className="text-sm text-white/60 group-hover:text-white/70">AI implementation guides and tools</p>
            </div>
          </Link>

          <Link to="/resources/reports" className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
            <div className="rounded-lg bg-red-500/10 p-2">
              <BarChart3 className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">Industry Reports</h4>
              <p className="text-sm text-white/60 group-hover:text-white/70">Data-driven industry insights</p>
            </div>
          </Link>

          <Link to="/resources/webinars" className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
            <div className="rounded-lg bg-yellow-500/10 p-2">
              <Video className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">Webinars & Workshops</h4>
              <p className="text-sm text-white/60 group-hover:text-white/70">Live and recorded training sessions</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourcesMegaMenu;
