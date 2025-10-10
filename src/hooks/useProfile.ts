import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  state: string;
  country: string;
  registration_type: string;
  
  // Parent fields
  institution?: string;
  learner_first_name?: string;
  learner_last_name?: string;
  learner_gender?: string;
  number_of_kids?: string;
  relationship?: string;
  
  // ECD Manager fields
  facility_name?: string;
  facility_type?: string;
  number_of_learners?: string;
  age_groups?: string;
  ecd_phone?: string;
  ecd_email?: string;
  
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

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
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