import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AnnualSubscriptionDialog } from "@/components/AnnualSubscriptionDialog";

const DISMISS_KEY = "ecdcoding_annual_payment_dismissed";

export const AnnualPaymentPrompt = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const checkedRef = useRef<string | null>(null);

  useEffect(() => {
    const check = async () => {
      if (!user) return;
      if (checkedRef.current === user.id) return;
      checkedRef.current = user.id;

      if (sessionStorage.getItem(`${DISMISS_KEY}_${user.id}`)) return;

      const { data } = await supabase
        .from("subscription_payments")
        .select("id")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .eq("payment_status", "completed")
        .limit(1);

      if (!data || data.length === 0) {
        setOpen(true);
      }
    };
    check();
  }, [user]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next && user) sessionStorage.setItem(`${DISMISS_KEY}_${user.id}`, "1");
  };

  if (!user) return null;

  return (
    <AnnualSubscriptionDialog
      open={open}
      onOpenChange={handleOpenChange}
      userId={user.id}
      userEmail={user.email ?? undefined}
    />
  );
};
