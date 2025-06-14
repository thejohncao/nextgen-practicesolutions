
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRole } from "../hooks/useRole";
import { Home, Wallet, Settings } from "lucide-react";
import "../../app/styles/apple-design.css";

const SIDEBAR_NAV = [
  { to: "/o/app/dashboard", icon: Home, label: "Dashboard", roles: ["patient", "admin"] },
  { to: "/o/app/wallet", icon: Wallet, label: "Wallet", roles: ["patient", "admin"] },
  { to: "/o/app/admin", icon: Settings, label: "Admin", roles: ["admin"] },
];

const AppSidebar = () => {
  const role = useRole();
  const location = useLocation();

  const navItems = SIDEBAR_NAV.filter((item) => item.roles.includes(role));

  return (
    <aside className="apple-sidebar glass-blur py-8 px-4 h-full flex flex-col min-w-[220px]">
      <div className="text-2xl font-bold text-apple-header pb-8">NextGen OS</div>
      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`apple-nav-item ${location.pathname === to ? "active" : ""}`}
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
