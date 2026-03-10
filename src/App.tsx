
import React from "react";
import OAppLayout from "./o/app/components/AppLayout"; // Renamed to avoid conflict
import GAppLayout from "./g/app/components/AppLayout"; // New Google AI App Layout
import { AuthProvider } from "./hooks/useAuth";
import { Toaster } from "./components/ui/toaster";

// Import using actual, case-matching files
import Landing from "./pages/Index";
import Pricing from "./pages/Pricing";
import Solutions from "./pages/Solutions";
import Agents from "./pages/Agents";
import Login from "./pages/app/Login"; // This is the generic login, /o/app/login and /g/app/login will have their own
import HQ from "./pages/app/hq/HQ";
import TenantManagement from "./pages/app/hq/TenantManagement";

// Google AI App Pages
import GLogin from "./g/app/pages/Login";
import GDashboard from "./g/app/pages/Dashboard";
import GWallet from "./g/app/pages/Wallet";
import GShop from "./g/app/pages/Shop";

// NextGen Portal Pages
import PortalShell from "./portal/components/PortalShell";
import PortalLogin from "./portal/pages/PortalLogin";
import PortalDashboard from "./portal/pages/Dashboard";
import GisellePage from "./portal/pages/GisellePage";
import MilesPage from "./portal/pages/MilesPage";
import DevonPage from "./portal/pages/DevonPage";
import TimelinePage from "./portal/pages/TimelinePage";
import RequestsPage from "./portal/pages/RequestsPage";
import SettingsPage from "./portal/pages/SettingsPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* NextGen Portal Routes */}
          <Route path="/portal/login" element={<PortalLogin />} />
          <Route path="/portal" element={<PortalShell />}>
            <Route index element={<PortalDashboard />} />
            <Route path="giselle" element={<GisellePage />} />
            <Route path="miles" element={<MilesPage />} />
            <Route path="devon" element={<DevonPage />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="requests" element={<RequestsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Multi-tenant routes: all /:tenant/app/* traffic */}
          <Route path="/:tenant/app/*" element={<OAppLayout />} /> {/* Assuming OAppLayout can handle this or needs its own generic AppLayout */}

          {/* Old single-tenant route fallback for migration/legacy - OpenAI version */}
          <Route path="/o/app/*" element={<OAppLayout />} />

          {/* New Google AI variant routes */}
          <Route path="/g/app" element={<GAppLayout />}>
            <Route path="login" element={<GLogin />} />
            <Route path="dashboard" element={<GDashboard />} />
            <Route path="wallet" element={<GWallet />} />
            <Route path="shop" element={<GShop />} />
          </Route>

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
