
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { 
  Settings, 
  Shield, 
  CreditCard, 
  Users,
  Loader2
} from 'lucide-react';

const AdminSettings = () => {
  const { settings, loading, updateSettings } = useAdminSettings();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Failed to load settings</div>
      </div>
    );
  }

  const handleFeatureToggle = (feature: string, value: boolean) => {
    updateSettings({
      featureToggles: {
        ...settings.featureToggles,
        [feature]: value
      }
    });
  };

  const handleCreditRuleChange = (rule: string, value: number) => {
    updateSettings({
      creditRules: {
        ...settings.creditRules,
        [rule]: value
      }
    });
  };

  const handleSecurityChange = (setting: string, value: boolean | number) => {
    updateSettings({
      security: {
        ...settings.security,
        [setting]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Settings</h1>
          <p className="text-white/60">Configure system-wide settings and policies</p>
        </div>
        <Badge className="bg-nextgen-purple text-white">
          Admin Controls
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Toggles */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Feature Toggles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="referralBonuses" className="text-white">
                Referral Bonuses
              </Label>
              <Switch
                id="referralBonuses"
                checked={settings.featureToggles.referralBonuses}
                onCheckedChange={(checked) => handleFeatureToggle('referralBonuses', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="creditRollover" className="text-white">
                Credit Rollover
              </Label>
              <Switch
                id="creditRollover"
                checked={settings.featureToggles.creditRollover}
                onCheckedChange={(checked) => handleFeatureToggle('creditRollover', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="aiAgentChat" className="text-white">
                AI Agent Chat
              </Label>
              <Switch
                id="aiAgentChat"
                checked={settings.featureToggles.aiAgentChat}
                onCheckedChange={(checked) => handleFeatureToggle('aiAgentChat', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoReactivation" className="text-white">
                Auto Reactivation
              </Label>
              <Switch
                id="autoReactivation"
                checked={settings.featureToggles.autoReactivation}
                onCheckedChange={(checked) => handleFeatureToggle('autoReactivation', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Credit Rules */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Credit Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="monthlyDrop" className="text-white">
                Monthly Credit Drop
              </Label>
              <Input
                id="monthlyDrop"
                type="number"
                value={settings.creditRules.monthlyDrop}
                onChange={(e) => handleCreditRuleChange('monthlyDrop', parseInt(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="referralBonus" className="text-white">
                Referral Bonus Amount
              </Label>
              <Input
                id="referralBonus"
                type="number"
                value={settings.creditRules.referralBonus}
                onChange={(e) => handleCreditRuleChange('referralBonus', parseInt(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="expiryDays" className="text-white">
                Credit Expiry (Days)
              </Label>
              <Input
                id="expiryDays"
                type="number"
                value={settings.creditRules.expiryDays}
                onChange={(e) => handleCreditRuleChange('expiryDays', parseInt(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="maxBalance" className="text-white">
                Maximum Balance
              </Label>
              <Input
                id="maxBalance"
                type="number"
                value={settings.creditRules.maxBalance}
                onChange={(e) => handleCreditRuleChange('maxBalance', parseInt(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="require2FA" className="text-white">
                Require 2FA
              </Label>
              <Switch
                id="require2FA"
                checked={settings.security.require2FA}
                onCheckedChange={(checked) => handleSecurityChange('require2FA', checked)}
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout" className="text-white">
                Session Timeout (minutes)
              </Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auditLogging" className="text-white">
                Audit Logging
              </Label>
              <Switch
                id="auditLogging"
                checked={settings.security.auditLogging}
                onCheckedChange={(checked) => handleSecurityChange('auditLogging', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Role Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Admin Permissions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {settings.rolePermissions.admin.map((permission) => (
                  <Badge key={permission} variant="outline" className="text-white border-white/20">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-white">Staff Permissions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {settings.rolePermissions.staff.map((permission) => (
                  <Badge key={permission} variant="outline" className="text-white border-white/20">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-white">Patient Permissions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {settings.rolePermissions.patient.map((permission) => (
                  <Badge key={permission} variant="outline" className="text-white border-white/20">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => window.location.reload()}
          className="bg-nextgen-purple hover:bg-nextgen-purple/80"
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
