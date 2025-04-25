
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ResourcesLanding from '../components/resources/ResourcesLanding';
import Footer from '../components/Footer';

const Resources = () => {
  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      <Routes>
        <Route index element={<ResourcesLanding />} />
        {/* Additional resource routes will be added here */}
      </Routes>
      <Footer />
    </div>
  );
};

export default Resources;
