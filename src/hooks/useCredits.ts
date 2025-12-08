import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "@/hooks/use-toast";

const INITIAL_CREDITS = 100; // New users start with 100 credits

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
        // Create initial credits record with 100 credits for new users
        const { data: newData, error: insertError } = await supabase
          .from("user_credits")
          .insert({ user_id: user.id, credits: INITIAL_CREDITS })
          .select()
          .single();

        if (insertError) throw insertError;
        setCredits(newData?.credits || INITIAL_CREDITS);
        
        toast({
          title: "Welcome!",
          description: `You've received ${INITIAL_CREDITS} credits to start learning!`,
        });
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

  // Use credits when interacting with lessons
  const useCredits = async (amount: number = 1) => {
    if (!user) return false;
    if (credits < amount) {
      toast({
        title: "Insufficient Credits",
        description: "Please add more credits to continue learning.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const newCredits = Math.max(0, credits - amount);
      
      const { error } = await supabase
        .from("user_credits")
        .update({ credits: newCredits })
        .eq("user_id", user.id);

      if (error) throw error;
      
      setCredits(newCredits);
      return true;
    } catch (error) {
      console.error("Error using credits:", error);
      return false;
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
    useCredits,
    refreshCredits: fetchCredits,
  };
};
