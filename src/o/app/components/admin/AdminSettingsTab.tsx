import React from "react";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReferralAdminSettings from "../ReferralAdminSettings";
import AdminRewardsPanel from "../AdminRewardsPanel";
import AdminMembershipTiersTab from "./AdminMembershipTiersTab";

const AdminSettingsTab = () => {
  const { settings, loading, updateSettings } = useAdminSettings();

  if (loading) {
    return <div className="text-apple-subtle flex justify-center items-center py-16">Loading settings...</div>;
  }
  if (!settings) return null;

  // Handlers for each setting
  const handleBoolChange = (group: string, key: string, value: boolean) => {
    updateSettings({ [group]: { ...settings[group], [key]: value } });
  };
  const handleNumberChange = (group: string, key: string, value: any) => {
    updateSettings({ [group]: { ...settings[group], [key]: Number(value) } });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-bold text-xl mb-5 text-apple-header">Credit Logic</h2>
      <div className="flex gap-3 items-center mb-4">
        <span className="font-medium w-40 text-apple-header">Referral Bonuses</span>
        <Switch checked={settings.featureToggles.referralBonuses} onCheckedChange={v => handleBoolChange("featureToggles", "referralBonuses", v)} />
      </div>
      <div className="flex gap-3 items-center mb-4">
        <span className="font-medium w-40 text-apple-header">Credit Rollover</span>
        <Switch checked={settings.featureToggles.creditRollover} onCheckedChange={v => handleBoolChange("featureToggles", "creditRollover", v)} />
      </div>
      <div className="flex gap-3 items-center mb-4">
        <span className="font-medium w-40 text-apple-header">AI Agent Chat</span>
        <Switch checked={settings.featureToggles.aiAgentChat} onCheckedChange={v => handleBoolChange("featureToggles", "aiAgentChat", v)} />
      </div>
      <div className="flex gap-3 items-center mb-4">
        <span className="font-medium w-40 text-apple-header">Auto Reactivation</span>
        <Switch checked={settings.featureToggles.autoReactivation} onCheckedChange={v => handleBoolChange("featureToggles", "autoReactivation", v)} />
      </div>
      <div className="mt-8 mb-4">
        <div className="font-bold text-lg mb-3 text-apple-header">Credit Rules</div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="w-48 font-medium text-apple-header">Monthly Drop</label>
            <Input
              className="w-24 ml-3"
              type="number"
              value={settings.creditRules.monthlyDrop}
              onChange={e => handleNumberChange("creditRules", "monthlyDrop", e.target.value)}
            />
            <span className="ml-2 text-apple-detail">credits</span>
          </div>
          <div className="flex items-center">
            <label className="w-48 font-medium text-apple-header">Referral Bonus</label>
            <Input
              className="w-24 ml-3"
              type="number"
              value={settings.creditRules.referralBonus}
              onChange={e => handleNumberChange("creditRules", "referralBonus", e.target.value)}
            />
            <span className="ml-2 text-apple-detail">credits</span>
          </div>
          <div className="flex items-center">
            <label className="w-48 font-medium text-apple-header">Expiry Days</label>
            <Input
              className="w-24 ml-3"
              type="number"
              value={settings.creditRules.expiryDays}
              onChange={e => handleNumberChange("creditRules", "expiryDays", e.target.value)}
            />
            <span className="ml-2 text-apple-detail">days</span>
          </div>
          <div className="flex items-center">
            <label className="w-48 font-medium text-apple-header">Max Balance</label>
            <Input
              className="w-24 ml-3"
              type="number"
              value={settings.creditRules.maxBalance}
              onChange={e => handleNumberChange("creditRules", "maxBalance", e.target.value)}
            />
            <span className="ml-2 text-apple-detail">credits</span>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <ReferralAdminSettings />
      </div>
      <div className="mt-8 mb-4">
        <div className="font-bold text-lg mb-3 text-apple-header">Security</div>
        <div className="flex items-center mb-3">
          <label className="w-48 font-medium text-apple-header">Require 2FA</label>
          <Switch checked={settings.security.require2FA} onCheckedChange={v => handleBoolChange("security", "require2FA", v)} />
        </div>
        <div className="flex items-center mb-3">
          <label className="w-48 font-medium text-apple-header">Session Timeout</label>
          <Input
            className="w-24 ml-3"
            type="number"
            value={settings.security.sessionTimeout}
            onChange={e => handleNumberChange("security", "sessionTimeout", e.target.value)}
          />
          <span className="ml-2 text-apple-detail">minutes</span>
        </div>
        <div className="flex items-center mb-3">
          <label className="w-48 font-medium text-apple-header">Audit Logging</label>
          <Switch checked={settings.security.auditLogging} onCheckedChange={v => handleBoolChange("security", "auditLogging", v)} />
        </div>
      </div>
      {/* --- Admin Rewards Catalog Panel --- */}
      <div className="mt-10">
        <div className="font-bold text-lg mb-3 text-apple-header">Rewards Catalog</div>
        <div>
          <div>
            <React.Suspense fallback={<div>Loading Admin Rewards Panel...</div>}>
              <AdminRewardsPanel />
            </React.Suspense>
          </div>
        </div>
      </div>
      {/* ---- Admin Membership Tiers Panel ---- */}
      <div className="mt-10">
        <div className="font-bold text-lg mb-3 text-apple-header">Membership Tiers</div>
        <div>
          <React.Suspense fallback={<div>Loading Membership Tiers...</div>}>
            <AdminMembershipTiersTab />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsTab;
