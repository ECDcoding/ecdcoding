import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { usePromoCode } from "@/hooks/usePromoCode";
import { useAuth } from "@/hooks/useAuth";

const CallToAction = () => {
  const navigate = useNavigate();
  const { hasAccess, loading } = usePromoCode();
  const { user } = useAuth();

  const handleNavigation = (path: string) => {
    // If user is logged in and has no active promo access, redirect to payment
    if (user && !loading && !hasAccess) {
      navigate("/payment");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <Button 
        size="lg"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl"
        onClick={() => navigate("/lesson-vault-04-06")}
      >
        Kids Aged 04 - 06
      </Button>
      <Button 
        size="lg"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl"
        onClick={() => handleNavigation("/payment")}
      >
        Kids Aged 07 - 10
      </Button>
    </div>
  );
};

export default CallToAction;