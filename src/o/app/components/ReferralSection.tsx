
import React, { useState } from "react";
import { useReferrals } from "@/hooks/useReferrals";
import { Gift, Copy, Check, Users, Trophy } from "lucide-react";

const ReferralSection = () => {
  const {
    referrals,
    userReferralCode,
    loading,
    getCompletedReferrals,
    getTotalBonusCredits,
    getReferralLink,
  } = useReferrals();

  const [copied, setCopied] = useState(false);

  const completed = getCompletedReferrals();
  const totalReferrals = referrals.length;
  const totalBonus = getTotalBonusCredits();
  const milestone = 5; // Could fetch this from settings in future step

  const handleCopy = () => {
    navigator.clipboard.writeText(getReferralLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  return (
    <div className="bg-[#F0F8FF] rounded-2xl border border-[#FFD700]/20 my-7 px-6 py-7 shadow flex flex-col gap-4 items-center">
      <h3 className="font-bold text-xl text-[#00274D] flex items-center gap-2 mb-1">
        <Gift className="w-6 h-6 text-[#FFD700]" />
        Invite Friends, Earn Credits
      </h3>
      <p className="text-apple-detail text-center max-w-lg mb-2">
        Share your referral link. When friends join & complete treatment, both of you get bonus credits!
      </p>
      {/* Referral Link Copy + Share */}
      <div className="flex gap-2 items-center mb-1">
        <div className="bg-white border border-[#FFD700]/25 rounded-lg px-3 py-1 font-mono text-[#00274D] flex items-center gap-2 select-all">
          {userReferralCode ? getReferralLink() : "Loading..."}
        </div>
        <button
          className="flex items-center px-3 py-1 rounded-md bg-[#FFD700] hover:bg-[#FFD700CC] shadow text-[#00274D] font-bold gap-1 transition relative"
          onClick={handleCopy}
          disabled={copied}
          aria-label="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-green-600 animate-fade-in" /> : <Copy className="w-4 h-4" />}
          <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
        </button>
        {/* Optionally: Social share in future */}
      </div>
      {/* Progress bar + milestone */}
      <div className="w-full sm:w-1/2 flex flex-col items-center my-2">
        <div className="flex items-center gap-2 text-[#00274D] mb-1">
          <Users className="w-5 h-5" />
          <span className="font-medium">
            {completed.length} / {milestone} Referrals Complete
          </span>
          {completed.length >= milestone && (
            <Trophy className="w-5 h-5 text-[#FFD700] animate-fade-up" />
          )}
        </div>
        <div className="relative w-full h-3 bg-white rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-[#FFD700] transition-all duration-500"
            style={{
              width: `${Math.min(100, (completed.length / milestone) * 100)}%`,
            }}
          />
        </div>
        <div className="text-xs text-gray-400">
          {milestone - completed.length > 0
            ? `${milestone - completed.length} more for milestone bonus`
            : "Milestone reached!"}
        </div>
      </div>
      {/* Bonus */}
      <div className="text-green-700 font-bold mt-2 flex items-center gap-2">
        +{totalBonus} credits earned<br />
      </div>
      {/* Referral History */}
      <div className="w-full mt-3">
        <h4 className="text-[#00274D] font-semibold mb-2 flex items-center gap-1 text-base">
          <Gift className="w-4 h-4 text-[#FFD700]" /> Referral History
        </h4>
        {referrals.length === 0 ? (
          <div className="text-apple-subtle text-center py-2">No referrals yet.</div>
        ) : (
          <ul className="divide-y divide-[#e4e8ed]/50">
            {referrals.map((ref) => (
              <li key={ref.id} className="py-2 flex justify-between items-center text-sm">
                <div>
                  {ref.invitee_email ? (
                    <span className="font-medium text-[#00274D]">{ref.invitee_email}</span>
                  ) : (
                    <span className="text-apple-subtle">Joined by link</span>
                  )}
                  <span className="ml-1 text-apple-detail">
                    ({ref.status === "completed" ? "Completed" : "Pending"})
                  </span>
                </div>
                <div>
                  {ref.completed_at ? (
                    <span className="rounded bg-green-100 text-green-700 px-2 py-1 text-xs">+{ref.bonus_credits ?? 1} credit</span>
                  ) : (
                    <span className="rounded bg-yellow-50 text-yellow-700 px-2 py-1 text-xs">Waiting</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReferralSection;
