
import React, { useState } from "react";
import { useCredits } from "../../../hooks/useCredits";
import { Gift, Star, CalendarPlus, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import "../../app/styles/apple-design.css";

const CREDIT_TO_USD = 50;

const PatientWallet = () => {
  const { availableBalance, transactions, loading, getNextDropDate, getDaysUntilNextDrop } = useCredits();
  const [showDollarValue, setShowDollarValue] = useState(false);

  if (loading) {
    return (
      <section className="fade-in apple-card p-8 flex items-center justify-center min-h-[320px]">
        <div className="text-apple-subtle text-lg">Loading wallet...</div>
      </section>
    );
  }

  const nextDropDate = getNextDropDate();
  const daysUntilDrop = getDaysUntilNextDrop();
  const usdValue = availableBalance * CREDIT_TO_USD;

  return (
    <section className="fade-in apple-card p-6 max-w-2xl mx-auto">
      {/* Credit balance - Big Glow */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-3">
          <span className="animate-pulse rounded-full shadow-[0_0_56px_0_#FFD70088] block px-8 py-6 bg-[#F8F8F8] border border-[#FFD700]/70 text-5xl font-extrabold text-[#00274D]">
            {availableBalance}
          </span>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
        </div>
        <div className="text-lg text-apple-detail font-semibold">
          You have <span className="text-[#FFD700] font-bold">{availableBalance}</span> credits
        </div>
        <button
          className="mt-2 text-sm text-[#00274D] underline hover:text-[#FFD700] transition"
          onClick={() => setShowDollarValue((v) => !v)}
        >
          {showDollarValue ? `Hide Value` : `What’s this worth?`}
        </button>
        {showDollarValue && (
          <div className="text-lg mt-1 font-bold text-[#00274D]">
            ≈ ${usdValue.toLocaleString()} USD
          </div>
        )}
      </div>

      {/* Next credit drop with progress */}
      <div className="glass-blur flex flex-col md:flex-row items-center justify-between px-5 py-3 mb-4 rounded-2xl border border-[#F0F8FF] shadow">
        <div className="flex items-center gap-2 text-[#00274D]">
          <CalendarPlus className="w-6 h-6 text-[#FFD700]" />
          <span className="font-semibold">Next Drop:</span>
          <span className="ml-2">{format(nextDropDate, "MMM dd, yyyy")}</span>
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-0 text-[#00274D]">
          <Star className="w-5 h-5 text-[#FFD700]" />
          <span className="font-medium">
            {daysUntilDrop > 0 ? `${daysUntilDrop} days left` : "Today!"}
          </span>
        </div>
      </div>
      {/* Progress bar */}
      <div className="w-full h-4 bg-[#F0F8FF] rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-[#FFD700] transition-all"
          style={{
            width: `${100 - Math.min(100, (daysUntilDrop / 30) * 100)}%`,
          }}
        />
      </div>

      {/* Redeem credits CTA */}
      <div className="flex justify-center mb-7">
        <button
          className="btn-liquid-primary flex items-center gap-2"
          onClick={() => (window.location.href = "/o/app/book")}
        >
          Redeem Credits Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Referral & Bonus section */}
      <div className="glass-blur flex items-center px-5 py-3 mb-7 bg-[#F0F8FF] rounded-2xl border border-[#FFD700]/10 shadow">
        <Gift className="w-6 h-6 text-[#FFD700] mr-3" />
        <span className="font-semibold text-[#00274D] mr-1">Invite a friend:</span>
        <span className="text-apple-header">
          Earn <span className="text-[#FFD700] font-bold">1 bonus credit</span>
          &nbsp;when your referral completes a treatment!
        </span>
        {/* TODO: Add link generation */}
      </div>

      {/* Redemption History */}
      <div className="glass-blur px-5 py-5 rounded-2xl border border-[#e4e8ed]/70 shadow">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-[#FFD700]" />
          <h3 className="font-semibold text-apple-header text-lg">Redemption History</h3>
        </div>
        {transactions.length === 0 ? (
          <div className="text-apple-subtle text-center py-5">
            No redemptions yet. Use your credits to book your first treatment!
          </div>
        ) : (
          <ul className="divide-y divide-apple-subtle/40">
            {transactions
              .filter(tx => tx.type === "redemption" || tx.type === "referral_bonus" || tx.type === "manual_adjustment")
              .map((tx) => (
                <li key={tx.id} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-apple-header">
                      {tx.type === "redemption" && "Treatment Redemption"}
                      {tx.type === "referral_bonus" && "Referral Bonus"}
                      {tx.type === "manual_adjustment" && "Credit Adjustment"}
                    </div>
                    {tx.description && (
                      <div className="text-xs text-apple-detail">{tx.description}</div>
                    )}
                    <div className="text-xs text-apple-subtle">
                      {format(new Date(tx.created_at), "MMM dd, yyyy")}
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      tx.amount > 0 ? "text-[#00274D]" : "text-red-500"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount}
                    <span className="text-base font-normal ml-1">credits</span>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default PatientWallet;
