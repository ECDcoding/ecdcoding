import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <Button 
        size="lg"
        className="bg-brand-orange hover:bg-brand-orange/90 text-foreground font-bold px-8 py-4 text-lg rounded-2xl"
      >
        Kids Aged 04 - 06
      </Button>
      <Button 
        size="lg"
        className="bg-brand-orange hover:bg-brand-orange/90 text-foreground font-bold px-8 py-4 text-lg rounded-2xl"
      >
        Kids Aged 07 - 10
      </Button>
    </div>
  );
};

export default CallToAction;