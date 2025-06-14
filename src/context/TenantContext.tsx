
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo_url?: string;
  brand_colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    [key: string]: string | undefined;
  };
  settings?: any;
}

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
}

const TenantContext = createContext<TenantContextType>({ tenant: null, loading: true });

export const TenantProvider = ({
  tenantSlug,
  children,
}: {
  tenantSlug: string | null;
  children: React.ReactNode;
}) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!tenantSlug) {
      setTenant(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("tenants")
      .select("*")
      .eq("slug", tenantSlug)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setTenant(data || null);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [tenantSlug]);

  return (
    <TenantContext.Provider value={{ tenant, loading }}>
      {children}
    </TenantContext.Provider>
  );
};

// Simple hook
export function useTenant() {
  return useContext(TenantContext);
}
