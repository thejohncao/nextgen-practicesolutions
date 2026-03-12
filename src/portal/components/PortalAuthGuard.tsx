import { Navigate } from 'react-router-dom';
import { usePortalAuth } from '../context/PortalAuthContext';

export default function PortalAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = usePortalAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#9CA3AF]">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal/login" replace />;
  }

  return <>{children}</>;
}
