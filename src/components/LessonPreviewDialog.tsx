import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, BookOpen, Calculator, Music, Car, Heart, Brain, Code, ShieldCheck, Microscope } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const lessons: Lesson[] = [
  { id: "numeracy", title: "Numeracy", description: "Numbers, counting & math basics", icon: <Calculator className="h-6 w-6" />, color: "bg-blue-500" },
  { id: "logic", title: "Basic Logic", description: "Critical thinking & problem solving", icon: <Brain className="h-6 w-6" />, color: "bg-purple-500" },
  { id: "literacy", title: "Literacy", description: "Reading, writing & alphabet", icon: <BookOpen className="h-6 w-6" />, color: "bg-orange-500" },
  { id: "note-of-week", title: "Note of the Week", description: "Weekly learning highlights", icon: <Music className="h-6 w-6" />, color: "bg-pink-500" },
  { id: "life-skills", title: "Life Skills", description: "Essential everyday skills", icon: <Heart className="h-6 w-6" />, color: "bg-red-500" },
  { id: "tech-skills", title: "Tech Skills", description: "Technology & digital literacy", icon: <Code className="h-6 w-6" />, color: "bg-violet-500" },
  { id: "transportation", title: "Transportation", description: "Vehicles & how we travel", icon: <Car className="h-6 w-6" />, color: "bg-yellow-500" },
  { id: "road-safety", title: "Road Safety", description: "Traffic rules & staying safe", icon: <ShieldCheck className="h-6 w-6" />, color: "bg-green-500" },
  { id: "science", title: "Science and Discovery", description: "Explore the world around us", icon: <Microscope className="h-6 w-6" />, color: "bg-cyan-500" },
];

interface LessonPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ageGroup: "04-07" | "08-12" | null;
}

const LessonPreviewDialog = ({ open, onOpenChange, ageGroup }: LessonPreviewDialogProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const targetRoute = ageGroup === "04-07" ? "/lesson-vault-04-06" : "/lesson-vault-07-10";

  const handleLessonClick = (lesson: Lesson) => {
    if (user) {
      // User is signed in, navigate directly
      onOpenChange(false);
      navigate(targetRoute);
    } else {
      // User not signed in, show registration dialog
      setSelectedLesson(lesson);
      setShowRegistrationDialog(true);
    }
  };

  const handleRegistrationTypeSelect = (type: "parent" | "ecd") => {
    setShowRegistrationDialog(false);
    onOpenChange(false);
    navigate(`/register?type=${type}`);
  };

  const handleBackToLessons = () => {
    setShowRegistrationDialog(false);
    setSelectedLesson(null);
  };

  return (
    <>
      <Dialog open={open && !showRegistrationDialog} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {ageGroup === "04-07" ? "Kids Aged 4-7 Lessons" : "Kids Aged 8-12 Lessons"}
            </DialogTitle>
            <DialogDescription className="text-center">
              Explore our fun and interactive lessons. Click on any lesson to get started!
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-lg"
                onClick={() => handleLessonClick(lesson)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className={`${lesson.color} text-white p-3 rounded-full`}>
                    {lesson.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{lesson.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{lesson.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Registration Dialog */}
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Register to Get Started</DialogTitle>
            <DialogDescription className="text-center">
              {selectedLesson && (
                <span>
                  To access <strong>{selectedLesson.title}</strong>, please register first
                </span>
              )}
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
            <Button
              variant="ghost"
              className="text-sm"
              onClick={handleBackToLessons}
            >
              ← Back to lessons
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LessonPreviewDialog;
