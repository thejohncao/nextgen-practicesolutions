
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type MembershipTier = {
  id?: string;
  name: string;
  monthly_price_cents: number;
  credits_per_month: number;
  perks: string[];
  referral_bonus_multiplier: number;
  badge_label?: string;
  stripe_price_id?: string;
  annual_price_cents?: number;
  upgrade_eligible: boolean;
  is_active: boolean;
};

const emptyTier: MembershipTier = {
  name: "",
  monthly_price_cents: 0,
  credits_per_month: 1,
  perks: [],
  referral_bonus_multiplier: 1,
  badge_label: "",
  stripe_price_id: "",
  annual_price_cents: undefined,
  upgrade_eligible: true,
  is_active: true,
};

const AdminMembershipTiersTab: React.FC = () => {
  const { toast } = useToast();
  const [tiers, setTiers] = useState<MembershipTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTier, setEditTier] = useState<MembershipTier>(emptyTier);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTiers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("membership_tiers").select("*").order("monthly_price_cents", { ascending: true });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setTiers((data || []).map(d => ({
        ...d,
        perks: Array.isArray(d.perks) ? d.perks : (d.perks ? JSON.parse(d.perks) : [])
      })));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTiers();
    // eslint-disable-next-line
  }, []);

  const handleChange = (key: keyof MembershipTier, value: any) => {
    setEditTier(prev => ({
      ...prev,
      [key]: key === "monthly_price_cents" || key === "credits_per_month" || key === "annual_price_cents"
        ? Number(value)
        : key === "referral_bonus_multiplier"
          ? Number(value)
          : value,
    }));
  };

  const handlePerksChange = (value: string) => {
    setEditTier(prev => ({
      ...prev,
      perks: value.split("\n").filter(Boolean)
    }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!editTier.name || editTier.monthly_price_cents <= 0 || editTier.credits_per_month <= 0) {
      toast({ title: "Missing Fields", description: "Name, Monthly Price, and Credits/Month required", variant: "destructive" });
      return;
    }
    setLoading(true);
    const newTier = {
      ...editTier,
      perks: editTier.perks,
      badge_label: editTier.badge_label || null,
      stripe_price_id: editTier.stripe_price_id || null,
      annual_price_cents: editTier.annual_price_cents || null,
    };
    let result;
    if (editingId) {
      // Update
      result = await supabase.from("membership_tiers").update({
        ...newTier,
        updated_at: new Date().toISOString(),
      }).eq("id", editingId);
    } else {
      // Insert
      result = await supabase.from("membership_tiers").insert({
        ...newTier,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    if (result.error) {
      toast({ title: "Error", description: result.error.message, variant: "destructive" });
    } else {
      toast({ title: "Tier Saved", description: "Membership tier saved." });
      setEditTier(emptyTier);
      setEditingId(null);
      fetchTiers();
    }
    setLoading(false);
  };

  const handleEdit = (tier: MembershipTier) => {
    setEditTier({ ...tier, perks: tier.perks || [] });
    setEditingId(tier.id ?? null);
  };

  const handleCancel = () => {
    setEditTier(emptyTier);
    setEditingId(null);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 fade-in">
      <h2 className="font-bold text-2xl mb-5 text-[#00274D]">Membership Tiers</h2>
      <div className="bg-[#F0F8FF] rounded-lg border border-[#FFD700]/20 p-4 mb-6 space-y-3">
        <Input
          placeholder="Tier Name"
          value={editTier.name}
          onChange={e => handleChange("name", e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Badge (optional, e.g. Most Popular)"
          value={editTier.badge_label ?? ''}
          onChange={e => handleChange("badge_label", e.target.value)}
          className="mb-2"
        />
        <Input
          type="number"
          min={1}
          placeholder="Monthly Price (USD cents, e.g. 4900 = $49.00)"
          value={editTier.monthly_price_cents}
          onChange={e => handleChange("monthly_price_cents", e.target.value)}
          className="mb-2"
        />
        <Input
          type="number"
          min={1}
          placeholder="Credits per Month"
          value={editTier.credits_per_month}
          onChange={e => handleChange("credits_per_month", e.target.value)}
          className="mb-2"
        />
        <Input
          type="number"
          min={0}
          placeholder="Referral Bonus Multiplier (e.g. 2 = double bonus)"
          value={editTier.referral_bonus_multiplier}
          onChange={e => handleChange("referral_bonus_multiplier", e.target.value)}
          className="mb-2"
        />
        <Input
          type="number"
          min={0}
          placeholder="Annual Price (USD cents, optional)"
          value={editTier.annual_price_cents || ""}
          onChange={e => handleChange("annual_price_cents", e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Stripe Price ID (for recurring billing, optional)"
          value={editTier.stripe_price_id ?? ""}
          onChange={e => handleChange("stripe_price_id", e.target.value)}
          className="mb-2"
        />
        <textarea
          placeholder="Perks (one per line)"
          value={editTier.perks.join("\n")}
          onChange={e => handlePerksChange(e.target.value)}
          className="mb-2 rounded border p-2 h-28"
        />
        <div className="flex gap-4 items-center mb-2">
          <label className="flex items-center gap-2 font-medium text-[#00274D]">
            <input
              type="checkbox"
              checked={editTier.upgrade_eligible}
              onChange={e => handleChange("upgrade_eligible", e.target.checked)}
            />
            Upgrade-eligible
          </label>
          <label className="flex items-center gap-2 font-medium text-[#00274D]">
            <input
              type="checkbox"
              checked={editTier.is_active}
              onChange={e => handleChange("is_active", e.target.checked)}
            />
            Active
          </label>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>
            {editingId ? "Update" : "Create Tier"}
          </Button>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-2">Available Tiers</h3>
      <div className="space-y-3">
        {tiers.map((tier, idx) => (
          <div key={tier.id} className="flex flex-col md:flex-row items-center gap-3 bg-white border border-[#F0F8FF] rounded-lg px-4 py-3">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#00274D] text-lg">{tier.name}</span>
                {tier.badge_label && <span className="bg-[#FFD700]/30 rounded-full px-2 text-xs font-bold text-[#00274D]">{tier.badge_label}</span>}
              </div>
              <div className="text-sm text-[#00274D] mt-0.5">
                ${Number(tier.monthly_price_cents / 100).toFixed(2)} / mo • {tier.credits_per_month} credit{tier.credits_per_month > 1 ? "s" : ""}
              </div>
              <ul className="mt-1 text-sm text-[#00274D] list-disc ml-5">
                {tier.perks.map((perk, idx2) => <li key={idx2}>{perk}</li>)}
              </ul>
              <div className="flex gap-3 mt-1 text-xs text-[#333]">
                {tier.upgrade_eligible && <span className="px-2 bg-green-100 rounded-full">Upgradeable</span>}
                {tier.is_active ? <span className="px-2 bg-blue-100 rounded-full">Active</span> : <span className="px-2 bg-red-100 rounded-full">Inactive</span>}
              </div>
            </div>
            <div>
              <Button size="sm" onClick={() => handleEdit(tier)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMembershipTiersTab;

