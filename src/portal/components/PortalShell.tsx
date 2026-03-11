import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PortalSidebar from './PortalSidebar';
import PortalHeader from './PortalHeader';
import GuidedTour from './GuidedTour';

export default function PortalShell() {
  const [tourActive, setTourActive] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0D0E14]">
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader onStartTour={() => setTourActive(true)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {tourActive && <GuidedTour onClose={() => setTourActive(false)} />}
    </div>
  );
}
