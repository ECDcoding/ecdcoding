import { useState } from "react";
import { Button } from "@/components/ui/button";
import LessonPreviewDialog from "@/components/LessonPreviewDialog";

const CallToAction = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<"04-07" | "08-12" | null>(null);

  const handleButtonClick = (ageGroup: "04-07" | "08-12") => {
    setSelectedAgeGroup(ageGroup);
    setDialogOpen(true);
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
