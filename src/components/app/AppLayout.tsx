
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

const AppLayout = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-nextgen-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/app/login" replace />;
  }

  return (
    <div className="min-h-screen bg-nextgen-dark flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
