
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nextgen-dark p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Looks like this page didn't make the cut.
          </h1>
          
          <p className="text-xl text-white/80 mb-6">
            Even our AI team gets lost sometimes. Don't worry — we're already on it.
          </p>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white/70 mb-8"
        >
          This page might've been moved, renamed, or just doesn't exist anymore. 
          But we've got smarter paths ahead. Want to get back on track?
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            asChild
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            size="lg"
          >
            <Link to="/#agents">Meet Your AI Team</Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="border-white/20 hover:bg-white/5"
            size="lg"
          >
            <Link to="/">Return to Homepage</Link>
          </Button>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-white/50 italic text-sm mt-10"
        >
          P.S. Alma is currently rewriting this SOP to make sure it never happens again.
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
