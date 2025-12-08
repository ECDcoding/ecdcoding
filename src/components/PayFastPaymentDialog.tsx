import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PayFastPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  itemName: string;
  paymentType: 'subscription' | 'credits';
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  userId?: string;
  onPaymentComplete?: () => void;
}

export const PayFastPaymentDialog = ({
  open,
  onOpenChange,
  amount,
  itemName,
  paymentType,
  userEmail,
  userFirstName,
  userLastName,
  userId,
  onPaymentComplete
}: PayFastPaymentDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [paymentData, setPaymentData] = useState<Record<string, string> | null>(null);
  const [payfastUrl, setPayfastUrl] = useState<string>('');

  const initiatePayment = async () => {
    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('payfast-payment', {
        body: {
          amount,
          item_name: itemName,
          email_address: userEmail,
          name_first: userFirstName,
          name_last: userLastName,
          user_id: userId,
          payment_type: paymentType,
          return_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancelled`,
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success && data?.payment_data) {
        setPayfastUrl(data.payfast_url);
        setPaymentData(data.payment_data);
        
        // Submit form after state update
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.submit();
          }
        }, 100);
      } else {
        throw new Error('Invalid response from payment service');
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            PayFast Payment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item:</span>
              <span className="font-medium">{itemName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-bold text-lg">R{amount.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            You will be redirected to PayFast to complete your secure payment.
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
              'Pay with PayFast'
            )}
          </Button>
        </div>

        {/* Hidden form for PayFast redirect */}
        {paymentData && (
          <form
            ref={formRef}
            action={payfastUrl}
            method="POST"
            style={{ display: 'none' }}
          >
            {Object.entries(paymentData).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
