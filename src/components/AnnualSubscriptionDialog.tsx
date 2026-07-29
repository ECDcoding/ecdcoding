import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ANNUAL_AMOUNT = 600;

interface AnnualSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}

export const AnnualSubscriptionDialog = ({
  open,
  onOpenChange,
  userId,
  userEmail,
  userFirstName,
  userLastName,
}: AnnualSubscriptionDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<Record<string, string> | null>(null);
  const [payfastUrl, setPayfastUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const initiatePayment = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("payfast-payment", {
        body: {
          amount: ANNUAL_AMOUNT,
          item_name: "ECDcoding Annual Usage (12 Months)",
          email_address: userEmail,
          name_first: userFirstName,
          name_last: userLastName,
          user_id: userId,
          payment_type: "subscription",
          return_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancelled`,
        },
      });

      if (error) throw error;

      if (data?.success && data?.payment_data) {
        setPayfastUrl(data.payfast_url);
        setPaymentData(data.payment_data);
        setTimeout(() => formRef.current?.submit(), 100);
      } else {
        throw new Error("Invalid response from payment service");
      }
    } catch (err) {
      console.error("Annual payment error:", err);
      toast.error("Failed to start payment. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            ECDcoding Annual Usage
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-xl border-2 border-primary bg-primary/10 p-4 text-center">
            <p className="text-sm text-muted-foreground">Annual access for your learner</p>
            <p className="text-3xl font-bold mt-1">R600.00</p>
            <p className="text-xs text-muted-foreground mt-1">per year</p>
          </div>

          <ul className="space-y-2 text-sm">
            {[
              "Full access to My Lesson Vault (04 - 07)",
              "FLC Progress Reports & community feedback",
              "Verbal Testing Space and all lesson carousels",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground text-center">
            You will be redirected to the secure PayFast Gateway to complete your payment.
          </p>

          <Button
            onClick={initiatePayment}
            disabled={isProcessing}
            className="w-full bg-[#132a13] text-yellow-400 hover:bg-[#132a13]/90"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting to PayFast...
              </>
            ) : (
              "Pay R600.00 with PayFast"
            )}
          </Button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full text-xs text-muted-foreground underline hover:text-foreground"
          >
            I'll do this later
          </button>
        </div>

        {paymentData && (
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
