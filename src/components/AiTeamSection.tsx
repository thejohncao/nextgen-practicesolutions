
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

// This component is now replaced by GooeyFilterTabs
// This stub is kept for compatibility with existing imports
const AITeamSection = () => {
  console.warn('AITeamSection is deprecated. Use GooeyFilterTabs instead.');
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white/70 mb-4">This component has been replaced by GooeyFilterTabs.</p>
        <Button asChild>
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    </section>
  );
};

export default AITeamSection;
