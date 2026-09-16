import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { grantGuestCredits, PENDING_CREDITS_KEY } from "@/hooks/useGuestAiCredits";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [aiCredits, setAiCredits] = useState<number | null>(null);

  // Grant ECD AI credits for a once-off R100 visitor purchase
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = parseInt(params.get("ecd_ai_credits") || "", 10);
    const pending = parseInt(localStorage.getItem(PENDING_CREDITS_KEY) || "", 10);
    const amount = Number.isFinite(fromUrl) && fromUrl > 0 ? fromUrl : pending;
    if (Number.isFinite(amount) && amount > 0) {
      grantGuestCredits(amount);
      localStorage.removeItem(PENDING_CREDITS_KEY);
      setAiCredits(amount);
    }
  }, []);

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-green-800">Payment Successful!</h1>
        <p className="text-gray-600 max-w-md">
          {aiCredits
            ? `Thank you for your payment. ${aiCredits} ECD AI credits have been added — that's ${aiCredits} minutes of unlimited questions.`
            : "Thank you for your payment. Your subscription has been activated and you now have full access to ECDcoding."}
        </p>
        <div className="space-y-3">
          <Button asChild className="bg-[#132a13] text-yellow-400 hover:bg-[#132a13]/90">
            <Link to="/">Go to Homepage</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Redirecting automatically in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
