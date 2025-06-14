
import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth"; // Path relative to /g/app/pages
import { Navigate } from "react-router-dom";
import "../../o/app/styles/apple-design.css"; // Reusing styles

const Login = () => {
  const { profile, signIn, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  if (profile) {
    return <Navigate to="/g/app/dashboard" replace />; // Redirect to Google variant dashboard
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await signIn(form.email, form.password);
    if (error) setError(error.message || "Login failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-apple-bg">
      <form onSubmit={handleSubmit} className="apple-login-form apple-card glass-blur px-8 py-10 w-full max-w-sm fade-in">
        <h2 className="text-2xl font-bold text-apple-header mb-5">Sign In (Google AI Variant)</h2>
        <input
          className="apple-input"
          type="email"
          placeholder="Email"
          value={form.email}
          required
          autoFocus
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="apple-input"
          type="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" disabled={loading} className="apple-cta-btn mt-4 w-full">
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
