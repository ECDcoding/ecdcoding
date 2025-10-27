import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  state: string;
  country: string;
  registration_type: string;
  
  // Parent fields
  institution?: string;
  relationship?: string;
  
  // ECD Manager fields
  current_programs?: string;
  tech_goals?: string;
  
  // Tech Teacher fields
  qualifications?: string;
  experience?: string;
  tech_skills?: string;
  programming_languages?: string;
  available_hours?: string;
  salary?: string;
  start_date?: string;
  teaching_philosophy?: string;
  
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

interface SensitiveProfileData {
  phone?: string;
  ecd_phone?: string;
  ecd_email?: string;
  learner_first_name?: string;
  learner_last_name?: string;
  learner_gender?: string;
  facility_name?: string;
  facility_type?: string;
  number_of_learners?: string;
  age_groups?: string;
  number_of_kids?: string;
  learner_progress_report?: string;
}

interface CompleteProfile extends Profile, SensitiveProfileData {}

export const useProfile = () => {
  const [profile, setProfile] = useState<CompleteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch basic profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          setLoading(false);
          return;
        }

        // Fetch sensitive profile data
        const { data: sensitiveData, error: sensitiveError } = await supabase
          .from("profile_sensitive_data")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (sensitiveError) {
          console.error("Error fetching sensitive data:", sensitiveError);
        }

        // Merge both datasets
        setProfile({
          ...profileData,
          ...sensitiveData,
        } as CompleteProfile);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
};