
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import PatientWallet from "../components/PatientWallet";
import StaffWallet from "../components/StaffWallet";
import AdminWallet from "../components/AdminWallet";
import "../../app/styles/apple-design.css";

// Role-based Wallet Entry
const Wallet = () => {
  const { profile, loading } = useAuth();
  const role = useRole();

  if (loading) {
    return (
      <section className="fade-in apple-card p-8 flex items-center justify-center min-h-[320px]">
        <div className="text-apple-subtle text-lg">Loading wallet...</div>
      </section>
    );
  }

  if (!profile || !role) {
    return null;
  }

  if (role === "admin") {
    return <AdminWallet />;
  }
  if (role === "staff") {
    return <StaffWallet />;
  }
  // Fallback & patient by default
  return <PatientWallet />;
};

export default Wallet;
