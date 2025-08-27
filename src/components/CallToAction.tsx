import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <Link to="/lesson-vault-04-06">
        <Button 
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl"
        >
          Kids Aged 04 - 06
        </Button>
      </Link>
      <Link to="/lesson-vault-07-10">
        <Button 
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl"
        >
          Kids Aged 07 - 10
        </Button>
      </Link>
    </div>
  );
};

export default CallToAction;