
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import "../../app/styles/apple-design.css";

const AppHeader = () => {
  const { profile, signOut } = useAuth();

  return (
    <header className="apple-header glass-blur px-8 py-4 flex items-center justify-between">
      <div>
        <span className="text-xl font-bold text-apple-header">Welcome,</span>
        <span className="ml-2 text-apple-detail font-semibold">
          {profile?.first_name} {profile?.last_name}
        </span>
      </div>
      <button
        className="apple-logout-btn"
        onClick={signOut}
        aria-label="Sign out"
      >
        Sign out
      </button>
    </header>
  );
};

export default AppHeader;
