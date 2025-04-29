
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Compass from '@/components/Compass';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center animate-hero-float">
              <Compass className="text-blue-400 w-12 h-12" spinning={true} />
            </div>
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-md"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Oops. This page isn't ready yet.
          </h1>
          
          <p className="text-white/70 text-lg mb-8 max-w-2xl">
            We're building the future of dental practice automation — but it looks like you found a page that's still under construction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link to="/">Return Home</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/academy">Explore the Academy</Link>
            </Button>
          </div>
          
          <p className="mt-10 text-white/50 italic text-sm">
            Even Miles sometimes gets lost.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
