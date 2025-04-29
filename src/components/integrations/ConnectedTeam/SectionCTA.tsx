
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SectionCTA: React.FC = () => {
  return (
    <div className="text-center mt-8">
      <Button 
        asChild
        className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
      >
        <Link to="/integrations">
          Explore All Integrations <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default SectionCTA;
