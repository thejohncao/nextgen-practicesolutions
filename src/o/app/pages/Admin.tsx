
import React from "react";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AdminUsersTab from "../components/admin/AdminUsersTab";
import AdminCreditsTab from "../components/admin/AdminCreditsTab";
import AdminAnalyticsTab from "../components/admin/AdminAnalyticsTab";
import AdminSettingsTab from "../components/admin/AdminSettingsTab";
import "../../app/styles/apple-design.css";
import AdminCommandCenter from "./AdminCommandCenter";

const TAB_ITEMS = [
  { id: "users", label: "Users" },
  { id: "credits", label: "Credits" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
];

const Admin = () => {
  const { profile, loading } = useAuth();
  // Insert AdminCommandCenter on main route for /o/app/admin
  if (loading) {
    return (
      <section className="fade-in apple-card p-8 flex items-center justify-center min-h-[320px]">
        <div className="text-apple-subtle text-lg">Loading admin...</div>
      </section>
    );
  }
  if (!profile || profile.role !== "admin") {
    return null; // Prevent render if not admin
  }
  // Main: show new AdminCommandCenter dashboard landing.
  return <AdminCommandCenter />;
};

export default Admin;

