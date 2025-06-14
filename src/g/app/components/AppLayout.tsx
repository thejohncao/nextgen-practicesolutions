import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { useAuth } from "../../../hooks/useAuth";
import { TenantProvider, useTenant } from "@/context/TenantContext";
import "../../../o/app/styles/apple-design.css"; // Reusing styles - CORRECTED PATH

// Helper: extract /:tenant/app from URL (keeping for parity, might not be used by /g/app directly)
function getTenantSlugFromPath(pathname: string) {
  const match = pathname.match(/^\/([^/]+)\/app/);
  if (match) return match[1];
  // For /g/app, we might not have a tenant slug in the path like /o/app could.
  // For now, it will return null, and TenantProvider will handle a null slug.
  if (pathname.startsWith("/g/app")) return null; 
  return null;
}

const PUBLIC_ROUTES = ["/g/app/login"]; // Google variant public route

const AppLayout = () => {
  const location = useLocation();
  // For /g/app, tenantSlug will likely be null unless we decide to structure it as /g/app later
  const tenantSlug = getTenantSlugFromPath(location.pathname);

  return (
    <TenantProvider tenantSlug={tenantSlug}>
      <_AppLayoutInner />
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
        <div className="loader"></div> {/* Ensure loader style is defined in apple-design.css or Tailwind */}
      </div>
    );
  }
  if (!profile && !isPublic) {
    return <Navigate to="/g/app/login" replace />; // Navigate to Google variant login
  }

  // Branding colors - kept for parity, may or may not apply if tenant context isn't used for /g/app
  const bgStyle = tenant?.brand_colors?.primary
    ? { background: tenant.brand_colors.primary }
    : {};

  return (
    <div className="apple-root bg-apple-bg min-h-screen flex" style={bgStyle}>
      {profile && <AppSidebar />}
      <div className="flex-1 flex flex-col min-h-screen">
        {profile && <AppHeader />}
        {/* Tenant logo - kept for parity */}
        {tenant?.logo_url && (
          <div className="flex justify-center pt-5">
            <img src={tenant.logo_url} alt={tenant.name || 'Tenant Logo'} style={{ height: 44, maxWidth: 220 }} />
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
