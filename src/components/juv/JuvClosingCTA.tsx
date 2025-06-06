
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageCircle, Eye, Download } from 'lucide-react';

const JuvClosingCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-nextgen-purple/20 via-transparent to-nextgen-blue/20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            🎯 JUV is the vision.<br />
            NextGen is the engine.
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Let's scale the first AI-powered medspa network — and hit $10M ARR by 2030.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-4">
              <Link to="/demo">
                <MessageCircle className="h-5 w-5 mr-2" />
                Let's Scale Together
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4">
              <Link to="/solutions">
                <Eye className="h-5 w-5 mr-2" />
                View the System
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4">
              <Link to="/pricing">
                <Download className="h-5 w-5 mr-2" />
                Download Full Plan
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuvClosingCTA;
