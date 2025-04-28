
import React from 'react';
import Layout from '../components/Layout';
import AnimationPlayground from '../components/docs/AnimationPlayground';

const Animations = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-nextgen-dark text-white">
        <main className="pt-20 pb-16">
          <AnimationPlayground />
        </main>
      </div>
    </Layout>
  );
};

export default Animations;
