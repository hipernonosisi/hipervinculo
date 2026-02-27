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
      audit_requests: {
        Row: {
          business_type: string | null
          company_name: string
          created_at: string
          email: string
          growth_goals: string | null
          id: string
          monthly_ad_spend: string | null
          monthly_revenue: string | null
          website_url: string | null
        }
        Insert: {
          business_type?: string | null
          company_name: string
          created_at?: string
          email: string
          growth_goals?: string | null
          id?: string
          monthly_ad_spend?: string | null
          monthly_revenue?: string | null
          website_url?: string | null
        }
        Update: {
          business_type?: string | null
          company_name?: string
          created_at?: string
          email?: string
          growth_goals?: string | null
          id?: string
          monthly_ad_spend?: string | null
          monthly_revenue?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          session_id: string
          updated_at: string
          visitor_language: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          session_id: string
          updated_at?: string
          visitor_language?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string
          updated_at?: string
          visitor_language?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          inquiry_type: string | null
          message: string
          phone: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          inquiry_type?: string | null
          message: string
          phone?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          inquiry_type?: string | null
          message?: string
          phone?: string | null
        }
        Relationships: []
      }
      custom_services: {
        Row: {
          base_price: number
          category: string
          created_at: string
          created_by: string | null
          currency: string
          description: string | null
          id: string
          name: string
          percentage_value: number | null
          type: string
          updated_at: string
        }
        Insert: {
          base_price?: number
          category?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          id?: string
          name: string
          percentage_value?: number | null
          type?: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          category?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          id?: string
          name?: string
          percentage_value?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      incomplete_leads: {
        Row: {
          completed: boolean
          contact_name: string | null
          created_at: string
          current_step: number
          email: string | null
          id: string
          language: string | null
          monthly_budget: string | null
          phone: string | null
          session_id: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          completed?: boolean
          contact_name?: string | null
          created_at?: string
          current_step?: number
          email?: string | null
          id?: string
          language?: string | null
          monthly_budget?: string | null
          phone?: string | null
          session_id: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          completed?: boolean
          contact_name?: string | null
          created_at?: string
          current_step?: number
          email?: string | null
          id?: string
          language?: string | null
          monthly_budget?: string | null
          phone?: string | null
          session_id?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      page_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          page_url: string
          session_id: string
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          page_url?: string
          session_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          page_url?: string
          session_id?: string
        }
        Relationships: []
      }
      preview_leads: {
        Row: {
          business_name: string
          business_type: string
          contact_name: string
          converted_to_client: boolean | null
          created_at: string | null
          current_advertising: string | null
          email: string
          employee_count: string | null
          id: string
          language: string | null
          lead_score: string | null
          monthly_budget: string | null
          notes: string | null
          phone: string
          preview_sent: boolean | null
          service_area: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          business_name: string
          business_type: string
          contact_name: string
          converted_to_client?: boolean | null
          created_at?: string | null
          current_advertising?: string | null
          email: string
          employee_count?: string | null
          id?: string
          language?: string | null
          lead_score?: string | null
          monthly_budget?: string | null
          notes?: string | null
          phone: string
          preview_sent?: boolean | null
          service_area?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string
          contact_name?: string
          converted_to_client?: boolean | null
          created_at?: string | null
          current_advertising?: string | null
          email?: string
          employee_count?: string | null
          id?: string
          language?: string | null
          lead_score?: string | null
          monthly_budget?: string | null
          notes?: string | null
          phone?: string
          preview_sent?: boolean | null
          service_area?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          count: number
          created_at: string
          id: string
          key: string
          window_start: string
        }
        Insert: {
          count?: number
          created_at?: string
          id?: string
          key: string
          window_start?: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: string
          key?: string
          window_start?: string
        }
        Relationships: []
      }
      service_proposals: {
        Row: {
          client_company: string
          client_email: string | null
          client_name: string
          client_phone: string | null
          created_at: string
          created_by: string | null
          currency: string
          discount_amount: number | null
          discount_percentage: number | null
          id: string
          notes: string | null
          payment_terms: string | null
          proposal_date: string
          proposal_number: string
          services: Json
          status: string
          subtotal: number
          total: number
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          client_company: string
          client_email?: string | null
          client_name: string
          client_phone?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          notes?: string | null
          payment_terms?: string | null
          proposal_date?: string
          proposal_number: string
          services?: Json
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          client_company?: string
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          notes?: string | null
          payment_terms?: string | null
          proposal_date?: string
          proposal_number?: string
          services?: Json
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          p_key: string
          p_max_requests?: number
          p_window_seconds?: number
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
