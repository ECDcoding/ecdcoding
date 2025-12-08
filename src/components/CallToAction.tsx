import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <Button 
        size="lg"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl"
        onClick={() => navigate("/lesson-vault-04-06")}
      >
        Kids Aged 04 - 07
      </Button>
      <Button 
        size="lg"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl"
        onClick={() => navigate("/lesson-vault-07-10")}
      >
        Kids Aged 08 - 12
      </Button>
    </div>
  );
};

export default CallToAction;