import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Users, Building2 } from "lucide-react";

const CallToAction = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);

  const handleButtonClick = (ageGroup: string) => {
    setSelectedAgeGroup(ageGroup);
    setDialogOpen(true);
  };

  const handleRegistrationTypeSelect = (type: "parent" | "ecd") => {
    setDialogOpen(false);
    navigate(`/register?type=${type}`);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Button 
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl"
          onClick={() => handleButtonClick("04-07")}
        >
          Kids Aged 04 - 07
        </Button>
        <Button 
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl"
          onClick={() => handleButtonClick("08-12")}
        >
          Kids Aged 08 - 12
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Register to Get Started</DialogTitle>
            <DialogDescription className="text-center">
              Please select your registration type to continue
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              size="lg"
              className="w-full py-6 text-lg flex items-center justify-center gap-3"
              variant="outline"
              onClick={() => handleRegistrationTypeSelect("parent")}
            >
              <Users className="h-6 w-6" />
              Parent / Guardian
            </Button>
            <Button
              size="lg"
              className="w-full py-6 text-lg flex items-center justify-center gap-3"
              variant="outline"
              onClick={() => handleRegistrationTypeSelect("ecd")}
            >
              <Building2 className="h-6 w-6" />
              ECD Manager
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallToAction;