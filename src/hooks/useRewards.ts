
// Reward and Redemption Types
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface Reward {
  id: string;
  name: string;
  credit_cost: number;
  category?: string;
  description?: string;
  frequency_limit_days?: number | null;
  requires_booking: boolean;
  active: boolean;
  image_url?: string | null;
  visibility?: string | null;
}

export interface Redemption {
  id: string;
  reward_id: string;
  user_id: string;
  redeemed_at: string;
  status: string;
  credits_deducted: number;
  booking_id?: string | null;
  notes?: string | null;
}

export function useRewards() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [redeeming, setRedeeming] = useState(false);

  // Fetch available rewards
  const fetchRewards = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .eq("active", true)
      .order("credit_cost", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load rewards",
        variant: "destructive",
      });
      setRewards([]);
    } else {
      setRewards(data || []);
    }
    setLoading(false);
  };

  // Fetch the user's redemptions
  const fetchRedemptions = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("redemptions")
      .select("*")
      .eq("user_id", user.id)
      .order("redeemed_at", { ascending: false });

    setRedemptions(data || []);
  };

  // Redeem a reward
  const redeemReward = async ({
    reward,
    onSuccess,
    onError,
  }: {
    reward: Reward;
    onSuccess?: (redemption: Redemption) => void;
    onError?: (errMsg: string) => void;
  }) => {
    if (!user) return;
    setRedeeming(true);

    // Fetch user credits
    const { data: creditsData, error: creditsErr } = await supabase
      .from("credits")
      .select("*")
      .eq("user_id", user.id)
      .is("used_at", null);

    const totalCredits = (creditsData || []).reduce(
      (sum: number, c: any) => sum + c.amount,
      0
    );
    if (totalCredits < reward.credit_cost) {
      setRedeeming(false);
      onError?.("Not enough credits");
      toast({
        title: "Insufficient credits",
        description: "You do not have enough credits for this reward.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Frequency/limit check (future; basic check by credit only here)
    // TODO: Lock on concurrent redemption? Future

    // Deduct credits/insert redemption
    const { data, error } = await supabase
      .from("redemptions")
      .insert({
        user_id: user.id,
        reward_id: reward.id,
        credits_deducted: reward.credit_cost,
        status: reward.requires_booking ? "pending" : "completed",
      })
      .select()
      .single();

    setRedeeming(false);

    if (error) {
      onError?.(error.message || "Could not redeem reward");
      toast({
        title: "Error",
        description: error.message || "Could not redeem reward",
        variant: "destructive",
      });
      return;
    }

    // Force refetch rewards/redemptions after success
    fetchRedemptions();
    fetchRewards();
    onSuccess?.(data);
    toast({
      title: "Reward Redeemed!",
      description: reward.requires_booking
        ? `Book your ${reward.name} appointment next.`
        : `You redeemed ${reward.name} for ${reward.credit_cost} credits!`,
      variant: "default",
    });
  };

  useEffect(() => {
    fetchRewards();
    if (user) fetchRedemptions();
    // eslint-disable-next-line
  }, [user]);

  return {
    rewards,
    redemptions,
    loading,
    redeemReward,
    refetchRewards: fetchRewards,
    refetchRedemptions: fetchRedemptions,
    redeeming,
  };
}
