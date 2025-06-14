
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
        if (active) {
          if (data) {
            // Fix: Ensure brand_colors is always an object with string values or undefined properties
            let brand_colors: { [key: string]: string | undefined } = {};
            if (data.brand_colors && typeof data.brand_colors === "object" && !Array.isArray(data.brand_colors)) {
              for (const key in data.brand_colors) {
                if (
                  typeof data.brand_colors[key] === "string" ||
                  typeof data.brand_colors[key] === "undefined"
                ) {
                  brand_colors[key] = data.brand_colors[key];
                }
              }
            }
            setTenant({
              ...data,
              brand_colors,
            });
          } else {
            setTenant(null);
          }
        }
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
