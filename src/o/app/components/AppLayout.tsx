
import React from "react";
import { Outlet, Navigate, useLocation, useParams } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { useAuth } from "../../../hooks/useAuth";
import { TenantProvider, useTenant } from "@/context/TenantContext";
import { TooltipProvider } from "@/components/ui/tooltip"; // Added import
import "../../app/styles/apple-design.css";

const PUBLIC_ROUTES = ["/o/app/login"];

// Helper: extract /:tenant/app from URL
function getTenantSlugFromPath(pathname: string) {
  const match = pathname.match(/^\/([^/]+)\/app/);
  if (match) return match[1];
  return null;
}

const AppLayout = () => {
  const { profile, loading } = useAuth(); // This useAuth seems redundant here, it's used in _AppLayoutInner
  const location = useLocation();
  const tenantSlug = getTenantSlugFromPath(location.pathname);

  // For subdomain routing upgrades, logic would go here

  return (
    <TenantProvider tenantSlug={tenantSlug}>
      <TooltipProvider> {/* Added TooltipProvider */}
        <_AppLayoutInner />
      </TooltipProvider>
    </TenantProvider>
  );
};

function _AppLayoutInner() {
  const { profile, loading } = useAuth();
  const location = useLocation();
  const isPublic = PUBLIC_ROUTES.includes(location.pathname);
  const { tenant, loading: tenantLoading } = useTenant();

  if (loading || tenantLoading) {
    return (
      <div className="min-h-screen bg-apple-bg flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }
  if (!profile && !isPublic) {
    return <Navigate to="/o/app/login" replace />;
  }

  // Branding colors
  const bgStyle = tenant?.brand_colors?.primary
    ? { background: tenant.brand_colors.primary }
    : {};

  return (
    <div className="apple-root bg-apple-bg min-h-screen flex" style={bgStyle}>
      {profile && <AppSidebar />}
      <div className="flex-1 flex flex-col min-h-screen">
        {profile && <AppHeader />}
        {/* Tenant logo above main content for white label */}
        {tenant?.logo_url && (
          <div className="flex justify-center pt-5">
            <img src={tenant.logo_url} alt={tenant.name} style={{ height: 44, maxWidth: 220 }} />
          </div>
        )}
        <main className="p-6 flex-1 glass-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
