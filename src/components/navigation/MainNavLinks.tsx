
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainNavLinks: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      <Link 
        to="/solutions" 
        className={`px-3 py-2 text-sm font-medium transition-colors ${
          isActive('/solutions') ? 'text-white' : 'text-white/70 hover:text-white'
        }`}
      >
        Solutions
      </Link>
      <Link 
        to="/academy" 
        className={`px-3 py-2 text-sm font-medium transition-colors ${
          isActive('/academy') ? 'text-white' : 'text-white/70 hover:text-white'
        }`}
      >
        Academy
      </Link>
      <Link 
        to="/ai-team-orbital" 
        className={`px-3 py-2 text-sm font-medium transition-colors ${
          isActive('/ai-team-orbital') ? 'text-white' : 'text-white/70 hover:text-white'
        }`}
      >
        AI Team
      </Link>
      <Link 
        to="/story" 
        className={`px-3 py-2 text-sm font-medium transition-colors ${
          isActive('/story') ? 'text-white' : 'text-white/70 hover:text-white'
        }`}
      >
        Our Story
      </Link>
      <Link 
        to="/pricing" 
        className={`px-3 py-2 text-sm font-medium transition-colors ${
          isActive('/pricing') ? 'text-white' : 'text-white/70 hover:text-white'
        }`}
      >
        Pricing
      </Link>
    </>
  );
};

export default MainNavLinks;
