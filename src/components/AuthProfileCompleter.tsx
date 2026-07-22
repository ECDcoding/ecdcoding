import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const PENDING_REGISTRATION_KEY = "ecdcoding_pending_registration";

interface PendingRegistration {
  firstName: string;
  lastName: string;
  registrationType: "parent" | "ecd-manager";
}

export const AuthProfileCompleter = () => {
  const { user } = useAuth();
  const processedRef = useRef<string | null>(null);

  useEffect(() => {
    const completeProfile = async () => {
      if (!user) return;

      // Avoid processing the same user more than once per session
      if (processedRef.current === user.id) return;

      const raw = localStorage.getItem(PENDING_REGISTRATION_KEY);
      if (!raw) return;

      let pending: PendingRegistration;
      try {
        pending = JSON.parse(raw);
      } catch {
        localStorage.removeItem(PENDING_REGISTRATION_KEY);
        return;
      }

      processedRef.current = user.id;

      // Check if a profile already exists for this user
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        localStorage.removeItem(PENDING_REGISTRATION_KEY);
        return;
      }

      const username = `${pending.firstName.trim()}${pending.lastName.trim()}`.toLowerCase().replace(/[^a-z0-9]/g, "") || user.id.split("-")[0];

      const { error } = await supabase.from("profiles").insert({
        user_id: user.id,
        first_name: pending.firstName.trim(),
        last_name: pending.lastName.trim(),
        username,
        phone: "",
        state: "",
        country: "",
        registration_type: pending.registrationType,
      });

      if (error) {
        console.error("Failed to complete profile:", error);
        toast.error("We couldn't finish setting up your profile. Please contact support.");
        return;
      }

      localStorage.removeItem(PENDING_REGISTRATION_KEY);
      toast.success("Welcome to ECDcoding! Your profile is ready.");
    };

    completeProfile();
  }, [user]);

  return null;
};
