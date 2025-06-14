import React from "react";
import AppLayout from "./o/app/components/AppLayout";
import { AuthProvider } from "./hooks/useAuth";
import { ToastProvider } from "./hooks/use-toast";
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import SolutionsPage from "./pages/SolutionsPage";
import AgentsPage from "./pages/AgentsPage";
import LoginPage from "./pages/LoginPage";
import HQ from "./pages/app/hq/HQ";
import TenantManagement from "./pages/app/hq/TenantManagement";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Multi-tenant routes: all /:tenant/app/* traffic */}
            <Route path="/:tenant/app/*" element={<AppLayout />} />
            {/* Old single-tenant route fallback for migration/legacy */}
            <Route path="/o/app/*" element={<AppLayout />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* HQ Routes */}
            <Route path="/hq" element={<HQ />} />
            <Route path="/hq/tenants" element={<TenantManagement />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
