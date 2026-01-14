import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "@/hooks/use-toast";

const INITIAL_CREDITS = 100; // New users start with 100 credits
const DAILY_FREE_CREDITS = 5; // Free credits awarded daily
const ADMIN_REFILL_CREDITS = 100; // Credits to refill for admin users

export const useCredits = () => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const checkAndAwardDailyCredits = async (userId: string, currentCredits: number, lastDailyCreditAt: string | null) => {
    const now = new Date();
    const lastAward = lastDailyCreditAt ? new Date(lastDailyCreditAt) : null;
    
    // Check if more than 24 hours have passed since last daily credit
    const shouldAwardDailyCredits = !lastAward || 
      (now.getTime() - lastAward.getTime()) >= 24 * 60 * 60 * 1000;
    
    if (shouldAwardDailyCredits) {
      const newCredits = currentCredits + DAILY_FREE_CREDITS;
      
      const { error } = await supabase
        .from("user_credits")
        .update({ 
          credits: newCredits, 
          last_daily_credit_at: now.toISOString() 
        })
        .eq("user_id", userId);
      
      if (!error) {
        setCredits(newCredits);
        toast({
          title: "Daily Bonus!",
          description: `You've received ${DAILY_FREE_CREDITS} free credits for today!`,
        });
        return newCredits;
      }
    }
    return currentCredits;
  };

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_credits")
        .select("credits, last_daily_credit_at")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching credits:", error);
        throw error;
      }

      if (data) {
        // Check and award daily credits if eligible
        await checkAndAwardDailyCredits(user.id, data.credits, data.last_daily_credit_at);
        if (credits === 0) {
          setCredits(data.credits);
        }
      } else {
        // Create initial credits record with 100 credits for new users
        const { data: newData, error: insertError } = await supabase
          .from("user_credits")
          .insert({ 
            user_id: user.id, 
            credits: INITIAL_CREDITS,
            last_daily_credit_at: new Date().toISOString()
          })
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

  // Check if user is admin
  const checkIsAdmin = async (): Promise<boolean> => {
    if (!user) return false;
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      
      return !error && !!data;
    } catch {
      return false;
    }
  };

  // Refill credits for admin users
  const refillAdminCredits = async () => {
    if (!user) return;
    
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return;

    try {
      const { error } = await supabase
        .from("user_credits")
        .update({ credits: ADMIN_REFILL_CREDITS })
        .eq("user_id", user.id);

      if (!error) {
        setCredits(ADMIN_REFILL_CREDITS);
        toast({
          title: "Admin Credits Refilled! 🎉",
          description: `Your credits have been refilled to ${ADMIN_REFILL_CREDITS}.`,
        });
      }
    } catch (error) {
      console.error("Error refilling admin credits:", error);
    }
  };

  // Use credits when interacting with lessons
  const useCredits = async (amount: number = 1) => {
    if (!user) return false;
    if (credits < amount) {
      // Check if admin and refill
      const isAdmin = await checkIsAdmin();
      if (isAdmin) {
        await refillAdminCredits();
        return true; // Allow the action after refill
      }
      
      toast({
        title: "Insufficient Credits",
        description: "Please add more credits to continue learning.",
        variant: "destructive",
      });
      return false;
    }

    try {
      let newCredits = Math.max(0, credits - amount);
      
      // Auto-refill for admins when credits hit 0
      const isAdmin = await checkIsAdmin();
      if (newCredits === 0 && isAdmin) {
        newCredits = ADMIN_REFILL_CREDITS;
        toast({
          title: "Admin Credits Refilled! 🎉",
          description: `Your credits have been refilled to ${ADMIN_REFILL_CREDITS}.`,
        });
      }
      
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
