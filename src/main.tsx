import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { PortalAuthProvider } from './portal/context/PortalAuthContext';
import { PracticeProvider } from './portal/context/PracticeContext';
import PortalAuthGuard from './portal/components/PortalAuthGuard';
import PortalShell from './portal/components/PortalShell';
import PortalLogin from './portal/pages/PortalLogin';
import PortalSignup from './portal/pages/PortalSignup';
import ForgotPassword from './portal/pages/ForgotPassword';
import ResetPassword from './portal/pages/ResetPassword';
import OnboardingWizard from './portal/pages/OnboardingWizard';
import PortalDashboard from './portal/pages/Dashboard';
import GisellePage from './portal/pages/GisellePage';
import MilesPage from './portal/pages/MilesPage';
import DevonPage from './portal/pages/DevonPage';
import AlmaPage from './portal/pages/AlmaPage';
import TimelinePage from './portal/pages/TimelinePage';
import RequestsPage from './portal/pages/RequestsPage';
import SettingsPage from './portal/pages/SettingsPage';
import AdminLayout from './admin/components/AdminLayout';
import AdminPracticeList from './admin/pages/AdminPracticeList';
import AdminPracticeDetail from './admin/pages/AdminPracticeDetail';
import './index.css';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<App />} />

        {/* Auth pages — no guard */}
        <Route path="/portal/login" element={<PortalAuthProvider><PortalLogin /></PortalAuthProvider>} />
        <Route path="/portal/signup" element={<PortalAuthProvider><PortalSignup /></PortalAuthProvider>} />
        <Route path="/portal/forgot-password" element={<ForgotPassword />} />
        <Route path="/portal/reset-password" element={<ResetPassword />} />

        {/* Protected portal routes */}
        <Route path="/portal/onboard" element={
          <PortalAuthProvider>
            <PortalAuthGuard>
              <PracticeProvider>
                <OnboardingWizard />
              </PracticeProvider>
            </PortalAuthGuard>
          </PortalAuthProvider>
        } />
        <Route path="/portal" element={
          <PortalAuthProvider>
            <PortalAuthGuard>
              <PracticeProvider>
                <PortalShell />
              </PracticeProvider>
            </PortalAuthGuard>
          </PortalAuthProvider>
        }>
          <Route index element={<PortalDashboard />} />
          <Route path="giselle" element={<GisellePage />} />
          <Route path="miles" element={<MilesPage />} />
          <Route path="devon" element={<DevonPage />} />
          <Route path="alma" element={<AlmaPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
