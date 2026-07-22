import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <XCircle className="h-24 w-24 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-red-800">Payment Cancelled</h1>
        <p className="text-gray-600 max-w-md">
          Your payment was cancelled. No charges have been made to your account.
        </p>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link to="/">Go to Homepage</Link>
          </Button>
          <Button asChild className="bg-[#132a13] text-yellow-400 hover:bg-[#132a13]/90">
            <Link to="/">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
