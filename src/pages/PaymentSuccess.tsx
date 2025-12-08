import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const navigate = useNavigate();

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
          Thank you for your payment. Your subscription has been activated and you now have full access to ECDcoding.
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
