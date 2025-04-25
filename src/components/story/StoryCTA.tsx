
import React from 'react';
import { Link } from 'react-router-dom';
import EmailCollectionForm from '../EmailCollectionForm';

const StoryCTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center glass-card p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-6">
            Ready to Join the Next Generation of Practice Owners?
          </h2>
          
          <p className="text-lg text-white/70 mb-8">
            Everything we built started with solving real problems. Let us help you solve yours.
          </p>
          
          <div className="max-w-md mx-auto mb-8">
            <EmailCollectionForm 
              buttonText="Join the Movement" 
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mt-6">
            <Link 
              to="/watch" 
              className="text-white/70 underline hover:text-white transition-colors text-sm"
            >
              See the system in action first
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryCTA;
