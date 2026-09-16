import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PENDING_CREDITS_KEY, GUEST_CREDITS_PER_PURCHASE } from "@/hooks/useGuestAiCredits";

interface AiCreditsPaywallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AiCreditsPaywallDialog = ({ open, onOpenChange }: AiCreditsPaywallDialogProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [payfastUrl, setPayfastUrl] = useState("");
  const [paymentData, setPaymentData] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handlePay = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("payfast-payment", {
        body: {
          amount: 100,
          item_name: `ECD AI Unlimited Prompts - ${GUEST_CREDITS_PER_PURCHASE} credits`,
          email_address: email.trim(),
          name_first: firstName.trim(),
          name_last: lastName.trim(),
          user_id: "guest",
          payment_type: "ecd_ai_credits",
          return_url: `${window.location.origin}/payment-success?ecd_ai_credits=${GUEST_CREDITS_PER_PURCHASE}`,
          cancel_url: `${window.location.origin}/payment-cancelled`,
        },
      });

      if (error) throw error;
      if (data?.success && data?.payment_data) {
        localStorage.setItem(PENDING_CREDITS_KEY, String(GUEST_CREDITS_PER_PURCHASE));
        setPayfastUrl(data.payfast_url);
        setPaymentData(data.payment_data);
        setTimeout(() => formRef.current?.submit(), 100);
      } else {
        throw new Error(data?.error || "Could not start the payment.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not start the payment.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            You've used this week's free question
          </DialogTitle>
          <DialogDescription>
            Visitors get 1 free ECD AI question each week. For a once-off R100 you get{" "}
            {GUEST_CREDITS_PER_PURCHASE} credits — that's {GUEST_CREDITS_PER_PURCHASE} minutes of
            unlimited questions. Registered users are not limited.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="ai-first">First name</Label>
              <Input id="ai-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ai-last">Last name</Label>
              <Input id="ai-last" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="ai-email">Email address</Label>
            <Input id="ai-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button className="w-full" onClick={handlePay} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Pay R100 once off
          </Button>
        </div>

        {payfastUrl && (
          <form ref={formRef} action={payfastUrl} method="POST" style={{ display: "none" }}>
            {Object.entries(paymentData).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiCreditsPaywallDialog;
