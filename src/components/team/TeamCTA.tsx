
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const TeamCTA = () => {
  return (
    <div className="text-center mt-8">
      <p className="text-lg text-white/70 mb-4">
        Ready to Meet Your Team?
      </p>
      <Button 
        asChild
        variant="default"
        className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg"
      >
        <Link to="/join">Get Started →</Link>
      </Button>
    </div>
  );
};

export default TeamCTA;
