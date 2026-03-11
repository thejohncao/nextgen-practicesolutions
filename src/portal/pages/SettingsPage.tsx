import SectionHeader from '../components/SectionHeader';
import { Building2, User, Bell, Palette, Plug } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export default function SettingsPage() {
  const { activePractice, activeUser } = usePractice();

  return (
    <div className="px-4 lg:px-8 py-6 max-w-3xl mx-auto space-y-8">
      <SectionHeader title="Settings" subtitle="Manage your portal preferences" />

      {/* Practice Info */}
      <SettingsSection icon={Building2} title="Practice Information">
        <SettingsField label="Practice Name" value={activePractice.name} />
        <SettingsField label="Plan" value={activePractice.plan} />
        <SettingsField label="Locations" value={activePractice.locations.join(', ')} />
        <SettingsField label="Onboarded" value={new Date(activePractice.onboardedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
      </SettingsSection>

      {/* User Profile */}
      <SettingsSection icon={User} title="User Profile">
        <SettingsField label="Name" value={activeUser.name} />
        <SettingsField label="Email" value={activeUser.email} />
        <SettingsField label="Role" value={activeUser.role.charAt(0).toUpperCase() + activeUser.role.slice(1)} />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection icon={Bell} title="Notification Preferences">
        <ToggleField label="Email notifications" description="Receive updates about milestones and insights" defaultChecked />
        <ToggleField label="Weekly digest" description="Summary of portal activity every Monday" defaultChecked />
        <ToggleField label="Request status changes" description="Get notified when your requests are updated" defaultChecked />
      </SettingsSection>

      {/* Branding */}
      <SettingsSection icon={Palette} title="Branding">
        <div className="px-5 py-6 text-center">
          <p className="text-sm text-[#6B7280]">Custom branding options coming soon.</p>
          <p className="text-xs text-[#4B5563] mt-1">Upload your logo and customize portal colors.</p>
        </div>
      </SettingsSection>

      {/* Integrations */}
      <SettingsSection icon={Plug} title="Integrations">
        <IntegrationRow name="GoHighLevel" status="Connected" />
        <IntegrationRow name="Google Analytics" status="Connected" />
        <IntegrationRow name="Practice Management System" status="Connected" />
        <IntegrationRow name="Payment Processor" status="Pending Setup" />
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.04]">
        <Icon className="w-4 h-4 text-[#6B7280]" />
        <h3 className="text-sm font-semibold text-[#F9FAFB]">{title}</h3>
      </div>
      <div className="divide-y divide-white/[0.04]">{children}</div>
    </div>
  );
}

function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-sm text-[#9CA3AF]">{label}</span>
      <span className="text-sm font-medium text-[#F9FAFB]">{value}</span>
    </div>
  );
}

function ToggleField({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div>
        <span className="text-sm text-[#F9FAFB] font-medium">{label}</span>
        <p className="text-xs text-[#6B7280] mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-9 h-5 bg-white/[0.10] peer-focus:ring-2 peer-focus:ring-amber-500/20 rounded-full peer peer-checked:bg-[#F5A623] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
      </label>
    </div>
  );
}

function IntegrationRow({ name, status }: { name: string; status: string }) {
  const isConnected = status === 'Connected';
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-sm text-[#F9FAFB]">{name}</span>
      <span className={`text-xs font-medium ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
        {status}
      </span>
    </div>
  );
}
