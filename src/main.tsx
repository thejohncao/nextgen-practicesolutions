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
import Academy from './pages/Academy';
import AcademyBusinessModel from './pages/AcademyBusinessModel';
import AcademyCertification from './pages/AcademyCertification';
import AcademyCurriculum from './pages/AcademyCurriculum';
import Agents from './pages/Agents';
import AiDemo from './pages/AiDemo';
import AiTeam from './pages/AiTeam';
import Animations from './pages/Animations';
import Boardroom from './pages/Boardroom';
import Certifications from './pages/Certifications';
import Demo from './pages/Demo';
import Features from './pages/Features';
import IndexPage from './pages/Index';
import Integrations from './pages/Integrations';
import Join from './pages/Join';
import Juv from './pages/Juv';
import KitDetail from './pages/KitDetail';
import KitsIndex from './pages/KitsIndex';
import NewHomepage from './pages/NewHomepage';
import NextGenHomeV2 from './pages/NextGenHomeV2';
import NextGenOS from './pages/NextGenOS';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Resources from './pages/Resources';
import Security from './pages/Security';
import Solutions from './pages/Solutions';
import Story from './pages/Story';
import Watch from './pages/Watch';
import './index.css';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<App />} />

        {/* Marketing / public pages */}
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/business-model" element={<AcademyBusinessModel />} />
        <Route path="/academy/certification" element={<AcademyCertification />} />
        <Route path="/academy/curriculum" element={<AcademyCurriculum />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/ai-demo" element={<AiDemo />} />
        <Route path="/ai-team" element={<AiTeam />} />
        <Route path="/animations" element={<Animations />} />
        <Route path="/boardroom" element={<Boardroom />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/features" element={<Features />} />
        <Route path="/home" element={<IndexPage />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/join" element={<Join />} />
        <Route path="/juv" element={<Juv />} />
        <Route path="/kits" element={<KitsIndex />} />
        <Route path="/kits/:kitId" element={<KitDetail />} />
        <Route path="/new-homepage" element={<NewHomepage />} />
        <Route path="/nextgen-home-v2" element={<NextGenHomeV2 />} />
        <Route path="/nextgen-os" element={<NextGenOS />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/resources/*" element={<Resources />} />
        <Route path="/security" element={<Security />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/story" element={<Story />} />
        <Route path="/watch" element={<Watch />} />

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

        {/* Admin dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPracticeList />} />
          <Route path=":userId" element={<AdminPracticeDetail />} />
        </Route>
        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
