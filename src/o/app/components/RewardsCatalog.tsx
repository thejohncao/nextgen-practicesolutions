
import React, { useState } from "react";
import { useRewards, Reward } from "@/hooks/useRewards";
import { Sparkles, BadgeCheck, Loader2, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  "#FFD700", // gold
  "#00274D", // navy
  "#F0F8FF", // light blue
  "#A8FFCB", // mint for accent
];

// Helper: Get a color per row for badge and accents
const getColor = (idx: number) => COLORS[idx % COLORS.length];

const RewardCard: React.FC<{
  reward: Reward;
  onRedeem: () => void;
  disabled: boolean;
  showSuccess: boolean;
}> = ({ reward, onRedeem, disabled, showSuccess }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className="relative bg-white rounded-2xl p-5 border border-[#F0F8FF] shadow-sm flex flex-col gap-2 w-full max-w-md"
  >
    <div className="flex items-center gap-3">
      {reward.image_url ? (
        <img src={reward.image_url} alt={reward.name} className="w-12 h-12 rounded-lg object-cover border border-[#F0F8FF]" />
      ) : (
        <Sparkles className="w-10 h-10 text-[#FFD700]" />
      )}
      <div>
        <div className="font-bold text-[#00274D] text-lg">{reward.name}</div>
        <div className="flex gap-2 items-center mt-1">
          <span className="bg-[#FFD700]/20 text-[#00274D] px-2 py-0.5 rounded text-xs font-bold border border-[#FFD700]/40">
            {reward.credit_cost} Credit{reward.credit_cost > 1 ? "s" : ""}
          </span>
          {reward.category && (
            <span className="bg-[#F0F8FF] text-apple-header px-2 py-0.5 rounded text-xs border">
              {reward.category}
            </span>
          )}
        </div>
      </div>
    </div>
    {reward.description && (
      <div className="mt-1 text-apple-detail text-sm">{reward.description}</div>
    )}
    <div className="mt-4 flex gap-3">
      {reward.requires_booking ? (
        <Button
          disabled={disabled}
          variant="secondary"
          className="font-bold flex-1 rounded-lg flex items-center gap-2 justify-center"
          onClick={onRedeem}
        >
          <Calendar className="w-4 h-4" />
          Book Now
        </Button>
      ) : (
        <Button
          disabled={disabled}
          className="bg-[#FFD700] text-[#00274D] font-bold flex-1 rounded-lg flex items-center gap-2 justify-center"
          onClick={onRedeem}
        >
          <BadgeCheck className="w-4 h-4" />
          Redeem
        </Button>
      )}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="ml-3 flex items-center gap-1 text-green-700 animate-fade-in"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold">Success!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const RewardsCatalog: React.FC = () => {
  const { rewards, loading, redeemReward, redeeming } = useRewards();
  const [successMap, setSuccessMap] = useState<{ [k: string]: boolean }>({});

  const handleRedeem = (reward: Reward) => {
    redeemReward({
      reward,
      onSuccess: () => {
        setSuccessMap((map) => ({ ...map, [reward.id]: true }));
        setTimeout(() => {
          setSuccessMap((map) => ({ ...map, [reward.id]: false }));
        }, 1600);
      },
      onError: () => {},
    });
  };

  return (
    <div className="my-8 flex flex-col items-center gap-8 fade-in w-full">
      <h2 className="text-2xl font-bold mb-3 text-[#00274D] flex gap-2 items-center">
        <Sparkles className="w-7 h-7 text-[#FFD700]" />
        Redeem Your Credits
      </h2>
      {loading ? (
        <div className="flex items-center gap-2 text-[#FFD700] text-lg">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading available rewards...
        </div>
      ) : rewards.length === 0 ? (
        <div className="text-apple-subtle text-lg">No rewards available right now. Check back later!</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full">
          {rewards.map((r, i) => (
            <RewardCard
              key={r.id}
              reward={r}
              onRedeem={() => handleRedeem(r)}
              disabled={redeeming}
              showSuccess={!!successMap[r.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RewardsCatalog;
