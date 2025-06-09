
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { 
  Settings, 
  CreditCard, 
  Users, 
  Webhook, 
  Key,
  Shield,
  Zap
} from 'lucide-react';

const AdminSettings = () => {
  const { settings, updateSettings, loading } = useAdminSettings();
  const [featureToggles, setFeatureToggles] = useState(settings?.featureToggles || {});

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setFeatureToggles(prev => ({
      ...prev,
      [feature]: enabled
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Settings</h1>
          <p className="text-white/60">Configure platform-wide settings and integrations</p>
        </div>
        <Badge className="bg-nextgen-purple text-white">
          <Settings className="h-4 w-4 mr-2" />
          Admin Access
        </Badge>
      </div>

      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger value="features" className="data-[state=active]:bg-nextgen-purple">
            <Zap className="h-4 w-4 mr-2" />
            Feature Toggles
          </TabsTrigger>
          <TabsTrigger value="credits" className="data-[state=active]:bg-nextgen-purple">
            <CreditCard className="h-4 w-4 mr-2" />
            Credit Rules
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-nextgen-purple">
            <Users className="h-4 w-4 mr-2" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-nextgen-purple">
            <Webhook className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-nextgen-purple">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Feature Toggles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Referral Bonuses</h4>
                    <p className="text-white/60 text-sm">Enable credit bonuses for successful referrals</p>
                  </div>
                  <Switch
                    checked={featureToggles.referralBonuses}
                    onCheckedChange={(checked) => handleFeatureToggle('referralBonuses', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Credit Rollover</h4>
                    <p className="text-white/60 text-sm">Allow unused credits to roll over monthly</p>
                  </div>
                  <Switch
                    checked={featureToggles.creditRollover}
                    onCheckedChange={(checked) => handleFeatureToggle('creditRollover', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">AI Agent Chat</h4>
                    <p className="text-white/60 text-sm">Enable AI agent interactions for users</p>
                  </div>
                  <Switch
                    checked={featureToggles.aiAgentChat}
                    onCheckedChange={(checked) => handleFeatureToggle('aiAgentChat', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Auto-Reactivation Campaigns</h4>
                    <p className="text-white/60 text-sm">Automatically run patient reactivation campaigns</p>
                  </div>
                  <Switch
                    checked={featureToggles.autoReactivation}
                    onCheckedChange={(checked) => handleFeatureToggle('autoReactivation', checked)}
                  />
                </div>
              </div>

              <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                Save Feature Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Credit System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium">Monthly Credit Drop</label>
                    <Input
                      type="number"
                      defaultValue={settings?.creditRules?.monthlyDrop || 100}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium">Referral Bonus Credits</label>
                    <Input
                      type="number"
                      defaultValue={settings?.creditRules?.referralBonus || 50}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium">Credit Expiry (Days)</label>
                    <Input
                      type="number"
                      defaultValue={settings?.creditRules?.expiryDays || 365}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium">Max Credit Balance</label>
                    <Input
                      type="number"
                      defaultValue={settings?.creditRules?.maxBalance || 1000}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                Update Credit Rules
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Role Definitions & Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {['admin', 'staff', 'patient'].map((role) => (
                  <Card key={role} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-medium capitalize">{role}</h4>
                        <Badge className="bg-nextgen-purple/20 text-nextgen-purple">
                          {settings?.rolePermissions?.[role]?.length || 0} permissions
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {settings?.rolePermissions?.[role]?.map((permission: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-white border-white/20">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                Update Permissions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">External Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Stripe Payments</h4>
                    <p className="text-white/60 text-sm">Payment processing and billing</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">GoHighLevel CRM</h4>
                    <p className="text-white/60 text-sm">Lead management and automation</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Make.com Automations</h4>
                    <p className="text-white/60 text-sm">Workflow automation platform</p>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-400">Pending</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">EMR Integration</h4>
                    <p className="text-white/60 text-sm">Electronic medical records sync</p>
                  </div>
                  <Badge className="bg-gray-500/20 text-gray-400">Not Connected</Badge>
                </div>
              </div>

              <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                <Key className="h-4 w-4 mr-2" />
                Manage API Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-white/60 text-sm">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked={settings?.security?.require2FA} />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Session Timeout</h4>
                    <p className="text-white/60 text-sm">Auto-logout after inactivity</p>
                  </div>
                  <Input
                    type="number"
                    defaultValue={settings?.security?.sessionTimeout || 60}
                    className="w-20 bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Audit Logging</h4>
                    <p className="text-white/60 text-sm">Log all admin actions</p>
                  </div>
                  <Switch defaultChecked={settings?.security?.auditLogging} />
                </div>
              </div>

              <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                Update Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
