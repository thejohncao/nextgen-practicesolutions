
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useCredits } from "../../../hooks/useCredits";
import { User, Star, Plus, Wallet, Gift } from "lucide-react";
import "../../app/styles/apple-design.css";

const QuickActionButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <button
    className={
      "flex items-center border px-4 py-2 rounded-lg bg-[#F0F8FF] text-[#00274D] font-semibold shadow hover:bg-[#e7eff9] transition mb-0.5 " +
      className
    }
    onClick={onClick}
  >
    <Icon className="w-5 h-5 mr-2" /> {label}
  </button>
);

const PatientDashboard = () => {
  const { profile } = useAuth();
  const { availableBalance, getNextDropDate, getDaysUntilNextDrop } = useCredits();

  const firstName = profile?.first_name || "Friend";
  const nextDropDate = getNextDropDate();
  const daysUntilDrop = getDaysUntilNextDrop();

  // Demo treatments
  const treatments = [
    { name: "Glow Facial", credits: 3 },
    { name: "HydraBoost", credits: 2 },
    { name: "Revive Peel", credits: 4 },
  ];

  return (
    <section className="fade-in apple-card p-8 max-w-2xl mx-auto">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-apple-detail mb-2">Welcome Back</h2>
        <div className="text-2xl font-bold text-apple-header">
          Hi {firstName}, you have&nbsp;
          <span className="text-[#00274D]">{availableBalance}</span> credits available
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mb-5 flex flex-wrap gap-3">
        <QuickActionButton icon={Plus} label="Book Treatment" onClick={() => window.location.href='/o/app/book'} />
        <QuickActionButton icon={Wallet} label="View Wallet" onClick={() => window.location.href='/o/app/wallet'} />
        <QuickActionButton icon={Gift} label="Invite a Friend" onClick={() => window.location.href='/o/app/wallet#invite'} />
      </div>
      {/* AI Concierge */}
      <div className="mb-6">
        <button
          className="bg-[#FFD700] text-[#00274D] px-6 py-3 rounded-2xl shadow hover:shadow-md transition hover:bg-[#ffd700cc] font-bold text-lg"
          onClick={() => window.dispatchEvent(new CustomEvent("openMiles"))}
        >
          Talk to Miles <User className="inline w-4 h-4 ml-2 mb-0.5" />
        </button>
      </div>
      {/* This Month's Drop */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-[#FFD700]" />
          <span className="font-semibold text-[#00274D]">This Month’s Drop</span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <div>Next 2 credits drop {nextDropDate?.toLocaleDateString(undefined, { month: "long", day: "numeric" })}</div>
          <div className="text-[#FFD700] font-medium">
            {daysUntilDrop > 0 ? `${daysUntilDrop}d left` : "Today!"}
          </div>
        </div>
        <div className="relative h-3 w-full bg-[#f0ead8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FFD700] transition-all"
            style={{
              width: `${100 - Math.min(100, (daysUntilDrop / 30) * 100)}%`,
            }}
          />
        </div>
      </div>
      {/* Treatment Ideas */}
      <div>
        <div className="font-semibold text-apple-header mb-3">Treatment Ideas</div>
        <ul className="flex flex-col gap-2">
          {treatments.map((t) => (
            <li key={t.name} className="bg-[#F0F8FF] border border-[#eadaaa] rounded-xl px-5 py-3 flex justify-between items-center">
              <span className="text-apple-detail">{t.name}</span>
              <span className="font-bold text-[#00274D]">{t.credits} credits</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PatientDashboard;
