-- Narrative: Dental Treatment Acceptance App Tables

-- Patients (separate from portal profiles — these are dental patients)
create table narrative_patients (
  id uuid default gen_random_uuid() primary key,
  practice_id uuid references portal_practices(id) not null,
  first_name text not null,
  last_name text not null,
  phone text,
  email text,
  insurance_status text not null default 'self_pay' check (insurance_status in ('insured', 'self_pay', 'membership')),
  membership_tier text check (membership_tier in ('glow', 'luminate', 'radiate')),
  created_at timestamptz default now()
);

-- Plans (treatment plan sessions)
create table narrative_plans (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references narrative_patients(id) not null,
  practice_id uuid references portal_practices(id) not null,
  provider_name text not null default 'Dr. Kansagra',
  status text not null default 'draft' check (status in ('draft', 'presented', 'accepted', 'declined', 'scheduled', 'thinking', 'expired', 'completed', 'cancelled')),
  decision_at timestamptz,
  signature_data text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Plan items (treatments assigned to teeth)
create table narrative_plan_items (
  id uuid default gen_random_uuid() primary key,
  plan_id uuid references narrative_plans(id) on delete cascade not null,
  tooth_number integer check (tooth_number between 1 and 32),
  diagnosis text not null,
  treatment_code text not null,
  treatment_name text not null,
  phase integer not null default 1 check (phase between 1 and 3),
  fee_cents integer not null default 0,
  duration_minutes integer not null default 30,
  phase_date date,
  notes text,
  created_at timestamptz default now()
);

-- Fee schedules (practice-specific procedure fees)
create table narrative_fee_schedules (
  id uuid default gen_random_uuid() primary key,
  practice_id uuid references portal_practices(id) not null,
  code text not null,
  label text not null,
  fee_cents integer not null default 0,
  category text not null default 'general',
  duration_minutes integer not null default 30,
  unique (practice_id, code)
);

-- Indexes
create index idx_narrative_patients_practice on narrative_patients(practice_id);
create index idx_narrative_plans_patient on narrative_plans(patient_id);
create index idx_narrative_plans_practice on narrative_plans(practice_id);
create index idx_narrative_plans_status on narrative_plans(status);
create index idx_narrative_plan_items_plan on narrative_plan_items(plan_id);
create index idx_narrative_plan_items_phase on narrative_plan_items(plan_id, phase);
create index idx_narrative_fee_schedules_practice on narrative_fee_schedules(practice_id);

-- Updated at trigger for plans
create or replace function narrative_update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger narrative_plans_updated_at
  before update on narrative_plans
  for each row execute function narrative_update_updated_at();

-- Enable RLS
alter table narrative_patients enable row level security;
alter table narrative_plans enable row level security;
alter table narrative_plan_items enable row level security;
alter table narrative_fee_schedules enable row level security;

-- RLS policies: authenticated users can access their practice's data
create policy "Users can view their practice patients"
  on narrative_patients for select
  using (practice_id in (
    select practice_id from profiles where id = auth.uid()
  ));

create policy "Users can insert their practice patients"
  on narrative_patients for insert
  with check (practice_id in (
    select practice_id from profiles where id = auth.uid()
  ));

create policy "Users can view their practice plans"
  on narrative_plans for select
  using (practice_id in (
    select practice_id from profiles where id = auth.uid()
  ));

create policy "Users can insert their practice plans"
  on narrative_plans for insert
  with check (practice_id in (
    select practice_id from profiles where id = auth.uid()
  ));

create policy "Users can update their practice plans"
  on narrative_plans for update
  using (practice_id in (
    select practice_id from profiles where id = auth.uid()
  ));

create policy "Users can view plan items for their practice plans"
  on narrative_plan_items for select
  using (plan_id in (
    select id from narrative_plans where practice_id in (
      select practice_id from profiles where id = auth.uid()
    )
  ));

create policy "Users can insert plan items for their practice plans"
  on narrative_plan_items for insert
  with check (plan_id in (
    select id from narrative_plans where practice_id in (
      select practice_id from profiles where id = auth.uid()
    )
  ));

create policy "Users can update plan items for their practice plans"
  on narrative_plan_items for update
  using (plan_id in (
    select id from narrative_plans where practice_id in (
      select practice_id from profiles where id = auth.uid()
    )
  ));

create policy "Users can delete plan items for their practice plans"
  on narrative_plan_items for delete
  using (plan_id in (
    select id from narrative_plans where practice_id in (
      select practice_id from profiles where id = auth.uid()
    )
  ));

create policy "Users can view their practice fee schedules"
  on narrative_fee_schedules for select
  using (practice_id in (
    select practice_id from profiles where id = auth.uid()
  ));

create policy "Users can manage their practice fee schedules"
  on narrative_fee_schedules for insert
  with check (practice_id in (
    select practice_id from profiles where id = auth.uid()
  ));
