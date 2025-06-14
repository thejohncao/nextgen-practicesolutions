
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const modules = [
  { key: "users", label: "👥 Users", desc: "Manage all platform members and roles" },
  { key: "roles", label: "🎖️ Roles & Access", desc: "Assign and update staff, admin, member access" },
  { key: "credits", label: "💳 Credits & Wallet", desc: "View/add/deduct credits, referrals, history" },
  { key: "analytics", label: "📊 Analytics", desc: "KPIs, engagement, referral & appointment stats" },
  { key: "billing", label: "🧾 Billing / Plans", desc: "Subscriptions, active plans, payments" },
  { key: "settings", label: "⚙️ System Settings", desc: "Configure branding, onboarding, notifications" },
  { key: "modules", label: "🧩 Modules", desc: "Toggle major features per tenant/business" },
  { key: "logs", label: "💬 Support / Logs", desc: "Error & event tracking, user trails" },
];

const AdminCommandCenter = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  // Protect route: only Admins allowed
  if (loading) {
    return <div className="flex justify-center items-center h-64 text-white">Loading Admin Center...</div>;
  }
  if (!profile || profile.role !== "admin") {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-red-400">
        Admin access only. You do not have permission to view this page.
      </div>
    );
  }

  return (
    <section className="fade-in min-h-screen bg-gradient-to-br from-[#00274D] to-[#F0F8FF] pt-16 pb-28 px-4 md:px-14">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#00274D] mb-2 tracking-tight">Admin Command Center</h1>
        <p className="text-lg text-[#00274D]/80 mb-8">
          One dashboard to manage users, credits, analytics, settings, and more. Card-based Apple-style module layout!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((mod) => (
            <div key={mod.key}
              className="rounded-2xl bg-white/60 shadow-lg border border-[#00274D]/10 p-7 backdrop-blur-md flex flex-col transition hover:scale-105 duration-200"
            >
              <span className="text-2xl mb-2">{mod.label}</span>
              <span className="block text-[#00274D] font-semibold leading-snug mb-1">{mod.desc}</span>
              <button
                className="mt-5 px-4 py-2 bg-[#00274D] text-[#FFD700] rounded-full font-bold transition hover:bg-[#001F3B]"
                onClick={() => navigate(`/o/app/admin/${mod.key}`)}
                aria-label={`Open ${mod.label}`}
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminCommandCenter;
