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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assignment_responses: {
        Row: {
          assignment_id: string
          id: string
          responded_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assignment_id: string
          id?: string
          responded_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          assignment_id?: string
          id?: string
          responded_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_responses_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          age_group: string
          category: string
          created_at: string
          created_by: string
          delivery_method: string
          id: string
          instructions: string
          is_active: boolean
          template_id: string
          title: string
          updated_at: string
        }
        Insert: {
          age_group: string
          category: string
          created_at?: string
          created_by?: string
          delivery_method: string
          id?: string
          instructions: string
          is_active?: boolean
          template_id: string
          title: string
          updated_at?: string
        }
        Update: {
          age_group?: string
          category?: string
          created_at?: string
          created_by?: string
          delivery_method?: string
          id?: string
          instructions?: string
          is_active?: boolean
          template_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      community_members: {
        Row: {
          community_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          community_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          community_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "institution_communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_messages: {
        Row: {
          community_id: string
          created_at: string
          id: string
          message: string
          updated_at: string
          user_id: string
        }
        Insert: {
          community_id: string
          created_at?: string
          id?: string
          message: string
          updated_at?: string
          user_id: string
        }
        Update: {
          community_id?: string
          created_at?: string
          id?: string
          message?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_messages_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "institution_communities"
            referencedColumns: ["id"]
          },
        ]
      }
      course_comments: {
        Row: {
          comment_text: string
          course_id: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comment_text: string
          course_id: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comment_text?: string
          course_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      course_likes: {
        Row: {
          course_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_purchases: {
        Row: {
          created_at: string
          credits_amount: number
          id: string
          payment_id: string | null
          payment_status: string
          price_zar: number
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_amount: number
          id?: string
          payment_id?: string | null
          payment_status?: string
          price_zar: number
          user_id: string
        }
        Update: {
          created_at?: string
          credits_amount?: number
          id?: string
          payment_id?: string | null
          payment_status?: string
          price_zar?: number
          user_id?: string
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          recipient_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          recipient_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          recipient_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      expo_access_requests: {
        Row: {
          company_name: string
          email: string
          id: string
          notes: string | null
          requested_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          company_name: string
          email: string
          id?: string
          notes?: string | null
          requested_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          company_name?: string
          email?: string
          id?: string
          notes?: string | null
          requested_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: []
      }
      feedback_comments: {
        Row: {
          comment_text: string
          created_at: string
          feedback_id: string
          id: string
          parent_comment_id: string | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          comment_text: string
          created_at?: string
          feedback_id: string
          id?: string
          parent_comment_id?: string | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          comment_text?: string
          created_at?: string
          feedback_id?: string
          id?: string
          parent_comment_id?: string | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_comments_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "user_feedback"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "feedback_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_reactions: {
        Row: {
          created_at: string
          emoji: string
          feedback_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji?: string
          feedback_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          feedback_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_reactions_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "user_feedback"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_communities: {
        Row: {
          created_at: string
          created_by: string
          id: string
          institution_name: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          institution_name?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          institution_name?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      learning_basics_content: {
        Row: {
          age_group: string
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          extras: Json
          id: string
          image_url: string | null
          is_active: boolean
          link_url: string | null
          subtitle: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          age_group: string
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          extras?: Json
          id?: string
          image_url?: string | null
          is_active?: boolean
          link_url?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          age_group?: string
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          extras?: Json
          id?: string
          image_url?: string | null
          is_active?: boolean
          link_url?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      lesson_baskets: {
        Row: {
          created_at: string
          duration_days: number
          ever_selected: string[]
          expires_at: string
          id: string
          last_shown_at: string | null
          lessons: string[]
          starts_at: string
          tried_lessons: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_days?: number
          ever_selected?: string[]
          expires_at?: string
          id?: string
          last_shown_at?: string | null
          lessons?: string[]
          starts_at?: string
          tried_lessons?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration_days?: number
          ever_selected?: string[]
          expires_at?: string
          id?: string
          last_shown_at?: string | null
          lessons?: string[]
          starts_at?: string
          tried_lessons?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      phone_trials: {
        Row: {
          created_at: string
          id: string
          is_verified: boolean | null
          notification_sent: boolean | null
          otp_code: string | null
          otp_expires_at: string | null
          phone_number: string
          trial_end_date: string | null
          trial_start_date: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_verified?: boolean | null
          notification_sent?: boolean | null
          otp_code?: string | null
          otp_expires_at?: string | null
          phone_number: string
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_verified?: boolean | null
          notification_sent?: boolean | null
          otp_code?: string | null
          otp_expires_at?: string | null
          phone_number?: string
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profile_sensitive_data: {
        Row: {
          age_groups: string | null
          created_at: string
          ecd_email: string | null
          ecd_phone: string | null
          facility_name: string | null
          facility_type: string | null
          id: string
          learner_first_name: string | null
          learner_gender: string | null
          learner_last_name: string | null
          learner_progress_report: string | null
          number_of_kids: string | null
          number_of_learners: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age_groups?: string | null
          created_at?: string
          ecd_email?: string | null
          ecd_phone?: string | null
          facility_name?: string | null
          facility_type?: string | null
          id?: string
          learner_first_name?: string | null
          learner_gender?: string | null
          learner_last_name?: string | null
          learner_progress_report?: string | null
          number_of_kids?: string | null
          number_of_learners?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age_groups?: string | null
          created_at?: string
          ecd_email?: string | null
          ecd_phone?: string | null
          facility_name?: string | null
          facility_type?: string | null
          id?: string
          learner_first_name?: string | null
          learner_gender?: string | null
          learner_last_name?: string | null
          learner_progress_report?: string | null
          number_of_kids?: string | null
          number_of_learners?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          aspiration: string | null
          available_hours: string | null
          country: string
          created_at: string
          current_programs: string | null
          experience: string | null
          first_name: string
          hear_about: string | null
          id: string
          institution: string | null
          last_name: string
          profile_image_url: string | null
          programming_languages: string | null
          qualifications: string | null
          registration_status: string | null
          registration_type: string
          relationship: string | null
          salary: string | null
          start_date: string | null
          state: string
          teaching_philosophy: string | null
          tech_goals: string | null
          tech_skills: string | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          aspiration?: string | null
          available_hours?: string | null
          country: string
          created_at?: string
          current_programs?: string | null
          experience?: string | null
          first_name: string
          hear_about?: string | null
          id?: string
          institution?: string | null
          last_name: string
          profile_image_url?: string | null
          programming_languages?: string | null
          qualifications?: string | null
          registration_status?: string | null
          registration_type: string
          relationship?: string | null
          salary?: string | null
          start_date?: string | null
          state: string
          teaching_philosophy?: string | null
          tech_goals?: string | null
          tech_skills?: string | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          aspiration?: string | null
          available_hours?: string | null
          country?: string
          created_at?: string
          current_programs?: string | null
          experience?: string | null
          first_name?: string
          hear_about?: string | null
          id?: string
          institution?: string | null
          last_name?: string
          profile_image_url?: string | null
          programming_languages?: string | null
          qualifications?: string | null
          registration_status?: string | null
          registration_type?: string
          relationship?: string | null
          salary?: string | null
          start_date?: string | null
          state?: string
          teaching_philosophy?: string | null
          tech_goals?: string | null
          tech_skills?: string | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          current_uses: number
          description: string | null
          features_unlocked: string[]
          id: string
          is_active: boolean
          max_uses: number | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          current_uses?: number
          description?: string | null
          features_unlocked?: string[]
          id?: string
          is_active?: boolean
          max_uses?: number | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          current_uses?: number
          description?: string | null
          features_unlocked?: string[]
          id?: string
          is_active?: boolean
          max_uses?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      research_videos: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          title: string
          user_id: string
          video_path: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          title: string
          user_id: string
          video_path?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          title?: string
          user_id?: string
          video_path?: string | null
        }
        Relationships: []
      }
      sensitive_data_access_log: {
        Row: {
          access_type: string
          accessed_at: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          access_type: string
          accessed_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          access_type?: string
          accessed_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscription_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          is_active: boolean
          last_payment_date: string | null
          next_payment_due: string
          notes: string | null
          payment_method: string | null
          payment_status: string
          subscription_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          is_active?: boolean
          last_payment_date?: string | null
          next_payment_due: string
          notes?: string | null
          payment_method?: string | null
          payment_status?: string
          subscription_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          is_active?: boolean
          last_payment_date?: string | null
          next_payment_due?: string
          notes?: string | null
          payment_method?: string | null
          payment_status?: string
          subscription_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          created_at: string
          credits: number
          id: string
          last_daily_credit_at: string | null
          topup_credits: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          id?: string
          last_daily_credit_at?: string | null
          topup_credits?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          last_daily_credit_at?: string | null
          topup_credits?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_feedback: {
        Row: {
          created_at: string
          feedback_text: string
          id: string
          tagged_user_ids: string[]
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          feedback_text: string
          id?: string
          tagged_user_ids?: string[]
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          feedback_text?: string
          id?: string
          tagged_user_ids?: string[]
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      user_promo_codes: {
        Row: {
          expires_at: string
          id: string
          is_active: boolean
          promo_code_id: string
          redeemed_at: string
          user_id: string
        }
        Insert: {
          expires_at: string
          id?: string
          is_active?: boolean
          promo_code_id: string
          redeemed_at?: string
          user_id: string
        }
        Update: {
          expires_at?: string
          id?: string
          is_active?: boolean
          promo_code_id?: string
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_promo_codes_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
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
      admin_get_sensitive_profile_data: {
        Args: { target_user_id: string }
        Returns: {
          age_groups: string
          ecd_email: string
          ecd_phone: string
          facility_name: string
          facility_type: string
          learner_first_name: string
          learner_gender: string
          learner_last_name: string
          learner_progress_report: string
          number_of_kids: string
          number_of_learners: string
          phone: string
          user_id: string
        }[]
      }
      assert_can_write_profile_for: {
        Args: { _user_id: string }
        Returns: undefined
      }
      create_user_profile: {
        Args: {
          _aspiration?: string
          _available_hours?: string
          _country: string
          _current_programs?: string
          _experience?: string
          _first_name: string
          _hear_about?: string
          _institution?: string
          _last_name: string
          _programming_languages?: string
          _qualifications?: string
          _registration_status?: string
          _registration_type: string
          _relationship?: string
          _salary?: string
          _start_date?: string
          _state: string
          _teaching_philosophy?: string
          _tech_goals?: string
          _tech_skills?: string
          _user_id: string
          _username: string
        }
        Returns: undefined
      }
      create_user_sensitive_data: {
        Args: {
          _age_groups?: string
          _ecd_email?: string
          _ecd_phone?: string
          _facility_name?: string
          _facility_type?: string
          _learner_first_name?: string
          _learner_gender?: string
          _learner_last_name?: string
          _number_of_kids?: string
          _number_of_learners?: string
          _phone?: string
          _user_id: string
        }
        Returns: undefined
      }
      get_sensitive_profile_data: {
        Args: never
        Returns: {
          age_groups: string
          ecd_email: string
          ecd_phone: string
          facility_name: string
          facility_type: string
          learner_first_name: string
          learner_gender: string
          learner_last_name: string
          number_of_kids: string
          number_of_learners: string
          phone: string
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_community_member: {
        Args: { _community_id: string; _user_id: string }
        Returns: boolean
      }
      redeem_promo_code: { Args: { promo_code_text: string }; Returns: Json }
      search_app_users: {
        Args: { limit_count?: number; search_text?: string }
        Returns: {
          display_name: string
          registration_type: string
          user_id: string
          username: string
        }[]
      }
      validate_promo_code: { Args: { code_text: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "sponsor"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "moderator", "user", "sponsor"],
    },
  },
} as const
