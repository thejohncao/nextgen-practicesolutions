
import React from "react";
import { useAuth } from "../../../hooks/useAuth"; // Path relative to /g/app/pages
import { useRole } from "../hooks/useRole"; // Path relative to /g/app/pages
import PatientDashboard from "../components/PatientDashboard"; // Google variant
import StaffDashboard from "../components/StaffDashboard"; // Google variant
import AdminDashboard from "../components/AdminDashboard"; // Google variant
import AgentBoardroom from "../dashboard/AgentBoardroom"; // Google variant
import { Navigate } from "react-router-dom";
import "../../o/app/styles/apple-design.css"; // Reusing styles

const Dashboard = () => {
  const { profile, loading } = useAuth();
  const role = useRole();

  if (loading) {
    return (
      <section className="fade-in apple-card p-8 flex justify-center items-center">
        <div className="text-lg text-apple-subtle">Loading dashboard...</div>
      </section>
    );
  }

  if (!profile || !role) {
    return <Navigate to="/g/app/login" replace />; // Navigate to Google variant login
  }

  // For staff/admin, show AgentBoardroom. Otherwise, role-specific dashboards.
  // This logic mirrors the OpenAI version for UI consistency.
  if (role === "admin" || role === "staff") {
    // Show agent boardroom for staff/admin users (Google AI Variant)
    return (
      <div>
        <AgentBoardroom />
      </div>
    );
  }
  
  // Fallback & patient by default
  if (role === "patient") {
    return <PatientDashboard />;
  }

  // If role is somehow not covered, provide a generic message or default view
  return (
      <section className="fade-in apple-card p-8">
        <h2 className="text-2xl font-bold text-apple-header mb-3">Dashboard (Google AI)</h2>
        <p className="text-apple-detail">Your dashboard is loading or your role is not yet configured for a specific view.</p>
      </section>
  );
};

export default Dashboard;
