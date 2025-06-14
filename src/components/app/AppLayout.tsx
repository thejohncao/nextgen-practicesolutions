
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import ContextualAIChat from './ContextualAIChat';
import { TooltipProvider } from "@/components/ui/tooltip"; // Added import

const AppLayout = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-nextgen-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-nextgen-dark flex items-center justify-center">
        <div className="text-white">Access denied</div>
      </div>
    );
  }

  return (
    <TooltipProvider> {/* Added TooltipProvider */}
      <div className="min-h-screen bg-nextgen-dark flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
        <ContextualAIChat />
      </div>
    </TooltipProvider>
  );
};

export default AppLayout;
