
import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { useAuth } from "../../../hooks/useAuth";
import "../../app/styles/apple-design.css";

const PUBLIC_ROUTES = ["/o/app/login"];

const AppLayout = () => {
  const { profile, loading } = useAuth();
  const location = useLocation();
  const isPublic = PUBLIC_ROUTES.includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen bg-apple-bg flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }
  if (!profile && !isPublic) {
    return <Navigate to="/o/app/login" replace />;
  }
  return (
    <div className="apple-root bg-apple-bg min-h-screen flex">
      {profile && <AppSidebar />}
      <div className="flex-1 flex flex-col min-h-screen">
        {profile && <AppHeader />}
        <main className="p-6 flex-1 glass-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
