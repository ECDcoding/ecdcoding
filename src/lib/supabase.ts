import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase project credentials
// Get these from your Supabase project: Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL_HERE';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';

// Temporary fallback - replace with your actual credentials
let supabaseClient;
if (supabaseUrl === 'YOUR_SUPABASE_URL_HERE' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY_HERE') {
  console.warn('⚠️ Please update your Supabase credentials in src/lib/supabase.ts');
  // Create a dummy client to prevent the app from crashing
  supabaseClient = createClient('https://dummy.supabase.co', 'dummy-key');
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          first_name: string;
          last_name: string;
          username: string;
          phone: string;
          state: string;
          country: string;
          registration_type: 'parent' | 'ecd-manager' | 'tech-teacher';
          // Parent specific fields
          institution?: string;
          registration_status?: string;
          number_of_kids?: string;
          hear_about?: string;
          aspiration?: string;
          learner_first_name?: string;
          learner_last_name?: string;
          relationship?: string;
          ecd_phone?: string;
          ecd_email?: string;
          // ECD Manager specific fields
          facility_name?: string;
          facility_type?: string;
          number_of_learners?: string;
          age_groups?: string;
          current_programs?: string;
          tech_goals?: string;
          // Tech Teacher specific fields
          qualifications?: string;
          experience?: string;
          tech_skills?: string;
          programming_languages?: string;
          teaching_philosophy?: string;
          available_hours?: string;
          salary?: string;
          start_date?: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          username: string;
          phone: string;
          state: string;
          country: string;
          registration_type: 'parent' | 'ecd-manager' | 'tech-teacher';
          institution?: string;
          registration_status?: string;
          number_of_kids?: string;
          hear_about?: string;
          aspiration?: string;
          learner_first_name?: string;
          learner_last_name?: string;
          relationship?: string;
          ecd_phone?: string;
          ecd_email?: string;
          facility_name?: string;
          facility_type?: string;
          number_of_learners?: string;
          age_groups?: string;
          current_programs?: string;
          tech_goals?: string;
          qualifications?: string;
          experience?: string;
          tech_skills?: string;
          programming_languages?: string;
          teaching_philosophy?: string;
          available_hours?: string;
          salary?: string;
          start_date?: string;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          username?: string;
          phone?: string;
          state?: string;
          country?: string;
          registration_type?: 'parent' | 'ecd-manager' | 'tech-teacher';
          institution?: string;
          registration_status?: string;
          number_of_kids?: string;
          hear_about?: string;
          aspiration?: string;
          learner_first_name?: string;
          learner_last_name?: string;
          relationship?: string;
          ecd_phone?: string;
          ecd_email?: string;
          facility_name?: string;
          facility_type?: string;
          number_of_learners?: string;
          age_groups?: string;
          current_programs?: string;
          tech_goals?: string;
          qualifications?: string;
          experience?: string;
          tech_skills?: string;
          programming_languages?: string;
          teaching_philosophy?: string;
          available_hours?: string;
          salary?: string;
          start_date?: string;
        };
      };
    };
  };
};