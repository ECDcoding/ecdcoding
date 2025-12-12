import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useEarlyAdopter = () => {
  const [isEarlyAdopter, setIsEarlyAdopter] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkEarlyAdopter = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch first 200 parent/ECD manager profiles ordered by creation date
        const { data, error } = await supabase
          .from("profiles")
          .select("user_id, registration_type, created_at")
          .in("registration_type", ["parent", "ecd-manager"])
          .order("created_at", { ascending: true })
          .limit(200);

        if (error) {
          console.error("Error checking early adopter status:", error);
          setLoading(false);
          return;
        }

        // Check if current user is in the first 200
        const earlyAdopterIds = new Set(data?.map((p) => p.user_id) || []);
        setIsEarlyAdopter(earlyAdopterIds.has(user.id));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkEarlyAdopter();
  }, [user]);

  return { isEarlyAdopter, loading };
};
