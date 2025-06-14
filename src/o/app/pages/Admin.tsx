
import React from "react";
import "../../app/styles/apple-design.css";

const Admin = () => (
  <section className="fade-in apple-card p-8">
    <h2 className="text-2xl font-bold text-apple-header mb-3">Admin Console</h2>
    <p className="mb-4 text-apple-detail">Manage users, roles, credits, and analytics here.</p>
    <ul className="list-disc ml-6 text-apple-detail">
      <li>User management (coming soon)</li>
      <li>Credit issuance tools (coming soon)</li>
      <li>Analytics dashboard (coming soon)</li>
    </ul>
  </section>
);

export default Admin;
