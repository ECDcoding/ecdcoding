import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LessonPreviewDialog from "@/components/LessonPreviewDialog";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Construction } from "lucide-react";

const CallToAction = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<"04-07" | "08-12" | null>(null);
  const [underDevOpen, setUnderDevOpen] = useState(false);

  const handleButtonClick = (ageGroup: "04-07" | "08-12") => {
    if (ageGroup === "08-12" && !isAdmin) {
      setUnderDevOpen(true);
      return;
    }
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

      <Dialog open={underDevOpen} onOpenChange={setUnderDevOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                <Construction className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              This Section is Still Under Development
            </DialogTitle>
            <DialogDescription className="text-center">
              We're working hard to bring lessons for Kids Aged 08 - 12. Please check back soon!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallToAction;
