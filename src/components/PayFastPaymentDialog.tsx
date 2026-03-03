import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2, RefreshCw, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type PaymentOption = 'top-up' | 'recurring';

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
  isCreditsLow?: boolean;
  defaultOption?: PaymentOption;
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
  onPaymentComplete,
  isCreditsLow = false,
  defaultOption = 'recurring',
}: PayFastPaymentDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [paymentData, setPaymentData] = useState<Record<string, string> | null>(null);
  const [payfastUrl, setPayfastUrl] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<PaymentOption>(defaultOption);

  // Sync default when dialog opens
  useEffect(() => {
    if (open) setSelectedOption(defaultOption);
  }, [open, defaultOption]);

  const effectiveAmount = selectedOption === 'top-up' ? 100 : 100;
  const effectiveItemName = selectedOption === 'top-up'
    ? 'Credit Top-Up (100 Credits)'
    : 'Monthly Subscription (Recurring Credits)';
  const effectivePaymentType = selectedOption === 'top-up' ? 'credits' : 'subscription';

  const initiatePayment = async () => {
    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('payfast-payment', {
        body: {
          amount: effectiveAmount,
          item_name: effectiveItemName,
          email_address: userEmail,
          name_first: userFirstName,
          name_last: userLastName,
          user_id: userId,
          payment_type: effectivePaymentType,
          return_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancelled`,
        }
      });

      if (error) throw error;

      if (data?.success && data?.payment_data) {
        setPayfastUrl(data.payfast_url);
        setPaymentData(data.payment_data);
        setTimeout(() => {
          if (formRef.current) formRef.current.submit();
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
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Reload Credits with PayFast
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Payment Option Selector */}
          {defaultOption === 'recurring' ? (
            /* First-time user: only show Recurring Payment */
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-primary bg-primary/10 shadow-md w-full max-w-[200px]">
                <CalendarClock className="h-6 w-6 text-primary" />
                <span className="font-semibold text-sm">Recurring Payment</span>
                <span className="text-xs text-muted-foreground text-center">R100.00/month</span>
              </div>
            </div>
          ) : (
            /* Existing subscriber: show both options */
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedOption('top-up')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  selectedOption === 'top-up'
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-muted hover:border-muted-foreground/30'
                }`}
              >
                <RefreshCw className={`h-6 w-6 ${selectedOption === 'top-up' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-semibold text-sm">Top-Up Payment</span>
                <span className="text-xs text-muted-foreground text-center">Once-off R100.00</span>
              </button>

              <button
                onClick={() => setSelectedOption('recurring')}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  selectedOption === 'recurring'
                    ? 'border-primary bg-primary/10 shadow-md'
                    : isCreditsLow
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                      : 'border-muted hover:border-muted-foreground/30'
                }`}
              >
                {isCreditsLow && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    LOW
                  </span>
                )}
                <CalendarClock className={`h-6 w-6 ${
                  isCreditsLow && selectedOption !== 'recurring'
                    ? 'text-red-500'
                    : selectedOption === 'recurring' ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <span className={`font-semibold text-sm ${
                  isCreditsLow && selectedOption !== 'recurring' ? 'text-red-600 dark:text-red-400' : ''
                }`}>Recurring Payment</span>
                <span className="text-xs text-muted-foreground text-center">R100.00/month</span>
              </button>
            </div>
          )}

          {/* Info for first-time users */}
          {defaultOption === 'recurring' && (
            <p className="text-xs text-muted-foreground text-center italic">
              Start with a monthly subscription. Once active, you can also add once-off top-ups anytime you run out of credits.
            </p>
          )}

          {/* Info for lapsed subscribers */}
          {defaultOption === 'top-up' && isCreditsLow && (
            <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
              Your monthly subscription has lapsed. You're on free daily credits until you reload.
            </p>
          )}

          {/* Order Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item:</span>
              <span className="font-medium text-sm">
                {selectedOption === 'top-up' ? 'Top-Up Payment' : 'Recurring Payment'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-bold text-lg">R{effectiveAmount.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            You will be redirected to the PayFast Gateway to complete your secure payment.
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
