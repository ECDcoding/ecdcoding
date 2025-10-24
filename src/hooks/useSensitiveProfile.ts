import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface SensitiveProfileData {
  user_id: string;
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
}

export const useSensitiveProfile = () => {
  const [sensitiveData, setSensitiveData] = useState<SensitiveProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSensitiveData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Use the secure function that includes audit logging
        const { data, error } = await supabase.rpc('get_sensitive_profile_data');

        if (error) {
          console.error("Error fetching sensitive profile data:", error);
        } else if (data && data.length > 0) {
          setSensitiveData(data[0]);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensitiveData();
  }, [user]);

  const updateSensitiveData = async (updates: Partial<SensitiveProfileData>) => {
    if (!user) return { error: "No user logged in" };

    try {
      const { error } = await supabase
        .from("profile_sensitive_data")
        .upsert({
          user_id: user.id,
          ...updates,
        });

      if (error) throw error;

      // Refresh the data
      const { data } = await supabase.rpc('get_sensitive_profile_data');
      if (data && data.length > 0) {
        setSensitiveData(data[0]);
      }

      return { error: null };
    } catch (error) {
      console.error("Error updating sensitive data:", error);
      return { error };
    }
  };

  return { sensitiveData, loading, updateSensitiveData };
};
