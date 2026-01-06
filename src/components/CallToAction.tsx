import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LessonPreviewDialog from "@/components/LessonPreviewDialog";
import { useAuth } from "@/hooks/useAuth";

const CallToAction = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<"04-07" | "08-12" | null>(null);

  const handleButtonClick = (ageGroup: "04-07" | "08-12") => {
    if (user) {
      // Signed-in users go directly to lesson vault
      navigate(ageGroup === "04-07" ? "/lesson-vault-04-06" : "/lesson-vault-07-10");
    } else {
      // Non-signed-in users see the lesson preview dialog
      setSelectedAgeGroup(ageGroup);
      setDialogOpen(true);
    }
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

      <LessonPreviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ageGroup={selectedAgeGroup}
      />
    </>
  );
};

export default CallToAction;
