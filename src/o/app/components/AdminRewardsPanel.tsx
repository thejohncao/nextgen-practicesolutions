
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Reward } from "@/hooks/useRewards";

const emptyReward: Reward = {
  id: "", // not submitted to Supabase on insert
  name: "",
  credit_cost: 1,
  category: "",
  description: "",
  frequency_limit_days: null,
  requires_booking: false,
  active: true,
  image_url: "",
  visibility: "all",
};

const AdminRewardsPanel: React.FC = () => {
  const { toast } = useToast();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<Reward>(emptyReward);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchRewards = async () => {
    setLoading(true);
    const { data } = await supabase.from("rewards").select("*").order("created_at", { ascending: false });
    setRewards(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleEdit = (reward: Reward) => {
    setEditing(reward);
    setEditingId(reward.id);
  };

  const handleChange = (key: keyof Reward, value: any) => {
    setEditing((e) => ({
      ...e,
      [key]: key === "credit_cost" || key === "frequency_limit_days"
        ? (value !== "" ? Number(value) : null)
        : value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const { id, ...rest } = editing;

    // Validate required fields
    if (!editing.name || !editing.credit_cost) {
      toast({
        title: "Missing Fields",
        description: "Reward name and credit cost are required.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Always submit required fields!
    const rewardData = {
      name: editing.name,
      credit_cost: editing.credit_cost,
      category: editing.category || "",
      description: editing.description || "",
      frequency_limit_days: editing.frequency_limit_days,
      requires_booking: editing.requires_booking || false,
      active: editing.active ?? true,
      image_url: editing.image_url || "",
      visibility: editing.visibility || "all",
    };

    let result;
    if (editingId) {
      // Update existing
      result = await supabase.from("rewards").update(rewardData).eq("id", editingId);
    } else {
      // Create new
      result = await supabase.from("rewards").insert(rewardData);
    }
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Reward Saved", description: "Reward added/updated." });
      setEditing(emptyReward);
      setEditingId(null);
      fetchRewards();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditing(emptyReward);
    setEditingId(null);
  };

  return (
    <div className="my-8 max-w-3xl mx-auto fade-in">
      <h2 className="font-bold text-xl mb-5 text-[#00274D]">Manage Rewards Catalog</h2>
      <div className="bg-[#F0F8FF] rounded-lg border border-[#FFD700]/20 p-4 mb-6">
        <div className="flex flex-col gap-3 mb-3">
          <Input placeholder="Reward Name" value={editing.name ?? ""} onChange={e => handleChange("name", e.target.value)} />
          <Input placeholder="Description" value={editing.description ?? ""} onChange={e => handleChange("description", e.target.value)} />
          <Input placeholder="Category" value={editing.category ?? ""} onChange={e => handleChange("category", e.target.value)} />
          <Input placeholder="Image URL" value={editing.image_url ?? ""} onChange={e => handleChange("image_url", e.target.value)} />
          <Input
            type="number"
            min={1}
            placeholder="Credit Cost"
            value={editing.credit_cost ?? 1}
            onChange={e => handleChange("credit_cost", e.target.value)}
          />
          <Input
            type="number"
            min={1}
            placeholder="Frequency Limit (days)"
            value={editing.frequency_limit_days ?? ""}
            onChange={e => handleChange("frequency_limit_days", e.target.value)}
          />
          <label className="flex gap-2 items-center">
            <input type="checkbox" checked={!!editing.requires_booking}
              onChange={e => handleChange("requires_booking", e.target.checked)} />
            Requires Booking
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" checked={!!editing.active}
              onChange={e => handleChange("active", e.target.checked)} />
            Active
          </label>
          <Input placeholder="Visibility (all/member/vip)" value={editing.visibility ?? ""} onChange={e => handleChange("visibility", e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>
            {editingId ? "Update" : "Create"}
          </Button>
          <Button onClick={handleCancel} variant="secondary">Cancel</Button>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">Current Rewards</h3>
        <div className="space-y-3">
          {rewards.map(reward => (
            <div key={reward.id} className="flex items-center gap-4 bg-white border border-[#F0F8FF] rounded-lg px-4 py-3">
              <div className="font-bold text-[#00274D] flex-1">{reward.name}</div>
              <div className="bg-[#FFD700]/30 px-2 py-0.5 rounded text-sm font-bold text-[#00274D]">{reward.credit_cost} credits</div>
              <Button size="sm" onClick={() => handleEdit(reward)}>Edit</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRewardsPanel;
