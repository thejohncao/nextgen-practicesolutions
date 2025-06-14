
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const initialDefaults = {
  bonus_credits: 1,
  milestone_count: 5,
  milestone_bonus: 2,
  link_expiry_days: 30,
  max_per_user: 30,
};

function ReferralAdminSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<any>(initialDefaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("referral_settings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data[0]) {
        setSettings({
          ...initialDefaults,
          ...data[0],
        });
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: value !== "" ? (Number.isNaN(+value) ? value : Number(value)) : "",
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Upsert, assuming singleton row
    const { error } = await supabase
      .from("referral_settings")
      .upsert({
        ...settings,
        updated_at: new Date().toISOString(),
      });
    setLoading(false);
    if (error) {
      toast({
        title: "Error saving referral settings",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Referral Settings Updated",
        description: "Referral configuration saved."
      });
    }
  };

  if (loading) return <div className="py-6 text-apple-subtle">Loading...</div>;

  return (
    <div className="rounded-xl border border-[#FFD700]/20 p-5 bg-[#F0F8FF] my-8 max-w-xl">
      <h3 className="font-bold text-[#00274D] text-lg mb-4">Referral Program Settings</h3>
      <div className="flex flex-col gap-4">
        <label className="font-medium text-[#00274D] flex flex-col">
          Bonus Credits per Referral
          <Input type="number" value={settings.bonus_credits || ""} min={1}
            onChange={e => handleChange("bonus_credits", e.target.value)} className="mt-1" />
        </label>
        <label className="font-medium text-[#00274D] flex flex-col">
          Milestone Referral Count
          <Input type="number" value={settings.milestone_count || ""} min={1}
            onChange={e => handleChange("milestone_count", e.target.value)} className="mt-1" />
        </label>
        <label className="font-medium text-[#00274D] flex flex-col">
          Milestone Bonus Credits
          <Input type="number" value={settings.milestone_bonus || ""} min={0}
            onChange={e => handleChange("milestone_bonus", e.target.value)} className="mt-1" />
        </label>
        <label className="font-medium text-[#00274D] flex flex-col">
          Referral Link Expiry (days)
          <Input type="number" value={settings.link_expiry_days || ""} min={1}
            onChange={e => handleChange("link_expiry_days", e.target.value)} className="mt-1" />
        </label>
        <label className="font-medium text-[#00274D] flex flex-col">
          Max Credits Per User
          <Input type="number" value={settings.max_per_user || ""} min={1}
            onChange={e => handleChange("max_per_user", e.target.value)} className="mt-1" />
        </label>
        <Button onClick={handleSave} className="bg-[#FFD700] text-[#00274D] font-bold w-fit">
          Save Settings
        </Button>
      </div>
    </div>
  );
}

export default ReferralAdminSettings;
