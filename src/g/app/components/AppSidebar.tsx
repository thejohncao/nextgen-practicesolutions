import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRole } from "../hooks/useRole"; // Will point to /g/app/hooks/useRole
import { Home, Wallet, Settings } from "lucide-react"; // Using same icons
import "../../../o/app/styles/apple-design.css"; // Reusing styles - CORRECTED PATH

// Navigation items updated for /g/app paths
const SIDEBAR_NAV = [
  { to: "/g/app/dashboard", icon: Home, label: "Dashboard", roles: ["patient", "admin", "staff"] }, // Added staff for completeness
  { to: "/g/app/wallet", icon: Wallet, label: "Wallet", roles: ["patient", "admin", "staff"] }, // Added staff
  { to: "/g/app/admin", icon: Settings, label: "Admin", roles: ["admin"] },
];

const AppSidebar = () => {
  const role = useRole();
  const location = useLocation();

  // Filter nav items based on user role, default to empty array if role is undefined
  const navItems = role ? SIDEBAR_NAV.filter((item) => item.roles.includes(role)) : [];

  return (
    <aside className="apple-sidebar glass-blur py-8 px-4 h-full flex flex-col min-w-[220px]">
      <div className="text-2xl font-bold text-apple-header pb-8">NextGen OS (G)</div>
      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`apple-nav-item ${location.pathname.startsWith(to) ? "active" : ""}`} // Use startsWith for nested routes
          >
            <Icon className="w-5 h-5 mr-2" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
