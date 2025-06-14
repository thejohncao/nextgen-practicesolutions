
import React from "react";
import AppLayout from "./o/app/components/AppLayout";
import { AuthProvider } from "./hooks/useAuth";
import { Toaster } from "./components/ui/toaster";

// Fixed page imports to match actual files
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Solutions from "./pages/Solutions";
import Agents from "./pages/Agents";
import Login from "./pages/Login";
import HQ from "./pages/app/hq/HQ";
import TenantManagement from "./pages/app/hq/TenantManagement";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Multi-tenant routes: all /:tenant/app/* traffic */}
          <Route path="/:tenant/app/*" element={<AppLayout />} />
          {/* Old single-tenant route fallback for migration/legacy */}
          <Route path="/o/app/*" element={<AppLayout />} />
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/login" element={<Login />} />
          {/* HQ Routes */}
          <Route path="/hq" element={<HQ />} />
          <Route path="/hq/tenants" element={<TenantManagement />} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </Router>
  );
}
