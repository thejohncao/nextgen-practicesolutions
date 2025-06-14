import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import PatientDashboard from "../components/PatientDashboard";
import StaffDashboard from "../components/StaffDashboard";
import AdminDashboard from "../components/AdminDashboard";
import { Navigate } from "react-router-dom";
import "../../app/styles/apple-design.css";
import AgentBoardroom from "../dashboard/AgentBoardroom";

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
    return <Navigate to="/o/app/login" replace />;
  }

  if (role === "admin" || role === "staff") {
    // Show agent boardroom for staff/admin users
    return (
      <div>
        <AgentBoardroom />
      </div>
    );
  }
  // Fallback & patient by default
  return <PatientDashboard />;
};

export default Dashboard;
