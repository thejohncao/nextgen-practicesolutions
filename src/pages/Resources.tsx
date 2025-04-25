import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import ResourcesLanding from '../components/resources/ResourcesLanding';

const Resources = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<ResourcesLanding />} />
        {/* Additional resource routes will be added here */}
      </Routes>
    </Layout>
  );
};

export default Resources;
