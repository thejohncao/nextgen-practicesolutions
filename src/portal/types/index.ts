// ── Portal Data Models ──────────────────────────────────────────────

export type PillarSlug = 'giselle' | 'miles' | 'devon';

export interface Practice {
  id: string;
  name: string;
  locations: string[];
  ownerName: string;
  ownerEmail: string;
  plan: string;
  onboardedAt: string;
  logoUrl?: string;
}

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'coordinator' | 'staff';
  avatarUrl?: string;
  practiceId: string;
}

export interface Pillar {
  slug: PillarSlug;
  name: string;
  agentName: string;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  icon: string;
}

export type PackageStatus = 'active' | 'onboarding' | 'paused' | 'planned';
export type PackageTier = 'starter' | 'growth' | 'scale' | 'enterprise';

export interface Package {
  id: string;
  pillarSlug: PillarSlug;
  name: string;
  status: PackageStatus;
  tier: PackageTier;
  scope: string;
  keyResults: string[];
  nextMilestone: string;
  kpiSnippet?: string;
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeDirection?: 'up' | 'down' | 'flat';
  pillarSlug?: PillarSlug;
  category?: string;
}

export interface Insight {
  id: string;
  pillarSlug: PillarSlug;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export type MilestoneType =
  | 'package_activated'
  | 'workflow_launched'
  | 'training_completed'
  | 'review_meeting'
  | 'website_milestone'
  | 'dashboard_delivered'
  | 'recommendation';

export type MilestoneStatus = 'completed' | 'in_progress' | 'upcoming';

export interface Milestone {
  id: string;
  pillarSlug: PillarSlug;
  type: MilestoneType;
  title: string;
  description: string;
  date: string;
  status: MilestoneStatus;
}

export type RequestStatus = 'new' | 'reviewing' | 'in_progress' | 'waiting_on_client' | 'done';
export type RequestPriority = 'low' | 'medium' | 'high' | 'urgent';
export type RequestType = 'general' | 'bug' | 'feature' | 'support' | 'strategy';

export interface ClientRequest {
  id: string;
  title: string;
  pillarSlug: PillarSlug;
  requestType: RequestType;
  description: string;
  priority: RequestPriority;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export type WorkflowStatus = 'live' | 'in_progress' | 'planned' | 'needs_attention';

export interface WorkflowItem {
  id: string;
  pillarSlug: PillarSlug;
  name: string;
  status: WorkflowStatus;
  description?: string;
}

export interface SystemAsset {
  id: string;
  pillarSlug: PillarSlug;
  name: string;
  enabled: boolean;
  status?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
