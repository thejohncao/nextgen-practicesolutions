import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PortalShell from './portal/components/PortalShell';
import PortalLogin from './portal/pages/PortalLogin';
import PortalDashboard from './portal/pages/Dashboard';
import GisellePage from './portal/pages/GisellePage';
import MilesPage from './portal/pages/MilesPage';
import DevonPage from './portal/pages/DevonPage';
import TimelinePage from './portal/pages/TimelinePage';
import RequestsPage from './portal/pages/RequestsPage';
import SettingsPage from './portal/pages/SettingsPage';
import './index.css';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Landing page by Lovable */}
        <Route path="/" element={<App />} />

        {/* NextGen Portal */}
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
