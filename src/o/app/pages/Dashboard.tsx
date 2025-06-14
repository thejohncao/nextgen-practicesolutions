
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import "../../app/styles/apple-design.css";

const Dashboard = () => {
  const { profile } = useAuth();
  const role = useRole();

  if (role === "admin") {
    return (
      <section className="fade-in apple-card p-8">
        <h2 className="text-2xl font-bold text-apple-header mb-3">Admin Dashboard</h2>
        <ul className="space-y-2 text-apple-detail">
          <li>System Metrics: <span className="font-bold">Coming Soon</span></li>
          <li>Users: <span className="font-bold">Coming Soon</span></li>
        </ul>
      </section>
    );
  }

  return (
    <section className="fade-in apple-card p-8">
      <h2 className="text-2xl font-bold text-apple-header mb-3">Credit Overview</h2>
      <div className="mb-5 text-apple-detail">
        <strong>Balance:</strong> $100 (includes bonuses)<br />
        <strong>Upcoming Credits:</strong> 2/month<br />
        <strong>Shortcuts:</strong> <span className="underline text-blue-500">Book</span>, <span className="underline text-blue-500">Wallet</span>
      </div>
    </section>
  );
};

export default Dashboard;
