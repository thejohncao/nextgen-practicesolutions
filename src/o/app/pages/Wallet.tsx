
import React from "react";
import { useCredits } from "../../../hooks/useCredits";
import { Wallet as WalletIcon, Gift, Star, History, CalendarPlus } from "lucide-react";
import "../../app/styles/apple-design.css";
import { format } from "date-fns";

const Wallet = () => {
  const {
    availableBalance,
    transactions,
    loading,
    getNextDropDate,
    getDaysUntilNextDrop
  } = useCredits();

  if (loading) {
    return (
      <section className="fade-in apple-card p-8 flex items-center justify-center min-h-[320px]">
        <div className="text-apple-subtle text-lg">Loading wallet...</div>
      </section>
    );
  }

  const nextDropDate = getNextDropDate();
  const daysUntilDrop = getDaysUntilNextDrop();

  return (
    <section className="fade-in apple-card p-8 max-w-2xl mx-auto">
      {/* Wallet Title + Balance */}
      <div className="flex items-center mb-6">
        <WalletIcon className="w-9 h-9 mr-3 text-[#FFD700]" />
        <div>
          <h2 className="text-2xl font-bold text-apple-header mb-1">Beauty Credit Wallet</h2>
          <div className="text-lg text-apple-detail font-semibold">
            Credit Balance:{" "}
            <span className="text-[#00274D] font-bold text-3xl align-middle animate-pulse">
              {availableBalance}
            </span>
            <span className="text-apple-subtle ml-2 text-base font-normal">Credits</span>
          </div>
          <div className="text-apple-subtle mt-1">Est. Value: ${(availableBalance * 50).toLocaleString()}</div>
        </div>
      </div>
      
      {/* Membership & Next Drop */}
      <div className="glass-blur flex flex-col md:flex-row items-center justify-between px-6 py-4 mb-6 rounded-2xl border border-[#F0F8FF] shadow">
        <div className="flex items-center gap-2 text-[#00274D]">
          <CalendarPlus className="w-6 h-6 text-[#FFD700]" />
          <span className="font-semibold">Membership: </span>
          <span className="text-apple-detail ml-2">
            2 credits/month
          </span>
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-0 text-apple-header text-lg font-medium">
          <Star className="w-5 h-5 text-[#FFD700]" />
          Next Credit Drop in <span className="font-bold ml-1">{daysUntilDrop > 0 ? daysUntilDrop : 0}</span> days
          <span className="ml-3 text-apple-subtle text-sm">({format(nextDropDate, "MMM dd, yyyy")})</span>
        </div>
      </div>
      
      {/* Referral Section */}
      <div className="glass-blur flex items-center px-6 py-4 mb-6 bg-[#F0F8FF] rounded-2xl border border-[#FFD700]/10 shadow">
        <Gift className="w-6 h-6 text-[#FFD700] mr-3" />
        <span className="font-semibold text-[#00274D]">Invite a friend:</span>
        <span className="text-apple-header ml-2">Earn <span className="font-bold text-[#FFD700]">1 bonus credit</span> for each successful referral!</span>
      </div>

      {/* Transaction History */}
      <div className="glass-blur px-6 py-5 rounded-2xl border border-[#e4e8ed]/70 shadow">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-apple-detail" />
          <h3 className="font-semibold text-apple-header text-lg">Transaction History</h3>
        </div>
        {transactions.length === 0 ? (
          <div className="text-apple-subtle text-center py-5">
            No transactions yet. Your first credit drop will appear here!
          </div>
        ) : (
          <ul className="divide-y divide-apple-subtle/40">
            {transactions.map(tx => (
              <li key={tx.id} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-apple-header">
                    {tx.type === "credit_drop" && "Monthly Credit Drop"}
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
                    tx.amount > 0
                      ? "text-[#00274D]"
                      : "text-red-500"
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

export default Wallet;

