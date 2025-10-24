import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "@/hooks/use-toast";

export const useCredits = () => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_credits")
        .select("credits")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching credits:", error);
        throw error;
      }

      if (data) {
        setCredits(data.credits);
      } else {
        // Create initial credits record
        const { data: newData, error: insertError } = await supabase
          .from("user_credits")
          .insert({ user_id: user.id, credits: 0 })
          .select()
          .single();

        if (insertError) throw insertError;
        setCredits(newData?.credits || 0);
      }
    } catch (error) {
      console.error("Error managing credits:", error);
      toast({
        title: "Error",
        description: "Failed to load credits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const purchaseCredits = async (amount: number, priceZAR: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase credits",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Record the purchase
      const { error: purchaseError } = await supabase
        .from("credit_purchases")
        .insert({
          user_id: user.id,
          credits_amount: amount,
          price_zar: priceZAR,
          payment_status: "completed", // TODO: Integrate with actual payment gateway
        });

      if (purchaseError) throw purchaseError;

      // Update user credits
      const { error: updateError } = await supabase
        .from("user_credits")
        .update({ credits: credits + amount })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      setCredits(credits + amount);

      toast({
        title: "Purchase Successful!",
        description: `${amount} credits added to your account`,
      });

      return true;
    } catch (error) {
      console.error("Error purchasing credits:", error);
      toast({
        title: "Purchase Failed",
        description: "Unable to complete purchase. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  return {
    credits,
    loading,
    purchaseCredits,
    refreshCredits: fetchCredits,
  };
};
