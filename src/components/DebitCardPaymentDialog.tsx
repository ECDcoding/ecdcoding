import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DebitCardPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentComplete?: () => void;
  amount?: number;
  paymentType?: string;
}

export const DebitCardPaymentDialog = ({ 
  open, 
  onOpenChange, 
  onPaymentComplete,
  amount = 100,
  paymentType = "monthly"
}: DebitCardPaymentDialogProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.functions.invoke('payfast-payment', {
        body: {
          amount: amount,
          item_name: `ECDcoding ${paymentType === 'annual' ? 'Annual' : 'Monthly'} Subscription`,
          email_address: email,
          name_first: firstName,
          name_last: lastName,
          user_id: user?.id || 'guest',
          payment_type: paymentType,
          return_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancelled`,
        }
      });

      if (error) {
        console.error('PayFast error:', error);
        toast.error("Failed to initialize payment. Please try again.");
        setIsProcessing(false);
        return;
      }

      if (data?.success && data?.payfast_url && data?.payment_data) {
        // Create a form and submit it to PayFast
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.payfast_url;
        
        // Add all payment data as hidden fields
        Object.entries(data.payment_data).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        toast.error("Payment initialization failed. Please try again.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pay with PayFast
          </DialogTitle>
          <DialogDescription>
            You will be redirected to PayFast's secure payment page to complete your payment of R{amount}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-4">
          <p className="text-sm font-medium">🔒 Secure Payment via PayFast</p>
          <p className="text-xs mt-1">Your payment will be processed securely through PayFast's payment gateway.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Payment Amount:</span>
              <span className="text-lg font-bold text-primary">R{amount}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">Subscription Type:</span>
              <span className="text-sm capitalize">{paymentType}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#132a13] text-yellow-400 hover:bg-[#132a13]/90"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting to PayFast...
              </>
            ) : (
              `Pay R${amount} with PayFast`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
