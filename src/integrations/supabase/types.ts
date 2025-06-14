export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agents_log: {
        Row: {
          action: string
          agent_name: string
          created_at: string | null
          id: string
          metadata: Json | null
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          agent_name: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          agent_name?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_daily: {
        Row: {
          created_at: string | null
          date: string
          id: string
          metrics: Json | null
          new_patients: number | null
          referrals_completed: number | null
          tenant_id: string | null
          total_bookings: number | null
          total_credits_used: number | null
          total_revenue_cents: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          metrics?: Json | null
          new_patients?: number | null
          referrals_completed?: number | null
          tenant_id?: string | null
          total_bookings?: number | null
          total_credits_used?: number | null
          total_revenue_cents?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          metrics?: Json | null
          new_patients?: number | null
          referrals_completed?: number | null
          tenant_id?: string | null
          total_bookings?: number | null
          total_credits_used?: number | null
          total_revenue_cents?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_daily_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string | null
          credits_used: number | null
          id: string
          notes: string | null
          scheduled_at: string
          staff_id: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          tenant_id: string | null
          treatment_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits_used?: number | null
          id?: string
          notes?: string | null
          scheduled_at: string
          staff_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          tenant_id?: string | null
          treatment_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits_used?: number | null
          id?: string
          notes?: string | null
          scheduled_at?: string
          staff_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          tenant_id?: string | null
          treatment_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credits: {
        Row: {
          amount: number
          created_at: string | null
          expires_at: string | null
          id: string
          membership_tier_id: string | null
          source: string
          tenant_id: string | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          expires_at?: string | null
          id?: string
          membership_tier_id?: string | null
          source: string
          tenant_id?: string | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          expires_at?: string | null
          id?: string
          membership_tier_id?: string | null
          source?: string
          tenant_id?: string | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credits_membership_tier_id_fkey"
            columns: ["membership_tier_id"]
            isOneToOne: false
            referencedRelation: "membership_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credits_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kit_files: {
        Row: {
          created_at: string
          file_name: string
          file_size: string | null
          file_type: string
          file_url: string
          id: string
          kit_id: string | null
          order_number: number | null
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: string | null
          file_type: string
          file_url: string
          id?: string
          kit_id?: string | null
          order_number?: number | null
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: string | null
          file_type?: string
          file_url?: string
          id?: string
          kit_id?: string | null
          order_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kit_files_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
        ]
      }
      kit_sops: {
        Row: {
          content: string | null
          created_at: string
          id: string
          kit_id: string | null
          order_number: number | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          kit_id?: string | null
          order_number?: number | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          kit_id?: string | null
          order_number?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "kit_sops_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
        ]
      }
      kit_videos: {
        Row: {
          created_at: string
          description: string | null
          id: string
          kit_id: string | null
          order_number: number | null
          title: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          kit_id?: string | null
          order_number?: number | null
          title: string
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          kit_id?: string | null
          order_number?: number | null
          title?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "kit_videos_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
        ]
      }
      kits: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          kit_type: string
          name: string
          order_number: number | null
          slug: string
          support_contact: string | null
          updated_at: string
          version: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          kit_type: string
          name: string
          order_number?: number | null
          slug: string
          support_contact?: string | null
          updated_at?: string
          version?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          kit_type?: string
          name?: string
          order_number?: number | null
          slug?: string
          support_contact?: string | null
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      membership_tiers: {
        Row: {
          annual_price_cents: number | null
          badge_label: string | null
          created_at: string
          credits_per_month: number
          id: string
          is_active: boolean
          monthly_price_cents: number
          name: string
          perks: Json
          referral_bonus_multiplier: number
          stripe_price_id: string | null
          updated_at: string
          upgrade_eligible: boolean
        }
        Insert: {
          annual_price_cents?: number | null
          badge_label?: string | null
          created_at?: string
          credits_per_month: number
          id?: string
          is_active?: boolean
          monthly_price_cents: number
          name: string
          perks?: Json
          referral_bonus_multiplier?: number
          stripe_price_id?: string | null
          updated_at?: string
          upgrade_eligible?: boolean
        }
        Update: {
          annual_price_cents?: number | null
          badge_label?: string | null
          created_at?: string
          credits_per_month?: number
          id?: string
          is_active?: boolean
          monthly_price_cents?: number
          name?: string
          perks?: Json
          referral_bonus_multiplier?: number
          stripe_price_id?: string | null
          updated_at?: string
          upgrade_eligible?: boolean
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          message: string
          metadata: Json | null
          priority: string
          read: boolean
          tenant_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          priority?: string
          read?: boolean
          tenant_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          priority?: string
          read?: boolean
          tenant_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      redemptions: {
        Row: {
          booking_id: string | null
          credits_deducted: number
          id: string
          location_id: string | null
          notes: string | null
          redeemed_at: string
          reward_id: string
          status: string
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          credits_deducted: number
          id?: string
          location_id?: string | null
          notes?: string | null
          redeemed_at?: string
          reward_id: string
          status?: string
          user_id: string
        }
        Update: {
          booking_id?: string | null
          credits_deducted?: number
          id?: string
          location_id?: string | null
          notes?: string | null
          redeemed_at?: string
          reward_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_settings: {
        Row: {
          bonus_credits: number
          created_at: string | null
          id: string
          link_expiry_days: number | null
          max_per_user: number | null
          milestone_bonus: number | null
          milestone_count: number | null
          updated_at: string | null
        }
        Insert: {
          bonus_credits?: number
          created_at?: string | null
          id?: string
          link_expiry_days?: number | null
          max_per_user?: number | null
          milestone_bonus?: number | null
          milestone_count?: number | null
          updated_at?: string | null
        }
        Update: {
          bonus_credits?: number
          created_at?: string | null
          id?: string
          link_expiry_days?: number | null
          max_per_user?: number | null
          milestone_bonus?: number | null
          milestone_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_credits: number | null
          completed_at: string | null
          created_at: string | null
          credited_at: string | null
          expires_at: string | null
          id: string
          invitee_email: string | null
          referral_code: string
          referred_id: string | null
          referrer_id: string | null
          status: string | null
          tenant_id: string | null
        }
        Insert: {
          bonus_credits?: number | null
          completed_at?: string | null
          created_at?: string | null
          credited_at?: string | null
          expires_at?: string | null
          id?: string
          invitee_email?: string | null
          referral_code: string
          referred_id?: string | null
          referrer_id?: string | null
          status?: string | null
          tenant_id?: string | null
        }
        Update: {
          bonus_credits?: number | null
          completed_at?: string | null
          created_at?: string | null
          credited_at?: string | null
          expires_at?: string | null
          id?: string
          invitee_email?: string | null
          referral_code?: string
          referred_id?: string | null
          referrer_id?: string | null
          status?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          credit_cost: number
          description: string | null
          frequency_limit_days: number | null
          id: string
          image_url: string | null
          name: string
          requires_booking: boolean
          updated_at: string
          visibility: string | null
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          credit_cost: number
          description?: string | null
          frequency_limit_days?: number | null
          id?: string
          image_url?: string | null
          name: string
          requires_booking?: boolean
          updated_at?: string
          visibility?: string | null
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          credit_cost?: number
          description?: string | null
          frequency_limit_days?: number | null
          id?: string
          image_url?: string | null
          name?: string
          requires_booking?: boolean
          updated_at?: string
          visibility?: string | null
        }
        Relationships: []
      }
      share_events: {
        Row: {
          channel: string
          clicks: number
          conversions: number
          created_at: string | null
          id: string
          metadata: Json | null
          referral_code: string | null
          rewarded: boolean
          updated_at: string | null
          user_id: string
        }
        Insert: {
          channel: string
          clicks?: number
          conversions?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          referral_code?: string | null
          rewarded?: boolean
          updated_at?: string | null
          user_id: string
        }
        Update: {
          channel?: string
          clicks?: number
          conversions?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          referral_code?: string | null
          rewarded?: boolean
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "share_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          brand_colors: Json | null
          created_at: string | null
          domain: string | null
          id: string
          logo_url: string | null
          name: string
          settings: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          brand_colors?: Json | null
          created_at?: string | null
          domain?: string | null
          id?: string
          logo_url?: string | null
          name: string
          settings?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          brand_colors?: Json | null
          created_at?: string | null
          domain?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          settings?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          tenant_id: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          tenant_id?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          tenant_id?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      treatments: {
        Row: {
          category: string | null
          created_at: string | null
          credit_cost: number
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          credit_cost?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_cents: number
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          credit_cost?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_memberships: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_trial: boolean
          started_at: string
          status: string
          stripe_subscription_id: string | null
          tier_id: string | null
          trial_end: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_trial?: boolean
          started_at?: string
          status?: string
          stripe_subscription_id?: string | null
          tier_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_trial?: boolean
          started_at?: string
          status?: string
          stripe_subscription_id?: string | null
          tier_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_memberships_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "membership_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reward_limits: {
        Row: {
          id: string
          last_redeemed_at: string | null
          period_end: string
          period_start: string
          redemption_count: number
          reward_id: string
          user_id: string
        }
        Insert: {
          id?: string
          last_redeemed_at?: string | null
          period_end: string
          period_start: string
          redemption_count?: number
          reward_id: string
          user_id: string
        }
        Update: {
          id?: string
          last_redeemed_at?: string | null
          period_end?: string
          period_start?: string
          redemption_count?: number
          reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_reward_limits_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_reward_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status: "scheduled" | "completed" | "cancelled" | "no_show"
      transaction_type:
        | "credit_drop"
        | "redemption"
        | "referral_bonus"
        | "manual_adjustment"
      user_role: "patient" | "staff" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["scheduled", "completed", "cancelled", "no_show"],
      transaction_type: [
        "credit_drop",
        "redemption",
        "referral_bonus",
        "manual_adjustment",
      ],
      user_role: ["patient", "staff", "admin"],
    },
  },
} as const
