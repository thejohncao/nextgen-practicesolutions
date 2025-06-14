
import React from "react";
import "../../app/styles/apple-design.css";

// Staff Wallet placeholder - you might extend it to search for patient wallets!
const StaffWallet = () => (
  <section className="fade-in apple-card p-8 max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold text-apple-header mb-3">Patient Wallet Lookup</h2>
    <p className="text-apple-detail mb-3">Search and view patient credit balances and history.</p>
    {/* TODO: Implement patient lookup search and wallet view */}
    <div className="bg-[#F0F8FF] border border-[#FFD700]/20 rounded-xl text-apple-header px-4 py-8 text-center">
      Coming soon: Staff will be able to view any patient’s wallet, track credits, and manage support requests.
    </div>
  </section>
);

export default StaffWallet;
