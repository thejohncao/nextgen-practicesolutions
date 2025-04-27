
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const TeamCTA = () => {
  return (
    <div className="text-center mt-8">
      <Button 
        asChild
        variant="default"
        className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(108,99,255,0.5)]"
      >
        <Link to="/solutions">Meet Your Executive Team</Link>
      </Button>
    </div>
  );
};

export default TeamCTA;
