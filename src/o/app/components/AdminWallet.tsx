
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import "../../app/styles/apple-design.css";

// Admin Wallet analytics using the new Glow Wallet tables
const AdminWallet = () => {
  const [loading, setLoading] = useState(true);
  const [walletCount, setWalletCount] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [txCount, setTxCount] = useState(0);
  const [bonusCount, setBonusCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    // Aggregate wallet stats
    Promise.all([
      supabase.from("wallets").select("count:id"),
      supabase.from("wallets").select("balance"),
      supabase.from("wallet_transactions").select("count:id"),
      supabase.from("credit_events").select("count:id", {head: false}),
    ]).then(([c1, c2, c3, c4]) => {
      setWalletCount(c1.data?.length ?? 0);
      // sum balances
      setTotalBalance((c2.data || []).reduce((sum, w) => sum + (w.balance ?? 0), 0));
      setTxCount(c3.data?.length ?? 0);
      setBonusCount(c4.data?.length ?? 0);
      setLoading(false);
    });
  }, []);

  return (
    <section className="fade-in apple-card p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-apple-header mb-3">Global Wallet Metrics</h2>
      <p className="text-apple-detail mb-5">
        View system-wide credit usage, perform adjustments, and export data.
      </p>
      <div className="bg-[#F0F8FF] border border-[#FFD700]/20 rounded-xl text-apple-header px-4 py-12 text-center">
        {loading ? (
          <div>Loading wallet analytics...</div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center items-center font-bold text-xl">
            <div>
              <div className="text-apple-header text-3xl">{walletCount}</div>
              <div className="text-apple-subtle">Wallets Created</div>
            </div>
            <div>
              <div className="text-[#FFD700] text-3xl">${(totalBalance/100).toLocaleString()}</div>
              <div className="text-apple-subtle">Total Unspent Balance</div>
            </div>
            <div>
              <div className="text-nextgen-purple text-3xl">{txCount}</div>
              <div className="text-apple-subtle">All Wallet Transactions</div>
            </div>
            <div>
              <div className="text-green-500 text-3xl">{bonusCount}</div>
              <div className="text-apple-subtle">Bonus/Credit Events</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminWallet;
