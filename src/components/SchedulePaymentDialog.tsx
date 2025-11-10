import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

interface SchedulePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SchedulePaymentDialog = ({ open, onOpenChange }: SchedulePaymentDialogProps) => {
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate 2FA code for credits reload
    if (paymentType === "credits" && twoFactorCode.length !== 6) {
      toast.error("Please enter a valid 6-digit 2FA code");
      return;
    }
    
    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Payment request submitted successfully!");
      onOpenChange(false);
      // Reset form
      setFullName("");
      setUserType("");
      setPaymentType("");
      setAmount("");
      setScheduledDate("");
      setTwoFactorCode("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Request to Pay with PayFast
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Name and Surname</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userType">Parent or ECD Payment</Label>
            <Select value={userType} onValueChange={setUserType} required>
              <SelectTrigger id="userType">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">Parent Payment</SelectItem>
                <SelectItem value="ecd">ECD Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentType">Payment Token Type</Label>
            <Select value={paymentType} onValueChange={setPaymentType} required>
              <SelectTrigger id="paymentType">
                <SelectValue placeholder="Type of Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Payment</SelectItem>
                <SelectItem value="annual">Annual Subscription</SelectItem>
                <SelectItem value="credits">Reload Credits (Optional)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduledDate">Scheduled Date</Label>
            <Input
              id="scheduledDate"
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          {paymentType === "credits" && (
            <div className="space-y-2">
              <Label htmlFor="twoFactorCode">2FA Verification Code</Label>
              <Input
                id="twoFactorCode"
                type="text"
                placeholder="Enter 6-digit code"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                maxLength={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit verification code from your authenticator app
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#c10e1a] text-white hover:bg-[#a80e1a]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending Request..." : "Send Request to PayFast"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
