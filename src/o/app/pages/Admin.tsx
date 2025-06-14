
import React from "react";
import { useRole } from "../hooks/useRole";
import { Navigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AdminUsersTab from "../components/admin/AdminUsersTab";
import AdminCreditsTab from "../components/admin/AdminCreditsTab";
import AdminAnalyticsTab from "../components/admin/AdminAnalyticsTab";
import AdminSettingsTab from "../components/admin/AdminSettingsTab";
import "../../app/styles/apple-design.css";

const TAB_ITEMS = [
  { id: "users", label: "Users" },
  { id: "credits", label: "Credits" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
];

const Admin = () => {
  const role = useRole();

  if (role !== "admin") {
    return <Navigate to="/o/app/login" replace />;
  }

  return (
    <section className="fade-in apple-card max-w-[1080px] mx-auto mt-6 p-0 min-h-[600px]">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="flex gap-2 bg-[#F0F8FF] border-b border-[#FFD700]/10 rounded-t-2xl px-6 pt-4 mb-0">
          {TAB_ITEMS.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="font-semibold text-base px-5 py-2 data-[state=active]:text-[#00274D] data-[state=active]:bg-[#FFD700]/10 rounded-xl transition-all"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="users" className="px-6 pb-6 pt-4"><AdminUsersTab /></TabsContent>
        <TabsContent value="credits" className="px-6 pb-6 pt-4"><AdminCreditsTab /></TabsContent>
        <TabsContent value="analytics" className="px-6 pb-6 pt-4"><AdminAnalyticsTab /></TabsContent>
        <TabsContent value="settings" className="px-6 pb-6 pt-4"><AdminSettingsTab /></TabsContent>
      </Tabs>
    </section>
  );
};

export default Admin;
