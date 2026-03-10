import { Outlet } from 'react-router-dom';
import PortalSidebar from './PortalSidebar';
import PortalHeader from './PortalHeader';

export default function PortalShell() {
  return (
    <div className="flex min-h-screen bg-gray-50/60">
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
