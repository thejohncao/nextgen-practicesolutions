export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          details: Json | null
          id: string
          target_user_id: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_user_id?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_user_id?: string | null
        }
        Relationships: []
      }
      agent_conversation_memory: {
        Row: {
          agent_name: string
          created_at: string
          id: string
          prompt: string
          response: string | null
          user_id: string
        }
        Insert: {
          agent_name: string
          created_at?: string
          id?: string
          prompt: string
          response?: string | null
          user_id: string
        }
        Update: {
          agent_name?: string
          created_at?: string
          id?: string
          prompt?: string
          response?: string | null
          user_id?: string
        }
        Relationships: []
      }
      agents_log: {
        Row: {
          action: string | null
          agent_name: string
          created_at: string
          details: Json | null
          id: string
          user_id: string | null
        }
        Insert: {
          action?: string | null
          agent_name: string
          created_at?: string
          details?: Json | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string | null
          agent_name?: string
          created_at?: string
          details?: Json | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string
          credits_used: number
          id: string
          notes: string | null
          scheduled_at: string | null
          status: string
          tenant_id: string | null
          treatment_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_used?: number
          id?: string
          notes?: string | null
          scheduled_at?: string | null
          status?: string
          tenant_id?: string | null
          treatment_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits_used?: number
          id?: string
          notes?: string | null
          scheduled_at?: string | null
          status?: string
          tenant_id?: string | null
          treatment_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
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
      credit_events: {
        Row: {
          created_at: string
          event_type: string
          expires_at: string | null
          id: string
          notes: string | null
          status: string | null
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          event_type: string
          expires_at?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          user_id: string
          value?: number
        }
        Update: {
          created_at?: string
          event_type?: string
          expires_at?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      credit_logs: {
        Row: {
          admin_id: string | null
          amount: number
          balance_after: number | null
          created_at: string
          id: string
          metadata: Json | null
          notes: string | null
          source: string
          user_id: string
        }
        Insert: {
          admin_id?: string | null
          amount?: number
          balance_after?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          source?: string
          user_id: string
        }
        Update: {
          admin_id?: string | null
          amount?: number
          balance_after?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          source?: string
          user_id?: string
        }
        Relationships: []
      }
      credits: {
        Row: {
          amount: number
          created_at: string
          expires_at: string | null
          id: string
          source: string
          tenant_id: string | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          expires_at?: string | null
          id?: string
          source?: string
          tenant_id?: string | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string | null
          id?: string
          source?: string
          tenant_id?: string | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
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
          description: string | null
          file_name: string
          file_type: string
          file_url: string
          id: string
          kit_id: string
          order_number: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name: string
          file_type?: string
          file_url: string
          id?: string
          kit_id: string
          order_number?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          kit_id?: string
          order_number?: number
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
          content: string
          created_at: string
          id: string
          kit_id: string
          order_number: number
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          kit_id: string
          order_number?: number
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          kit_id?: string
          order_number?: number
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
          duration_seconds: number | null
          id: string
          kit_id: string
          order_number: number
          title: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          kit_id: string
          order_number?: number
          title: string
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          kit_id?: string
          order_number?: number
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
          featured: boolean
          id: string
          name: string
          order_number: number
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          name: string
          order_number?: number
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          name?: string
          order_number?: number
          slug?: string
          updated_at?: string
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
          perks: Json | null
          referral_bonus_multiplier: number
          stripe_price_id: string | null
          updated_at: string
          upgrade_eligible: boolean
        }
        Insert: {
          annual_price_cents?: number | null
          badge_label?: string | null
          created_at?: string
          credits_per_month?: number
          id?: string
          is_active?: boolean
          monthly_price_cents?: number
          name: string
          perks?: Json | null
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
          perks?: Json | null
          referral_bonus_multiplier?: number
          stripe_price_id?: string | null
          updated_at?: string
          upgrade_eligible?: boolean
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string | null
          priority: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          priority?: string
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          priority?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      office_playbooks: {
        Row: {
          created_at: string
          id: string
          key: string
          tenant_id: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          tenant_id: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          tenant_id?: string
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "office_playbooks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_login: string | null
          last_name: string | null
          phone: string | null
          role: string
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_login?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_login?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      redemptions: {
        Row: {
          booking_id: string | null
          credits_deducted: number
          id: string
          notes: string | null
          redeemed_at: string
          reward_id: string
          status: string
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          credits_deducted?: number
          id?: string
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
          notes?: string | null
          redeemed_at?: string
          reward_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
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
          created_at: string
          id: string
          link_expiry_days: number
          max_per_user: number
          milestone_bonus: number
          milestone_count: number
          updated_at: string
        }
        Insert: {
          bonus_credits?: number
          created_at?: string
          id?: string
          link_expiry_days?: number
          max_per_user?: number
          milestone_bonus?: number
          milestone_count?: number
          updated_at?: string
        }
        Update: {
          bonus_credits?: number
          created_at?: string
          id?: string
          link_expiry_days?: number
          max_per_user?: number
          milestone_bonus?: number
          milestone_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_credits: number
          completed_at: string | null
          created_at: string
          id: string
          invitee_email: string | null
          referral_code: string
          referred_id: string | null
          referrer_id: string
          status: string
        }
        Insert: {
          bonus_credits?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          invitee_email?: string | null
          referral_code: string
          referred_id?: string | null
          referrer_id: string
          status?: string
        }
        Update: {
          bonus_credits?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          invitee_email?: string | null
          referral_code?: string
          referred_id?: string | null
          referrer_id?: string
          status?: string
        }
        Relationships: []
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
          credit_cost?: number
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
          created_at: string
          id: string
          referral_code: string | null
          user_id: string
        }
        Insert: {
          channel: string
          created_at?: string
          id?: string
          referral_code?: string | null
          user_id: string
        }
        Update: {
          channel?: string
          created_at?: string
          id?: string
          referral_code?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tenants: {
        Row: {
          brand_colors: Json | null
          created_at: string
          domain: string | null
          id: string
          logo_url: string | null
          name: string
          settings: Json | null
          slug: string
          updated_at: string
        }
        Insert: {
          brand_colors?: Json | null
          created_at?: string
          domain?: string | null
          id?: string
          logo_url?: string | null
          name: string
          settings?: Json | null
          slug: string
          updated_at?: string
        }
        Update: {
          brand_colors?: Json | null
          created_at?: string
          domain?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          settings?: Json | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          type: string
          user_id: string
        }
        Insert: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      treatments: {
        Row: {
          category: string | null
          created_at: string
          credit_cost: number
          description: string | null
          id: string
          is_active: boolean
          name: string
          price_cents: number
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          credit_cost?: number
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          price_cents?: number
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          credit_cost?: number
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          price_cents?: number
          tenant_id?: string | null
          updated_at?: string
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
          started_at: string
          status: string
          tier_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          started_at?: string
          status?: string
          tier_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          started_at?: string
          status?: string
          tier_id?: string
          updated_at?: string
          user_id?: string
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
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          id: string
          notes: string | null
          source: string | null
          timestamp: string
          type: string
          wallet_id: string
        }
        Insert: {
          amount?: number
          id?: string
          notes?: string | null
          source?: string | null
          timestamp?: string
          type: string
          wallet_id: string
        }
        Update: {
          amount?: number
          id?: string
          notes?: string | null
          source?: string | null
          timestamp?: string
          type?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          last_updated: string
          tenant_id: string | null
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          last_updated?: string
          tenant_id?: string | null
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          last_updated?: string
          tenant_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
